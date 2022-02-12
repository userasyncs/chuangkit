<template>
  <div class="detail">
    <search> 在当前场景下搜索 </search>
    <div class="tabs">
      <div class="jt"></div>
      <ul class="tab" ref="tab">
        <li :class="{ active: tagId == 0 }" @click="tagId = 0;res='全部'">全部</li>
        <li
          v-for="item in typeList"
          :class="{ active: tagId == item.tagId }"
          @click="tagId = item.tagId;res=item.name"
          :key="item.tagId"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <screen :useId="tagId" :name="res" :id="id"></screen>
    <div class="fanh">

    </div>
  </div>
</template>

<script>
import Screen from "../screen/Screen.vue";
import Search from "../search/Search.vue";
export default {
  components: { Search, Screen },
  data() {
    return {
      typeList: [],
      tagId: 0,
      res:"全部",
      id:"",
      showFh:false
    };
  },
  created() {
    this.id=this.$route.params.id;
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
      // console.log(this.typeList);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 3.75rem;
  .tabs {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0.54rem;
    background: #fff;
    z-index: 999;
    padding: 0 0.4rem 0 0.14rem;
    box-sizing: border-box;
    height: 0.44rem;
    overflow: hidden;
    border-bottom: 0.03133rem solid #eee;
    .jt {
      width: 0.23rem;
      height: 0.23rem;
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      background: url(~assets/image/index/bottom.png);
      background-size: cover;
    }
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
}
</style>