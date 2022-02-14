<template>
  <div>
      <div
        class="preview"
        v-show="$store.state.result.previewLoad"
        @click="close"
      >
        <div class="box">
          <div class="box_s">
                <transition name="fade">
            <img
            key="img2"
              :style="{
                width: w + 'rem',
                height:
                  (parseInt($store.state.result.item.height) /
                    parseInt($store.state.result.item.width)) *
                    w +
                  'rem',
              }"
              v-if="$store.state.result.item.designTemplateThumbUrls"
              :src="
                'https:' +
                $store.state.result.item.designTemplateThumbUrls[0] +
                '?&x-oss-process=image/resize,w_300/format,jpg'
              "
              alt=""
              @click.stop
            />
            <img
             key="img1"
              v-else
              :src="
              $store.state.result.item.designTemplateImageUrl?
                'https:' +
                $store.state.result.item.designTemplateImageUrl +
                '?&x-oss-process=image/resize,w_300/format,jpg'
                :''
              "
              alt=""
            />
            </transition>
            <div class="text" @click.stop>
              <div class="sc" @click="sumbit">
                <span v-if="iconShow" class="iconfont scs">&#xe635;</span>
                <span v-else class="iconfont scs">&#xe63b;</span>
              </div>
              <p>收藏</p>
            </div>
          </div>
          <login></login>
        </div>
      </div>
  </div>
</template>

<script>
import Login from "../login/Login.vue";
import { Notify } from "vant";
export default {
  components: { Login },
  methods: {
    close() {
      this.$store.commit("chanPreview", {
        value: false,
      });
      document.documentElement.style.overflow = "auto";
    },
    sumbit() {
      if (!this.show) {
        this.$store.commit("changeProupshow", true);
      } else {
        this.iconShow = !this.iconShow;
        if (this.iconShow) {
          Notify({ type: "success", message: "收藏成功" });
        } else {
          Notify({ type: "success", message: "取消收藏" });
        }
      }
    },
  },
  data() {
    return {
      iconShow: true,
    };
  },
  computed: {
    show() {
      return this.$store.state.token;
    },
  },
  props: {
    w: {},
  },
  created() {
    console.log(this.$store.state.result.item);
  },
};
</script>

<style lang="scss" scoped>
.preview {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  width: 100%;
  height: 100%;
  z-index: 999999;
  .box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      margin: 0 auto;
    }
    .text {
      margin: 0 auto;
      overflow: hidden;
      .sc {
        width: 0.5rem;
        height: 0.5rem;
        background: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.3rem auto;
        margin-bottom: 0.1rem;
        .scs {
          font-size: 0.32rem;
          color: red;
        }
      }
      p {
        font-size: 0.13rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}
  .fade-enter-from {
    transform: scale(0);
  }
  .fade-leave-to {
    transform: scale(1);
  }
  .fade-enter-active {
    transition: all 0.2s;
  }
  .fade-leave-active {
    transition: all 0.3s;
  }
</style>