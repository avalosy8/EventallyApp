import React, { useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import { Auth, Hub } from 'aws-amplify';

import { MDBContainer, MDBInput, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from "mdbreact";
import {GlobalContext} from '../Context/GlobalContext'
import {useContext} from 'react'

import Main from "./Main"

const initialFormState = {
  username: '', password: '', email: '', authCode: ''
}

function Login() {
  const [formState, updateFormState] = useState(initialFormState)

  const {user, formType, updateUser, updateFormType} = useContext(GlobalContext);
  const history = useHistory();
  // persists user information
  useEffect(() => {
    checkUser()
    setAuthListener()
  }, [])

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      console.log(data.payload)
      switch (data.payload.event) {
        case 'signOut':
          updateFormType("signUp")
          updateUser(null)
          history.push('/');
          break;

        case 'signedIn':
          checkUser()
          history.push('/home');
          break;

        case 'signIn':
          checkUser()
          history.push('/');
          break;
      }
    })
  }

  async function checkUser() {
    try {
      const user2 = await Auth.currentAuthenticatedUser()
      console.log('checkUser: ', user2)
      updateUser(user2)
      updateFormType("signedIn")
      if(user) {putAuthUser();}
    } catch (err) {
      updateUser(null) // could leave empty
    }
  }

  function onChange(e) {
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value}))
    console.log('FORM STATE:', formState)
  }

  async function signUp() {
    const { username, email, password } = formState
    await Auth.signUp({ username, password, attributes: { email }})
    updateFormType("confirmSignUp")
  }
  async function confirmSignUp() {
    const { username, authCode } = formState
    await Auth.confirmSignUp(username, authCode)
    console.log('inside confirmSignUp()', user);
    updateFormType("signIn")
  }
  async function signIn() {
    const { username, password } = formState
    await Auth.signIn(username, password)
    console.log('inside signIn()', user);
    updateFormType("signedIn")
    // if(user) {putAuthUser();}
  }

  Auth.currentAuthenticatedUser()
    .then(data => console.log(data.attributes))
    .catch(err => console.log(err));

    console.log(formType)

/************ DynamoDB stuff ******************/ 
const { v4: uuidv4 } = require('uuid'); 
uuidv4();
const AWS = require("aws-sdk");
AWS.config.update ({
  region: "us-east-1",
  accessKeyId: "AKIAXJ3VTSS354FEHLFV",
  secretAccessKey: "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"  
});

const dynamodb = new AWS.DynamoDB.DocumentClient(); 

async function getAuthUserEmail() {
  var params = {};
  params.TableName = "Users";
  params.Key = {
    UserId: user.attributes.sub // should be user.sub
  };
 console.log('user.attributes.sub: ', user.attributes.sub)
  var result = await dynamodb.get(params, function(err, data) {
  if (err) console.log(err);
  else console.log('after getAuthUserEmail(): ', data);
  });
}

// adds user to database
async function putAuthUser() {
  var params = {};
  params.TableName = "Users";
  params.Item = {
      UserId: user.attributes.sub, //partition key
      Email: user.attributes.email
  };

  var result = await dynamodb.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
  });

  try {
    var paramsPoints = {};
    paramsPoints.TableName = "Points";
    paramsPoints.Item = {
        PointsId: user.attributes.sub, //partition key
        Points: 0
    };
  
    var paramsGet = {};
    paramsGet.TableName = "Points";
    paramsGet.Key = {
        PointsId: user.attributes.sub, //partition key
    };

    var resultGet = await dynamodb.get(paramsGet).promise();
    if(!resultGet) {
      var result = await dynamodb.put(paramsPoints, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
      });
    }    

  } catch (error) {
    console.log(error)    
  }
}

/************ DynamoDB stuff ******************/ 

  return (
    <MDBContainer className="w-50"> 

  <MDBCard wide cascade className="centered mt-5"> <MDBCardBody cascade>
  {
    formType == 'signUp' && (
      <div>
        
        <MDBCardTitle className='text-center'>Sign Up</MDBCardTitle>
        <MDBInput label="Username" name="username" icon="user" onChange={onChange} placeholder="username" />
        <MDBInput label="Password" name="password" icon="lock" type="password" onChange={onChange} placeholder="password" />
        <MDBInput label="Email" name="email" icon="envelope" onChange={onChange} placeholder="email" />
          <div className="text-center">
          <button type="button" className="btn btn-primary btn-floating" onClick={signUp}>Sign Up</button>
          <button type="button" className="btn btn-primary btn-floating" onClick={() => updateFormType("signIn")}>Sign In</button>
          </div>
      </div>
    )
  }
  
  {
    formType == 'confirmSignUp' && (
      <div>
        <MDBCardTitle className='text-center'>Enter Confirmation Code</MDBCardTitle>
        <MDBInput label="Confirmation Code" name="authCode" onChange={onChange} placeholder="Confirmation Code" />
          <div className="text-center">
          <button type="button" className="btn btn-primary btn-floating" onClick={confirmSignUp}>Confirm Sign Up</button>
          </div>
      </div>
    )
  }
  
  {
    formType == 'signIn' && (
      <div>
        <MDBCardTitle className='text-center'>Sign In</MDBCardTitle>
        <MDBInput label="Username" name="username" icon="user" onChange={onChange} placeholder="username" />
        <MDBInput label="Password" name="password" icon="lock" type="password" onChange={onChange} placeholder="password" />
          <div className="text-center">
          <button type="button" className="btn btn-primary btn-floating" onClick={signIn}>Sign In</button>
          </div>
      </div>
    )
  }

  {
    formType == 'signedIn' && (
      <div className="text-center">
        <h2>Successfully logged in!</h2>
        <Main />
        {history.push('/home')}
      </div>
    )
  }
  </MDBCardBody> </MDBCard> 
  </MDBContainer>
  );
}

export default Login;