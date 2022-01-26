import React, { useState, useEffect } from 'react';
import UserLogin from './UserLogin.jsx';
import "../style.css";
import useAuth from './useAuth.jsx';
const process = require('process');

import SpotifyWebApi from 'spotify-web-api-node';
// import { Buffer } from 'buffer';
// import dotenv from 'dotenv';
// dotenv.config();
// const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=84ccd7f3332a4675a5b760699a2bf2e4&response_type=code&redirect_uri=http://localhost:8080&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-library-read%20user-library-modify';
// import spotify.util as util;
const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=84ccd7f3332a4675a5b760699a2bf2e4&response_type=code&redirect_uri=http://localhost:8080&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-library-read%20user-library-modify';
console.log('auth is ',AUTH_URL);
const spotifyApi = new SpotifyWebApi({
    clientId: `84ccd7f3332a4675a5b760699a2bf2e4`
})


export default function YoutubeUrl({ code }) {


    console.log (code)
    const [feedback, setFeedback] = useState('');
    const [search, setSearch] = useState('');
    const [savespotifyid, setSpotifyID] = useState('');
    const accessToken = useAuth(code);
    console.log('access token is ', accessToken);
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);
   

    function retrieveData() {
        fetch('http://localhost:3000/api/getAllEntries', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => response.json())
          .then((data) => {setFeedback(JSON.stringify(data))})
          .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
    }

    //search parameters in the input box for a track in spotify
    function getSpotifySearch(input) {
        fetch(`https://api.spotify.com/v1/search?query=name%3A${input}&type=album&offset=0&limit=20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+accessToken
            },
          })
          .then((response) => response.json())
          .then((data) => {console.log(data);setFeedback(JSON.stringify(data))})
          .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
    }

    //add track with spotify ID entered into 'spotifyid' to a track on spotify
    function addTrackOnSpotify() {
        fetch('spotify', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => response.json())
          .then((data) => {setFeedback(JSON.stringify(data))})
          .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
    }
    
    return (
        <div>
            <div className="flex-container">
            <form className="flex-form" action='api/addEntry' method="POST">
                <input id = 'youtubeurl' placeholder='put Youtube URL here...'></input>
                <button id='youTubeURLButton'>Save URL to DB</button>
                <input id = 'spotifysearch' onChange={(event)=>{console.log('search values are: ',event.target.value);setSearch(event.target.value)}} placeholder="song info"></input>
                <input id = 'spotifyid' onChange={(event)=>{console.log('input id values are: ',event.target.value);setSpotifyID(event.target.value)}} placeholder="spotify id"></input>
            </form>
            <button id='spotifyLikeButton' onClick={()=>{console.log('clicked search');getSpotifySearch(search)}}>Find Song ID on Spotify</button>
            <button id='spotifyButton' onClick={()=>getSpotifySearch(search)}>Like Song on Spotify</button>
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
