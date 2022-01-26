import React, { useState, useEffect } from 'react';
import UserLogin from './userLogin.jsx';


export default function YoutubeUrl() {
    const [feedback, setFeedback] = useState('');

    const spotifyHandler =  () => {
        // window.open('http://localhost:8080/api/auth', '_self')
        fetch ('http://localhost:8080/api/auth', {
            method: 'GET',
            // headers: {
            // 'Content-Type': 'application/json',
            // }
        })
        .then((data) => {
            console.log ('data received', data)
                return data
            })
    }

    return (
        <div>
            <div id='feedback'>
                {feedback}
            </div>
            <form action='api/addEntry' method="POST">
                <input id = 'youtubeurl' placeholder='put Youtube URL here...'></input>
                    <button id='youTubeURLButton'>Save URL to DB</button>
                <br />
                    <input id = 'spotifyid' placeholder="song info"></input>
                <button id='spotifyButton'>Like Song on Spotify</button>
            </form>
            <UserLogin />
            <button onClick = {spotifyHandler}>Connect to Spotify</button>
            <div id='feedback'>
                {feedback}
            </div>
        </div>
    );
}
