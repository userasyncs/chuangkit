<template>
  <div class="loads" :style="{height:h+'%'}" v-show="$store.state.loadFlag">
    <van-loading size="36px"  color="#0094ff" vertical>加载中...</van-loading>
  </div>
</template>

<script>
export default {
    props:{
        h:{

        }
    }
};
</script>

<style lang="scss" scoped>
.loads {
  position: fixed;
  left: 0;
  bottom: 0.52rem;
  background: #fff;
  width: 100%;
  z-index: 9999;
  padding-top: 1rem;
  box-sizing: border-box;
}
</style>