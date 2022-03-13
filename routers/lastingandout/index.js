const express = require('express');
const route = express();
const visitorDB = require('../../datasheel/visitor');

//添加访客
async function addVisitor(userID){
    //通过id查找访客数据
    let doc = await visitorDB.findOne({visitor:userID});
    // console.log(doc);
    if(doc){
        //如果表中存在该id对应的访客数据，更新你的访问时间为当前时间
        await visitorDB.findOneAndUpdate({visitor:userID}, {data:Date.now()});
    }else{
        //如果表中不存在该访客数据，添加访客到表中
        await visitorDB.create({visitor:userID});
    }
}

route.post('/isCheck',(req,res)=>{
    let data = req.session.userInfo;
       if(data){
        addVisitor(req.session.userInfo._id)
           //已登录
            res.send({
                code:0,
                msg: "已经登录",
                data
            })
       }else{
           //未登录
            res.send({
                code:1,
                msg:"未登录",
                data:{}
            })
       }
})
route.post('/out',(req,res)=>{
    req.session.destroy();
    res.send({
        cors:0,
        message:'已退出,请重新登录',
    })
})

module.exports = route