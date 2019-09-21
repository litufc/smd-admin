import React from 'react';

import List from '@material-ui/core/List';

const ListTemplate = (props) => (
    <List component="nav">
        {props.listItems}
    </List>
);
  
export default ListTemplate;