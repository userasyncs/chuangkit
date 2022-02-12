<template>
  <div class="preview">
      <div class="box">

      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.preview{
    position: absolute;
    left: 0;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.3);
    width: 100%;
    height: 100%;
    z-index: 999999;
    .box{
        position: absolute;
        left: 0;
        bottom: 0.53rem;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.1);
        filter: blur(10px);
    }
}
</style>