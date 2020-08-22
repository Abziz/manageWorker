// const http = require('http');
// const hostname = '127.0.0.1';
// const port = '80';


// const server = http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   let method = req.method;
//   let result = {
//     Message: `I got a request with: ${method}`,
//     Path: `${hostname}:${port}${req.url}`
//   };
//   res.statusCode = 200;
//   console.log(`request recieved to ${req.url}`);
//   if (method == 'GET' && req.url.toLowerCase() == '/aviv') {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html><body><h1>weizman</h1> yess</body></html>');
    
//   } else {
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(result));  
//   }
  
  
// });
// server.listen(port, hostname, () => {
//   console.log(`server running at http://${hostname}:${port}/`);
// });




const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 80;


app.use( (req, res) => {
  let result = {
    Message: `I got a request with: ${req.method}`,
    Path: `${hostname}:${port}${req.url}`
  };

  res.set('Content-Type', 'application/json');
  res.json(result);
});

app.get('/aviv', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('<html><body><h1>weizman</h1> yess</body></html>');
});


// middleware

app.listen(port, hostname, () => console.log(`app listening at http://${hostname}:${port}`));