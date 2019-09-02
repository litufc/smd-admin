import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
      marginLeft: 32,
      textDecoration: 'none',
      color: 'white'
    }
  }));

const NavBar = (props) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Aplicativo Secretaria SMD - Admin
            </Typography>
            <Link to="/oferta" className={classes.button} ><Button color="inherit">Oferta</Button></Link>
            <Link to="/alunos" className={classes.button} ><Button color="inherit">Alunos</Button></Link>
            <Link to="/recursos" className={classes.button} ><Button color="inherit">Recursos</Button></Link>
            <Link to="/chaves"  className={classes.button} ><Button color="inherit">Chaves</Button></Link>
            <Link to="/salas" className={classes.button} ><Button color="inherit">Salas</Button></Link>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default NavBar;