<template>
  <div class="screen">
      <ul class="sorttype">
          <li :class="{active:result.sortNum==index}" @click="result.sortNum=index" v-for="(item,index) in sortType">{{item}}</li>
          <li style="width:0.43rem;marginRight:0" @click="changeShowPrice">{{res}}</li>
      </ul>
      <ul class="priceType">
          <li :class="{active:result.priceNum==index}" v-for="(item,index) in priceType" :key="index" @click="result.priceNum=index">{{item}}</li>
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return {
            sortType:["最新","最热","使用最多","最多收藏"],
            res:"筛选",
            showprice:false,
            priceType:["全部","免费","付费"],
            result:{
            priceNum:0,
            sortNum:0,
            }
        }
    }
    ,methods:{
        changeShowPrice(){
            this.showprice=!this.showprice;
            if (this.showprice) {
                this.res="收起"
            }else{
                this.res="筛选"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.screen{
    width: 3.75rem;
    .sorttype{
        width: 3.75rem;
        padding: 0.14rem  0.12rem;
        box-sizing: border-box;
        display: flex;
        li{
            display: inline-block;
            width: auto;
            height: 0.3rem;
            margin-right: 0.11rem;
            background: #f3f4f9;
            font-size: 0.12rem;
            line-height: 0.3rem;
            padding: 0 0.11rem;
            border-radius: 0.15rem;
            text-align: center;
        }
        .active{
            background: #0773fc;
            color: #fff;
        }
    }
    .priceType{
        width: 3.75rem;
        padding: 0.14rem  0.12rem;
        padding-top:0;
        box-sizing: border-box;
        display: flex;
        li{
            width: 0.5rem;
            height: 0.3rem;
             margin-right: 0.11rem;
            background: #f3f4f9;
            font-size: 0.12rem;
            line-height: 0.3rem;
            border-radius: 0.15rem;
            text-align: center;
        }
        .active{
            background: #0773fc;
            color: #fff;
        }
    }
}
</style>