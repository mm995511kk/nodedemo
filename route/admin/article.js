const { Article } = require('../../model/article')
// 导入mongoose-sex-page分页数据模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    // 接收客户端传递过来的页码
    const page = req.query.page;
    // 表示：当前访问的是文章管理界面
    req.app.locals.currentLink = 'article';
    // 查询所有文章数据
    // 2.传参
    //     pagination(集合构造函数).page(1) .size(20) .display(8) .exec();
    //     1.page：当前页，第几页
    //     2.size：一页显示多少条数据
    //     3.display：显示多少页码数量
    //     4.exec()：向数据库发送查询请求
    let result = await pagination(Article).find().page(page).size(3).display(3).populate('author').exec();
    let str = JSON.stringify(result);
    let articles = JSON.parse(str);
    // 在mongoose中使用populate方法实现集合关联时，导致模板引擎art - template无法渲染，
    // https://blog.csdn.net/qq_49002903/article/details/112541719
    // 如果前面使用JSON数据类型转换就会报错：SyntaxError: Unexpected token R in JSON at position 0
    // 注：lean()方法：是告诉mongoose返回的是普通对象，而不是mongoose文档对象，
    // 先用过JSON.stringify()这个方法将文档对象转换为字符串，将其他的属性格式全部去掉，只需要留下需要的数据字符串即可！

    // res.send(articles);
    res.render('admin/article.art', {
        art: articles,
    });
}