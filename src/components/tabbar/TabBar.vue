<template>
     <div id="tab-bar">
         <slot>
             
         </slot>
    </div>
</template>

<script>
export default {
    name:"TabBar"
}
</script>

<style>
#tab-bar{
  display: flex;
  background: #fff;
  width: 100%;
  height: 0.53rem;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  /* box-shadow: 0 -1px 1px rgba(100, 100, 100, .2); */
}
</style>