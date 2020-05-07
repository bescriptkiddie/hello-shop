const Koa = require('koa')
const app = new Koa()
//引入connect
const { connect , initSchema } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')

//装载所有子路由
let router = new Router();
router.use('/user',user.routes())
router.use('/home',user.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(async (ctx)=>{
  ctx.body = '<h>hello Koa</h>'
})
app.listen(3000,()=>{
  console.log('[service] starting at port 3000')
})


//立即执行函数
// ;(async () =>{
//   await connect()
//   initSchema()
//   const User = mongoose.model('User')
//   let firstUser = new User({userName:'pikachu',password:'123456'})
//   firstUser.save().then(()=>{
//     console.log('插入成功！')
//   })
//   let user = await User.findOne({}).exec()
//   console.log("------------")
//   console.log(user)
//   console.log("------------")
// })()
