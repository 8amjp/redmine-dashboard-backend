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
    request({ url: `${base_url}issues.json?status_id=o`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=*`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=o&created_on=t`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=*&created_on=t`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=o&start_date=t`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=*&start_date=t`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=o&due_date=t`, headers: headers, json: true }),
    request({ url: `${base_url}issues.json?status_id=*&due_date=t`, headers: headers, json: true }),
  ])
  .then(function(response){
    writeFile('issues.status_id-open.json', response[0]);
    writeFile('issues.status_id-all.json', response[1]);
    writeFile('issues.status_id-open.created_on-today.json', response[2]);
    writeFile('issues.status_id-all.created_on-today.json', response[3]);
    writeFile('issues.status_id-open.start_date-today.json', response[4]);
    writeFile('issues.status_id-all.start_date-today.json', response[5]);
    writeFile('issues.status_id-open.due_date-today.json', response[6]);
    writeFile('issues.status_id-all.due_date-today.json', response[7]);
  });
};

function writeFile(file, data) {
  fs.writeFile(path.join('public', file), JSON.stringify(data, undefined, 4), 'utf8', function (err) {
    if (err) throw err;
  })
}