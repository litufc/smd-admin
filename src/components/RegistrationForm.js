import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RegistrationForm = (props) => {

  const classes = useStyles();

  return(
    <form className={classes.root} onSubmit={props.onSubmit}>
      {
        props.email != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="email"
          label="E-mail"
          value={props.email}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
      
      {
        props.name != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="name"
          label="Nome"
          value={props.name}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {   
        props.code != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="code"
          label="Código"
          value={props.code}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {   
        props.course != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="course"
          label="Curso"
          value={props.course}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {   
        props.phone != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="phone"
          label="Telefone"
          value={props.phone}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {   
        props.role != null ?
        <FormControl className={classes.formControl} style={{ margin: 8 }}>
          <InputLabel>Função</InputLabel>
          <Select
            value={props.role}
            onChange={props.onChange}
            inputProps={{
              name: 'role'
            }}
          >
              {props.menuItems}
          </Select> 
        </FormControl> : null
      }
  
      {
        props.place != null ?
        <FormControl className={classes.formControl} style={{ margin: 8 }}>
          <InputLabel>Local</InputLabel>
          <Select
              value={props.place}
              onChange={props.onChange}
              inputProps={{
                name: 'place'
              }}
          >
              {props.menuItems}
          </Select>
        </FormControl> : null
      }
  
      {   
        props.lessonCode != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="lessonCode"
          label="Código da Disciplina"
          value={props.lessonCode}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {   
        props.startTime != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="startTime"
          label="Horário de Início"
          value={props.startTime}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {   
        props.endTime != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="endTime"
          label="Horário de Término"
          value={props.endTime}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {   
        props.teacher != null ?
        <TextField
          style={{ margin: 8 }}
          fullWidth
          name="teacher"
          label="Professor(a)"
          value={props.teacher}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
        /> : null
      }
  
      {
        props.room != null ?
        <FormControl className={classes.formControl} style={{ margin: 8 }}>
          <InputLabel>Sala</InputLabel>
          <Select
              value={props.room}
              onChange={props.onChange}
              inputProps={{
                name: 'room'
              }}
          >
              {props.roomItems}
          </Select>
        </FormControl> : null
      }
  
      {
        props.day != null ?
        <FormControl className={classes.formControl} style={{ margin: 8 }}>
          <InputLabel>Dia</InputLabel>
          <Select
              value={props.day}
              onChange={props.onChange}
              inputProps={{
                name: 'day'
              }}
          >
              {props.menuItems}
          </Select>
        </FormControl> : null
      }
  
      <Button disabled={props.isInvalid} type="submit" variant="contained" color="primary">
          Cadastrar
      </Button>
  
      {props.error && <p>{props.error.message}</p>}
    </form>
  );
}
  
export default RegistrationForm;