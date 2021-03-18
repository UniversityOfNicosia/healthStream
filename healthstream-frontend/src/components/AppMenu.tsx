import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'

import { createBrowserHistory } from 'history';
 import Sleep from './Sleep';
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import { DataSourceName } from '../utils/enums';
 
const drawerWidth = 300;

const history = createBrowserHistory();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
 
  navList: {
    width: drawerWidth,
  },
  menuItem: {
    width: drawerWidth,
  },
  menuItemIcon: {
    color: '#bb1d2c',
  },
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
 
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
  
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
       ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const SleepMenu =() => {
    let params  = useParams()
     return (
        <>
          {/* <div> asdasdas </div> */}
        </>
    )
}

const HeartRateMenu =() => {
  let params  = useParams()
   return (
      <>
        {/* <div> asdasdas </div> */}
      </>
  )
}
const StepsMenu =() => {
  let params  = useParams()
   return (
      <>
        {/* <div> asdasdas </div> */}
      </>
  )
}
 
const AppMenu = () => {
    

    const classes = useStyles()
    const [openHealth, setOpenHealth] = React.useState(false)
    const [openNutrition, setOpenNutrition] = React.useState(false)
    const [openActivity, setOpenActivity] = React.useState(false)
    const [openBody, setOpenBody] = React.useState(false)
    const [openLocation, setOpenLocation] = React.useState(false)
 

    function toggleClickHealth() {
        setOpenHealth(!openHealth)
    }
    function toggleClickNutrition() {
        setOpenNutrition(!openNutrition)
    }

    function toggleClickActivity() {
        setOpenActivity(!openActivity)
    }

    function toggleClickBody() {
        setOpenBody(!openBody)
    }
    function toggleClickLocation() {
        setOpenLocation(!openLocation)
    }

    function handleClickSleep() {
        history.push('/sleep');
    }

    function handleClickHydration() {
        history.push('/hydration')
    }
    function handleClickNutrition() {
        history.push('/nutrition')
    }

    function handleClicHeartRate() {
        history.push('/heart_rate')
    }

    function handleClickSteps() {
        history.push('/steps')
    }


     
 
	return (
		<> 
 
 <Router>  
         
        <List component="nav"  disablePadding>
       <ListItem button onClick={toggleClickActivity} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Activity" />
        {openActivity ? <IconExpandLess /> : <IconExpandMore />}

      </ListItem>
      <Collapse in={openActivity} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Activity" />
          </ListItem> 
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Basal Metabolic Rate (BMR)" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Calories burned" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Cycling pedaling cadence" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Cycling pedaling cumulative" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Heart Points" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Move Minutes" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Power" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Step count cadence" />
          </ListItem>
          <ListItem onClick={handleClickSteps} button className={classes.menuItem}>
            <ListItemText inset primary="Steps" />
            <Route path="/steps" component={StepsMenu} />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Workout" />
          </ListItem>
        </List>
 
      </Collapse>
     

      <ListItem button  onClick={toggleClickBody}  className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Body" />
        {openBody ? <IconExpandLess /> : <IconExpandMore />}

      </ListItem>
      <Collapse in={openBody} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Body fat percentage" />
          </ListItem> 
          <ListItem onClick={handleClicHeartRate} button className={classes.menuItem}>
            <ListItemText inset primary="Heart rate" />
            <Route path="/heart_rate" component={HeartRateMenu} />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Height" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Weight" />
          </ListItem>
        </List>
 
      </Collapse>

      <ListItem button onClick={toggleClickLocation} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Location" />
        { openLocation ? <IconExpandLess /> : <IconExpandMore />}

      </ListItem>
       <Collapse in={openLocation} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Cycling wheel revolution RPM" />
          </ListItem> 
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Cycling wheel revolution cumulative" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Distance delta" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Location sample" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Speed" />
          </ListItem>
        </List> 
      </Collapse>
 
      <ListItem button onClick={toggleClickNutrition} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Nutrition" />
        {openNutrition ? <IconExpandLess /> : <IconExpandMore />}

      </ListItem>
      <Collapse in={openNutrition} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem onClick={handleClickHydration} button className={classes.menuItem}>
            <ListItemText inset primary="Hydration" />
          </ListItem> 
          <ListItem onClick={handleClickNutrition}  button className={classes.menuItem}>
            <ListItemText inset primary="Nutrition" />
          </ListItem> 
        </List> 
      </Collapse> 

      <ListItem onClick={handleClickSleep}  button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Sleep" />
          <Route path="/sleep" component={SleepMenu} />
      </ListItem>

      <ListItem button onClick={toggleClickHealth} className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
        <IconBarChart />
        </ListItemIcon>
        <ListItemText primary="Health" />
        {openHealth ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={openHealth} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Blood glucose" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Blood pressure" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Cervical mucus" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Cervical position" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Menstruation" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Ovulation test" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Oxygen saturation" />
          </ListItem>
          <ListItem button className={classes.menuItem}>
            <ListItemText inset primary="Vaginal spotting" />
          </ListItem>
         </List>      
      </Collapse>


    </List>
    
	 
        </Router>  
        </> 
	)
}

export default AppMenu