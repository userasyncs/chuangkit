<template>
  <div>
    <transition name="scale">
      <div
        class="preview"
        v-show="$store.state.result.previewLoad"
        @click="close"
      >
        <div class="box">
          <div class="box_s">
            <img
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
              v-else
              :src="
                $store.state.result.item.designTemplateImageUrl
                  ? 'https:' +
                    $store.state.result.item.designTemplateImageUrl +
                    '?&x-oss-process=image/resize,w_300/format,jpg'
                  : ''
              "
              alt=""
            />
            <div class="text" @click.stop>
              <div
                class="sc"
                @click="sumbit($store.state.result.item.designTemplateId)"
              >
                <span v-if="iconShow" class="iconfont scs">&#xe635;</span>
                <span v-else class="iconfont scs">&#xe63b;</span>
              </div>
              <p>收藏</p>
            </div>
          </div>
          <login></login>
        </div>
      </div>
    </transition>
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
    sumbit(id) {
      if (!this.show) {
        this.$store.commit("changeProupshow", true);
      } else {
        this.iconShow = !this.iconShow;
        if (!this.iconShow) {
          Notify({ type: "success", message: "收藏成功" });
          this.idlist.push(id);
          localStorage.setItem("idList", JSON.stringify(this.idlist));
        } else {
          Notify({ type: "success", message: "取消收藏" });
          let index = this.idlist.findIndex((item) => item == id);
          this.idlist.splice(index, 1);
          localStorage.setItem("idList", JSON.stringify(this.idlist));
        }
      }
    },
  },
  data() {
    return {
      iconShow: true,
      idlist: [],
    };
  },
  computed: {
    show() {
      return this.$store.state.token;
    },
    id(){
      return this.$store.state.result.item.designTemplateId
    }
  },
  props: {
    w: {},
  },
  watch:{
    id(){
      let list = localStorage.getItem("idList");
    if (list) {
      this.idlist = JSON.parse(list);
      console.log(this.idlist);
      let index = this.idlist.findIndex((item) => item == this.id);
      if (index != -1) {
        this.iconShow = false;
      } else {
        this.iconShow = true;
      }
    }
    }
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
.scale-enter-from {
  transform: scale(0);
}
.scale-leave-to {
  transform: scale(1);
}
.scale-enter-active {
  transition: all 0.4s;
}
.scale-leave-active {
  transition: all 0.4s;
}
</style>