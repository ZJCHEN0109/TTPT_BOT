// 設置管理者路由守衛
function adminGuard(router) {
    router.use(function (req, res, next) {
        // TODO: 管理員驗證路由守衛
        const isAdmin = res.locals.auth.isAdmin;
        if (isAdmin) {
            next();
        } else {
            //非管理者強制轉回首頁
            res.redirect("/");
        }
    });
}

module.exports = adminGuard;