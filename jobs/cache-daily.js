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
    request({ url: `${base_url}projects.json`, headers: headers, json: true }),
    request({ url: `${base_url}trackers.json`, headers: headers, json: true }),
    request({ url: `${base_url}issue_statuses.json`, headers: headers, json: true }),
    request({ url: `${base_url}enumerations/issue_priorities.json`, headers: headers, json: true }),
    request({ url: `${base_url}custom_fields.json`, headers: headers, json: true }),
  ])
  .then(response => {
    writeFile('projects.json', response[0]);
    writeFile('trackers.json', response[1]);
    writeFile('issue_statuses.json', response[2]);
    writeFile('issue_priorities.json', response[3]);
    writeFile('custom_fields.json', response[4]);
  });
};

function writeFile(file, data) {
  fs.writeFile(path.join('public', file), JSON.stringify(data, undefined, 4), 'utf8', function (err) {
    if (err) throw err;
  })
}