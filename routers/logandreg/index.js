const express = require('express');
const route = express();
const {userTable} = require('../../datasheel/userTable');
const visitorDB = require('../../datasheel/visitor');

//添加访客
async function addVisitor(userID){
    //通过id查找访客数据
    let doc = await visitorDB.findOne({visitor:userID});
    // console.log(doc)
    if(doc){
        //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间\
        await visitorDB.findOneAndUpdate({visitor:userID}, {data:Date.now()});
    }else{
        //如果表中不存在该访客数据，添加访客到表中
        await visitorDB.create({visitor:userID});
    }
}
//登录
route.post("/long",(req,res)=>{
    userTable.find({
        name:req.body.user,
        pass:req.body.password
    },{
        _id:true,
        name:true,
        pass:true,
        img:true,
        root:true
    }).then((data)=>{
        if(data.length>0){
            let userInfo = {
                name: data[0].name,
                _id: data[0]._id,
                img:data[0].img,
                root: data[0].root,
            }
            req.session.userInfo = userInfo;
            addVisitor(userInfo._id)
           res.send({
               cors:0,
               massage:'登录成功',
               data
           });
        }else{
            res.send({
                cors:1,
                massage:'用户名不存在或密码错误'
            });
        }
    })
})
//注册
route.post('/sing',(req,res)=>{
    userTable.find({
        name:req.body.user,
    }).then((data)=>{
        if(data.length>0){
            res.send({
                cors:1,
                message:'已经有人使用了用户名,请重新输入',
            });
         }else{
             userTable.create({
                name:req.body.user,
                pass:req.body.password,
                img:'/images/1631160106063.jpg',
                root:false
             }).then(()=>{
                 res.send('注册成功')
             })
         }
    })
})
module.exports = route