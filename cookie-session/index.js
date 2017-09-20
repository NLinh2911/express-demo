/**
 * Module dependencies.
 */
const cookieSession = require('cookie-session');
const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
// add req.session cookie support
app.use(cookieSession({secret: 'cool secret'}));

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
