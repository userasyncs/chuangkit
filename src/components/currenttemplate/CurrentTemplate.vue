<template>
  <div class="currentTemplate">
      <div class="imgWarp">
          <img :src="'https:'+datas.designTemplateImageUrl+'?&x-oss-process=image/resize,w_600/format,jpg'" alt="">
      </div>
      <div class="content">
          <p class="title">{{datas.currentTemplate}}</p>
          <p class="hb">{{datas.kindTitle}}</p>
          <p class="text">
        图片编号为{{datas.designTemplateId}}，该手机海报尺寸是{{datas.width}} *
        {{datas.height}}。点击“立即使用”，《{{datas.templateTitle}}》一键生成，在线编辑图片，简单托拉拽，秒出精美手机海报。
          </p>
          <ul class="keywords">
              <li v-for="item in getKeyword(datas.keywords)" @click="searchRouter(item)">{{item}}</li>
          </ul>
          <p class="tj">为你推荐</p>
        <thum-detail
        :templates="templates"
        w="1.69"
      ></thum-detail>
      </div>
      <loads :h="100" bot="0"></loads>
  </div>
</template>

<script>
import Loads from '../load/Loads.vue'
import ThumDetail from '../thumdetail/ThumDetail.vue'
export default {
  components: { ThumDetail, Loads },
  data(){
      return {
          templates:[],
          datas:""
      }
  },
  created(){
      this.getData(this.$route.params.id)
  },
  methods:{
    //   recommendedTemplates
      async getData(id){
          this.$store.commit("changeFlag", true);
          document.documentElement.style.overflow = "hidden";
          let res=await fetch("/v1/designtemplate/getDetailCacheFileUrl.do?_dataType=json&_dataClientType=3",{
              method:"POST",
              headers:{
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body:"client_type=40&id="+id
          }).then(r=>r.json())
        //   console.log(res);
          this.templates=res.body.recommendedTemplates;
          this.datas=res.body.currentTemplate;
         setTimeout(() => {
        this.$store.commit("changeFlag", false);
        document.documentElement.style.overflow = "auto";
      }, 200);
      },
      getKeyword(keyword){
          if (keyword) {
          let arr= keyword.split(" ");
          return arr;
          }
      },
      searchRouter(keyword){
        this.$router.push({
        path:`/searchdetail/${keyword}`
      })
      }
  },
  watch:{
      $route:{
          deep:true,
          handler(){
              document.documentElement.scrollTop=0;
              document.body.scrollTop=0;
              this.getData(this.$route.params.id)
          },
      }
  }
}
</script>

<style lang="scss" scoped>
.currentTemplate{
    width: 3.75rem;
    padding: 0 0.12rem;
    box-sizing:border-box ;
    .imgWarp{
        width: 100%;
        height: 4.53rem;
        background: #e3e6e9;
        border-radius: 0.08rem;
        padding: 0.16rem;
        box-sizing: border-box;
        text-align: center;
        img{
            width: 2.37rem;
            height: 4.21rem;
        }
    }
    .content{
        width: 100%;
        .title{
            font-weight: bolder;
            margin: 0.18rem 0 0.12rem 0 ;
            font-size: 0.18rem;
        }
        .hb{
            color: rgba(0,0,0,.6);
            font-size: 0.14rem;
            margin-bottom: 0.12rem;
        }
        .text{
            font-size: 0.14rem;
            margin-bottom:0.12rem ;
        }
    }
    .keywords{
        width: 100%;
        height: 0.39rem;
        li{
            display: inline-block;
            width: auto;
            padding: 0 0.14rem;
            height: 0.31rem;
            margin: 0 0.05rem 0.08rem 0;
            line-height: 0.31rem;
            font-size:0.12rem ;
            border-radius: 0.15rem;
            background: #f3f4f9;
        }
    }
    .tj{
        margin: 0.12rem 0 0.2rem 0;
        font-weight: bolder;
        font-size: 0.17rem;
    }
}
</style>