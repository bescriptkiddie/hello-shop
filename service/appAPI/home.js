const Router = require ('koa-router')
let router = new Router()

router.get('/',async(ctx)=>{
  ctx.body="这是主页"
})

module.exports=router;
