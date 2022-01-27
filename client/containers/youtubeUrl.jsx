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
// console.log('auth is ',AUTH_URL);
const spotifyApi = new SpotifyWebApi({
    clientId: `84ccd7f3332a4675a5b760699a2bf2e4`
})


export default function YoutubeUrl({ code }) {


    let searchresults = [];
    const [feedback, setFeedback] = useState('');
    const [search, setSearch] = useState('');
    const [savespotifyid, setSpotifyID] = useState('');
    const [saveyoutubeurl, setYoutubeURL] = useState('');
    const [username, setUsername] = useState('');
    const [cachedToken, setCachedToken] = useState('');
    
    const accessToken = useAuth(code);
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);
   
    
    //connect automatically?
    // useEffect(() => {
    // fetch(AUTH_URL, {
    //     method: 'GET',
    //     header: {
    //         "Access-Control-Allow-Origin": true
    //     }
    //   })
    // },[]);
    // window.location(AUTH_URL)

    function retrieveData() {
        fetch('http://localhost:3000/api/getAllEntries', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => response.json())
          .then((data) => {setFeedback(JSON.stringify(data))})
          .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
    }

    function saveData() {
        setUsername('test');
        fetch('http://localhost:3000/api/addEntry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                youtubeurl: saveyoutubeurl,
                spotifyid: savespotifyid,
                username: 'test',
            })
          })
          .then((data) => {setFeedback('Record saved!')})
          .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
    }

    //search parameters in the input box for a track in spotify
    function getSpotifySearch(input) {
        let currentToken = accessToken
        if (!accessToken){
            currentToken = cachedToken;
        }
        console.log(currentToken);
        let type='album';
        let typeOptions = prompt("Please choose one of the following: album, artist, playlist, track");
        switch(typeOptions) {
            case "album":
                type = "album";
            break;
            case "artist":
                type = "artist";
            break;
            case "playlist":
                type = "playlist";
            break;
            case "track":
                type = "track";
        }
        fetch(`https://api.spotify.com/v1/search?query=${input}&type=${type}&offset=0&limit=20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+currentToken
            },
          })
          .then((response) => response.json())
          .then((data) => {
              data[type+"s"].items.forEach(element => {
                searchresults.push({ name: element.name, spotify_id: element.id })
              })
              setFeedback(JSON.stringify(searchresults));
            })
          .catch((err) => {console.log(err, data);setFeedback('Error: Invalid credentials')});
    }

    //add track with spotify ID entered into 'spotifyid' to a track on spotify
    function addTrackOnSpotify() {
        let currentToken = accessToken || cachedToken;
        console.log(currentToken);
        fetch('spotify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+currentToken
            },
          })
          .then((response) => response.json())
          .then((data) => {setFeedback(JSON.stringify(data))})
          .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
    }
    
    return (
        <div>
            <div className="flex-container">
            <form className="flex-form" action='http://localhost:3000/api/addEntry' method="POST">
                <input id = 'youtubeurl' onChange={(event)=>{setYoutubeURL(event.target.value)}} placeholder='put Youtube URL here...'></input>
                <input id = 'spotifysearch' onChange={(event)=>{setSearch(event.target.value)}} placeholder="song info"></input>
                <input id = 'spotifyid' onChange={(event)=>{setSpotifyID(event.target.value)}} placeholder="spotify id"></input>
            </form>
            <button id='youTubeURLButton' onClick={saveData}>Save URL to DB</button>
            <button id='spotifyLikeButton' onClick={()=>{getSpotifySearch(search)}}>Find on Spotify</button>
            <button id='spotifyButton' onClick={()=>getSpotifySearch(search)}>Like Song on Spotify</button>
            <UserLogin setFeedback = {setFeedback} setCachedToken = {setCachedToken} />
            <a href={AUTH_URL}>Connect to Spotify</a>
            <button onClick = {retrieveData}>Retrieve saved songs...</button>
            <div id='feedback'>
                {feedback}
            </div>
            </div>
        </div>
    );
}
