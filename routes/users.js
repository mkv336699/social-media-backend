const app = module.exports = require('express')();
const { getUsers, getUserById, updateUser } = require("./../actions/user");

const profile_pictures = require('../services/multer');

/* GET users listing. */
app.get('/', function (req, res) {
  getUsers().then(data => {
    res.send({ "status": "SUCCESS", data });
  }).catch(error => {
    res.send({ "status": "FAIL", error });
  });
});

app.put('/:username', (req, res) => {
  updateUser(req.body, req.params.username).then(data => {
    res.send({ "status": "SUCCESS", data });
  }).catch(error => {
    res.send({ "status": "FAIL", error });
  });
});

app.delete('/', (req, res) => {

});

app.get('/:username', (req, res) => {
  getUserById(req.params.username).then(data => {
    res.send({ "status": "SUCCESS", data });
  }).catch(error => {
    res.send({ "status": "FAIL", error });
  });
});

app.post('/upload/:username', profile_pictures.single('photo'), (req, res) => {
  if (req.file) res.json(req.file);
  else throw 'error';
});

module.exports = app;
