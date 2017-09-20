
const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(logger('dev'));

// parses request cookies, populating req.cookies and req.signedCookies when the
// secret is passed, used for signing the cookies.
app.use(cookieParser('my secret here'));

// parses x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function (req, res) {
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
  } else {
    res.send('<form method="post"><p>Check to <label><input type="checkbox" name="remember"/> ' +
      'remember me</label> <input type="submit" value="Submit"/>.</p></form>');
  }
});

app.get('/forget', function (req, res) {
  res.clearCookie('remember');
  res.redirect('back');
});

app.post('/', function (req, res) {
  const minute = 60000;
  if (req.body.remember)
    // set cookie 
    res.cookie('remember', 1, {
      maxAge: minute
    });
  res.redirect('back');
});

app.listen(3000, () => {
  console.log('Express started on port 3000');
});