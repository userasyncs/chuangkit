<template>
  <div>
    <main-tab-bar></main-tab-bar>
  <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
  </div>
</template>

<script setup>
import MainTabBar from '../components/main/MainTabBar.vue';
</script>
<script>
export default {
  name:"Home"
}
</script>
