const guard = (req, res, next) => {
    // 1.判断用户访问的是否是登陆页面
    // 2.判断用户的登陆状态
    if (req.url != '/login' && !req.session.username) {
        // 4.如果用户不是登陆的，将请求重定向到登陆界面
        res.redirect('/admin/login')
    } else {
        // 如果用户是登陆，并且是一个普通用户
        if (req.session.role == 'normal') {
            // 让他重定向至home页面
            return res.redirect('/home/')
        }
        // 3.如果用户是登陆状态,且是admin，将请求放行
        next();


    }
};
module.exports = guard;