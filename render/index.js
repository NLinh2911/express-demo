/**
 * Different ways express response to a request
 */
const express = require('express');
const path = require('path');
const app = express();

/**
 * res.send() gửi thẳng 1 HTTP response, có thể là string, buffer, array, object
 */
app.get('/', function (req, res) {
  res.send('Hello World');
});


app.get('/send-buffer', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.send(new Buffer('Hello World'));
});

app.get('/send-array', function (req, res) {
  res.send(['Hello World', 1, 2, 3]);
});

/**
 * res.sendFile()
 */
app.get('/send-file', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
/**
 * res.sendStatus()
 */
app.get('/send-status', (req, res) => {
  res.sendStatus(200) // equivalent to res.status(200).send('OK')
})
/**
 * res.json()
 */
app.get('/send-json', (req, res) => {
  res.json({msg: 'Hello World', name: 'Techmaster'}) // equivalent to res.status(200).send('OK')
})
/**
 * res.render() để render 1 HTML file khi sử dụng view template engine
 */
const nunjucks = require('nunjucks');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
// tell express which view templates to use -> which file extension to look for
app.set('view engine', 'njk');

app.get('/render-view', (req, res) => {
  res.status(200).render('index', {
    title: 'Hello World',
    name: 'Techmaster'
  })
})

app.listen(3000, () => {
  console.log('Express started on port 3000');
});
