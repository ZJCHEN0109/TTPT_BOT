const express = require('express');
const moment = require('moment');
const axios = require('axios');
const router = express.Router();
//引用db.js admin.firestore()=>db
const db = require("../db");
const admin = require("../firebase");

// 登入
router.post('/login', function (req, res, next) {
    // console.log('[準備登入]');
    // console.log('[前端送來的資料]', req.body);
    // Create session cookie
    // https://firebase.google.com/docs/auth/admin/manage-cookies#create_session_cookie
    // TODO: 取得前端傳來的使用者 idToken
    const idToken = req.body.idToken;
    console.log('[前端傳來的idToken]', idToken);
    // 有效期間5天
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // 建立 Session Cookie
    admin.auth().createSessionCookie(idToken, { expiresIn })
        .then(sessionCookie => {
            console.log("驗證是否為sessionCookie:", sessionCookie);
            //cookie選項
            const options = {
                maxAge: expiresIn,
                httpOnly: true
            };
            //res.cookie(Cookie名稱,資料,選項如有效期)
            res.cookie("ttpt-session", sessionCookie, options);
            res.status(200).json({
                msg: "Login!後端驗證登入成功"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err) //傳送錯誤訊息給前端
        })

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
            //後端清除
            //讓Firbase Server知道此人的sessionCookie是無效的
            admin.auth().revokeRefreshTokens(user.sub)
            res.status(200).json({ msg: "Logout!" })
        })
        .catch(err => {
            res.status(200).json({ msg: 'Logout' })
        });
});

// 新增商品,接收前端create.ejs第63行送來資料
router.post('/product/create', async function (req, res, next) {
    console.log('[準備新增商品]');
    console.log('[前端送來的資料]', req.body);
    // Add a document
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    const product = req.body;
    //將資料product存到資料庫的自訂productList集合內
    //await等待將product存到productList集合內
    //記得加async才不會導致app crashed - waiting for file changes before starting...
    await db.collection("productList").add(product)
    //回應資訊給予前端成功資訊
    res.status(200).json({
        msg: "OK",
        title: "新增成功",
        productName: product.name
    })
});

// 更新商品
router.put('/product/:pid', async function (req, res, next) {
    console.log('[準備更新商品]');
    console.log('[前端送來的資料]', req.body);
    console.log('[pid]', req.params.pid);
    const pid = req.params.pid;
    const product = req.body;
    //db.doc("集合/文件ID").update(新資料)
    await db.doc(`productList/${pid}`).update(product);
    //回應前端的請求
    res.status(200).json({
        msg: "資料已更新"
    })
});

// 刪除商品
router.delete('/product/:pid', async function (req, res, next) {
    console.log('[準備刪除商品]');
    console.log('[pid]', req.params.pid);
    const pid = req.params.pid;
    await db.doc(`productList/${pid}`).delete();
    res.status(200).json({
        msg: "Deleted!"
    });

});

module.exports = router;
