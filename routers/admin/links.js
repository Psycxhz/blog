const express = require('express');
const router = express.Router();
const linkDB = require('../../datasheel/link');
const {URL} = require('url')
router.post('/addlink',async (req,res)=>{
    let {origin} = new URL(req.body.home);
    //根据正则匹配查询home字段值里有没有同一个网站的友链
    let linkDoc = await linkDB.findOne({home: new RegExp(origin)}); 
    if(linkDoc) return res.send({code:10, message:"请不要重复添加相同网站下的友链！"});
    await linkDB.create(req.body);
    res.send({code:0, message:"添加友链成功"});
})

router.post("/update", async (req,res)=>{
    let {_id, name, home, logo, describe} = req.body;
    //数据校验： 友链id是否存在  
    let linkDoc = await linkDB.findById(_id);
    if(!linkDoc) return res.send({code:1, message:"你要修改的这条友链不存在，请检查！"});
    
    await linkDB.findByIdAndUpdate(_id, {name, home, logo, describe}); //到数据表中修改数据
    res.send({code:0, message:"友链修改成功"});
});

//删除友链数据
router.delete("/delete", async (req,res)=>{
    let {_id} = req.body; //友链id
    // 友链存在，才进行删除
    let linkDoc = await linkDB.findById(_id);
    if(!linkDoc) return res.send({code:1, message:"你要删除的这条友链不存在，请检查！"});

    await linkDB.findByIdAndDelete(_id); //根据id删除数据
    res.send({code:0, message:"友链删除成功"});
});

module.exports = router