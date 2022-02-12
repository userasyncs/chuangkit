<template>
  <div class="search" :style="{top:showLoad?0.58+'rem':0}">
      <div class="search_s" @click="router">
          <span class="iconfont">&#xe636;</span>
          <p>
              <slot></slot>
          </p>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        showLoad:{

        }
    },
    methods:{
        router(){
            this.$router.push({
                path:"/searchs"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.search{
    position: fixed;
    top: 0.58rem;
    left: 0;
    z-index: 999;
    width: 3.75rem;
    height: 0.54rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .search_s{
        width: 3.51rem;
        background: #f8f8f8;
        height: 0.34rem;
        border-radius: 0.17rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.13rem;
        p{
            margin-left: 0.04rem;
        }
    }
}
</style>