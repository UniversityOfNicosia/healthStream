import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import unic_logo from './css/images/unic_logo.jpg'
import Bucket from './components/Bucket';
import { BucketDTO,   } from './api/dto/googleFit.dto';
import { AppBar,Container, Card ,Toolbar , Typography, Button} from '@material-ui/core'
 import GoogleCriteria from './components/GoogleCriteria';
import GoogleLogin, {useGoogleLogin} from 'react-google-login';
import { DataSourceName } from './utils/enums';
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
import AppMenu from './components/AppMenu'


const drawerWidth = 300;

 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({ 
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

 
  
const App = ( ) => {

  let history = useHistory();
  const [ buckets, setBuckets ] =useState<BucketDTO[]>([])
  const [ token, setToken ] =useState<string>('')
  const [ resultTitle, setResultTitle ] =useState<string>('')
  const [ dataSourceName, setDataSourceName ] =useState<DataSourceName>()
  const [openMenu, setOpenMenu] =  useState(false)
  const [ dateFilter, setDateFilter ] =useState<string>('')

   
 
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const addBucket = (buckets: BucketDTO[])  => {
    setBuckets([...buckets])
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  

 

  return (
 
<>
<div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{  backgroundColor: "white" }}>
          <IconButton
             aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src={unic_logo}  alt="logo" />
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open} 
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>  
        
        <AppMenu/>
        <Divider />
        
      </Drawer>
              <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              
                <div className={classes.drawerHeader} />
                    <Container style={{padding: 10}}>  
                          <label  style={{marginBottom: 10 }}   >Please enter a date range to retrieve your data </label>
                            <br/>  <br/> 
                            <GoogleCriteria  onCriteriaAdded={addBucket} onTitleSet={setResultTitle} onDateSet={setDateFilter} onDataSourceNameSet={setDataSourceName}
                            />     
                    </Container>
                  { buckets !== undefined   ?  buckets.map((b, i)=> {
                  
                            return (   
                              <Container style={{padding: 10}}>  
                                    <Bucket bucket={b} title={resultTitle} dataSourceName={dataSourceName} dateFilter={dateFilter}/>  
                              </Container>        
                            );
                      
                  }) : []  
                  }
            
             </main>   
      </div>

 </>

  );
    }

export default App
 