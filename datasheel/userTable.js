const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//表规则
let rule = new Schema({
    name:{
        type:String,
        required:true    
    },
    pass:{
        type:String,
        required:true    
    },
    img:{
        type:String,
        required:true    
    },
    root:{
        type:Boolean,
        required:true
    }
});
let userTable = mongoose.model('users',rule);

module.exports = {userTable};//导出用户表