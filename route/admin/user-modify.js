// 导入密码验证方法
const bcryt = require('bcrypt');
// 导入用户集合
const { User } = require('../../model/user')
module.exports = async (req, res, next) => {

    // 客户端传递的需要修改的用户信息
    const { username, email, role, state, password } = req.body;
    // 客户度传递的需要修改的用户id
    const id = req.query.id;
    // 根据传参id将用户数据查询出来并进行对比
    let user = await User.findOne({ _id: id });
    // 密码对比
    let isValid = await bcryt.compare(password, user.password)
    if (isValid) {
        // 密码对比成功,将用户信息更新到数据库中,不修改密码
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 数据更新成功，重定向到用户列表页面
        res.redirect('/admin/user')
    } else {
        // 密码对比失败,需要告知用户，触发错误处理中间级
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能继续用户信息修改', id: id }
        next(JSON.stringify(obj));
    }
    // res.send(user)
}