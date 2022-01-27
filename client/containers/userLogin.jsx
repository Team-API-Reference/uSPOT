import React, { useState, useEffect } from 'react';

export default function UserLogin(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(username, password){
        //send fetch request with username and password
        fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password}),
          headers: { 'Content-Type': 'application/json' },
        })
        // .then((data) => {console.log(data);})
        .then((data) => {
          if (data.status - 200 > 50) {
            props.setFeedback('Login Failure: Invalid credentials') 
            alert('Login Failure: Invalid credentials');
          }
            else {
              props.setFeedback('Login successful!')
              alert('Login successful');
            }
        })
        .catch((err) => {console.log(err);
          props.setFeedback('Error: Invalid credentials')
        });
      }

      function handleSignup(username, password){
        //send fetch request with username and password
        fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password}),
          headers: { 'Content-Type': 'application/json' },
        })
        // .then((data) => {console.log(data);})
        .then((data) => {
          if (data.status - 200 > 50) {
            props.setFeedback('Signup Failure: Invalid credentials') 
          }
            else {
              props.setFeedback('Account successfully created! :)')
            }
        })
        .catch((err) => {console.log(err);
          props.setFeedback('Error: Invalid credentials')
        });
      }

    return (
        <div>
            <input type="password" placeholder='Access Token' id="cachedtoken" onChange= {(event) => {props.setCachedToken(event.target.value) }}></input>
            <input type="text" placeholder='Username' id="username" onChange= {(event) => {setUsername(event.target.value) }}></input>
            <input type="password" placeholder='Password' id="password" onChange={(event) => {setPassword(event.target.value) }}></input>
            <button onClick={() => { handleSubmit(username, password) }}>Login</button>
            <button onClick={() => { handleSignup(username, password) }}>Sign-up</button>
            <button>Signout</button>
        </div>
    )
}