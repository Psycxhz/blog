const express = require('express');
const route = express();
const {userTable} = require('../../datasheel/userTable');
const multer = require('multer');
const path = require('path')
let name = null
let storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,'../../pulice/images'));
    },
    filename:function(req,file,callback){
        let data = new Date();
        let exe = file.originalname
        name = `${data.getTime()+exe}`
        callback(null,name);
    }
})
let upload = multer({
    storage
})

route.post('/head',upload.array('header',1),(req,res)=>{
    // console.log(name);
    res.send({
        code:0,
        message:'失败',
        data:req.files[0].originalname
    }) 
})
route.post('/headimg',upload.array('header',1),(req,res)=>{
    let str = `/images/${name}`;
    // console.log(str);
    req.session.userInfo.img = str
    userTable.updateOne({
        name:req.session.userInfo.name
    },{
        $set:{
            img:req.session.userInfo.img
        }
    }).then((data)=>{
        res.send(str)
    })
})
module.exports = route