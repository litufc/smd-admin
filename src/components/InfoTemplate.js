import React from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const InfoTemplate = (props) => (
    <List component="nav">

        {
            props.selected.name != null ?
            <ListItem>
                <ListItemText>
                    Nome: <b>{props.selected.name}</b>
                </ListItemText>
            </ListItem> : null
        }
        
        {
            props.selected.email != null ?
            <ListItem>
                <ListItemText>
                    Email: <b>{props.selected.email}</b>
                </ListItemText>
            </ListItem> : null
        }

        {
            props.selected.code != null ?
            <ListItem>
                <ListItemText>
                    Código: <b>{props.selected.code}</b>
                </ListItemText>
            </ListItem> : null
        }

        {   
            props.selected.course != null ?
            <ListItem>
                <ListItemText>
                    Curso: <b>{props.selected.course}</b>
                </ListItemText>
            </ListItem> : null
        }

        {   
            props.selected.phone != null ?
            <ListItem>
                <ListItemText>
                    Telefone: <b>{props.selected.phone}</b>
                </ListItemText>
            </ListItem> : null
        }

        {   
            props.selected.role != null ?
            <ListItem>
                <ListItemText>
                    Função: <b>{props.selected.role}</b>
                </ListItemText>
            </ListItem> : null
        }

        {
            props.selected.place != null ?
            <ListItem>
                <ListItemText>
                    Local: <b>{props.selected.place}</b>
                </ListItemText>
            </ListItem> : null
        }

        {
            props.selected.startTime != null ?
            <ListItem>
                <ListItemText>
                    Horário de Início: <b>{props.selected.startTime}</b>
                </ListItemText>
            </ListItem> : null
        }

        {
            props.selected.endTime != null ?
            <ListItem>
                <ListItemText>
                    Horário de Término: <b>{props.selected.endTime}</b>
                </ListItemText>
            </ListItem> : null
        }

        {
            props.selected.teacher != null ?
            <ListItem>
                <ListItemText>
                    Professor(a): <b>{props.selected.teacher}</b>
                </ListItemText>
            </ListItem> : null
        }

        {
            props.selected.room != null ?
            <ListItem>
                <ListItemText>
                    Sala: <b>{props.selected.room}</b>
                </ListItemText>
            </ListItem> : null
        }

        {
            props.selected.day != null ?
            <ListItem>
                <ListItemText>
                    Dia: <b>{props.selected.day}</b>
                </ListItemText>
            </ListItem> : null
        }

        <Button variant="contained" color="secondary" onClick={props.goEdit}>
            Editar
        </Button>
    </List>
);
  
export default InfoTemplate;