const express = require("express");
const router = express.Router();
const messageDB = require('../../datasheel/message');
const {userTable} = require('../../datasheel/userTable')

//鉴权：判断用户是否在线（登录）
router.use((req, res, next) => {
    // console.log(1);
    if(!req.session.userInfo){
        return res.send({
            code: 7, 
            message:"用户未登录，不能发表留言"
        })
    }
    next();
});
//发表评论
router.post('/publish',(req,res)=>{
    let {valMsg} = req.body;
    if(valMsg.length > 100){
        res.send({
            code:1,
            message:'字数超过上限了'
        })
    }
    if(!valMsg){
        res.send({
            code:1,
            message:'评论不能为空'
        })
    }
    messageDB.create({
        content: valMsg,
        author: req.session.userInfo._id 
    }).then(()=>{
        res.send({
            code:0,
            message:'评论发表成功'
        })
    })
})

//给父级评论点赞的路由
router.post("/likes/comment", (req,res)=>{
    let {id} = req.body; //评论id

    messageDB.findById(id)
    .then((commentDoc)=>{
         //判断commentDoc存不存在
        if(!commentDoc){
            return res.send({
                code:1,
                message:"该用户以注销"
            });
        }
    
        let userId = req.session.userInfo._id; //当前发起请求的用户的id
        //判断用户是否点过赞 / 判断当前点击按钮的用户是否存在likes数组中
        if(commentDoc.likes.includes(userId)){
            //存在，点过赞了，要取消赞
             messageDB.findByIdAndUpdate(id, {$pull:{likes:userId}})
             .then(()=>{
                res.send({
                    code:0,
                    message:"取消点赞"
                })
             })
        }else{
            //没点过赞，要点赞
             messageDB.findByIdAndUpdate(id, {$push:{likes:userId}})
             .then(()=>{
                res.send({
                    code:0,
                    message:"点赞成功"
                })
             })
        }
    })
});

//在父级评论下，提交回复内容
router.post("/reply/submit",(req,res)=>{
    //id父评论的id   content评论内容   replyUser父评论的作者id
    let {id, content, replyUser} = req.body;
    //判断数据格式：数据是否为空 / 数据长度是否超过100
    if(!content) return res.send({code:1, message:"回复的内容为空"});
    if(content.length > 100) return res.send({code:2, message:"回复的内容超过100了"});

    // 判断当前这条父评论是否存在    
    messageDB.findById(id)
    .then((doc1)=>{
        if(!doc1) return res.send({code:1, message:"评论id错误"});
        //父级评论的作者是否存在
        userTable.findById(replyUser)
        .then((doc2)=>{
            if(!doc2) return res.send({code:3, message:"你要回复的用户的id错误，用户不存在"});
            messageDB.findByIdAndUpdate(id, {
                //往这条父评论下的children数组中添加回复数据
                $push:{
                    children:{
                        content,
                        author: req.session.userInfo._id,  //写回复的用户id。这条回复是谁写的
                        replyUser  //回复的父级评论的用户id，被回复的那个人
                    }
                }
            })
            .then(()=>{
                res.send({code:0, message:"回复成功"});           
            })       
        }) 
    })
});

//子级回复的点赞功能
router.post("/like/replay", async (req,res)=>{
    let {parentId, childId, childIndex} = req.body;
    let parentDoc =  await messageDB.findById(parentId);//父文档
    let childDoc = await parentDoc.children.id(childId);//子文档。当前点赞的子级回复数据
    // console.log(child);

    //父级评论的id是否存在
    if(!parentDoc) return res.send({code:1, message:"父级评论的id不存在，没有这条父评论"});
    //子级评论的id是否存在
    if(!childDoc) return res.send({code:1, message:"子级评论的id不存在，没有这条子回复"});

    //修改子评论的likes
    let userId = req.session.userInfo._id; //当前发起请求的用户的id
    //判断用户是否点过赞 / 判断当前点击按钮的用户是否存在likes数组中
    if(childDoc.likes.includes(userId)){
        //存在，点过赞了，要取消赞
        await messageDB.findByIdAndUpdate(parentId, { 
            $pull:{
                [`children.${childIndex}.likes`]:userId
            } 
        }); //在数组中删除该用户id
    }else{
        //没点过赞，要点赞
        await messageDB.findByIdAndUpdate(parentId, { 
            $push:{
                [`children.${childIndex}.likes`]:userId
            } 
        }); //在数组中删除该用户id
    }
    res.send({
        code:0,
        message:"点赞/取消点赞的操作已经完成"
    })
});

module.exports = router