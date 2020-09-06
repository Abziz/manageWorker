
require('dotenv').config();
const firebase = require('firebase-admin');
const serviceAccount = require('./fb-service-account.json');
let config = {
  apiKey: 'AIzaSyDPHPnY-OEUMQ_79r2eFmrSOPN5Ajc-7K0',
  authDomain: 'sacnnershop.firebaseapp.com',
  databaseURL: 'https://sacnnershop.firebaseio.com',
  projectId: 'sacnnershop',
  storageBucket: 'sacnnershop.appspot.com',
  messagingSenderId: '743639413044',
  appId: '1:743639413044:web:f7010c06eb14558a79b561',
  measurementId: 'G-0DCJTMZR0J'
};
firebase.credential.cert(serviceAccount);
firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: config.databaseURL
});

const express = require('express');

const app = express();
const path  = require('path');
let fs = require('fs');

// parse form data when received
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
// build multiple CRUD interfaces:
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'html', 'index.html'));
});
app.get('/user-info', async (req, res) => {
  const user = await firebase.auth().getUser('8mKr0oLjicbSZXy5QDkv9wYM4d62');
  const root = firebase.database().ref('/');

  // const user = await firebase.auth().verifyIdToken('8mKr0oLjicbSZXy5QDkv9wYM4d62');
  res.send(user.toJSON());
});

// fetch('/add-worker', { method:'POST',body:JSON.stringify()})
app.post('/add-worker', async (req, res)=>{
  if ( req.body.email && req.body.password) {
    const user = await firebase.auth().createUser({
      email:req.body.email,
      password:req.body.password,
    }); 
    res.send(user.toJSON());   
  } else {
    res.status(400).end();
  }
});
async function authorize(req, res, next) {
  const tokenId = req.headers['firebase-token-id'];
  const user = await firebase.auth().verifyIdToken(tokenId);
  req.user = user;
  req.user.claims =  (await firebase.auth().getUser(user.uid)).customClaims;
}
function onlyAdmin(req,res,next){
 
  if( req.user.customClaims.isAdmin ){
    next();
  }
}
app.get('/sales', async (req, res)=>{
  const tokenId = req.headers['firebase-token-id'];
  const user = await firebase.auth().verifyIdToken(tokenId);
  
 
  firebase.auth().setCustomUserClaims(user., {
    isAdmin:true
  });
  (await firebase.auth().getUser(user.uid));
  const dbref = firebase.database().ref(`/sales/${user.uid}`);

  
});


app.get('/worker', (req, res) => {
  fs.readFile(__dirname + 'html/workerPage.html', null, (error, data) => {
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
  fs.readFile(__dirname + 'html/forgotPass.html', null, (error, data) => {
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
  fs.readFile(__dirname + 'html/index.html', null, (error, data) => {
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
  fs.readFile(__dirname + 'html/signup.html', null, (error, data) => {
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
     
app.listen(process.env.PORT, ()=>{
  console.log('server is running http://localhost:3000');
});
// const express = require("express");
// const admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://sacnnershop.firebaseio.com"
// });