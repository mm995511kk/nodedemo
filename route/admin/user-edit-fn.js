
// 引入用户集合模块,以及客户端验证函数
const { User, validateUser } = require('../../model/user');
// 引入bcrytp模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

    // 实施验证
    try {
        await validateUser(req.body);
    } catch (ex) {
        // 如果验证信息没有通过，重定向到用户添加页面
        // return res.redirect(`/admin/user-edit?message=${ex.message}`)
        // 1.next()方法只接受字符串类型的参数
        // 2.为了实现传参，需要把数据存储在对象中，后转化为字符串格式
        // JSON.stringify()把对象数据类型转化为字符串
        // JSON.parse()将字符串转化为字符串类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: ex.message }))
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email })
    // 如果用户邮件存在
    if (user) {
        // 邮件地址已经被占用
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    } else {
        // 用户信息正常，最密码进行加密处理
        // 先生成随机字符串
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        // 替换密码
        req.body.password = password;
        // 调用用户集合，将数据添加到数据库
        await User.create(req.body)
        // 10. 重定向页面到用户列表页面
        res.redirect('/admin/user')

    }
}
