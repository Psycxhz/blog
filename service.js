const express = require('express');
const path = require('path')

const app = express();

require('./mongoose/mongo')//连接数据库

app.use(require("./cors/cors"));//解决跨域
app.use(express.json());//解析json格式
app.use(express.urlencoded({ extended: false }));//解析表单格式
app.use(require('./mongoose/session'));//实现session    
app.use(express.static('./pulice'));//配置静态服务器
app.use("/", require('./routers/index'));//导入所有路由

//监听路由中间件
app.use("/", require("./routers/index"));

app.get("*", (req,res)=>{
    //解决前后端路由冲突，让路由正确的跳回前端的路由
    res.sendFile(path.join(__dirname, "./pulice/index.html"));
});


app.listen(8081);
