<template>
  <div>
    <div class="list" v-for="(item, index) in list" :key="item.id">
      <p class="title">{{ item.title }}</p>
      <ul class="imgs">
        <li
          @click="router(items.designTemplateId)"
          v-for="items in item.templates"
          :style="{
            width: w + 'rem',
            height:
              (parseInt(items.height) / parseInt(items.width)) * w + 'rem',
          }"
        >
          <img
            :style="{
              width: w + 'rem',
              height:
                (parseInt(items.height) / parseInt(items.width)) * w + 'rem',
            }"
            :src="
              'https:' +
              items.designTemplateImageUrl +
              '?&x-oss-process=image/resize,w_300/format,jpg'
            "
            alt=""
          />
        </li>
      </ul>
      <p class="btn" @click="more(item.id, index)" v-show="nums[index] == 0">
        查看更多
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {},
    theme: {},
    pageNum: {},
    count: {},
  },
  methods: {
    more(id, index) {
      if (this.list[index].templates.length == this.count - 6) {
        this.nums[index] = 1;
      }
      this.$emit("update:pageNum", this.pageNum + 1);
      this.$emit("update:index", index);
      this.$emit("update:themeExtendId", id);
    },
    router(id) {
      this.$router.push({
        path: `/currenttemplate/${id}`,
      });
    },
  },
  data() {
    return {
      w: "",
      nums: [],
    };
  },
  watch: {
    theme() {
      if (this.theme.id == 1693) {
        this.w = 1.68;
      } else {
        this.w = 1.08;
      }
    },
    list() {
      this.list.forEach((item) => {
        this.nums.push(0);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 3.75rem;
  .title {
    width: 100%;
    text-align: center;
    margin: 0.12rem 0 0.24rem 0;
  }
  .imgs {
    width: 100%;
    padding: 0.12rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      margin-bottom: 0.12rem;
      img {
        width: 100%;
        height: 100%;
        border: 0.02rem solid #e6e6e6;
        display: block;
      }
    }
  }
  .btn {
    width: 1.51rem;
    height: 0.41rem;
    border-radius: 0.21rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.13rem;
    line-height: 0.42rem;
    margin: 0 auto;
    margin-top: 0.1rem;
    margin-bottom: 0.32rem;
    border: 0.02rem solid rgba(0, 0, 0, 0.03);
  }
}
</style>