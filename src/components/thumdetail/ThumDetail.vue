<template>
  <div class="thumdetail">
    <ul
      class="list"
      v-for="(col, index) in cols"
      :key="index"
      :style="{ width: w + 'rem' }"
    >
      <li
        v-for="item in col.list"
        @click="router(item.designTemplateId)"
        @touchstart="start(item)"
        @touchend="end"
      >
        <img
          v-if="item.designTemplateThumbUrls"
          :src="
            'https:' +
            item.designTemplateThumbUrls[0] +
            '?&x-oss-process=image/resize,w_300/format,jpg'
          "
          alt=""
        />
        <img
          v-else
          :src="
            'https:' +
            item.designTemplateImageUrl +
            '?&x-oss-process=image/resize,w_300/format,jpg'
          "
          alt=""
        />
      </li>
    </ul>
    <preview></preview>
  </div>
</template>

<script>
import Preview from '../preview/Preview.vue';
let timer;
export default {
  components: { Preview },
  props: {
    w: {},
    templates: {},
    page: {},
    padding: {},
  },
  methods: {
    router(id) {
      this.$router.push({
        path: `/currenttemplate/${id}`,
      });
    },
    start(item) {
      timer = setTimeout(() => {
        this.$store.commit("chanPreview", {
          value: true,
          item,
        });
        document.documentElement.style.overflow = "hidden";
      }, 600);
    },
    end() {
      clearTimeout(timer);
    },
  },
  data() {
    return {
      cols: [
        {
          h: 0,
          list: [],
        },
        {
          h: 0,
          list: [],
        },
      ],
    };
  },
  watch: {
    templates: {
      deep: true,
      handler() {
        this.cols = [
          {
            h: 0,
            list: [],
          },
          {
            h: 0,
            list: [],
          },
        ];
        this.templates.forEach((item) => {
          let index = this.cols[0].h > this.cols[1].h ? 1 : 0;
          let h = (parseInt(item.height) / parseInt(item.width)) * 1.68;
          this.cols[index].h += h;
          item.h = h + "rem";
          this.cols[index].list.push(item);
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.thumdetail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .list {
    margin-left: -0.02rem;
    li {
      width: 100%;
      margin-top: 0.05rem;
      img {
        border: 0.02rem solid #e6e6e6;
        width: 100%;
      }
    }
  }
}
</style>