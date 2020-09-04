const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 80;

let options = {
  dotfiles: 'ignore', //allow, deny, ignore
  etag: true,
  extensions: ['htm', 'html'],
  index: false, //to disable directory indexing
  maxAge: '7d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    //add this header to all static responses
    res.set('x-timestamp', Date.now());
  }
};
app.use('/static', express.static('public', options));
//app.use(express.static('public', options));
//you can use https://favicon.io/favicon-generator/ to create the favicon.ico

app.get('/', (req, res) => {
  //let img = `<img src="/img/cotton-candy.gif"/>`;
  //let secret = `<a href="/.htaccess">secret</a>`;

  //let html = '<!Doctype html><html><head><title>Sample</title></head>';
  //html += '<body><h1>Sample HTML</h1><main></main></body></html>';
  //res.send(html);
  res.sendFile(process.cwd() + '/public/index1.html', err => console.log);
  //res.sendFile('D:/project/Git/manageWorker/public/index1.html', err => console.log);
});

app.get('/login', (req, res) => {
  //let img = `<img src="/img/cotton-candy.gif"/>`;
  //let secret = `<a href="/.htaccess">secret</a>`;

  //let html = '<!Doctype html><html><head><title>Sample</title></head>';
  //html += '<body><h1>Sample HTML</h1><main></main></body></html>';
  //res.send(html);
  res.sendFile(process.cwd() + '/public/index2.html', err => console.log);
});

app.listen(port, err => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`app listenning at http://${hostname}:${port}`);
});

/*
app.use ((req, res, next) => {
  if (req.method == 'GET') {
    res.send('homepage1');
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('homepage2');
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('page not found');
});

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('/index1.html');
});
app.get('/score', (req, res) => {
  res.send('/index2.html');
});

app.listen(port, hostname, () => console.log(`app listenning at http://${hostname}:${port}`));
*/
