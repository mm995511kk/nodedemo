module.exports = (req, res) => {
    // 表示：当前访问的是文章管理界面
    req.app.locals.currentLink = 'article';
    res.render('admin/article-edit.art');
}