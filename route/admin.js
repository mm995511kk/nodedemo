// 引入express框架
const express = require('express');

// 创建博客展示页面路由
const admin = express.Router();
// 渲染登录页面
admin.get('/login', require('./admin/loginpage'));
// 实现登陆功能的路由
admin.post('/login', require('./admin/login'))

// 创建用户列表路由
admin.get('/user', require('./admin/userpage'));
// 实现退出功能
admin.get('/logout', require('./admin/logout'))

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'))

// 创建用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'))

// 创建用户修改信息的路由
admin.post('/user-modify', require('./admin/user-modify'))

// 创建用户删除路由
admin.get('/delete', require('./admin/user-delete'))

// 创建文章列表页面路由
admin.get('/article', require('./admin/article'))

// 创建文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'))

// 创建文件添加功能路由
admin.post('/article-add', require('./admin/article-add'))

module.exports.admin = admin;