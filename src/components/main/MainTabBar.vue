<template>
  <tab-bar>
    <tab-bar-item path="/index" activeColor="#000">
      <!-- 在这里使用别名,在路径前边加上~ -->
      <template v-slot:item-icon>
        <img src="~/assets/image/tabbar/sy.png" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~/assets/image/tabbar/sy2.png" alt="" />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/design" activeColor="#000">
     <template v-slot:item-icon>
        <img src="~/assets/image/tabbar/sj.png" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~/assets/image/tabbar/sj2.png" alt="" />
      </template>
      <template v-slot:item-text>
        <div>我的设计</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#000">
      <template v-slot:item-icon>
        <img src="~/assets/image/tabbar/profile.png" alt="" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~/assets/image/tabbar/profile2.png" alt="" />
      </template>
      <template v-slot:item-text>
        <div>个人中心</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/tabbar/TabBar.vue";
import TabBarItem from "components/tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
.tab_bar_item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>