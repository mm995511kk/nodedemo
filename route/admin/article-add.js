// 引入formidable模块
const formidable = require('formidable')
const path = require('path')
// 引入文章集合模块，便于存储数据
const { Article } = require('../../model/article')

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件的存放位置，绝对路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
    // 是否保留表单上传文件的扩展名
    form.keepExtensions = true;
    // 对表单信息进行解析
    form.parse(req, async (err, fields, files) => {
        // err  错误对象，如果表单解析失败，保存错误信息，否则是一个空对象
        // fields 存储普通请求参数，除二进制以外的信息
        // files 存储上传的文件信息
        // res.send({ fields, files })
        // E:\VScode\web\Node\blogCase\public\uploads\upload_bd33a85ea5c59973c627e2a16a0a73b9.png
        // 文件上传的时候回对文件自动重命名upload_bd33a85ea5c59973c627e2a16a0a73b9.png
        // 获取当前上传文件在服务器地址中的绝对路径
        // 1.将文件渲染到客户端相当于调用静态资源
        // 2.所以数据库中应该存储的是相对于css静态资源的文件地址
        // split() 方法用于把一个字符串分割成字符串数组。
        // files.cover.path.split('public')[1]
        // \uploads\upload_3d96cd10d3e14b91a6200cab60c88423.png
        // 3.此时就获得了用户上传的相当于静态资源的，文件地址
        // res.send(files.cover.path.split('public')[1]);

        // 数据添加到数据库后
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content

        });
        // 将网页重定向至文章列表页面
        res.redirect('/admin/article')
    });

    // res.send('ok')
}