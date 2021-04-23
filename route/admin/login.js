// 通过对象解构，获取导入的exports对象下面的User方法
const { User } = require('../../model/user');
// 引入bcrytp模块
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

    // 接收请求参数
    // res.send(req.body)
    // 5. 服务器端接收请求参数，验证用户是否填写了登录表单
    //     1.客户端可以阻止js验证
    //     2.需要服务器端二次验证
    let { email, password } = req.body;
    // 服务器端验证password,email字段是否为空
    if (email.trim().length == 0 || password.trim().length == 0) {
        // 如果服务器端验证email为空。直接终止程序运行，修改返回的状态码，并对客户端进行提示
        return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    };
    // 7. 根据邮箱地址查询用户信息
    // User.findOne()方法
    // 1.如果查询到了用户，user变量的值是对象类型
    // 2.如果没有查询到返回值为空对象，user为空
    let user = await User.findOne({ email: email });
    if (user) {
        // 将客户端传递过来的密码与数据库的信息判断
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            // 登陆成功
            // 将用户名存储在请求对象session中
            req.session.username = user.username;
            // 将角色存储在请求对象session中
            req.session.role = user.role;
            // 1.将变量设置到app.locals对象下面，这个数据在所有的模板中都可以获取到。
            // 2.req.服务器对象名的方式获取到服务器对象
            req.app.locals.userInfo = user;
            // 对用户角色进行判断,如果是是admin
            if (user.role == 'admin') {
                // 跳转到用户管理界面
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }

        } else {
            // 密码不对
            return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
        }

    } else {
        // 用户没有查询到
        return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }


};
