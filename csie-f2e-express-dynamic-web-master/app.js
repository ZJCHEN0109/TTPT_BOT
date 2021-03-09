const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 取得路由資源
// ./route/index.js
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const apiRouter = require('./routes/api');
const CartsRouter = require('./routes/Carts');
const AppointmentsRouter = require('./routes/Appointments');

// 設定應用程式
const app = express();

// 定義視圖引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 設定前端資源路由 / => 可指向public資料夾內的資源
app.use(express.static(path.join(__dirname, 'public')));
// 設定前端資源路由 /assets/ => 可指向assets資料夾內的資源
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// 設定前端資源路由 /node_modules/ => node_modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// 設定Cookie名稱
app.locals.cookieName = 'example-cookie';

//如果有人對/下請求，分派indexRouter處理相關邏輯
app.use('/', indexRouter);
//如果有人對/product下請求，分派/product處理相關邏輯
app.use('/product', productRouter);
//如果有人對/api下請求，分派/api處理相關邏輯
app.use('/api', apiRouter);
//如果有人對/Patients下請求，分派/Patients處理相關邏輯
// app.use('/Carts', CartsRouter);
//如果有人對/Patients下請求，分派/Patients處理相關邏輯
// app.use('/product/Carts', CartsRouter);
//如果有人對/Appointment下請求，分派/Appointments處理相關邏輯
app.use('/Appointments', AppointmentsRouter);
//如果有人對/Appointment下請求，分派/Appointments處理相關邏輯
app.use('/Appointments/Appointment', AppointmentsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
