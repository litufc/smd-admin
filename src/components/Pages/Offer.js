import React, { Component } from 'react';
import { compose } from 'recompose';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import RegistrationForm from '../RegistrationForm';
import ListTemplate from '../ListTemplate';
import InfoTemplate from '../InfoTemplate';
import EditForm from '../EditForm';
import AlertDialog from '../AlertDialog';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';
import { tsConstructSignatureDeclaration } from '@babel/types';

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

  onSubmit = event => {
    const { name, lessonCode, startTime, endTime, teacher, room, day } = this.state
    const lesson = { name, lessonCode, startTime, endTime, teacher, room, day }
  
    console.log(this.checkClash(lesson))

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

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClickListItem = index => {
    const selected = this.state.lessons[index]
    this.setState({selected: index,
                   editName: selected.name, 
                   editLessonCode: selected.lessonCode,
                   editStartTime: selected.startTime,
                   editEndTime: selected.endTime,
                   editTeacher: selected.teacher,
                   editRoom: selected.room,
                   editDay: selected.day})
  }

  goEdit = () => {
    this.setState({editable: true})
  }

  onEdit = () => {
    const id = this.state.lessons[this.state.selected].id
    const name = this.state.editName
    const lessonCode = this.state.lessonCode
    const startTime = this.state.editStartTime
    const endTime = this.state.editEndTime
    const teacher = this.state.editTeacher
    const room = this.state.editRoom
    const day = this.state.editDay
    this.props.firebase
      .updateLesson({id, name, lessonCode, startTime, endTime, teacher, room, day})
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.goBack();
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  goBack = () => {
    this.setState({editable: false})
  }

  openDeleteDialog = () => {
    this.setState({deleteDialog: true})
  }

  closeDeleteDialog = () => {
    this.setState({deleteDialog: false})
  }

  onDelete = () => {
    const id = this.state.lessons[this.state.selected].id
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
        break;

      case 'Terça-Feira':
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
        break;

      case 'Quarta-Feira':
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
        break;

      case 'Quinta-Feira':
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
        break;

      case 'Sexta-Feira':
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
        break;

      case 'Sábado':
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
        break;
    }
    console.log('HERE 5 ' + checked)
    return checked
  }

  render() {
    const { name, lessonCode, startTime, endTime, teacher, room, day, error,
            editName, editLessonCode, editStartTime, editEndTime, editTeacher, editRoom, editDay } = this.state
    const isInvalid = name === '' || lessonCode === '' || startTime === '' || endTime === '' || teacher === '' || room === '' || day === ''
    const isEditInvalid = editName === '' || editLessonCode === '' || editStartTime === '' || editEndTime === '' || editTeacher === '' || editRoom === '' || editDay === '' 

    let menuItems;
    if(this.state.days != undefined){
      menuItems = this.state.days.map(day => 
        <MenuItem value={day.name}>{day.name}</MenuItem>
      )
    }

    let roomItems;
    if(this.state.rooms != undefined){
      roomItems = this.state.rooms.map(room => 
        <MenuItem value={room.name}>{room.name}</MenuItem>
      )
    }

    let listItems
    if(this.state.lessons != undefined){
      listItems = this.state.lessons.map((lesson, index) => 
        <ListItem button onClick={() => this.onClickListItem(index)}>
          <ListItemText primary={'['+ lessonCode + ']' + lesson.name + ' - Professor(a): ' + lesson.teacher}
                        secondary={lesson.day + ' de ' + lesson.startTime + ' às ' + lesson.endTime + ' - Sala: ' + lesson.room}/>
        </ListItem>
      )
      const count = this.state.count
      this.mondayItems = listItems.slice(0, count[0])
      this.tuesdayItems = listItems.slice(count[0], count[1])
      this.wednesdayItems = listItems.slice(count[1], count[2])
      this.thursdayItems = listItems.slice(count[2], count[3])
      this.fridayItems = listItems.slice(count[3], count[4])
      this.saturdayItems = listItems.slice(count[4], count[5])
    }
    
    return(
      <div>
        <h1>Locais</h1>
        <RegistrationForm onSubmit={this.onSubmit}
                          onChange={this.onChange}
                          menuItems={menuItems}
                          roomItems={roomItems}
                          name={name}
                          lessonCode={lessonCode}
                          startTime={startTime}
                          endTime={endTime}
                          teacher={teacher}
                          room={room}
                          day={day}
                          error={error}
                          isInvalid={isInvalid}/>
        <h3>Segunda-Feira</h3>
        <ListTemplate listItems={this.mondayItems}/>
        <h3>Terça-Feira</h3>
        <ListTemplate listItems={this.tuesdayItems}/>
        <h3>Quarta-Feira</h3>
        <ListTemplate listItems={this.wednesdayItems}/>
        <h3>Quinta-Feira</h3>
        <ListTemplate listItems={this.thursdayItems}/>
        <h3>Sexta-Feira</h3>
        <ListTemplate listItems={this.fridayItems}/>
        <h3>Sábado</h3>
        <ListTemplate listItems={this.saturdayItems}/>
        {
            this.state.selected != null && !this.state.editable  ?
            <InfoTemplate selected={this.state.lessons[this.state.selected]} goEdit={this.goEdit}/> : null
        }
        {
            this.state.selected != null && this.state.editable ?
            <EditForm onEdit={this.onEdit}
                      onChange={this.onChange}
                      openDeleteDialog={this.openDeleteDialog}
                      goBack={this.goBack}
                      menuItems={menuItems}
                      roomItems={roomItems}
                      editName={editName}
                      editLessonCode={editLessonCode}
                      editStartTime={editStartTime}
                      editEndTime={editEndTime}
                      editTeacher={editTeacher}
                      editRoom={editRoom}
                      editDay={editDay}
                      error={error}
                      isInvalid={isEditInvalid}/> : null
        }
        <AlertDialog onClose={this.closeDeleteDialog}
                     onAction={this.onDelete}
                     title={'Tem certeza que você deseja excluir a aula ' + editName + ' ?'}
                     yes={'Sim, pode excluir!'}
                     no={'Não tenho certeza...'}
                     open={this.state.deleteDialog}/>
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