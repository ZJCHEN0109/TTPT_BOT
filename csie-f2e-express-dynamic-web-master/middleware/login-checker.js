const admin = require('../firebase');
const db = require('../db');

// 登入驗證關口
function loginChecker(router) {
    // Verify session cookie and check permissions
    // https://firebase.google.com/docs/auth/admin/manage-cookies#verify_session_cookie_and_check_permissions
    router.use(function (req, res, next) {
        console.log('[進入登入檢查站]');
        // TODO: 設計登入驗證關卡...
        // 取得使用者的sessionCookie,若沒有則設定為空字串
        const cookieName = 'ttpt-session';
        //取回session cookie
        const sessionCookie = req.cookies[cookieName] || '';
        console.log('[驗證sessionCookie]', sessionCookie);
        // 預設驗證狀態
        const auth = {
            isLogin: false,
            isAdmin: false,
            isPharmy: false,
            user: {}
        }
        //驗證sessionCookie有效性
        admin
            .auth().verifySessionCookie(sessionCookie, true)
            .then(async user => {
                console.log('[驗證成功使用者為:]', user);
                const email = user.email
                const uid=user.uid
                // auth.isLogin = true;
                auth.user = user;
                //區分權限方法
                const adminDoc = await db.doc(`adminList/${uid}`).get();
                const pharmyDoc = await db.doc(`PharmyList/${email}`).get();
                // console.log("[adminDoc]的值",adminDoc);
                // console.log("[pharmyDoc]的值",pharmyDoc)
                //如果doc存在
                if (adminDoc.exists==true && pharmyDoc.exists==false) 
                {
                    //此人就是管理者
                    auth.isAdmin = true;
                }// }
                else if(pharmyDoc.exists==true && adminDoc.exists==false) 
                {   
                //     //此人就是藥事人員
                    auth.isPharmy = true;
                }else(adminDoc.exists==false && pharmyDoc.exists==false)
                {
                    //此人事一般使用者
                    auth.isLogin = true;
                }
                //將auth物件全數傳遞給模板使用
                res.locals.auth = auth;
                //next 主要作用為放行
                next();
            })
            .catch(err => {
                //為登入或sessionCookie無效
                console.log(err);
                res.locals.auth = auth;
                next();
            })

    });
}

module.exports = loginChecker;