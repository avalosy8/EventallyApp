import React from "react";
import Calendar from "@ericz1803/react-google-calendar";
import { css } from "@emotion/react";
import '../styles/events.css';
import EventsListing from "../Components/EventsListing";

const API_KEY = "AIzaSyBsREDtXFIMT5YLHib-qIQRBSsM0m8l2Ws";
let calendars = [
  {calendarId: "o8ptlkm1n15a6q4pj7as0vlp98@group.calendar.google.com", color: "#ff5e59"}, //add a color field to specify the color of a calendar
];

let styles = {
  //you can use object styles (no import required)
  calendar:{ }
    
  ,
  
  //you can also use emotion's string styles
  today: css`
   /* highlight today by making the text red and giving it a red border */
    color: #ff5e59;
    border: 3px solid #ff5e59;
  `
}

class Event extends React.Component {
  render() {
    return (
      <div className="body-body">
        <Calendar apiKey={API_KEY} calendars={calendars} styles={styles} />
        <EventsListing />
      </div>
    )
  }
}

export default Event;