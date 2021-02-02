const express = require('express');
const db = require('../db');
const router = express.Router();
const loginChecker = require("../middleware/login-checker");

//利用中介層(檢查是否登入)
loginChecker(router)
// 首頁路由
router.get('/', async function (req, res, next) {
  // console.log("有人要看首頁了!");
  //準備一個產品列表的陣列//[{},{},{},....]
  const productList = [];
  // TODO: 等待await取得產品列表
  const collection = await db
    .collection("productList")
    // .orderBy("price", "desc")
    .orderBy("createdAt", "desc") //時間戳記數字越小時間越近
    .get();
  // console.log("集合",collection)
  //取出集合裡的每個文件
  collection.forEach(doc => {
    //從文件取的資料的本體
    const product = doc.data();
    //取出文件的id並存在product物件內
    product.id = doc.id;
    console.log("product", product);
    productList.push(product);
  });
  console.log(productList);

  // 將轉化成陣列的產品列表傳遞到模板
  //res.locals.模板上的變數名稱=變數要存的值
  res.locals.productList = productList;
  //透過Views/index.ejs產生HTML內容並回應給瀏覽器
  //EJS=>HTML res為HTML的產生器
  res.render('default');
});

module.exports = router;
