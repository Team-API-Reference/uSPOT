const db = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

//user controller stolen from a prior project as boiler plate which we can update as needed later down the line

userController.createUser = (req, res, next) => {
    console.log('We are in the user controller create user middleware');
    const hash = bcrypt.hashSync(req.body.password, 10)
    console.log("Username: ", req.body.username);
    console.log("Password: ", req.body.password);
    if (!req.body.username || !req.body.password) return next(new Error('Please create an account with correct username and password'));
    const text = `INSERT INTO users(username, passcode, session_id) VALUES($1, $2, $3);`;
    const values = [req.body.username, hash, req.cookies.session_id];
    db.query(text, values)
        .then((response) => {
            return next();
        })
        .catch((err) => {
            console.log(err)
            return next(err)
        })
};

userController.verifyUser = (req, res, next) => {
    console.log('We are in the user controller verify user middleware');
    if (!req.body.username) return next(new Error('Please input a valid username'));
    const text = `SELECT * FROM users WHERE username=$1;`;
    const values = [req.body.username];
    db.query(text, values)
        .then((response) => {
            if (!response.rows.length) {
                return next(new Error('Username not found'))
            }
            const hash = response.rows[0].passcode;
            if (bcrypt.compareSync(req.body.password, hash)) {
                console.log('password is correct')
                return next();
            } else {
                return next(new Error('Password was incorrect'));
            }
        }).catch((err) => {
            console.log(err)
            return next(err)
        })
};


module.exports = userController;