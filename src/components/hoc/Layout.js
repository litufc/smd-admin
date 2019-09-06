import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Aux from './Auxiliar';
import NavBar from '../navbar/navbar'


const useStyles = makeStyles(theme => ({
    main: {
        padding: 16
    }
  }));

const Layout = (props) => {
    const classes = useStyles();

    return(
        <Aux>       
            <NavBar />
            <main className={classes.main}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;