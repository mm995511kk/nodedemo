// 导入评论集合构造函数
const { Comment } = require('../../model/comment')
module.exports = async (req, res) => {
    // res.send('ok')
    // 接收客户端传递过来的请求参数
    const { content, aid, uid } = req.body;
    // 讲评论信息存入数据库中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });
    // 将页面重定向至文章详情页面
    res.redirect(`/home/article?id=${aid}`)
}