const express = require('express')
const path = require('path')
const logger = require('morgan')
const multer = require('multer')

const app = express();

app.use(logger('dev'));

//-----------------UPLOAD --------------------
//app.upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    //cb(null, file.originalname)
  }
})

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(new Error(file.mimetype + ' is not accepted'))
  }
}

app.upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/upload', app.upload.single('photo'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  console.log(req.body);
  res.send('Upload success');
})
app.listen(3000, () => {
  console.log('Express started on port 3000');
});