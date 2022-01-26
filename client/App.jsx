import React from 'react';
import "./style.css";
import YoutubeUrl from './containers/YoutubeUrl.jsx';
// import dotenv from 'dotenv';
// dotenv.config();
const process = require('process');
// const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=&response_type=code&redirect_uri=http://localhost:3000&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-library-read%20user-library-modify';

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {
  console.log (code);
  if (code){
    return (
      <div> 
      <h1>Uspot: The Music Tracking App</h1>
      <YoutubeUrl code = {code}/>
      </div>
    );
  } else {
    return (
      <div> 
      <h1>Uspot: The Music Tracking App</h1>
      <YoutubeUrl />
      </div>
    );
  }
}

export default App;