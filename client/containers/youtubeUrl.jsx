import React from 'react';



export default function YoutubeUrl() {
    return (
        <div>
            <form>
                <textarea defaultValue="put youtube URL here"></textarea>
                <button id='youTubeURLButton'>Save URL to DB</button>
                <br />
                <textarea defaultValue="song info"></textarea>
        <button id='spotifyButton'>Like Song on Spotify</button>
        </form>
        </div>
    );
}

