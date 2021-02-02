const express = require('express');
const router = express.Router();

// 產品詳情路由
router.get('/', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('product/Carts');
});
router.get('/Carts', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('product/Carts');
});


module.exports = router;
