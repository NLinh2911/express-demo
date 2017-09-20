/**
 * Initialise an express app
 */
const express = require('express');

const app = express();

// handle a GET HTTP request 
// Express có hàm app.METHOD(path, [callback]) để xử lý routes như app.get(), app.post(),...
// Biến req chứa các thông tin của request của user gửi lên như req.headers
app.get('/', function (req, res) {
  // nhận đc request vào route '/' -> trả lại 1 dòng text
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Express started on port 3000');
});
