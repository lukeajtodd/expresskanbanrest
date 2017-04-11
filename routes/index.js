var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/api/tasks', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/db/tasks.json'));
});

router.post('/api/tasks', function(req, res, next) {
  let dbPath = path.join(__dirname + '/db/tasks.json');
  console.log(typeof req.body);
  fs.truncate(dbPath, 0, () => {
    fs.writeFile(dbPath, JSON.stringify(req.body), (err) => {
      if (err) return console.log(err);
    });
  });
});

module.exports = router;
