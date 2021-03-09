// 設置管理者路由守衛
function pharmyGuard(router) {
    router.use(function (req, res, next) {
        // TODO: 管理員驗證路由守衛
        const isPharmy = res.locals.auth.isPharmy;
        if (isPharmy) {
            next();
        } else {
            //非藥事人員強制轉回首頁
            res.redirect("/");
        }
    });
}

module.exports = pharmyGuard;