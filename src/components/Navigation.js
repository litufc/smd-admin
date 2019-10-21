import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import { AuthUserContext } from '../session/session-index';

const Navigation = () => (
  <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavBar /> : null
      }
  </AuthUserContext.Consumer>
);

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
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Aplicativo Secretaria SMD - Admin
          </Typography>
          <Link to={ROUTES.REQUESTS} className={classes.button} ><Button color="inherit">Pedidos</Button></Link>
          <Link to={ROUTES.LOANS} className={classes.button} ><Button color="inherit">Empréstimos</Button></Link>
          <Link to={ROUTES.OFFER} className={classes.button} ><Button color="inherit">Oferta</Button></Link>
          <Link to={ROUTES.USERS} className={classes.button} ><Button color="inherit">Usuários</Button></Link>
          <Link to={ROUTES.RESOURCES} className={classes.button} ><Button color="inherit">Recursos</Button></Link>
          <Link to={ROUTES.KEYS} className={classes.button} ><Button color="inherit">Chaves</Button></Link>
          <Link to={ROUTES.ROOMS} className={classes.button} ><Button color="inherit">Salas</Button></Link>
          <Link to={ROUTES.PLACES} className={classes.button} ><Button color="inherit">Locais</Button></Link>
          {/*<Link to={ROUTES.OPTIONS} className={classes.button} ><Button color="inherit">Opções</Button></Link>*/}
          <div className={classes.button} ><SignOutButton /></div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export {NavBar};
export default Navigation;