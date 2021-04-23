// 导入用户集合构造函数
const { User } = require('../../model/user')
module.exports = async (req, res) => {

    // 表示：当前访问的是用户管理界面
    req.app.locals.currentLink = 'user';

    // 1.接收客户端传递的当前页参数
    let page = req.query.page || 1;
    // 每一页数据显示的数据条数
    let pagesizi = 10;
    // 查询数据总数
    let count = await User.countDocuments({});
    // 总页数,向上取整
    let total = Math.ceil(count / pagesizi);
    // 页码对应的数据开始查询位置
    let start = (page - 1) * pagesizi;
    // 1.将用户信息从数据库中查询出来
    let users = await User.find().limit(pagesizi).skip(start)
    // 渲染用户列表模板
    res.render('admin/user', {
        users: users,
        page: page,
        total: total,
        count: count
    })
}