<template>
  <div class="recommend">
    <p class="title">推荐专题</p>
    <div class="recom_c">
      <ul class="recom_list">
        <li v-for="(item, index) in commit_list" :key="index" @click="router(item.id)">
          <p class="title">{{ item.title }}</p>
          <p class="text">{{ item.themeDescribe }}</p>
          <div class="circle" :style="{ background: colors[index] }"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commit_list: [],
      colors: [
        "#ff406c",
        "#ffc11b",
        "#00cb47",
        "#c86efd",
        "#3ba9ff",
        "#ff406c",
      ],
    };
  },
  methods: {
    async getList() {
      let res = await fetch(
        "/v2/solutionSubject/theme.do?_dataType=json&_dataClientType=3&client_type=40&solutionSubjectId=1&pageNum=1&pageSize=6&templatePageSize=6&type=3&device=2"
      ).then((r) => r.json());
      // console.log(res);
      this.commit_list = res.body.data.themes;
    },
    router(id){
      this.$router.push({
        path:`/recomproject/${id}`
      })
    }
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  width: 3.75rem;
  padding: 0 0.12rem;
  box-sizing: border-box;
  .title {
    color: #000;
    font-weight: bolder;
    line-height: 0.66rem;
  }
  .recom_c {
    width: 100%;
    overflow: auto;
  }
  .recom_list {
    width: 7.92rem;
    height: 0.93rem;
    display: flex;
    align-items: center;
    li {
      width: 1.2rem;
      height: 0.65rem;
      padding-left: 0.16rem;
      margin-bottom: 0.16rem;
      border-radius: 0.04rem;
      box-shadow: 0 0 0.08rem rgb(228, 216, 216);
      overflow: hidden;
      position: relative;
      margin-right: 0.12rem;
      .title {
        margin-top: 0.16rem;
        line-height: 0.22rem;
        font-weight: bolder;
        color: #000;
        white-space: nowrap;
        overflow: hidden;
        font-size: 0.16rem;
      }
      .text {
        font-size: 0.13rem;
        color: #333;
        margin-top: 0.04rem;
      }
      .circle {
        position: absolute;
        right: -0.25rem;
        bottom: -0.25rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
      }
    }
  }
}
</style>