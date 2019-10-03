import React, { Component } from 'react';
import { compose } from 'recompose';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import Typography from '@material-ui/core/Typography';

import DataTable from '../DataTable';
import DaysTabs from '../DaysTabs';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  name: '',
  lessonCode: '',
  startTime: '',
  endTime: '',
  teacher: '',
  room: '',
  day: '',
  editable: false,
  error: null,
  deleteDialog: false,
  days: [{name: 'Segunda-Feira'},
         {name: 'Terça-Feira'},
         {name: 'Quarta-Feira'},
         {name: 'Quinta-Feira'},
         {name: 'Sexta-Feira'},
         {name: 'Sábado'}]
};

class OfferPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getRooms()
    this.listener = this.props.firebase
      .getLessons()
      .onSnapshot(querySnapshot => {
        this.lessons = []
        this.monday = []
        this.tuesday = []
        this.wednesday = []
        this.thursday = []
        this.friday = []
        this.saturday = []
        this.count = []
        this.moCount = 0
        this.tuCount = 0
        this.weCount = 0
        this.thCount = 0
        this.frCount = 0
        this.saCount = 0
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              switch(data.day){
                case 'Segunda-Feira':
                  this.monday.push({id, ...data})
                  this.moCount++
                  break;
                case 'Terça-Feira':
                  this.tuesday.push({id, ...data})
                  this.tuCount++
                  break;
                case 'Quarta-Feira':
                  this.wednesday.push({id, ...data})
                  this.weCount++
                  break;
                case 'Quinta-Feira':
                  this.thursday.push({id, ...data})
                  this.thCount++
                  break;
                case 'Sexta-Feira':
                  this.friday.push({id, ...data})
                  this.frCount++
                  break;
                case 'Sábado':
                  this.saturday.push({id, ...data})
                  this.saCount++
                  break;
              }
          });
          this.lessons.push(...this.monday,
                            ...this.tuesday,
                            ...this.wednesday,
                            ...this.thursday,
                            ...this.friday,
                            ...this.saturday)
          this.count.push(this.moCount,
                          this.moCount+this.tuCount,
                          this.moCount+this.tuCount+this.weCount,
                          this.moCount+this.tuCount+this.weCount+this.thCount,
                          this.moCount+this.tuCount+this.weCount+this.thCount+this.frCount,
                          this.moCount+this.tuCount+this.weCount+this.thCount+this.frCount+this.saCount)
          this.setState({lessons: this.lessons, count: this.count})
      }, error => {
        this.setState({ error });
      })
  }

  getRooms = () => {
    this.roomsListener = this.props.firebase
      .getRooms()
      .onSnapshot(querySnapshot => {
          this.rooms = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              this.rooms.push({id, ...data})
          });
          this.setState({rooms: this.rooms})
      }, error => {
        this.setState({ error });
      })
  }

  componentWillUnmount() {
    this.listener()
    this.roomsListener()
  }

  onAdd = (lesson, day) => {
    lesson.day = day

    if(!this.checkClash(lesson)) {
      this.props.firebase
      .addLesson(lesson)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    }
  }

  onEdit = (lesson) => {
    this.props.firebase
      .updateLesson(lesson)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.goBack();
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onDelete = id => {
    this.props.firebase
      .deleteLesson(id)
      .then(() => {
        this.setState({ ...INITIAL_STATE, editable: false, selected: null });
        this.closeDeleteDialog()
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  checkClash = lesson => {
    const count = this.state.count
    this.mondayLessons = this.state.lessons.slice(0, count[0])
    this.tuesdayLessons = this.state.lessons.slice(count[0], count[1])
    this.wednesdayLessons = this.state.lessons.slice(count[1], count[2])
    this.thursdayLessons = this.state.lessons.slice(count[2], count[3])
    this.fridayLessons = this.state.lessons.slice(count[3], count[4])
    this.saturdayLessons = this.state.lessons.slice(count[4], count[5])

    moment.locale('pt-BR');
    const format = 'HH:mm'
    const room = lesson.room
    const startTime = moment(lesson.startTime, format).format(format)
    const endTime = moment(lesson.endTime, format).format(format)

    const check = (room1, st1, et1, room2, st2, et2) => {
      st2 = moment(st2, format).format(format)
      et2 = moment(et2, format).format(format)

      return ((room1 === room2) && (moment(st1, format).isBetween(moment(st2, format), moment(et2, format), null, '[]') || moment(et1, format).isBetween(moment(st2, format), moment(et2, format), null, '[]')))
    }

    let checked = false
    let counter = 0

    switch(lesson.day) {
      case 'Segunda-Feira':
        if(this.mondayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, this.mondayLessons[counter].room, this.mondayLessons[counter].startTime, this.mondayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < this.mondayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Terça-Feira':
        if(this.tuesdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked + ' COUNTER ' + counter)
            if(check(room, startTime, endTime, this.tuesdayLessons[counter].room, this.tuesdayLessons[counter].startTime, this.tuesdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < this.tuesdayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Quarta-Feira':
        if(this.wednesdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, this.wednesdayLessons[counter].room, this.wednesdayLessons[counter].startTime, this.wednesdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < this.wednesdayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Quinta-Feira':
        if(this.thursdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, this.thursdayLessons[counter].room, this.thursdayLessons[counter].startTime, this.thursdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < this.thursdayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Sexta-Feira':
        if(this.fridayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, this.fridayLessons[counter].room, this.fridayLessons[counter].startTime, this.fridayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < this.fridayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Sábado':
        if(this.saturdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, this.saturdayLessons[counter].room, this.saturdayLessons[counter].startTime, this.saturdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < this.saturdayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;
    }
    console.log('HERE 5 ' + checked)
    return checked
  }

  render() {
    let rooms = {}
    if(this.state.rooms != undefined){
      let counter = 0
      this.state.rooms.forEach(room => {
        rooms[counter] = room.name
        counter++
      })
    } 

    if(this.state.lessons != undefined){
      const count = this.state.count
      this.mondayLessons = this.state.lessons.slice(0, count[0])
      this.tuesdayLessons = this.state.lessons.slice(count[0], count[1])
      this.wednesdayLessons = this.state.lessons.slice(count[1], count[2])
      this.thursdayLessons = this.state.lessons.slice(count[2], count[3])
      this.fridayLessons = this.state.lessons.slice(count[3], count[4])
      this.saturdayLessons = this.state.lessons.slice(count[4], count[5])
    }
        
    const columns = [
      {title: 'Nome da Disciplina', field: 'name'},
      {title: 'Código da Disciplina', field: 'lessonCode'},
      {title: 'Horário de Início', field: 'startTime'},
      {title: 'Horário de Término', field: 'endTime'},
      {title: 'Professor(es)', field: 'teacher'},
      {title: 'Sala', field: 'room', lookup: rooms},
    ]

    if(this.mondayLessons == undefined) this.mondayLessons = []
    if(this.tuesdayLessons == undefined) this.tuesdayLessons = []
    if(this.wednesdayLessons == undefined) this.wednesdayLessons = []
    if(this.thursdayLessons == undefined) this.thursdayLessons = []
    if(this.fridayLessons == undefined) this.fridayLessons = []
    if(this.saturdayLessons == undefined) this.saturdayLessons = []

    const mondayList =
    <DataTable 
      columns={columns}
      data={this.mondayLessons}
      day='Segunda-Feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const tuesdayList =
    <DataTable 
      columns={columns}
      data={this.tuesdayLessons}
      day='Terça-Feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const wednesdayList = 
    <DataTable 
      columns={columns}
      data={this.wednesdayLessons}
      day='Quarta-Feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const thursdayList = 
    <DataTable 
      columns={columns}
      data={this.thursdayLessons}
      day='Quinta-Feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const fridayList = 
    <DataTable 
      columns={columns}
      data={this.fridayLessons}
      day='Sexta-Feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const saturdayList =
    <DataTable 
      columns={columns}
      data={this.saturdayLessons}
      day='Sábado'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const list =
    <DaysTabs 
      monday={mondayList}
      tuesday={tuesdayList}
      wednesday={wednesdayList}
      thursday={thursdayList}
      friday={fridayList}
      saturday={saturdayList}
      type='Disciplina'
    />

    return(
      <div>
        <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
          Oferta de Disciplinas
        </Typography>
        {list}
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const OfferPage = compose(
  withAuthorization(condition),
  withFirebase,
)(OfferPageBase);

export default OfferPage;