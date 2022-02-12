<template>
  <div>
  <div class="details">
      <div class="details_top">
          <p class="title">{{item.name}}</p>
          <p style="fontSize:0.12rem;color:#000;" @click="router(item.kindId,item.name)">进入场景</p>
      </div>
      <ul class="hand_list">
          <li @click="routers(url.designTemplateId)" :class="{borders:borderFlag}" v-for="url in item.templates" :key="url.id" :style="{width:getWidth(item)+'rem',height:parseInt(url.height)/parseInt(url.width)*getWidth(item)+'rem',}">
              <img :src="'https:'+url.designTemplateThumbUrls[0]+'?&x-oss-process=image/resize,w_300/format,jpg'" :style="{width:getWidth(item)+'rem',height:parseInt(url.height)/parseInt(url.width)*getWidth(item)+'rem',}" alt="">
          </li>
      </ul>
      <div class="btns">
         <button @click="router(item.kindId,item.name)">更多</button>
         <button @click="getUrl(item.kindId)">换一批</button>
      </div>
  </div>
  </div>
</template>

<script>
export default {
    props:{
        item:{

        },
        index:{

        }
    },
    data(){
        return {
            page:1,
            borderFlag:false
        }
    },
    methods:{
        getWidth(item){
            if (item.name=="横版海报"||item.name=="名片") {
                this.borderFlag=true;
                return 1.68
            }else{
                if (item.name=="直播悬浮标") {
                    this.borderFlag=true;
                }else{
                    this.borderFlag=false;
                }
                return 1.08
            }
        },
        async getUrl(kindId){
            this.page++;
            let url=await fetch("/v1/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&sid="+kindId+"&page_size=6&page_no="+this.page+"&_dataClientType=3").then(r=>r.json())
            let res=await fetch("/pub"+url.body.cacheUrl.split("cdn-oss.chuangkit.com")[1]).then(r=>r.json())
            this.$emit("changeTemplates",{
                data:res.body.templates,
                index:this.index
            })
        },
        router(id,name){
             this.$router.push({
        path: `/scenepage/${id}/${name}`,
         });
        },
        routers(id){
             this.$router.push({
                 path:`/currenttemplate/${id}`
             })
         }
    },
}
</script>
<style lang="scss" scoped>
.details{
    width: 3.75rem;
    padding:0 0.12rem;
    box-sizing: border-box;
    .details_top{
        width: 100%;
        height: 0.52rem;
        line-height: 0.52rem;
        display: flex;
        justify-content: space-between;
        .title{
            font-weight: bolder;
            color: #000;
        }
    }
    .hand_list{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            align-self: flex-end;
            margin-bottom: 0.15rem;
            img{
                display: block;
            }
        }
        .borders{
            border: 0.02rem solid #E9E9EA;
        }
    }
    .btns{
        width:100%;
        display: flex;
        justify-content: space-between;
        button{
            width: 1.7rem;
            background: #f3f4f9;
            font-size:0.13rem;
            text-align: center;
            height: 0.4rem;
            line-height: 0.4rem;
            border-radius: 0.2rem;
            border: 0;
            outline: 0;
        }
    }
}
</style>
