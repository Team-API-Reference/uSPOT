import React, { useState, useEffect } from 'react';

export default function UserLogin(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(username, password){
        //send fetch request with username and password
        fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password}),
          headers: { 'Content-Type': 'application/json' },
        })
        // .then((data) => {console.log(data);})
        .then((data) => {
          if (data.status === 500) {
            props.setFeedback('Login Failure: Invalid credentials') 
          }
            else {
              props.setFeedback('Login successful!')
            }
        })
        .catch((err) => {console.log(err);setFeedback('Error: Invalid credentials')});
      }

    return (
        <div>
            <input type="text" placeholder='Username' id="username" onChange= {(event) => {setUsername(event.target.value) }}></input>
            <br/>
            <input type="text" placeholder='Password' id="password" onChange={(event) => {setPassword(event.target.value) }}></input>
            <button onClick={() => { handleSubmit(username, password) }}>Login</button>
            <button>Signout</button>
        </div>
    )
}