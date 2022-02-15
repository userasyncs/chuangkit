<template>
  <div class="search">
      <div class="search_top">
         <div class="search_s">
          <span class="iconfont" style="margin:0 0.11rem;font-size:0.2rem">&#xe636;</span>
          <input class="inp" @keyup.enter="router(keyword)" v-model="keyword" type="text" placeholder="200000+ 免费模板任你搜索">
         </div>
      <span @click="$router.go(-1)">取消</span>
      </div>
      <div class="hot_search">
        <p>热门搜索</p>
        <ul class="hot_list">
          <li @click="router(item.keyword)" v-for="(item,index) in hotList" :key="index">{{item.keyword}}</li>
        </ul>
      </div>
      <div class="hot_search">
        <p>历史搜索</p>
        <ul class="hot_list">
          <li @click="router(item)" v-for="(item,index) in hoistoryList" :key="index">{{item}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  methods:{
    async getHotList(){
      let res=await fetch("/v2/template/getRecommendKeyword.do?_dataType=json").then(r=>r.json())
      // console.log(res);
      this.hotList=res.body.data;
    },
    router(keyword){
      if (!keyword) {
        return false;
      }
      if (this.id) {
          this.$router.push({
        path:`/searchdetail/${keyword}/${this.id}`
      })
      }else{
          this.$router.push({
        path:`/searchdetail/${keyword}`
      })
      }
     let index= this.hoistoryList.findIndex(item =>item==keyword);
     if (index==-1) {
       this.hoistoryList.push(keyword);
       localStorage.setItem("list",JSON.stringify(this.hoistoryList))
      }
    }
  },
  data(){
    return {
      hotList:[],
      keyword:"",
      hoistoryList:[],
      id:""
    }
  },
  created(){
    this.id=this.$route.query.id;
    this.getHotList()
    let list=localStorage.getItem("list");
    if (list) {
      this.hoistoryList=JSON.parse(list);
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 3.75rem;
  padding: 0 0.12rem;
  box-sizing: border-box;
  .search_top{
    width: 100%;
    padding: 0.05rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 0.44rem;
    justify-content: space-between;
    .search_s{
        width: 3.1rem;
        background: #f8f8f8;
        height: 0.34rem;
        border-radius: 0.17rem;
        display: flex;
        align-items: center;
        font-size: 0.13rem;
        .inp{
          border: none;
          outline: none;
          background: #f8f8f8;
          width: 3rem;
        }
        input::placeholder{
          font-size: 0.13rem;
        }
    }
       span{
          font-size: 0.12rem;
        }
  }
  .hot_search{
    width: 100%;
    padding-top: 0.19rem;
    box-sizing: border-box;
    p{
      font-size: 0.15rem;
      margin-bottom: 0.15rem;
    }
    .hot_list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        display: inline-block;
        width: auto;
        padding: 0 0.13rem;
        margin: 0 0.12rem 0.12rem 0;
        height: 0.3rem;
        line-height: 0.3rem;
        background-color: #f3f4f9;
        font-size: 0.13rem;
       color: rgba(0,0,0,.6);
       border-radius: 0.15rem;
      }
    }
  }
}
</style>