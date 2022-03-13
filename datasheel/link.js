const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const linkSchema = new Schema({ //友链信息表规则
    name:String, //友链名称
    home:String, //友链地址
    logo:String, //图标
    describe:String //描述
});
module.exports = mongoose.model("link", linkSchema); 