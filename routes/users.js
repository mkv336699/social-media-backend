const app = require('express')();
const { getUsers, getUserById, updateUser } = require("./../actions/user");
const profile_pictures = require('../services/multer');
const multer  = require('multer')
const upload = multer({ dest: 'media/profile_pictures' });
const mongoose = require('mongoose');

/* GET users listing. */
app.get('/', function (req, res) {
  getUsers().then(data => {
    res.send({ "status": "SUCCESS", data });
  }).catch(error => {
    res.send({ "status": "FAIL", error });
  });
});

// UPDATE User
app.put('/:username', (req, res) => {
  updateUser(req.body, req.params.username).then(data => {
    res.send({ "status": "SUCCESS", data });
  }).catch(error => {
    res.send({ "status": "FAIL", error });
  });
});

// DELETE User
app.delete('/', (req, res) => {

});

// GET User BY ID
app.get('/:username', (req, res) => {
  getUserById(req.params.username).then(data => {
    res.send({ "status": "SUCCESS", data });
  }).catch(error => {
    res.send({ "status": "FAIL", error });
  });
});

// UPLOAD avatar
app.post('/upload/:username', profile_pictures.single('avatar'), (req, res) => {
  if (req.file) res.json(req.file);
  else throw 'error';
});

app.get('/files/:filename', async (req, res) => {
  try {
      console.log("=========", app.locals.gfs);
      const file = await gfs.files.findOne({ filename: req.params.filename });
      console.log("=========", file);
      if (!file) return res.status(404).json({ error: 'File not found' });

      res.json(file);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
  }
});

module.exports = app;
