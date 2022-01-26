import React, { useState, useEffect } from 'react';
import UserLogin from './userLogin.jsx';


export default function YoutubeUrl() {
    const [feedback, setFeedback] = useState('');




    function spotifyHandler() {
        
    }

    function retrieveData() {
        fetch('/api/getAllEntries', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => response.json())
          .then((data) => {setFeedback(JSON.stringify(data))})
          .catch((err) => console.log(err));
    }

    return (
        <div>
            <form action='api/addEntry' method="POST">
                <input id = 'youtubeurl' placeholder='put Youtube URL here...'></input>
                    <button id='youTubeURLButton'>Save URL to DB</button>
                <br />
                    <input id = 'spotifyid' placeholder="song info"></input>
                <button id='spotifyButton'>Like Song on Spotify</button>
            </form>
            <UserLogin />
            <button onClick = {spotifyHandler}>Connect to Spotify</button>
            <button onClick = {retrieveData}>Retrieve saved songs...</button>
            <div id='feedback'>
                {feedback}
            </div>
        </div>
    );
}
