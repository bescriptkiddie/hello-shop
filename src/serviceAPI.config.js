const BASEURl = 'https://easy-mock.com/mock/5ea80920345da32ea0fae627/mini-shop-vue/'
const LOCALURL = 'http://localhost:3000/'
const url ={
  getShoppingMailInfo : BASEURl + 'index',  //商城首页信息
  getGoodsInfo : BASEURl + 'getGoodsInfo',   //商品信息
  registerUser : LOCALURL + 'user/register', //用户注册接口
}
module.exports = url

