var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/tasks', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/db/tasks.json'));
});

router.post('/api/tasks', function(req, res, next) {
  let dbPath = path.join(__dirname + '/db/tasks.json');
  let backupPath = path.join(__dirname + '/db/backup.json');
  fs.truncate(dbPath, 0, () => {
    fs.writeFile(dbPath, JSON.stringify(req.body), (err) => {
      if (err) return console.log(err);
    });
  });
  if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
    fs.truncate(backupPath, 0, () => {
      fs.writeFile(backupPath, JSON.stringify(req.body), (err) => {
        if (err) return console.log(err);
      });
    });
  }
});

module.exports = router;
