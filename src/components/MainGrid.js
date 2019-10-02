import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MainGrid = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

        {
          props.style === '3' ?
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                {props.left}
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                {props.center}
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                {props.right}
              </Paper>
            </Grid>
          </Grid> : null
        }

        {
          props.style === '2-1' ?
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                {props.left}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                {props.right}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {props.down}
            </Grid>
          </Grid> : null
        }
    </div>
  );
}

export default MainGrid