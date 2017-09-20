# Tổng Hợp Các Ví Dụ Demo Express

Các ví dụ hướng dẫn từng tính năng chính của Express

## Cài đặt và chạy:

```bash
$ git clone
$ npm install
```
* Các ví dụ nằm trong từng folder, ví dụ chạy demo khởi tạo 1 express app
```bash
$ cd hello-world
$ node index.js
```

## Middlewares:
* Mỗi 1 middleware tập trung xử lý 1 vấn đề
* Middleware có quyền truy xuất vào 3 tham số `req`, `res` và `next`
* Middlwares có thể đc nối chuỗi và xử lý theo thứ tự, nếu middleware hiện tại xử lý xong mà không phải là middleware cuối cùng thì nó sẽ gọi `next` để chuyển request cho middleware tiếp theo xử lý
* Các loại middlewares:
  * Application-level: `app.use()`
  ```js
  // middleware để logging request ra terminal 
  const logger = require('morgan');
  // middleware này áp dụng với tất cả request lên express server
  app.use(logger('dev')); // sử dụng options 'dev'
  ```

  ```js
  // middleware này sẽ chạy với tất cả request gửi vào đg dẫn '/user/:id'
  app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  })
  ```
  * Router-level: tương tự như application-level nhưng đc gắn với mỗi instance của express.Router()
  * Built-in: `express.static()`
  ```js
  app.use('/static', express.static(path.join(__dirname, 'public')))
  // http://localhost:3000/static/css/style.css
  ```
  * Third-party: những middlewares ngoài, cần gọi modules để sử dụng
  ```js
  const bodyParser = require('body-parser');
  const logger = require('morgan');
  app.use(logger('dev'));
  // use middleware body-parser to read form data 
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  ```
  * Error-handling: middleware xử lý lỗi đặt ở cuối cùng của chuỗi middlewares
  ```js
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // production error handler no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });
  ```

## Cookie-session & express-session:
User session có thể đc lưu trữ ở trên browser (client side) và trên server. `cookie-session` lưu trữ thông tin session theo cookie bên client còn `express-session` lưu trữ thông tin server, cookie trong browser của client chỉ lưu key để truy xuất thông tin trên server

* `cookie-session` lưu toàn bộ thông tin của session trong cookie nên chỉ thích hợp cho thông tin nhẹ, không yêu cầu bảo mật
