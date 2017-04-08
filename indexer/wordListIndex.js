const fs = require('fs');
const mapSeries = require('async/mapSeries');
const md5 = require('md5');
const firebaseAdminDb = require('./firebaseApi');

const words = fs.readFileSync(`${__dirname}/static/words.txt`, 'utf8').split('\n');

const updatesArray = [];
let updates = {};
let i;
for (i = 1; i <= words.length; i++) {
  const path = 'words';
  const field = 'name';
  const value = words[i];
  const newPostKey = md5(String(value));
  const word = {
    [field]: value,
  };
  updates[`${path}/${newPostKey}`] = word;
  if (i % 1000 === 0) {
    updatesArray.push(updates);
    updates = {};
  }
}

const callback = () => {
  console.log('Processed chunk');
};

mapSeries(
  updatesArray,
  (values, callb) =>
    firebaseAdminDb.firebaseAdminDb.update(values).then(() => {
      callb();
    }),
  callback
);
