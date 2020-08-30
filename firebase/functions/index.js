const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { response } = require('express');
const app = express();
let fs = require('fs');
// build multiple CRUD interfaces:
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  fs.readFile(__dirname + '/index.html', null, (error, data) => {
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

app.get('/worker', (req, res) => {
  fs.readFile(__dirname + '/workerPage.html', null, (error, data) => {
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

app.get('/forgotPass', (req, res) => {
  fs.readFile(__dirname + '/forgotPass.html', null, (error, data) => {
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

app.get('/login', (req, res) => {
  fs.readFile(__dirname + '/index.html', null, (error, data) => {
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

app.get('/signup', (req, res) => {
  fs.readFile(__dirname + '/signup.html', null, (error, data) => {
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

// const express = require("express");
// const admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://sacnnershop.firebaseio.com"
// });