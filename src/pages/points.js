import React from 'react';
import "../App.css";
import {GlobalContext} from '../Context/GlobalContext'
import {useContext, useState} from 'react'

function Points() {
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

    return (
        <div className="pointspage">
            <h2>Points</h2>

            <div className="leaderboard">
                <div className="left">
                    <h3>Current Points: </h3>
                    <p>{points}</p>
                </div>
                <div className="right">
                    <h3>Ranking:</h3>
                    <p>42%</p>
                </div>

            </div>

            <div className="recentactivity">
                <h3>Recent Activity</h3>

                <ul className="allEntries">
                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                </ul>

            </div>

        </div>
    ); 
}

export default Points;
