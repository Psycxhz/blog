const mongoose = require('mongoose');
// const {userTable} = require("../../datasheel/userTable");//userinfo表的操作对象
const Schema = mongoose.Schema
const message = new Schema({
    content : {
        type:String,
        required:true
    },//回复的内容
    data:{
        type:String,
        default:Date.now
    },//回复的时间
    likes:[
        {type:Schema.Types.ObjectId}
    ],//点赞的人数
    author:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },//回复人的id
    children:[
        {
            content : String,//二级回复的内容
            data:{
                type:String,
                default:Date.now
            },//二级回复的时间
            likes:[
                {type:Schema.Types.ObjectId}
            ],//二级回复的点赞数
            author:{
                type:Schema.Types.ObjectId,
                ref:'users',
            },//二级中谁回复的id
            replyUser:{type: Schema.Types.ObjectId, ref:"users"}//回复的谁//获取父级的id
        }
    ]
})

module.exports = mongoose.model("messageTab", message);