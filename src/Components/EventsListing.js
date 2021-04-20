import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import '../styles/events.css';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      textAlign: 'center'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/************ DynamoDB stuff ******************/ 
const { v4: uuidv4 } = require('uuid'); 
uuidv4();
const AWS = require("aws-sdk");
AWS.config.update ({
  region: "us-east-1",
  accessKeyId: "AKIAXJ3VTSS354FEHLFV",
  secretAccessKey: "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"  
});

const dynamodb = new AWS.DynamoDB.DocumentClient(); //simplified dynamodb library


function putEvents(event){

    var params3 = {};
    params3.TableName = "Events";
    params3.Item = {
    EventId: 4, //partition key
        Date: event.start.date, //sort key
        name: event.summary
    };
    dynamodb.put(params3, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
    });
}
/************ DynamoDB stuff ******************/ 

function EventsListing(){

    var CLIENT_ID = "592427108490-6g68m3d237a6qrmj4cb3lkbr676k58bp.apps.googleusercontent.com"
    var API_KEY = "AIzaSyBsREDtXFIMT5YLHib-qIQRBSsM0m8l2Ws"

    var gapi = window.gapi;
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
    var CALENDAR_ID = 'o8ptlkm1n15a6q4pj7as0vlp98@group.calendar.google.com'
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [click, setClick] = useState(0);

    // when clicked, show events
    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(function() {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`
                })
            }).then(response => {
                const events =  response.result.items
                console.log('EVENTS: ', events)
                return ({events})
                })
                .then(json => setCalendarEvents(json))

        }      
      gapi.load('client', start)   
    }, [])

    console.log('C_EVENTS: ', calendarEvents)

    const classes = useStyles();
    const classes2 = useStyles2();


    return (
        <div className="App">
        <header className="App-header">

            {calendarEvents.events && <div>
                {calendarEvents.events.map((ev,key) => {
                    putEvents(ev);
                    return(
                    <div class="card1">
                      <div className={classes2.root}>
                        
                          <div className="title">{ev.summary}</div>
                          <div className="date">{ev.start.date}</div>
                        
                      </div>
                    </div>
                    );
                })}
            </div>}

        </header>
        </div>
    )
}

export default EventsListing;