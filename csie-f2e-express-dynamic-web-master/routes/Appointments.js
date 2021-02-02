const express = require('express');
const moment = require('moment');
const axios = require('axios');
const router = express.Router();
//引用db.js admin.firestore()=>db
const db = require("../db");
const loginChecker = require("../middleware/login-checker");

//利用中介層(檢查是否登入)
loginChecker(router)

// 首頁路由
router.get('/', async function (req, res, next) {
    res.render("Appointment/index")
});

router.get('/index', async function (req, res, next) {
    res.render("Appointment/index")
});

router.get('/default', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/default');
});

router.get('/profile', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/profile');
});

router.get('/table', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/table');
});

router.get('/record', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/record');
});

router.get('/recordmanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/recordmanager');
});

router.get('/login', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/login');
});

router.get('/register', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/register');
});

router.get('/forgot-password', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/forgot-password');
});

router.get('/schdule', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/schdule');
});

router.get('/schedulemanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/schedulemanager');
});

router.get('/phymanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/phymanager');
});

router.get('/usermanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/usermanager');
});

router.get('/blank', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/blank');
});

router.get('/aichart', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/aichart');
});

router.get('/404', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointment/404');
});

// 登出
router.post('/logout', function (req, res, next) {
    // Sign Out
    // https://firebase.google.com/docs/auth/admin/manage-cookies#sign_out
    // const cookieName = req.app.locals.cookieName;
    const cookieName = "ttpt-session";
    const sessionCookie = req.cookies[cookieName] || '';
    //清除指定cookie
    res.clearCookie(cookieName);
    //驗證sessionCookie是否有效
    admin.auth().verifySessionCookie(sessionCookie)
        .then(user => {
            //讓Firbase Server知道此人的sessionCookie是無效的
            admin.auth().revokeRefreshTokens(user.sub)
            res.status(200).json({ msg: "Logout!" })
        })
        .catch(err => {
            res.status(200).json({ msg: 'Logout' })
        });
});


router.post('/product/create', async function (req, res, next) {
    console.log('[準備新增商品]');
    console.log('[前端送來的資料]', req.body);
    // Add a document
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    const product = req.body;
    //將資料product存到資料庫的自訂productList集合內
    //await等待將product存到productList集合內
    //記得加async才不會導致app crashed - waiting for file changes before starting...
    await db.collection("PractitionerList").add(product)
    //回應資訊給予前端成功資訊
    res.status(200).json({
        msg: "OK",
        title: "新增成功",
        // productName: product.username
    })
});
module.exports = router;
