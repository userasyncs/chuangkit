<template>
  <div class="detail">
    <search> 在当前场景下搜索 </search>
    <div class="tabs">
      <ul class="tab" ref="tab">
        <li :class="{ active: tagId == 0 }" @click="tagId=0">全部</li>
        <li v-for="item in typeList" :class="{active:tagId==item.tagId}" @click="tagId=item.tagId" :key="item.tagId">{{ item.name }}</li>
      </ul>
    </div>
    <screen></screen>
  </div>
</template>

<script>
import Screen from '../screen/Screen.vue';
import Search from "../search/Search.vue";
export default {
  components: { Search ,Screen},
  data() {
    return {
      typeList: [],
      tagId: 0,
    };
  },
  created() {
    this.getData(this.$route.params.id);
  },
  methods: {
    async getData(id) {
      let res = await fetch(
        "/v1/home/getDesignType.do?_dataType=json&client_type=40&second_kind_id=" +
          id +
          "&_dataClientType=3"
      ).then((r) => r.json());
      console.log(res);
      this.typeList = res.body.secondKindInfo.repoTag.use;
      console.log(this.typeList);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 3.75rem;
  .tabs {
    width: 100%;
    margin-top: 0.54rem;
    padding: 0 0.4rem 0 0.14rem;
    box-sizing: border-box;
    height: 0.44rem;
    overflow: hidden;
    border-bottom: 0.02133rem solid #eee;
    .tab {
      display: flex;
      overflow: auto;
      li {
        display: inline-block;
        width: auto;
        margin-right: 0.2rem;
        font-size: 0.15rem;
        white-space: nowrap;
        line-height: 0.42rem;
      }
      .active {
        position: relative;
        font-weight: bolder;
      }
      .active::after {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
        bottom: 0;
        content: "";
        width: 0.2rem;
        height: 0.03rem;
        background: #0773fc;
        border-radius: 0.01rem 0.01rem 0 0;
      }
    }
  }
}
</style>