const Koa = require('koa')
const app = new Koa()
//引入connect
const { connect , initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')

//装载所有子路由
let router = new Router();
router.use('/user',user.routes())
router.use('/home',home.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行函数
;(async () =>{
  await connect()
  initSchemas()
  // const User = mongoose.model('User')
  // let firstUser = new User({userName:'pikachu',password:'123456'})
  // firstUser.save().then(()=>{
  //   console.log('插入成功！')
  // }).catch(()=>{
  //   console.log('插入失败')
  // })
  // let user = await User.findOne({}).exec()
  // console.log("------------")
  // console.log(user)
  // console.log("------------")
})()

app.listen(3000,()=>{
  console.log('[service] starting at port 3000')
})

