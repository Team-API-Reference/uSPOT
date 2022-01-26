const db = require('../models/userModel');
const uuid = require('uuid');

const recordController = {};

//done
recordController.getrecords = (req, res, next) => {
  console.log('We are in the get records controller');
  const text = `
    SELECT * FROM records
    INNER JOIN users ON records.username = users.username
  ;`;
//   const text = `
//   SELECT * FROM records
//   INNER JOIN users ON records.username = users.username
//   ORDER BY records.id ASC
// ;`;
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
  console.log('We are in the post records controller');
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

//don't need this
recordController.updaterecord = (req, res, next) => {
  console.log('We are in the update record controller');
  console.log(req.body);
  const text = `UPDATE records SET content=$1, edit=$2 WHERE id=$3;`; //needs to be update
  const creation_date = new Date().toLocaleString();
  const values = [req.body.content, creation_date, req.params.record_id];

  db.query(text, values)
    .then((response) => {
      res.locals.updatedrecord = response.rows;
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

//don't use this
recordController.deleterecord = (req, res, next) => {
  console.log('We are in the delete record controller');
  const text = `DELETE FROM records WHERE id=$1;`;
  const values = [req.params.record_id];

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

 recordController.triggerAPI = (req, res, next) => {
   
 };

async function findSongs(token, search_query) {

  let result = await api.request({
      method: "get",
      url: "https://api.spotify.com/v1/search",
      headers: { 'Authorization': 'Bearer ' + token },
      params: { 'q': search_query, 'type': 'track' }
  }).catch(async function handleError(err) {
      console.log(err)
      let refreshed_token = await refreshToken(username)
      let result_new = await findSongs(username, refreshed_token, search_query)
      console.log(result_new)
      setFeedback(result_new);
      return result_new.data.tracks

  })
  return result.data.tracks

}


module.exports = recordController;