const BASEURl = 'https://easy-mock.com/mock/5ea80920345da32ea0fae627/mini-shop-vue/'
const LOCALURL = 'http://localhost:3000/'
const url ={
  getShoppingMailInfo : BASEURl + 'index',  //商城首页信息
  getGoodsInfo : BASEURl + 'getGoodsInfo',   //商品信息
  registerUser : LOCALURL + 'user/register', //用户注册接口
  loginUser : LOCALURL + 'user/login', //用户注册接口
  getDetailGoodsInfo : LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
  getCategoryList : LOCALURL + 'goods/getCategoryList', //获取大类详情
  getCategorySubList : LOCALURL + 'goods/getCategorySubList', //获取小类详情
}
module.exports = url

