<template>
  <div>
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3"><img :src="locationIcon" width="70%" class="location-icon"/></van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
        <van-col span="5">
          <van-button size="small">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swipwer area-->
    <div class="swipwer-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index" style="width: 20rem">
          <img v-lazy="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type-bar-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%"/>
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options ="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floor1_0.image" width="100%"/>
        </div>
        <div class="floor-two">
          <div >
            <img :src="floor1_1.image" width="100%"/>
          </div>
          <div>
            <img :src="floor1_2.image" width="100%"/>
          </div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item ,index) in floor1.slice(3)" :key="index">
          <img :src="item.image" width="100%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import SwiperDefault from "../swiper/SwiperDefault";
  import SwiperDefault2 from "../swiper/SwiperDefault2";
  import SwiperDefault3 from "../swiper/SwiperDefault3";
  import SwiperText from "../swiper/SwiperText";
  export default {
    data() {
      return {
        swiperOption:{
          slidesPerView:3
        },
        locationIcon: require('../../assets/images/locationIcon.png'),
        bannerPicArray: [],
        category: [],
        adBanner:[],
        recommendGoods:[],
        floor1:[],
        floor1_0:{},
        floor1_1:{},
        floor1_2:{},
      }
    },
    created() {
      axios({
        url: 'https://easy-mock.com/mock/5ea80920345da32ea0fae627/mini-shop-vue/index',
        method: 'get',
      }).then(response => {
        console.log(response)
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture //获得广告图片
          this.bannerPicArray = response.data.data.slides   //轮播图片
          this.recommendGoods = response.data.data.recommend  //推荐商品
          this.floor1 = response.data.data.floor1  //楼层信息
          this.floor1_0 = this.floor1[0]
          this.floor1_1 = this.floor1[1]
          this.floor1_2 = this.floor1[2]
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    components: {
      Swiper,
      SwiperSlide,
      SwiperDefault,
      SwiperDefault2,
      SwiperDefault3,
      SwiperText
    },
  }
</script>

<style scoped>
  .search-bar {
    height: 2.6rem;
    background-color: #e5017d;
    line-height: 2.2rem;
  }

  .search-input {
    width: 100%;
    height: 1.5rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #ffffff !important;
    background-color: #e5017d;
    color: #fff;
  }

  .location-icon {
    padding-top: .2rem;
    padding-left: .3rem;
    margin-top: .1rem;
  }

  .swipwer-area {
    max-height: 9rem;
    overflow:hidden;
    clear: both;
  }

  .type-bar {
    background-color: #fff;
    margin: 0 .1rem .3rem .1rem;
    border-radius: .3rem;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
  }

  .type-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#e5017d;
  }

  .recommend-body{
    border-bottom: 1px solid #eee;
  }

  .recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }

  .floor-anomaly{
    display: flex;
    flex-direction:row;
    background-color: #fff;
    border-bottom:1px solid #ddd;
  }

  .floor-anomaly div{
    width:10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .floor-one{
    border-right:1px solid #ddd;
  }

  .floor-two div{
    border-bottom:1px solid #ddd;
  }

  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    background-color: #fff;

  }
  .floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:10rem;
    border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
  }

</style>
