<template>
  <div class="screen">
    <ul class="sorttype">
      <li
        :class="{ active: result.sortNum == index }"
        @click="result.sortNum = index;result.page=1"
        v-for="(item, index) in sortType"
      >
        {{ item }}
      </li>
      <li style="width: 0.43rem; marginright: 0" @click="changeShowPrice">
        {{ res }}
      </li>
    </ul>
    <ul class="priceType" v-show="showprice">
      <li
        :class="{ active: result.priceNum == index }"
        v-for="(item, index) in priceType"
        :key="index"
        @click="result.priceNum = index;result.page=1"
      >
        {{ item }}
      </li>
    </ul>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <thum-detail
        :templates="templates"
        w="1.69"
        style="marginTop: 1.5rem"
      ></thum-detail>
    </van-list>
    <loads :h="78" :bot="0"></loads>
  </div>
</template>

<script>
import Loads from "../load/Loads.vue";
import ThumDetail from "../thumdetail/ThumDetail.vue";
export default {
  components: { ThumDetail, Loads },
  data() {
    return {
      sortType: ["最新", "最热", "使用最多", "最多收藏"],
      res: "筛选",
      showprice: false,
      priceType: ["全部", "免费", "付费"],
      result: {
        priceNum: 0,
        sortNum: 0,
        page: 0,
      },
      templates: [],
      loading: false,
      finished: false, 
      total: 0,
    };
  },
  props: {
    useId: {},
    name: {},
    id: {},
    cosel:{

    }
  },
  watch: {
    useId() {
      this.getUrl();
    },
    result: {
      deep: true,
      handler() {
        this.getUrl();
      },
    },
  },
  methods: {
    onLoad() {
      this.result.page++;
    },
    changeShowPrice() {
      this.showprice = !this.showprice;
      if (this.showprice) {
        this.res = "收起";
      } else {
        this.res = "筛选";
      }
    },
    async getUrl() {
      let params=this.cosel?"&style_id=" +this.useId:"&use_id=" +this.useId
      this.$store.commit("changeFlag", true);
      document.documentElement.style.overflow = "hidden";
      let url = await fetch(
        "/v1/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&type=0&page_no=" +
          this.result.page +
          "&sid=" +
          this.id +
          "&is_new=1&price_type=" +
          this.result.priceNum +
          "&sort_type=" +
          this.result.sortNum +
          "&name=" +
          this.name +
          "&_dataClientType=3"+params
      ).then((r) => r.json());
      let res = await fetch(
        "/pub/" + url.body.cacheUrl.split("pub-cdn-oss.chuangkit.com")[1]
      ).then((r) => r.json());
      // console.log(res);
      if (this.result.page>1) {
          this.templates.push(...res.body.templates)
      }else{
          this.templates = res.body.templates;
      }
      this.total = res.body.totalCount;
      this.loading=false;
      if (this.templates.length >= this.total) {
        this.finished = true;
      }
      setTimeout(() => {
        this.$store.commit("changeFlag", false);
        document.documentElement.style.overflow = "auto";
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.screen {
  width: 3.75rem;
  .sorttype {
    width: 3.75rem;
    padding: 0.14rem 0.12rem;
    box-sizing: border-box;
    display: flex;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0.97rem;
    z-index: 999;
    li {
      display: inline-block;
      width: auto;
      height: 0.3rem;
      margin-right: 0.108rem;
      background: #f3f4f9;
      font-size: 0.12rem;
      line-height: 0.3rem;
      padding: 0 0.11rem;
      border-radius: 0.15rem;
      text-align: center;
    }
    .active {
      background: #0773fc;
      color: #fff;
    }
  }
  .priceType {
    width: 3.75rem;
    padding: 0.14rem 0.12rem;
    padding-top: 0;
    box-sizing: border-box;
    display: flex;
    background: #fff;
    position: fixed;
    left: 0;
    top: 1.5rem;
    z-index: 999;
    li {
      width: 0.5rem;
      height: 0.3rem;
      margin-right: 0.11rem;
      background: #f3f4f9;
      font-size: 0.12rem;
      line-height: 0.3rem;
      border-radius: 0.15rem;
      text-align: center;
    }
    .active {
      background: #0773fc;
      color: #fff;
    }
  }
}
</style>