<template>
  <div class="home">
    <div class="load" v-show="showLoad">
      <span
        class="iconfont"
        @click="showLoad = false"
        style="color: #fff; marginleft: 0.1rem"
        >&#xe6ef;</span
      >
      <img
        src="https://m.chuangkit.com/ziyuan/images/cktlogo.jpg"
        style="width: 1.71rem; height: 0.48rem"
        alt=""
      />
      <div class="dakai">APP内打开</div>
    </div>
    <search :showLoad="showLoad">
        200000+ 免费模板任你搜索
    </search>
    <div
      class="scene"
      :style="{ marginTop: showLoad ? 1.2 + 'rem' : 0.54 + 'rem' }"
    >
      <ul class="scene_list">
        <li
          @click="router(item)"
          v-for="item in scene_list.slice(0, 8)"
          :key="item.id"
        >
          <img :src="'https:' + item.thumbUrl" alt="" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <recommend></recommend>
    <template v-for="(item, index) in details" :key="index">
      <scene-details
        @change-templates="changeTemplates"
        :item="item"
        :index="index"
        v-if="details.length"
      ></scene-details>
    </template>
    <loads h="75" :bot="0.52"></loads>
    <div style="height: 0.52rem"></div>
    <back-to-top :top="500"></back-to-top>
    <preview w="2.4"></preview>
  </div>
</template>

<script>
import Recommend from "../../components/recommend/Recommend.vue";
import SceneDetails from "../../components/SceneDetails.vue";
import Search from "../../components/search/Search.vue";
import Loads from "../../components/load/Loads.vue";
import BackToTop from '../../components/bacototop/BackToTop.vue';
import Preview from '../../components/preview/Preview.vue';

export default {
  components: {
    Search,
    Recommend,
    SceneDetails,
    Loads,
    BackToTop,
    Preview,
  },
  data() {
    return {
      scene_list: [],
      details: [],
      flag: true,
      page: 1,
      total: "",
      showLoad: true,
    };
  },
  created() {
    this.getData();
    this.scroll();
  },
  methods: {
    async getData() {
      this.$store.commit("changeFlag", true);
      document.documentElement.style.overflow = "hidden";
      let res = await fetch(
        "/v2/mobile/main/getMainMiniProgramHomeInfo.do?_dataType=json&_dataClientType=3&client_type=40"
      ).then((r) => r.json());
      // console.log(res);
      this.scene_list = res.body.data.scene;
      this.details = res.body.data.sceneDetails.sceneDetail;
      this.total = res.body.data.sceneDetails.totalCount;
      setTimeout(() => {
        this.$store.commit("changeFlag", false);
        document.documentElement.style.overflow = "auto";
      }, 400);
    },
    changeTemplates(obj) {
      this.details[obj.index].templates = obj.data;
    },
    async getNextData() {
      let res = await fetch(
        "/v2/mobile/main/getSceneDetail.do?_dataType=json&_dataClientType=3&client_type=40&page_no=" +
          this.page
      ).then((r) => r.json());
      this.details.push(...res.body.data.sceneDetail);
      this.flag = true;
    },
    sole() {
      if (this.total == this.details.length) {
        window.removeEventListener("scroll", this.sole);
      } else {
        let time;
        clearTimeout(time);
        time = setTimeout(() => {
          let H = window.innerHeight;
          let h = document.body.offsetHeight;
          let st =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (st + H > h - 50 && this.flag) {
            this.flag = false;
            this.page++;
            this.getNextData();
          }
        }, 100);
      }
    },
    scroll() {
      window.addEventListener("scroll", this.sole);
    },
    router(item) {
      this.$router.push({
        path: `/scenepage/${item.designKindId}/${item.name}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 3.75rem;
  .load {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    background: #0773fc;
    height: 0.58rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .dakai {
      width: 1.12rem;
      height: 0.3rem;
      color: #0773fc;
      background: #fff;
      text-align: center;
      line-height: 0.3rem;
      border-radius: 0.15rem;
      font-size: 0.13rem;
      margin-right: 0.1rem;
    }
  }
  .scene {
    width: 3.75rem;
    padding: 0 0 0.14rem;
    box-sizing: border-box;
    border-bottom: 0.04rem solid #f8f8f8;
    .scene_list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 0.85rem;
        height: 0.75rem;
        margin-bottom: 0.25rem;
        text-align: center;
        font-size: 0.12rem;
        img {
          width: 0.55rem;
          height: 0.55rem;
          display: block;
          margin: auto;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
}
</style>