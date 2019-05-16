var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('redmine-dashboard-backend');
});

router.get('/cache-minutely', function(req, res, next) {
  require('../jobs/cache-minutely')();
  res.send('cache-minutely');
});
router.get('/cache-hourly', function(req, res, next) {
  require('../jobs/cache-hourly')();
  res.send('cache-hourly');
});
router.get('/cache-daily', function(req, res, next) {
  require('../jobs/cache-daily')();
  res.send('cache-daily');
});

router.get('/init', function(req, res, next) {
  require('../jobs/cache-minutely')();
  require('../jobs/cache-hourly')();
  require('../jobs/cache-daily')();
  res.send('init');
});


module.exports = router;