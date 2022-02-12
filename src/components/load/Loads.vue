<template>
  <div class="loads" :style="{height:h+'%',bottom:bot+'rem'}" v-show="$store.state.loadFlag">
    <van-loading size="36px"  color="#0094ff" vertical>加载中...</van-loading>
  </div>
</template>

<script>
export default {
    props:{
        h:{

        },
        bot:{

        }
    }
};
</script>

<style lang="scss" scoped>
.loads {
  position: fixed;
  left: 0;
  background: #fff;
  width: 100%;
  z-index: 9999;
  padding-top: 1rem;
  box-sizing: border-box;
}
</style>