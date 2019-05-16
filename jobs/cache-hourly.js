require('dotenv').config();
const path = require('path');
const fs = require('fs');
const request = require('request-promise-native');
const headers = {
  "Content-Type": "application/json",
  "X-Redmine-API-Key": process.env.REDMINE_API_KEY
};
const base_url = process.env.REDMINE_API_BASE_URL;

module.exports = function() {
  Promise.all([
    request({ url: `${base_url}issues.json?status_id=o&tracker_id=1`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=o&tracker_id=2`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=o&tracker_id=3`, headers: headers, json: true }),

    request({ url: `${base_url}issues.json?status_id=1`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=2`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=3`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=4`, headers: headers, json: true }),

    request({ url: `${base_url}issues.json?status_id=o&&priority_id=3,4,5`, headers: headers, json: true }),

    request({ url: `${base_url}issues.json?status_id=*&updated_on=t`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=*&closed_on=t`, headers: headers, json: true }),
  ])
  .then(function(response){
    writeFile('issues.status_id-open.tracker_id-1.json', response[0]);
    writeFile('issues.status_id-open.tracker_id-2.json', response[1]);
    writeFile('issues.status_id-open.tracker_id-3.json', response[2]);

    writeFile('issues.status_id-1.json', response[3]);
    writeFile('issues.status_id-2.json', response[4]);
    writeFile('issues.status_id-3.json', response[5]);
    writeFile('issues.status_id-4.json', response[6]);

    writeFile('issues.status_id-open.priority_id-3,4,5.json', response[7]);

    writeFile('issues.status_id-all.updated_on-today.json', response[8]);
    writeFile('issues.status_id-all.closed_on-today.json', response[9]);
  });
};

function writeFile(file, data) {
  fs.writeFile(path.join('public', file), JSON.stringify(data, undefined, 4), 'utf8', function (err) {
    if (err) throw err;
  })
}