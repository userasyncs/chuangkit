<template>
  <div class="detail">
    <search :secondKindId="this.id"> 在当前场景下搜索 </search>
    <div class="tabs">
      <div class="jt" :class="{ jts: flag }" @click="flag = !flag"></div>
      <ul class="tab" ref="tab">
        <li
          :class="{ active: tagId == 0 }"
          @click="
            tagId = 0;
            res = '全部';
          "
        >
          全部
        </li>
        <li
          v-for="item in typeList"
          :class="{ active: tagId == item.tagId }"
          @click="
            tagId = item.tagId;
            res = item.name;
          "
          :key="item.tagId"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="unfold" v-show="flag">
          <ul class="tab">
          <li
          :class="{ active: tagId == 0 }"
          @click="
            tagId = 0;
            res = '全部';
          "
        >
          全部
        </li>
        <li
          v-for="item in typeList"
          :class="{ active: tagId == item.tagId }"
          @click="
            tagId = item.tagId;
            res = item.name;
            flag=false;
          "
          :key="item.tagId"
        >
          {{ item.name }}
        </li>
          </ul>
    </div>
    <screen :useId="tagId" :name="res" :cosel="cosel" :id="id"></screen>
    <back-to-top top="500"></back-to-top>
  </div>
</template>

<script>
import BackToTop from "../bacototop/BackToTop.vue";
import Screen from "../screen/Screen.vue";
import Search from "../search/Search.vue";
export default {
  name:"ScenePage",
  components: { Search, Screen, BackToTop },
    beforeRouteEnter(to,from,next){
      next(vm=>{
         if (from.matched[0]) {
          vm.name=from.matched[0].name
      }
      })
  },
  data() {
    return {
      typeList: [],
      tagId: 0,
      res: "全部",
      id: "",
      showFh: false,
      cosel: false,
      flag: false,
      name:""
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    async getData(id) {
      let res = await fetch(
        "/v1/home/getDesignType.do?_dataType=json&client_type=40&second_kind_id=" +
          id +
          "&_dataClientType=3"
      ).then((r) => r.json());
      // console.log(res);
      if (res.body.secondKindInfo.repoTag.use.length) {
        this.typeList = res.body.secondKindInfo.repoTag.use;
        this.cosel = false;
      } else {
        this.typeList = res.body.secondKindInfo.repoTag.style;
        this.cosel = true;
      }
      // console.log(this.typeList);
    },
  },
   activated(){
     if (this.name) {
       this.id = this.$route.params.id;
       this.getData(this.id);
       this.$router.go(0)
     }
   }
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
      transition: all 0.3s ease;
    }
    .jts {
      transform: rotate(180deg);
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
  .unfold {
    position: fixed;
    top: 0.98rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.4);
    z-index: 9999;
    .tab{
      width: 100%;
      padding: 0.16rem 0 0.08rem 0.15rem;
      box-sizing: border-box;
      background: #fff;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 0.74rem;
        height: 0.3rem;
        background: #f3f4f9;
        text-align: center;
        line-height: 0.3rem;
        font-size: 0.12rem;
        border-radius: 0.2rem;
        margin:0 0.15rem 0.12rem 0;
      }
      .active{
        background: #0773fc;
        color: #fff;
      }
    }
  }
}
</style>