// import * as functions from 'firebase-functions';

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
let fs = require('fs');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

// The Firebase Admin SDK to access Cloud Firestore.

const functions = require('firebase-functions');
const express = require('express');
const { response } = require('express');
const app = express();

// build multiple CRUD interfaces:
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  fs.readFile(__dirname + '/index2.html', null, (error, data) => {
    if (error) {
      res.writeHead(404);
      // eslint-disable-next-line no-undef
      res.write('Whoops! File not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
});

app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});
     
exports.app = functions.https.onRequest(app);
