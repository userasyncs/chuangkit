<template>
  <div class="searchde">
    <div class="search_top">
      <div class="search_s">
        <span class="iconfont" style="margin: 0 0.11rem; font-size: 0.2rem"
          >&#xe636;</span
        >
        <input
          class="inp"
          type="text"
          placeholder="200000+ 免费模板任你搜索"
          v-model="keyword"
          @keyup.enter="getTemplates"
        />
      </div>
      <span @click="$router.go(-1)">取消</span>
    </div>
    <div class="tabs">
      <ul class="tab">
        <li :class="{ active: result.kindId == 0 }" @click="result.kindId = 0">
          全部
        </li>
        <li
          v-for="item in secondLabel"
          :class="{ active: result.kindId == item.kindId }"
          @click="result.kindId = item.kindId"
          :key="item.kindId"
        >
          {{ item.kindTitle }}
        </li>
      </ul>
    </div>
    <div class="sortWarp">
      <p class="num">{{ totalCount }}个模板</p>
      <span :class="{active:result.time_order==0}" @click="result.time_order=0">最热</span>
      <div
        style="width: 1px; height: 0.1rem; background: #000; margin: 0 0.1rem"
      ></div>
      <span :class="{active:result.time_order==1}" @click="result.time_order=1">最新</span>
    </div>
    <van-list
      v-show="totalCount"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
    <div style="padding:0 0.12rem;box-sizing:boder-box;">
            <thum-detail :templates="templates" w="1.70"></thum-detail>
    </div>
    </van-list>
    <div v-show="!totalCount">
     <div class="my">
    </div>
     <p class="mb">当前分类暂无模板</p>
    </div>
    <loads :h="78" :bot="0"></loads>
    <back-to-top :top="500"></back-to-top>
  </div>
</template>

<script>
import BackToTop from '../bacototop/BackToTop.vue';
import Loads from "../load/Loads.vue";
import ThumDetail from "../thumdetail/ThumDetail.vue";
export default {
  components: { ThumDetail, Loads, BackToTop, },
  data() {
    return {
      keyword: "",
      result: {
        kindId: 0,
        page: 1,
        time_order: 0
      },
      secondLabel: [],
      templates: [],
      loading: false,
      finished: false,
      totalCount: 0,
    };
  },
  methods: {
    async getDesign() {
      this.$store.commit("changeFlag", true);
      document.documentElement.style.overflow = "hidden";
      let res = await fetch(
        "/v2/designkind/getDesignKindBasicInfo.do?_dataType=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "client_type=40&type=2&_dataClientType=3",
        }
      ).then((r) => r.json());
    //   console.log(res);
      this.secondLabel = res.body.data.secondLabel;
      setTimeout(() => {
        this.$store.commit("changeFlag", false);
        document.documentElement.style.overflow = "auto";
      }, 200);
    },
    async getTemplates() {
      const obj = {
        client_type: 40,
        pageNo: 1,
        pageSize: 20,
        kw: this.keyword,
        second_kind_id: this.result.kindId,
        time_order: this.result.time_order,
        use_times_order: 0,
        collection_times_order: 0,
        _dataClientType: 3,
      };
      let str = "";
      for (const key in obj) {
        str += key + "=" + obj[key] + "&";
      }
     if (this.result.page == 1) {
        this.$store.commit("changeFlag", true);
      }
      document.documentElement.style.overflow = "hidden";
      str = str.slice(0, str.length - 1);
      let res = await fetch("/v2/template/wxSmallAppSearch.do?_dataType=json", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: str,
      }).then((r) => r.json());
    //   console.log(res);
      if (this.result.page==1) {
                this.templates = res.body.templates;
      }else{
          this.templates.push(...res.body.templates)
      }
      this.totalCount = res.body.totalCount;
      this.loading=false;
      if (this.totalCount==this.templates.length) {
          this.finished=true;
      }
      setTimeout(() => {
        this.$store.commit("changeFlag", false);
        document.documentElement.style.overflow = "auto";
      }, 200);
    },
    onLoad() {
        this.result.page++;
    },
  },
  created() {
    this.keyword = this.$route.params.keyword;
    this.getDesign();
    this.getTemplates();
  },
  watch: {
    result: {
      deep: true,
      handler() {
        this.getTemplates();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.searchde {
  width: 3.75rem;
  .search_top {
    width: 100%;
    padding: 0.05rem 0.12rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 0.44rem;
    justify-content: space-between;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: #fff;
    .search_s {
      width: 3.1rem;
      background: #f8f8f8;
      height: 0.34rem;
      border-radius: 0.17rem;
      display: flex;
      align-items: center;
      font-size: 0.13rem;
      .inp {
        border: none;
        outline: none;
        background: #f8f8f8;
        width: 3rem;
      }
      input::placeholder {
        font-size: 0.13rem;
      }
    }
    span {
      font-size: 0.12rem;
    }
  }
  .tabs {
    width: 100%;
    background: #fff;
    z-index: 999;
    padding: 0 0.12rem;
    box-sizing: border-box;
    height: 0.45rem;
    overflow: hidden;
    border-bottom: 0.02133rem solid #eee;
    margin-top: 0.44rem;
    .tab {
      display: flex;
      overflow: auto;
      li {
        display: inline-block;
        width: auto;
        margin-right: 0.2rem;
        font-size: 0.15rem;
        white-space: nowrap;
        line-height: 0.41rem;
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
  .sortWarp {
    width: 3.75rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    height: 0.57rem;
    display: flex;
    align-items: center;
    .num {
      font-size: 0.17rem;
      width: 2.76rem;
    }
    span {
      color: rgba($color: #000000, $alpha: 0.6);
      font-size: 0.12rem;
      display: block;
    }
    .active{
        color: rgba($color: #000000, $alpha: 0.8);
    }
  }
  .my{
      width: 1rem;
      height: 1rem;
      background: url(~assets/image/search/my.png);
      background-size: cover;
      margin: 1.5rem auto;
      margin-bottom: 0.2rem;
  }
  .mb{
    text-align: center;
    display: block;
    margin: 0 auto;
    width: 100%;
    font-size: 0.14rem;
    color: rgba(0,0,0,.6);
  }
}
</style>