import React from 'react';
import "./style.css";
import YoutubeUrl from './containers/YoutubeUrl.jsx';

const process = require('process');

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {
  if (code){
    return (
      <div> 
      <h1>uSpot: The Music Tracking App</h1>
      <YoutubeUrl code = {code}/>
      </div>
    );
  } else {
    return (
      <div> 
      <h1>uSpot: The Music Tracking App</h1>
      <YoutubeUrl />
      </div>
    );
  }
}

export default App;