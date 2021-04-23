// 引入用户集合构造函数结构出来
const { User } = require('../../model/user')
module.exports = async (req, res) => {
    // 表示：当前访问的是用户管理界面
    req.app.locals.currentLink = 'user';
    // 获取到地址栏中的id操作
    const { message, id } = req.query;
    // 如果当前传递了id参数说明是修改参数
    if (id) {
        let user1 = await User.findOne({ _id: id })
        // 渲染用户编辑页面(修改)
        res.render('admin/user-edit', {
            message: message,
            user1: user1,
            // 将要修改的用户id放在提交表单的get请求参数中，传递到服务器端
            link: '/admin/user-modify?id=' + id,
            button: '修改'

        })
    } else {
        // 如果当前没有id参数说明是新增用户
        res.render('admin/user-edit', {
            msessage: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }

}