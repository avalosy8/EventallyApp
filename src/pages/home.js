import React from 'react';
import "../App.css";
import "../styles/home.css";
import {GlobalContext} from '../Context/GlobalContext'
import {useContext, useState} from 'react'

import slide1 from '../Components/images/slideshow/1.jpg';
import slide2 from '../Components/images/slideshow/2.jpg';
import slide3 from '../Components/images/slideshow/3.jpg';
import slide4 from '../Components/images/slideshow/4.jpg';

function Home() {
    const {user, updateUser} = useContext(GlobalContext);
    const [points, setPoints] = useState(0);

    const { v4: uuidv4 } = require('uuid'); 
    uuidv4();
    const AWS = require("aws-sdk");
    AWS.config.update ({
      region: "us-east-1",
      accessKeyId: "AKIAXJ3VTSS354FEHLFV",
      secretAccessKey: "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"  
    });
    
    const dynamodb = new AWS.DynamoDB.DocumentClient(); 

    async function getPoints()
    {
        try {
            var params = {};
            params.TableName = "Points";
            params.Key = {
                PointsId: user.attributes.sub
            };
            console.log('getPoints user.attributes.sub: ', user.attributes.sub)
            var result = await dynamodb.get(params).promise();
            if(!result)
                setPoints(0);
            else
                setPoints(result.Item.Points);
            console.log('Points data: ', result)
        } catch (error) {
            console.log(error);
        }
    }   
    
    getPoints()

    var counter = 1;
    setInterval(function(){
        var element = document.getElementById('radio' + counter);
        if (element !== null && element.checked === true) {
            counter++;
            if(counter > 4){
                counter = 1;
            }
        }
        else if (element !== null) {
            element.checked = true;
        }
        else {
            setTimeout(setInterval, 10000);
        }        
    }, 5000);

    return (
        <div className="Main">
            <div className="body-left">
                <div className="slider">
                    <div className="slides">
                        <input type="radio" name="radio-btn" id="radio1" />
                        <input type="radio" name="radio-btn" id="radio2" />
                        <input type="radio" name="radio-btn" id="radio3" />
                        <input type="radio" name="radio-btn" id="radio4" />

                        <div className="slide first">
                            <img src={slide1} alt="me and the girlies are graduating!!!!" />
                        </div>
                        <div className="slide">
                            <img src={slide2} alt="me studying with my friends" />
                        </div>
                        <div className="slide">
                            <img src={slide3} alt="me teaching some class" />
                        </div>
                        <div className="slide">
                            <img src={slide4} alt="me and the girls staring at the sun" />
                        </div>

                        <div className="navigation-auto">
                            <div className="auto-btn1"></div>
                            <div className="auto-btn2"></div>
                            <div className="auto-btn3"></div>
                            <div className="auto-btn4"></div>
                        </div>
                    </div>

                    <div className="navigation-manual">
                        <label htmlFor="radio1" className="manual-btn"></label>
                        <label htmlFor="radio2" className="manual-btn"></label>
                        <label htmlFor="radio3" className="manual-btn"></label>
                        <label htmlFor="radio4" className="manual-btn"></label>
                    </div>
                </div>

            </div>


            <div className="body-right">
                <h2>Welcome back<br />to <span>WECE</span>.</h2>
                <p>WECE is a student-run, diversity-focused organization whose purpose is to foster community among <span>women in the Electrical and Computer Engineering (ECE) fields</span> at the University of Florida.</p>
                <div className="pointsbox">
                    <h3>Current Points: <br /><span>{points}</span></h3>
                    <label htmlFor="eventCode">Enter Event Code:</label> <br />
                    <input type="text" id="eCode" name="eCode" /> <br />
                    <input type="submit" value="Validate" />

                </div>
            </div>
            
        </div>
    );
     
}

export default Home;