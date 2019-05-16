var CronJob = require('cron').CronJob;

new CronJob('0 0 7 * * 1-5', require('../jobs/cache-daily'), null, true, 'Asia/Tokyo');
new CronJob('0 0 8-17 * * *', require('../jobs/cache-hourly'), null, true, 'Asia/Tokyo');
new CronJob('0 */2 8-17 * * 1-5', require('../jobs/cache-minutely'), null, true, 'Asia/Tokyo');
