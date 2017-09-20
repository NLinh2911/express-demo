const express = require('express');
const app = express()


app.get('/', (req, res) => {
  res.send('Hello, no middleware request')
})

const router = express.Router()

// a middleware function with no mount path. This code is executed for every
// request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the
// /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') 
    next('route')
    // otherwise pass control to the next middleware function in this stack
  else 
    next()
}, function (req, res, next) {
  // render a regular page
  res.send(`Regular id: ${req.params.id}`)
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  res.send(`Special id: ${req.params.id}`)
})

// mount the router on the app
app.use('/', router)

/**
 * Error handling
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({message: err.message, error: {}});
});
app.listen(3000, () => {
  console.log('Express started on port 3000');
});
