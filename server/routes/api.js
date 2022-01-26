const express = require('express');
const userController = require('../controllers/userController');
const recordController = require('../controllers/recordController');
const SpotifyWebApi = require('spotify-web-api-node');
//import controllers here
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const router = new express.Router();

router.post("/auth", (req, res) => {
  const code = req.body.code;
  console.log('working')
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8080',
    clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
    clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`
  })
  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch((err) => {
    console.log(err);
    res.sendStatus(400);
  })
  })

router.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: `${process.env.SPOTIFY_CLIENT_ID}`,
    clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
    refreshToken
  })

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
      console.log(data.body)
      // console.log('The access token has been refreshed!');

      // // Save the access token so that it's used in future calls
      // spotifyApi.setAccessToken(data.body['access_token']);
    }).catch(() => {
      res.sendStatus(400)
    });
});
//   const state = generateRandomString(16);
//   const scope = 'user-read-private';
//   console.log ('router.get/auth let the request begin');

//   res.redirect('https://accounts.spotify.com/authorize?' +
//   querystring.stringify({
//     response_type: 'code',
//     client_id: `${process.env.SPOTIFY_CLIENT_ID}`,
//     scope: scope,
//     redirect_uri: 'http://localhost:3000/api/auth/callback',
//     state: state
//   }));
// });

router.get("/auth/callback", (req, res) => {
  //send fetch request with username and password
  console.log('endpoint reached');
  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
    querystring.stringify({
      error: 'state_mismatch'
    }));
  } else {
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: 'http://localhost:3000/api/auth/callback',
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic ' + (new (process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      json: true
      };
    }
});

router.get('/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new (process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

router.get("/", (req, res) => {
    return res.status(200).json("Endpoint reached");
  });

  router.get("/getAllEntries", 
//   recordController.authorizeSession,
  recordController.getrecords,
  (req, res) => {
    return res.status(200).json(res.locals.records);
  });

router.post("/addEntry", 
  //call controller here: 
//   recordController.authorizeSession,
  recordController.postrecords,
  (req, res) => {
  return res.status(200).json();
});

// don't need
router.put("/updateEntry", 
  //call controller here: UNIMPLEMENTED
  recordController.authorizeSessionForrecord,
  recordController.updaterecord,
  (req, res) => {
  return res.status(200).json();
});

// don't need
router.delete("/deleteEntry", 
  //call controller here
  recordController.authorizeSessionForrecord,
  recordController.deleterecord,
  (req, res) => {
  return res.status(200).json();
});

// login to account
router.post("/login", 
userController.verifyUser,
recordController.setSessionCookie,
(req, res) => {
  return res.status(200).json();
});

// create an account
router.post(
  "/signup",
  userController.createUser,
  recordController.setSessionCookie,
  (req, res) => {
    return res.status(200).json();
  }
);

module.exports = router;