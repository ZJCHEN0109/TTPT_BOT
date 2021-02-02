const express = require('express');
const router = express.Router();
const db = require("../db");
const adminGuard = require("../middleware/admin-guard");
// 產品詳情路由
///edit/:pid => :動態參數
router.get('/show/:pid', function (req, res, next) {
    // 渲染 product/show.ejs
    res.render('product/show');
});

adminGuard(router);

// 建立產品路由
router.get('/create', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('product/create');
});
router.get('/Carts', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('product/Carts');
});

// 編輯產品路由
///edit/:pid => :動態參數(可任意取名)
//req請求 res回應
//async為協助同步await
router.get('/edit/:pid', async function (req, res, next) {
    //取得動態參數pid=>req.params.動態參數
    const pid = req.params.pid;
    // console.log("產品ID", pid);
    //TDO:透過PID從db取得指定文件中的資料
    //db.doc("集合名稱/文件ID").get() => 取得單一文件
    //await 為同步等待資料回傳在渲染網頁
    const doc = await db.doc(`productList/${pid}`).get()
    // console.log("文件", doc);
    //取得文件內的資料
    const product = doc.data();
    product.id = doc.id;
    // console.log(product);
    //TDO:把資料傳遞給模板locals名稱為product物件
    res.locals.product = product;
    // 渲染 product/edit.ejs
    res.render('product/edit');
});

module.exports = router;
