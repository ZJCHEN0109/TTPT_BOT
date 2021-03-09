const express = require('express');
const moment = require('moment');
const axios = require('axios');
const router = express.Router();
//引用db.js admin.firestore()=>db
const db = require("../db");
// const loginChecker = require("../middleware/login-checker");
const adminGuard = require("../middleware/admin-guard");
const pharmyGuard = require("../middleware/pharmy-guard");



// 首頁路由
router.get('/', async function (req, res, next) {
    res.render("Appointments/index")
});

router.get('/index', async function (req, res, next) {
    res.render("Appointments/index")
});

router.get('/default', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/default');
});

router.get('/profile', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/profile');
});

router.get('/table', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/table');
});

router.get('/record', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/record');
});


router.get('/login', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/login');
});

router.get('/register', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/register');
});

router.get('/forgot-password', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/forgot-password');
});

router.get('/schdule', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/schdule');
});

router.get('/schedulemanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/schedulemanager');
});


router.get('/blank', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/blank');
});

router.get('/aichart', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/aichart');
});

router.get('/404', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/404');
});

//建立新資料路由
router.get('profile/create', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('profile/create');
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



//新增藥事人員基本資料集合
router.post('/profile/Practitioner', async function (req, res, next) {
    console.log('[準備新增會員]');
    console.log('[前端Pharmy送來的資料]', req.body);
    // Add a document
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    const profile = req.body;
    console.log('[前端資料ID]',profile.id);
    //將資料product存到資料庫的自訂productList集合內
    //await等待將product存到PractitionerList集合內
    //記得加async才不會導致app crashed - waiting for file changes before starting...
    await db.collection("Practitionerist").doc(profile.id).set(profile)
    //回應資訊給予前端成功資訊
    res.status(200).json({
        msg: "OK",
        title: "新增成功",
        // productName: product.username
    })
});

//新增一般人員基本資料集合
router.post('/profile/createuser', async function (req, res, next) {
    console.log('[準備新增會員]');
    console.log('[前端User送來的資料]', req.body);
    // Add a document
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    const profile = req.body;
    console.log('[前端資料ID]',profile.id);
    //將資料product存到資料庫的自訂productList集合內
    //await等待將product存到PractitionerList集合內
    //記得加async才不會導致app crashed - waiting for file changes before starting...
    await db.collection("PersonList").doc(profile.id).set(profile)
    //回應資訊給予前端成功資訊
    res.status(200).json({
        msg: "OK",
        title: "新增成功",
        // productName: product.username
    })
});

//利用中介層(檢查是否登入)
// adminGuard(router);
//如果非管理者或藥事下列路由頁面無法繼續執行


router.get('/recordmanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/recordmanager');
});

adminGuard(router);
router.get('/phymanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/phymanager');
});

router.get('/usermanager', function (req, res, next) {
    // 渲染 product/create.ejs
    res.render('Appointments/usermanager');
});



module.exports = router;
