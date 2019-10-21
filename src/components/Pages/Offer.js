import React, { Component } from 'react';
import { compose } from 'recompose';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import Typography from '@material-ui/core/Typography';

import EditableDataTable from '../DataTables/EditableDataTable';
import DaysTabs from '../Tabs/DaysTabs';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class OfferPageBase extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.getRooms()
    this.listener = this.props.firebase
      .getLessons()
      .onSnapshot(querySnapshot => {
        const monday = []
        const tuesday = []
        const wednesday = []
        const thursday = []
        const friday = []
        const saturday = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              switch(data.day){
                case 'Segunda-feira':
                  monday.push({id, ...data})
                  break;
                case 'Terça-feira':
                  tuesday.push({id, ...data})
                  break;
                case 'Quarta-feira':
                  wednesday.push({id, ...data})
                  break;
                case 'Quinta-feira':
                  thursday.push({id, ...data})
                  break;
                case 'Sexta-feira':
                  friday.push({id, ...data})
                  break;
                case 'Sábado':
                  saturday.push({id, ...data})
                  break;
              }
          });
          this.setState({mondayLessons: monday,
                         tuesdayLessons: tuesday,
                         wednesdayLessons: wednesday,
                         thursdayLessons: thursday,
                         fridayLessons: friday,
                         saturdayLessons: saturday})
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
        //Snackbar
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
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onDelete = id => {
    this.props.firebase
      .deleteLesson(id)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  checkClash = lesson => {
    const mondayLessons = this.state.mondayLessons
    const tuesdayLessons = this.state.tuesdayLessons
    const wednesdayLessons = this.state.wednesdayLessons
    const thursdayLessons = this.state.thursdayLessons
    const fridayLessons = this.state.fridayLessons
    const saturdayLessons = this.state.saturdayLessons

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
            if(check(room, startTime, endTime, mondayLessons[counter].room, mondayLessons[counter].startTime, mondayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < mondayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Terça-Feira':
        if(tuesdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked + ' COUNTER ' + counter)
            if(check(room, startTime, endTime, tuesdayLessons[counter].room, tuesdayLessons[counter].startTime, tuesdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < tuesdayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Quarta-Feira':
        if(wednesdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, wednesdayLessons[counter].room, wednesdayLessons[counter].startTime, wednesdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < wednesdayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Quinta-Feira':
        if(thursdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, thursdayLessons[counter].room, thursdayLessons[counter].startTime, thursdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < thursdayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Sexta-Feira':
        if(fridayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, fridayLessons[counter].room, fridayLessons[counter].startTime, fridayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < fridayLessons.length))
          console.log('HERE 4 ' + checked)
        }
        break;

      case 'Sábado':
        if(saturdayLessons.length > 0) {
          console.log('HERE 1 ' + checked)
          do {
            console.log('HERE 2 ' + checked)
            if(check(room, startTime, endTime, saturdayLessons[counter].room, saturdayLessons[counter].startTime, saturdayLessons[counter].endTime)){
              checked = true
              console.log('HERE 3 ' + checked)
            }
            counter++
          }
          while(checked === false && (counter < saturdayLessons.length))
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
      this.state.rooms.forEach(room => {
        rooms[room.name] = room.name
      })
    } 

    let mondayLessons = []
    let tuesdayLessons = []
    let wednesdayLessons = []
    let thursdayLessons = []
    let fridayLessons = []
    let saturdayLessons = []

    if(this.state.mondayLessons != undefined){
      mondayLessons = this.state.mondayLessons
    }

    if(this.state.tuesdayLessons != undefined){
      tuesdayLessons = this.state.tuesdayLessons
    }

    if(this.state.wednesdayLessons != undefined){
      wednesdayLessons = this.state.wednesdayLessons
    }

    if(this.state.thursdayLessons != undefined){
      thursdayLessons = this.state.thursdayLessons
    }

    if(this.state.fridayLessons != undefined){
      fridayLessons = this.state.fridayLessons
    }

    if(this.state.saturdayLessons != undefined){
      saturdayLessons = this.state.saturdayLessons
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
    <EditableDataTable 
      columns={columns}
      data={mondayLessons}
      title='Segunda-feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const tuesdayList =
    <EditableDataTable 
      columns={columns}
      data={tuesdayLessons}
      title='Terça-feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const wednesdayList = 
    <EditableDataTable 
      columns={columns}
      data={wednesdayLessons}
      title='Quarta-feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const thursdayList = 
    <EditableDataTable 
      columns={columns}
      data={thursdayLessons}
      title='Quinta-feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const fridayList = 
    <EditableDataTable 
      columns={columns}
      data={fridayLessons}
      title='Sexta-feira'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Disciplina'
    />

    const saturdayList =
    <EditableDataTable 
      columns={columns}
      data={saturdayLessons}
      title='Sábado'
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