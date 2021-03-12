import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {GoogleFitAPI} from './api/GoogleFitAPI'
import unic_logo from './css/images/unic_logo.jpg'
import Bucket from './components/Bucket';
import { BucketDTO,   } from './api/dto/googleFit.dto';
import { AppBar,Container, Card ,Toolbar , Typography, Button} from '@material-ui/core'
 import GoogleCriteria from './components/GoogleCriteria';
import GoogleLogin, {useGoogleLogin} from 'react-google-login';
 
function App() {

  const [ buckets, setBuckets ] =useState<BucketDTO[]>([])
  const [ token, setToken ] =useState<string>('')
  const [ resultTitle, setResultTitle ] =useState<string>('')

  const addBucket = (buckets: BucketDTO[])  => {
    setBuckets([...buckets])
  }
 
 
  return (
     <div className="App">
        <header> 
            <AppBar position="static">
                <Toolbar  style={{  backgroundColor: "#bb1d2c" }} >  
                <img src={unic_logo}  alt="logo" />
                   <Typography variant="h5" style={{padding: 1}}>
                   &nbsp; &nbsp;&nbsp;&nbsp;Google Fit User Data
                  </Typography> 
                </Toolbar> 
          </AppBar>
        </header> 
        <br/>
        {/* <GoogleLogin
          clientId="226710377524-9v7i0eq9qqpcc0qrfo5eqs0toga9lap9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
       />, */}
      <br/><br/><br/>
      <Container style={{padding: 10}}>  
              <label  style={{marginBottom: 10 }}   >Please enter a date range to retrieve your data </label>
              <br/>  <br/> 
             <GoogleCriteria  onCriteriaAdded={addBucket} onTitleSet={setResultTitle}
              />     
       </Container>
      { buckets !== undefined   ?  buckets.map((b, i)=> {
      
                return (   
                  <Container style={{padding: 10}}> 
                       <Card component="span" key={i}>
                        <Bucket bucket={b} title={resultTitle}/> 
                      </Card> 
                   </Container>        
                );
           
      }) : [] 
         
      }
      <br/>  <br/> <br/>  <br/> <br/>  <br/> <br/>  <br/> <br/>  <br/> <br/>  <br/> 
          <br/>  <br/> <br/>  <br/> <br/>  <br/> <br/>  <br/> 
      <footer> HEALTH STREAM </footer>
 
      </div>
  );
    }

export default App
