const mongoose = require('mongoose');
// 导入config模块
const config = require('config');
console.log(config.get("db"));
// 连接数据库
// 数据库设置账户密码之后，需要使用账户密码来登陆
// mongoose.connect('mongodb://user:pass@localhost:port/database')
// mongoose.connec('mongodb://rooot:root@localhost:27017/bolg')

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('数据库连接成功') })
    .catch(() => { console.log(数据库连接失败) });