import './App.css';
import React, { useEffect, useState } from 'react';

import Navbar from './Components/navbar';
import Routes from './routes/routes';

const { v4: uuidv4 } = require('uuid'); 
uuidv4();
const AWS = require("aws-sdk");
AWS.config.update ({
  region: "us-east-1",
  accessKeyId: "AKIAXJ3VTSS354FEHLFV",
  secretAccessKey: "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"  
});

const dynamodb = new AWS.DynamoDB.DocumentClient(); //simplified dynamodb library

function App() {
  return (
    <div>
      <>
      <Navbar />
      <Routes />
      </>
    </div>
  );
}

export default App;