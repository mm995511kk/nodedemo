// 导入评论集合构造函数
const { Comment } = require('../../model/comment')
// 导入文章集合构造函数
const { Article } = require('../../model/article')
module.exports = async (req, res) => {
    // 接收客户端传递过来的文章id
    const id = req.query.id;
    // 根据id查询文章的详细信息
    let result1 = await Article.findOne({ _id: id }).populate('author');
    let str = JSON.stringify(result1);
    let article = JSON.parse(str);
    // 根据文章id查询对应的评论，并将其渲染至页面中
    let result2 = await Comment.find({ aid: id }).populate('uid')
    let str2 = JSON.stringify(result2);
    let comments = JSON.parse(str2);
    res.render('home/article', {
        article: article,
        comments: comments
    })
}