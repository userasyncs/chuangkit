<template>
  <div>
        <div class="fanh" v-show="fhShow" @click="back">
  </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            fhShow:false
        }
    },
    created(){
        this.scroll();
    },
    methods:{
        scroll(){
      window.addEventListener("scroll",()=>{
        let st=document.documentElement.scrollTop||document.body.scrollTop;
        if (st>this.top) {
          this.fhShow=true;
        }else{
          this.fhShow=false;
        }
      })
    },
    back(){
      document.documentElement.scrollTop=0;
      document.body.scrollTop=0;
    }
    },
    props:{
        top:{

        }
    }
}
</script>

<style lang="scss" scoped>
.fanh{
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: url(~assets/image/index/fh.png);
    background-size: cover;
    position: fixed;
    bottom: 0.6rem;
    right: 0.2rem;
  }
</style>