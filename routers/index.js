const express = require("express");
const router = express.Router();
router.use('/',require('./headpro/index'))//头像更换
router.use('/',require('./lastingandout/index'))//持久登录与退出登录
router.use('/',require('./logandreg/index'))//登录与注册
router.use('/',require('./modify/index'))//修改密码和用户名
router.use('/get',require('./getmas/index'))//获取留言
router.use('/',require('./msg/index'))//留言信息处理
router.use('/administer',require('./admin/index'))//用户管理
router.use('/contact',require('./contact/index'))//反馈收集

module.exports = router;