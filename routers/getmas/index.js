const express = require("express");
const router = express.Router();
const messageDB = require("../../datasheel/message");//message表的操作对象
const linkDB = require('../../datasheel/link');
const articleDB = require('../../datasheel/article');
const contactDB = require('../../datasheel/contact');
const visitorDB = require('../../datasheel/visitor');
const photoDB = require('../../datasheel/photo');

//请求留言数据
router.get("/msg", async (req,res)=>{
    let msgDoc = await messageDB
        .find({}, {}, {sort:{date:-1}})
        .populate("author", {password:0, __v:0, admin:0})
        .populate("children.author",{password:0, __v:0, admin:0})//同时查询写子级回复的用户信息
        .populate("children.replyUser",{password:0, __v:0, admin:0}); //查询子级回复里存储的父级评论的用户信息
    res.send({
        code:0,
        message:"留言请求成功",
        data: msgDoc
    });
});

//请求友链数据
router.get("/link", async (req,res)=>{
    let linkDoc = await linkDB.find();
    res.send({
        code:0,
        message:"成功获取友链数据",
        data: linkDoc
    });
});

//根据id获取文章详情数据
router.get("/articleDetails", async (req,res)=>{
    let {id} = req.query; //文章id
    let doc = await articleDB.findById(id); 
    if(!doc) return res.send({ code:1, message:"文章id有误，查不到这篇文章"});
    await articleDB.findByIdAndUpdate(id, { $inc:{readingNum:1} });
    //查到文章数据时
    res.send({ code:0, message:"查询成功", data:doc});
})

//文章数据
router.get("/article", async (req,res)=>{
    let articleDoc = await articleDB.find({},{},{sort: {readingNum:-1}});
    if(articleDoc.length === 0){
        res.send({code:1,message:"暂无文章，请通知管理员上传文章"});
    }else{
        res.send({code:0,message:"成功获取所有的文章数据",data: articleDoc});
    }
});


//请求获取所有的反馈数据
router.get("/getcontact", async(req, res)=>{
    let doc = await contactDB.find();
    if(doc.length === 0){
        res.send({code:6, message:"没有反馈数据"});
    }else{
        res.send({code:0, message:"获取反馈数据成功", data:doc});
    }
});

//请求相册数据
router.get("/phone", async(req, res)=>{
    let doc = await photoDB.find();
    if(doc.length === 0){
        res.send({code:6, message:"没有反馈数据"});
    }else{
        res.send({code:0, message:"获取反馈数据成功", data:doc});
    }
});

// 访客数据
router.get("/visitor", async (req,res)=>{
    let doc = await visitorDB.find().populate("visitor", {password:0, __v:0});
    res.send({ code:0, message:"查询成功", data:doc});
});

module.exports = router;