const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mblog',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('成功连接数据库');
}).catch(()=>{
    console.log('数据库连接失败');
})
// const photoDB = require('../datasheel/photo');

// userTable.create({
//     name:'墨山人',
//     pass:'123456',
//         img:'http://127.0.0.1:8081/images/QQ图片20210418185851.jpg',
//     root:true
// }).then(rs=>{
//         console.log("1:");
//     })
// userTable.deleteMany({
//     _id:{
//         $exists:true
//     }
// }).then(rs=>{
//     console.log("删除成功:");
// })
// photoDB.create(
//     {imgUrl:"/images/phone/0C30387FC246E4523D6E70D611E9C523.jpg"},
//     {imgUrl:"/images/phone/0D27A81AE27614746BAB1D0990B839FA.jpg"},
//     {imgUrl:"/images/phone/0DF19A1AED2857670EC173ACDE3066AA.jpg"},
//     {imgUrl:"/images/phone/0E7B66E18703199783E0ED8AAAADC37A.jpg"},
//     {imgUrl:"/images/phone/1A2A604FE6B5E1FEF616709DEEC2DC0E.jpg"},
//     {imgUrl:"/images/phone/1D5E1E00FBB37C5D4A63E3E9876AFEE9.jpg"},
//     {imgUrl:"/images/phone/03A0204A2219ABF357F64AE6B152B6C0.jpg"},
//     {imgUrl:"/images/phone/5B5A786ED911C05B0820D7801157A83D.jpg"},
//     {imgUrl:"/images/phone/6D20315A7E99B2B3495CACC9430EBF31.jpg"},
//     {imgUrl:"/images/phone/8A2458C942A06616C00CFA05D3F15CEC.jpg"},
//     {imgUrl:"/images/phone/9CBF60575A844544974F07E67893F47A.jpg"},
//     {imgUrl:"/images/phone/51F5E044404A033A7CC3DE204A93C196.jpg"},
//     {imgUrl:"/images/phone/57C2310A009EA59E40EE4F4A3D98CF93.jpg"},
//     {imgUrl:"/images/phone/58CBB4CC089FD5F2302BA0388A294CDB.jpg"},
//     {imgUrl:"/images/phone/61B91702F53E3C779EF450AFFB1C5811.jpg"},
//     {imgUrl:"/images/phone/78A9FCD184BA02E53E9DEF97FBAE0757.jpg"},
//     {imgUrl:"/images/phone/84FDAF45384AE81982B7D91228EBC30A.jpg"},
//     {imgUrl:"/images/phone/480C9C5A1AA5E3746FC684F7214DD527.jpg"},
//     {imgUrl:"/images/phone/483BD550D597CBE88EEEE6B7FF1E024C.jpg"},
//     {imgUrl:"/images/phone/549B88A0096EB75CAF9D6ED2462353B7.jpg"},
//     {imgUrl:"/images/phone/593FED2F1F076EDD847B5138112C5BA8.jpg"},
//     {imgUrl:"/images/phone/603BC62877705CFCB497A089C47DB8A9.jpg"},
//     {imgUrl:"/images/phone/3661DF5B466D16E2282C459571BC684E.jpg"},
//     {imgUrl:"/images/phone/12640CA6912A51ED8001E08847BA34B1.jpg"},
//     {imgUrl:"/images/phone/866305BEF7E239B77952C9FF8542B5AB.jpg"},
//     {imgUrl:"/images/phone/877443C131D236FC337B2086686D267C.jpg"},
//     {imgUrl:"/images/phone/AC5A91111B8CAEA71AA417261A269DA4.jpg"},
//     {imgUrl:"/images/phone/ADB5F521E7A436FFBD3676650A2E8C58.jpg"},
//     {imgUrl:"/images/phone/B3961379A38611878940F6FBA3226A1E.jpg"},
//     {imgUrl:"/images/phone/C9E8AF98696B4203AAC4644C76BE7665.jpg"},
//     {imgUrl:"/images/phone/CD896C998F9916DD87443063AE133772.jpg"},
//     {imgUrl:"/images/phone/D735F191D0063A65A6FDD6F4675602CA.jpg"},
//     {imgUrl:"/images/phone/E5A9B16A49DBD06B15472587BB019AA1.jpg"},
//     {imgUrl:"/images/phone/F16913E3F0C6F0B85EC101815149A2DF.jpg"},
//     {imgUrl:"/images/phone/FC7596D20C2AAAB282377428AF1269D1.jpg"},
//     {imgUrl:"/images/phone/FDF10A47690DA4E92FFF0731AA1C72A9.jpg"},
//     ).then(()=>{
//         console.log(1);
//     })

