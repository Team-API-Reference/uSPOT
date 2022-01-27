const db = require('../models/userModel');
const uuid = require('uuid');

const recordController = {};

//done
recordController.getrecords = (req, res, next) => {
  const text = `
    SELECT * FROM records
    INNER JOIN users ON records.username = users.username
  ;`;

  db.query(text)
    .then((response) => {
      res.locals.records = response.rows.map((entry) => {
        const { username, youtubeurl, spotifyid } = entry;
        return {
          username,
          youtubeurl,
          spotifyid,
        };
      });
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

//done
recordController.postrecords = (req, res, next) => {
  const text = `INSERT into records (youtubeurl, spotifyid, username) VALUES($1, $2, $3);`;
  const values = [
    req.body.youtubeurl,
    req.body.spotifyid,
    req.body.username,
  ];

  db.query(text, values)
    .then((response) => {
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

recordController.setSessionCookie = (req, res, next) => {
  const session_id = uuid.v4();
  const text = `
    UPDATE users
    SET session_id=$1
    WHERE username=$2
  ;`;
  const values = [session_id, req.body.username];
  db.query(text, values)
    .then((response) => {
      res.cookie('session_id', session_id, {
        httpOnly: true,
        secure: true,
      });
      res.cookie('username', req.body.username);
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

//done
recordController.authorizeSession = (req, res, next) => {
  if (!req.cookies.session_id) {
    return next(new Error('Permission denied'));
  }
  const text = `
    SELECT * FROM users
    WHERE session_id = $1
  ;`;
  values = [req.cookies.session_id];
  db.query(text, values)
    .then((response) => {
      if (response.rows.length) {
        return next();
      } else {
        return next(new Error('Permission denied'));
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

//done
recordController.authorizeSessionForrecord = (req, res, next) => {
  if (!req.cookies.session_id) {
    return next(new Error('Permission denied'));
  }
  const text = `
    SELECT * FROM records
    INNER JOIN users ON records.username = users.username
    WHERE records.id = $1
    AND users.session_id = $2
  ;`;
  values = [req.params.record_id, req.cookies.session_id];
  db.query(text, values)
    .then((response) => {
      if (response.rows.length) {
        return next();
      } else {
        return next(new Error('Permission denied'));
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

module.exports = recordController;