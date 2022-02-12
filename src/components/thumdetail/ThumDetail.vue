<template>
  <div class="thumdetail">
      <ul class="list" v-for="(col,index) in cols" :key="index" :style="{width:w+'rem'}">
          <li v-for="item in col.list">
              <img :src="'https:'+item.designTemplateThumbUrls[0]+'?&x-oss-process=image/resize,w_300/format,jpg'" alt="">
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
        w:{

        },
        templates:{

        },
        page:{

        },
    },
    data(){
        return {
            cols:[{
                h:0,
                list:[]
            },{
                h:0,
                list:[]
            }]
        }
    },
    watch:{
    templates:{
        deep:true,
        handler(){
            this.cols=[{
                h:0,
                list:[]
            },{
                h:0,
                list:[]
            }]
          this.templates.forEach(item => {
              let index=this.cols[0].h>this.cols[1].h?1:0;
              let h=parseInt(item.height)/parseInt(item.width)*1.68;
              this.cols[index].h+=h;
              item.h=h+'rem';
              this.cols[index].list.push(item)
          });
        }
    }  
    }
}
</script>

<style lang="scss" scoped>
.thumdetail{
    width: 3.75rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .list{
        li{
            width: 100%;
            margin-top: 0.05rem;
            img{
                border: 0.02rem solid #e6e6e6;
                width: 100%;
            }
        }
    }
}
</style>