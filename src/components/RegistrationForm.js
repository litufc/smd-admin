import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const RegistrationForm = (props) => (
  <form onSubmit={props.onSubmit}>
    {
      props.email != null ?
      <TextField
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
      <div>
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
      </div> : null
    }

    {
      props.place != null ?
      <div>
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
      </div> : null
    }

    {   
      props.startTime != null ?
      <TextField
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
      <div>
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
      </div> : null
    }

    {
      props.day != null ?
      <div>
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
      </div> : null
    }

    <Button disabled={props.isInvalid} type="submit" variant="contained" color="primary">
        Cadastrar
    </Button>

    {props.error && <p>{props.error.message}</p>}
  </form>
);
  
export default RegistrationForm;