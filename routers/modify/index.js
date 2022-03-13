const express = require('express');
const route = express();
const { userTable } = require('../../datasheel/userTable');
route.use((req, res, next) => {
    if (!req.session.userInfo) {
        return res.send({
            code: 1,
            message: "未登录，不能修改个人信息"
        })
    }
    next();
})
//修改用户名
route.post('/upname', (req, res) => {
    // console.log(req.session.userInfo);
    let { user } = req.body;
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user)) {
        // 判断新名字与数据库里的名字是否一致
        if (user === req.session.userInfo.name) {
            return res.send({
                code: 2,
                message: "新用户名与原用户名是相同的，不可以修改"
            })
        }

        //验证该用户名是否被占用
        userTable.findOne({ name: user })
            .then((data) => {
                if (data) {
                    return res.send({
                        code: 3,
                        message: "该用户名已经被别人用了，请更换一个"
                    })
                }
            }).then(() => {
                //修改数据库中该数据的用户名
                userTable.findByIdAndUpdate(req.session.userInfo._id, { name: user })
                    .then(() => {
                        //更新session里存储的用户的名字     
                        req.session.userInfo.name = user;
                        res.send({
                            code: 0,
                            message: "修改成功",
                            data: req.session.userInfo   //提供最新的用户信息给前端
                        })
                    })
            })
    } else {
        res.send({
            code: 1,
            message: "你发过来的数据格式不规范"
        })
    }
})

//修改密码
route.post('/uppass', (req, res) => {
    let { oldPassword, newPassword } = req.body;
    if (/^[a-zA-Z]\w{5,17}$/.test(newPassword)) {

        //传过来的新密码和旧密码是否一致
        if (oldPassword === newPassword) {
            return res.send({
                code: 1,
                message: "新旧密码不能相同"
            });
        }

        //判断旧密码 是否 和数据库里的密码一致
        userTable.findById(req.session.userInfo._id)
            .then((doc) => {
                if (doc.pass !== oldPassword) { //不一致
                    return res.send({
                        code: 1,
                        message: "旧密码不正确"
                    });
                } else {
                    //到数据库中修改密码内容
                    userTable.findByIdAndUpdate(req.session.userInfo._id, { pass: newPassword })
                        .then(() => {
                            req.session.destroy(); //销毁当前的session，因为修改密码后必须重新登录
                            res.send({
                                code: 0,
                                message: "密码修改成功，请重新登录"
                            })
                        })
                }
            })
    } else {
        res.send({
            code: 4,
            message: "你发过来的数据格式不规范"
        })
    }
})
module.exports = route