<template>
  <div>
    <div class="navbar-div" sticky>
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}"
                  v-for="(item,index) in category" :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div id="rightNav">
            <div class="tabCategorySub">
              <van-tabs v-model="active">
                <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>

              </van-tabs>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'

  export default {
    data() {
      return {
        category: [],
        categoryIndex: 0,
        categorySub: [], //小类类别
        active:0, //激活标签
      }
    },
    created() {
      this.getCategory()
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight
      document.getElementById("leftNav").style.height = winHeight - 46 + 'px'
    },
    methods: {
      getCategory() {
        axios({
          url: url.getCategoryList,
          method: 'post'
        })
          .then(response => {
            // console.log(response)
            if (response.data.code == 200 && response.data.message) {
              this.category = response.data.message
              this.getCategorySubByCategoryId(this.category[0].ID)
            } else {
              Toast('大类数据获取失败')
            }
          }).catch(error =>{
            console.log(error)
        })
      },
      //点击获取ID
      //点击大类的方法
      clickCategory(index,categoryId){
        this.categoryIndex=index
        this.getCategorySubByCategoryId(categoryId)
      },
      //根据大类ID读取小类类别列表
      getCategorySubByCategoryId(categoryId){
        axios({
          url:url.getCategorySubList,
          method:'post',
          data:{categoryId:categoryId}
        })
          .then(response=>{
            if(response.data.code == 200 && response.data.message ){
              this.categorySub=response.data.message
              this.active = 0
            }else{
              Toast('小类数据取得失败')
            }
          })
          .catch(error=>{
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
  #leftNav {
    background-color: aliceblue;
  }

  #leftNav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #E4E7ED;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
  }

  /*反白效果*/
  .categoryActive {
    background-color: #fff;
  }
</style>
