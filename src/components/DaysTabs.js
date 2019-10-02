import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DaysTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
        <Tab label="Segunda-Feira" {...a11yProps(0)} />
        <Tab label="Terça-Feira" {...a11yProps(1)} />
        <Tab label="Quarta-Feira" {...a11yProps(2)} />
        <Tab label="Quinta-Feira" {...a11yProps(3)} />
        <Tab label="Sexta-Feira" {...a11yProps(4)} />
        <Tab label="Sábado" {...a11yProps(5)} />
    </Tabs>
    <TabPanel value={value} index={0}>
    {props.monday}
    </TabPanel>
    <TabPanel value={value} index={1}>
    {props.tuesday}
    </TabPanel>
    <TabPanel value={value} index={2}>
    {props.wednesday}
    </TabPanel>
    <TabPanel value={value} index={3}>
    {props.thursday}
    </TabPanel>
    <TabPanel value={value} index={4}>
    {props.friday}
    </TabPanel>
    <TabPanel value={value} index={5}>
    {props.saturday}
    </TabPanel>
    </div>
  );
}

export default DaysTabs