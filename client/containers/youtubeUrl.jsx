import React, { useState, useEffect } from 'react';
import UserLogin from './userLogin.jsx';
import "../style.css";
// import { Buffer } from 'buffer';


// import spotify.util as util;

export default function YoutubeUrl() {
    const [feedback, setFeedback] = useState('');

    function spotifyHandler() {
        const username = 'your-spotify-username'
        //client id and secret would normally be specified here but are in .env
        const redirect_uri = 'http://localhost:3000/callback'
        const scope = 'user-read-recently-played'
        const token = util.prompt_for_user_token(username=username, 
                                           scope=scope, 
                                           client_id=client_id,   
                                           client_secret=client_secret,     
                                           redirect_uri=redirect_uri)
        // let refreshed_token = 'BQAT9aVvLlEESBd5oAaerkSS9OO75p1YxjvIny0x-iog-8WZyyQZdeJPf1sFuPjk4HQslAYtUr0WKQ1sSadzDOVjkIiafrTEu34IGRxk9dGX7Bdgbr_ybw3ZUScAjK1cTA0af3fWeUP5ZjJ8ZKNGVtht60bf61OLoQ';
        let { trackName, artist} = req.body;
        const search_query = {'q': trackName,'artist': artist, 'type': 'track, artist', };
        fetch({
            method: "get",
            url: "https://api.spotify.com/v1/search",
            headers: { 'Authorization': 'Bearer ' + token },
            params: { 'q': search_query, 'type': 'track' }
            })
            .then((response) => response.json)
            .then((result) => {
            const firstResult = result['tracks']['items'][0];
            const track_id = firstResult['id'];
            res.locals.trackID = track_id;
            return next();
            })
            .catch(err => {
            console.log(err);
            return next(err);
            })
    };        

    function retrieveData() {
        fetch('/api/getAllEntries', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => response.json())
          .then((data) => {setFeedback(JSON.stringify(data))})
          .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
    }
    
    return (
        <div>
            {/* <box style={{ display: 'flex' }}> */}
            <div className="flex-container">
            <form action='api/addEntry' method="POST">
                <input id = 'youtubeurl' placeholder='put Youtube URL here...'></input>
                <button id='youTubeURLButton'>Save URL to DB</button>
                {/* <br /> */}
                <input id = 'spotifyid' placeholder="song info"></input>
                <button id='spotifyButton'>Like Song on Spotify</button>
            </form>
            <UserLogin setFeedback = {setFeedback} />
            <button onClick = {spotifyHandler}>Connect to Spotify</button>
            <button onClick = {retrieveData}>Retrieve saved songs...</button>
            <div id='feedback'>
                {feedback}
            </div>
            </div>
        </div>
    );
}
