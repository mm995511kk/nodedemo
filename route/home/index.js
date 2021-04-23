// 导入文章集合构造函数
const { Article } = require('../../model/article')
// 导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    // 接收客户端传递的页码
    const page = req.query.page
    // 从数据库中查询数据
    const result1 = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    let str = JSON.stringify(result1);
    let result = JSON.parse(str);
    // res.send(result)
    // 渲染模板，并展示数据
    res.render('home/default', {
        result: result,
    })
}