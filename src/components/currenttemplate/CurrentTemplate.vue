<template>
  <div class="currentTemplate">
      <div class="imgWarp"  v-if="datas">
          <img :src="'https:'+datas.designTemplateImageUrl+'?&x-oss-process=image/resize,w_600/format,jpg'" :style="{height:parseInt(datas.height)/parseInt(datas.width)*2.37+'rem'}" alt="">
      </div>
      <div class="content">
          <p class="title"  v-if="datas">{{datas.currentTemplate}}</p>
          <p class="hb"  v-if="datas">{{datas.kindTitle}}</p>
          <p class="text"  v-if="datas">
        图片编号为{{datas.designTemplateId}}，该手机海报尺寸是{{datas.width}} *
        {{datas.height}}。点击“立即使用”，《{{datas.templateTitle}}》一键生成，在线编辑图片，简单托拉拽，秒出精美手机海报。
          </p>
          <ul class="keywords"  v-if="datas">
              <li v-for="item in getKeyword(datas.keywords)" @click="searchRouter(item)">{{item}}</li>
          </ul>
          <p class="tj">为你推荐</p>
        <thum-detail
        :templates="templates"
        w="1.69"
      ></thum-detail>
      </div>
      <loads :h="100" bot="0"></loads>
    <footer>
        <div class="sc" @click="sumbit('收藏成功',true)">
            <span v-if="iconShow" class="iconfont">&#xe635;</span>
            <span v-else class="iconfont">&#xe63b;</span>
        </div>
        <div class="bj" @click="sumbit('编辑成功',false)">
            立即编辑
        </div>
    </footer>
    <login></login>
  </div>
</template>

<script>
import Loads from '../load/Loads.vue'
import Login from '../login/Login.vue'
import ThumDetail from '../thumdetail/ThumDetail.vue'
import { Notify } from 'vant';
export default {
  components: { ThumDetail, Loads, Login },
  data(){
      return {
          templates:[],
          datas:"",
          iconShow:true
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
        this.datas=res.body.currentTemplate;
          this.templates=res.body.recommendedTemplates;
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
      },
      sumbit(value,flag){
          if (!this.$store.state.token) {
              this.$store.commit("changeProupshow",true)
          }else{
              Notify({ type: 'success', message: value });
              if (flag) {
              this.iconShow=false;
             }else{
                this.iconShow=true; 
             }
          }
      }
  },
  watch:{
      $route:{
          deep:true,
          handler(){
              this.getData(this.$route.params.id)
              document.documentElement.scrollTop=0;
              document.body.scrollTop=0;
          },
      }
  }
}
</script>

<style lang="scss" scoped>
.currentTemplate{
    width: 3.75rem;
    padding: 0 0.12rem;
    padding-bottom: 0.71rem;
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
            object-fit: cover;
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
    footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.71rem;
        background: #fff;
        z-index: 999;
        padding: 0 0.12rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .sc{
            width: 0.48rem;
            height: 0.48rem;
            text-align: center;
            line-height: 0.48rem;
            span{
                font-size: 0.26rem;
                color: red;
            }
        }
        .bj{
            background: #0773fc;
            width: 2.92rem;
            height: 0.48rem;
            color: #fff;
            text-align: center;
            line-height: 0.48rem;
            font-size: 0.15rem;
            border-radius: 0.04rem;
        }
    }
}
</style>