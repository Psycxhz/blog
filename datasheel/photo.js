const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const photoSchema = new Schema({ //友链信息表规则
    imgUrl:String, //图片地址
});

module.exports = mongoose.model("photo",photoSchema)