const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({status: 'Success', data: 'Connect to API Routes'})
})

router.get('/about', (req, res) => {
  res.status(200).json({status: 'Success', data: 'About page'})
})

router.get('/user/:id', (req, res) => {
  res.status(200).json({status: 'Success', data: req.params.id})
})

module.exports = router;