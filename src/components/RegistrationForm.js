import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const RegistrationForm = (props) => (
  <form onSubmit={props.onSubmit}>
    {
      props.email != null ?
      <input
        name="email"
        value={props.email}
        onChange={props.onChange}
        type="email"
        placeholder="E-mail"
      /> : null
    }
    
    {
      props.name != null ?
      <input
        name="name"
        value={props.name}
        onChange={props.onChange}
        type="text"
        placeholder="Nome"
      /> : null
    }

    {   
      props.code != null ?
      <input
        name="code"
        value={props.code}
        onChange={props.onChange}
        type="text"
        placeholder="Código"
      /> : null
    }

    {   
      props.course != null ?
      <input
        name="course"
        value={props.course}
        onChange={props.onChange}
        type="text"
        placeholder="Curso"
      /> : null
    }

    {   
      props.phone != null ?
      <input
        name="phone"
        value={props.phone}
        onChange={props.onChange}
        type="text"
        placeholder="Telefone"
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
    
    <button disabled={props.isInvalid} type="submit">
        Cadastrar
    </button>

    {props.error && <p>{props.error.message}</p>}
  </form>
);
  
export default RegistrationForm;