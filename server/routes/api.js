const express = require('express');
const userController = require('../controllers/userController');
const recordController = require('../controllers/recordController');

//import controllers here

const router = new express.Router();

router.get("/", (req, res) => {
    return res.status(200).json("Endpoint reached");
  });

  router.post("/addEntry", 
  //call controller here: 
  recordController.authorizeSession,
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