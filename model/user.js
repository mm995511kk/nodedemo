const mongoose = require('mongoose');
// 引入bcrytp模块
const bcrypt = require('bcrypt');

// 创建用户集合规则
const userSChema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlengt: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址不重复
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        // 管理员：admin
        // 普通用户：normal
        type: String,
        required: true
    },
    state: {
        type: Number,
        // 0：启用状态
        // 1 :禁用状态
        default: 0
    }
})
// 使用用户集合规则创建集合
mongoose.set('useCreateIndex', true);
// 引入joi模块
const joi = require('joi');
const User = mongoose.model('User', userSChema);

async function creatUser() {
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 进行明文加密
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: '张三',
        email: 'zhangsan@163.com',
        password: pass,
        role: 'admin',
        state: 0,
    })
};
// creatUser();

// 验证用户信息封装为函数
const validateUser = (user) => {
    // 定义服务器端对象验证规则
    const schema = {
        username: joi.string().required().max(20).min(2).error(new Error('用户名不符合验证规则')),
        email: joi.string().email().required().error(new Error('邮箱不符合验证规则')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码不符合验证规则')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色状态非法')),
        state: joi.number().valid(1, 0).required().error(new Error('状态值非法'))

    };
    return joi.validate(user, schema);
}



// 将用户集合作为模块成员导出
module.exports = {
    User: User,
    validateUser: validateUser,
}