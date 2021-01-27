// 初始化firebase
// FIREBASE NODE.JS初始化文件
// https://firebase.google.com/docs/admin/setup
const admin = require("firebase-admin");

// TODO: 初始化FIREBASE
const serviceAccount = require("./key.json");
//初始化firbase Admin

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//輸出 admin 並讓其他檔案可以使用
//檔案a.js
//module.exports=資料

//檔案b.js
//const x=require("./檔案a")

module.exports = admin;