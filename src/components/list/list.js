import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

const ListTemplate = (props) => {
    return (
        <List component="nav" aria-label="main mailbox folders">
            {props.students.map((student) => {
                return  <ListItemLink>
                            <ListItemText primary={student.name} secondary={student.code}/>
                        </ListItemLink>
            })}
        </List>
    );
}

export default ListTemplate;