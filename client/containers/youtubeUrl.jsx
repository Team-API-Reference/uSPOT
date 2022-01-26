import React, { useState, useEffect } from 'react';
import UserLogin from './UserLogin.jsx';
import "../style.css";
import useAuth from './useAuth.jsx';
const process = require('process');

import SpotifyWebApi from 'spotify-web-api-node';
// import { Buffer } from 'buffer';
// import dotenv from 'dotenv';
// dotenv.config();
const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=84ccd7f3332a4675a5b760699a2bf2e4&response_type=code&redirect_uri=http://localhost:8080&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-library-read%20user-library-modify';
// import spotify.util as util;

const spotifyApi = new SpotifyWebApi({
    clientId: `84ccd7f3332a4675a5b760699a2bf2e4`
    // clientId: `${process.env.SPOTIFY_CLIENT_ID}`
})


export default function YoutubeUrl({ code }) {
    console.log (code)
    const [feedback, setFeedback] = useState('');
    const accessToken = useAuth(code);

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);

    // function spotifyHandler() {
    //     const username = 'your-spotify-username'
    //     //client id and secret would normally be specified here but are in .env
    //     const redirect_uri = 'http://localhost:3000/callback'
    //     const scope = 'user-read-recently-played'
    //     const token = util.prompt_for_user_token(username=username, 
    //                                        scope=scope, 
    //                                        client_id=client_id,   
    //                                        client_secret=client_secret,     
    //                                        redirect_uri=redirect_uri)
    //     // let refreshed_token = 'BQAT9aVvLlEESBd5oAaerkSS9OO75p1YxjvIny0x-iog-8WZyyQZdeJPf1sFuPjk4HQslAYtUr0WKQ1sSadzDOVjkIiafrTEu34IGRxk9dGX7Bdgbr_ybw3ZUScAjK1cTA0af3fWeUP5ZjJ8ZKNGVtht60bf61OLoQ';
    //     let { trackName, artist} = req.body;
    //     const search_query = {'q': trackName,'artist': artist, 'type': 'track, artist', };
    //     fetch({
    //         method: "get",
    //         url: "https://api.spotify.com/v1/search",
    //         headers: { 'Authorization': 'Bearer ' + token },
    //         params: { 'q': search_query, 'type': 'track' }
    //         })
    //         .then((response) => response.json)
    //         .then((result) => {
    //         const firstResult = result['tracks']['items'][0];
    //         const track_id = firstResult['id'];
    //         res.locals.trackID = track_id;
    //         return next();
    //         })
    //         .catch(err => {
    //         console.log(err);
    //         return next(err);
    //         })
    // };        

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
            <form className="flex-form" action='api/addEntry' method="POST">
                <input id = 'youtubeurl' placeholder='put Youtube URL here...'></input>
                <button id='youTubeURLButton'>Save URL to DB</button>
                <input id = 'spotifyid' placeholder="song info"></input>
                <button id='spotifyButton'>Like Song on Spotify</button>
            </form>
            <UserLogin setFeedback = {setFeedback} />
            <a href={AUTH_URL}>Connect to Spotify</a>
            <button onClick = {retrieveData}>Retrieve saved songs...</button>
            <div id='feedback'>
                {feedback}
            </div>
            </div>
        </div>
    );
}
