const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema({ //反馈表规则
    name:{
        type:String,
        required:true
    }, //名字
    email:{
        type:String,
        required:true
    }, //邮箱
    message:{
        type:String,
        required:true
    }, //反馈内容
    date:{
        type:Number,
        default:Date.now
    },
    reading:{ //管理员是否阅读过该条反馈  
        type:Boolean,
        default: false
    }
});
module.exports = mongoose.model("contact", contactSchema); 