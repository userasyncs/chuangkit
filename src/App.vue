<template>
  <div id="nav">
  </div>
<!-- <router-view/> -->
  <router-view v-slot="{ Component }">
  <keep-alive include="Home,ScenePage">
    <component :is="Component" />
  </keep-alive>
</router-view>
</template>

<style lang="scss">
a{
  object-fit: cover;
}
</style>
