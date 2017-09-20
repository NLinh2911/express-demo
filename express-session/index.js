
const expressSession = require('express-session');
const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
// Populates req.session
app.use(expressSession({
  name: 'express-session-cookie',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'cool secret'
}));

// do something with the session
app.use(count);

// custom middleware
function count(req, res) {
  console.log(req.session);
  req.session.count = (req.session.count || 0) + 1
  res.send('viewed ' + req.session.count + ' times\n')
}

app.listen(3000, () => {
  console.log('Express started on port 3000');
});
