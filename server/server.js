const express = require ('express');
const cookieParser = require('cookie-parser');
const process = require('process');
const path = require('path');
const apiRouter = require('./routes/api');
const PORT = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');
// import SpotifyWebApi from'spotify-web-api-node';
const app = express ();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
if (process.env.NODE_ENV === 'production') {
    app.get('/',
      (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
      }
    );
  
    app.use('/build', express.static(path.resolve(__dirname, '../build')))
  }

app.use('/api', apiRouter);

app.use((req, res) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500).send(`Internal Server Error: ${err.message}`)
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));