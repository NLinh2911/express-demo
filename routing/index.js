/**
 * Routing 
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

const nunjucks = require('nunjucks');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
// tell express which view templates to use -> which file extension to look for
app.set('view engine', 'njk');

/**
 * app.use() to use and chain middlewares
 */
app.use(logger('dev'));
// use middleware body-parser to read form data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// set up static files - express.static is the only built-in middleware
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res
    .status(200)
    .render('index', {
      title: 'Hello World',
      info: 'Techmaster'
    })
})
/**
 * HTTP request 
 */
app.get('/about', (req, res) => {
  res
    .status(200)
    .render('about', {
      title: 'This is an about page',
      sections: ['About Me', 'Projects', 'Contact Me']
    })
})
/**
 * HTTP request with params
 */
app.get('/projects/:id', (req, res) => {
  let id = req.params.id
  res
    .status(200)
    .render('project', {
      title: 'This is a project page',
      projectId: id
    })
})

/**
 * HTTP request with query
 */
app.get('/search', (req, res) => {
  let query = req.query.q
  console.log(query);
  res
    .status(200)
    .render('index', {
      title: 'This is search result',
      info: `The search query is ${query}`
    })
})

/**
 * HTTP POST request with form data
 */
app.post('/login', (req, res) => {
  let username = req.body.username;
  let pass = req.body.password;
  res
    .status(200)
    .render('index', {
      title: 'This is a login POST HTTP request',
      info: `The log in form is ${username}, ${pass}`
    })
})

app.listen(3000, () => {
  console.log('Express started on port 3000');
});
