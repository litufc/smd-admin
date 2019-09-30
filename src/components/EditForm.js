import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const EditForm = (props) => (
    <form onSubmit={props.onEdit}>
        <h2>Editar</h2>
        {
            props.editEmail != null ?
            <TextField
                name="editEmail"
                label="E-mail"
                value={props.editEmail}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }
        
        {
            props.editName != null ?
            <TextField
                name="editName"
                label="Nome"
                value={props.editName}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {   
            props.editCode != null ?
            <TextField
                name="editCode"
                label="Código"
                value={props.editCode}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {   
            props.editCourse != null ?
            <TextField
                name="editCourse"
                label="Curso"
                value={props.editCourse}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {   
            props.editPhone != null ?
            <TextField
                name="editPhone"
                label="Telefone"
                value={props.editPhone}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {   
            props.editRole != null ?
            <div>
                <InputLabel>Função</InputLabel>
                <Select
                    value={props.editRole}
                    onChange={props.onChange}
                    inputProps={{
                        name: 'editRole'
                    }}
                >
                    {props.menuItems}
                </Select> 
            </div> : null
        }

        {
            props.editPlace != null ?
            <div>
                <InputLabel>Local</InputLabel>
                <Select
                    value={props.editPlace}
                    onChange={props.onChange}
                    inputProps={{
                        name: 'editPlace'
                    }}
                >
                    {props.menuItems}
                </Select>
            </div> : null
        }

        {   
            props.editLessonCode != null ?
            <TextField
                name="editLessonCode"
                label="Código da Disciplina"
                value={props.editLessonCode}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {   
            props.editStartTime != null ?
            <TextField
                name="startTime"
                label="Horário de Início"
                value={props.editStartTime}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {   
            props.editEndTime != null ?
            <TextField
                name="endTime"
                label="Horário de Término"
                value={props.editEndTime}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {   
            props.editTeacher != null ?
            <TextField
                name="teacher"
                label="Professor(a)"
                value={props.editTeacher}
                onChange={props.onChange}
                margin="normal"
                variant="outlined"
            /> : null
        }

        {
            props.editRoom != null ?
            <div>
                <InputLabel>Sala</InputLabel>
                <Select
                    value={props.editRoom}
                    onChange={props.onChange}
                    inputProps={{
                    name: 'editRoom'
                    }}
                >
                    {props.roomItems}
                </Select>
            </div> : null
        }

        {
            props.editDay != null ?
            <div>
                <InputLabel>Dia</InputLabel>
                <Select
                    value={props.editDay}
                    onChange={props.onChange}
                    inputProps={{
                    name: 'day'
                    }}
                >
                    {props.menuItems}
                </Select>
            </div> : null
        }

        <Button onClick={props.goBack} variant="contained" color="primary">
            Voltar
        </Button>

        <Button type="submit" disabled={props.isInvalid} variant="contained" color="secondary">
            Concluir Edição
        </Button>

        {
            props.openDeleteDialog != null ?
            <Button onClick={props.openDeleteDialog} variant="contained" color="warning">
                Excluir
            </Button> : null
        }

        {props.error && <p>{props.error.message}</p>}
    </form>
);
  
export default EditForm;