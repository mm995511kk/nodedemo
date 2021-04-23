// 引入express框架
const express = require('express');
// 引入系统path模块
const path = require('path');
// 引入express框架下的post参数解析模块
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入格式化事件模块dateFormat
const dateFormat = require("dateformat");
// 导入art-template模块,(因为express-art-template也是依赖于art-template)
const template = require('art-template');
// 引入home路由模块
const home = require('./route/home').home;
// 引入admin路由模块
const admin = require('./route/admin').admin;
// 引入morgan模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');
// 创建服务器
const app = express();



// 设置中间件，对所有请求进行拦截,处理post请求参数
//    1.此方法只能处理普通表单请求的数据，不能处理包含文件上传的二进制数据
// 将post请求参数赋值给req.body, 并且调用next()方法去到下一个中间件
app.use(bodyParser.urlencoded({ extended: false }))

// 中间件配置session
app.use(session({
    secret: 'secret key', saveUninitialized: false, cookie: {
        // 设置cook过期时间
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 引入数据库模块
require('./model/connect');

// 引入用户集合模块.require()的时候回自动执行内部代码



// 1.告诉express框架使用的是什么模板引擎 
app.engine('art', require('express-art-template'));

// 向模板引擎中导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 2.告诉express框架，模板存放的位置
app.set('views', path.join(__dirname, 'views'))

// 3.渲染模板时不写后缀 默认拼接art后 缀
app.set('view engine', 'art');

// 开放静态文件
app.use(express.static(path.join(__dirname, 'public')))

console.log(config.get('title'));
// 获取系统环境变量，返回值为对象
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    console.log('开发环境');
    // 在开发环境中将客户端发送到服务器的请求信息打印在控制台
    app.use(morgan('dev'))
} else if (process.env.NODE_ENV == 'production') {
    console.log('生产环境');
} else {
    console.log('当前未设置电脑运行环境');
}

// 拦截请求判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 中间件绑定二级路由
app.use('/home', home)
app.use('/admin', admin)

// 定义错误处理中间件
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    // let obj = { path: '/admin/user-edit', message: '密码比对失败，不能继续用户信息修改', id: id }
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }

    res.redirect(`${result.path}?${params.join('&')}`)
})
app.listen(3000);
console.log('网站服务器启动成功,请访问：http://localhost:3000');
// console.log(User);