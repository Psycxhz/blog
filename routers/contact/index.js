// 注册路由的业务逻辑处理
const express = require("express");
const router = express.Router();
const contactDB = require("../../datasheel/contact");

//监听提交反馈数据的路由
router.post("/contact", async (req,res)=>{
    let {name, email, message} = req.body;
    if(name && email && message){
        //存到数据库中
        await contactDB.create({name, email, message});
        res.send({code: 0, message:"反馈成功"});
    }else{
        res.send({code: 1, message:"反馈的数据不规范"});
    }
});

//修改反馈里的 reading状态值
router.post("/update", async (req,res)=>{
    let {id, reading} = req.body;
    //数据校验id是否存在
    await contactDB.findByIdAndUpdate(id, {reading});
    res.send({code:0, message:"成功修改状态"});
});

module.exports = router;