<template>
  <div class="profile">
    <div class="profile_top">
      <img src="~/assets/image/profile/headImg.png" alt="" />
      <div class="text">
        <p class="title" v-if="!show" @click="login">
          <span class="dl">登录/注册</span>
          <span>登录后获取更多精美模板</span>
        </p>
        <p class="title" v-else>
           <span class="dl">157****1621</span>
           <span class="mf">个人免费版</span>
        </p>
        <p class="sz"></p>
      </div>
    </div>
    <div class="profile_vip">
      <div class="vip">
        <p class="vip_title">
          <span class="vip_text">我的会员</span>
          <span>会员畅享百万模板素材免费商用</span>
        </p>
        <p class="btn">立即开通</p>
      </div>
      <div class="cx">
        新年大促：个人会员低至0.16元/天，团队会员买一送一 点击查看
      </div>
    </div>
    <div class="profile_cont">
      <div class="singer">
        <div class="icon"></div>
        <p>我的订单</p>
      </div>
      <div class="singer">
        <div class="icon icon1"></div>
        <p>我的收藏</p>
      </div>
      <div style="width: 3.75rem; height: 0.1rem; background: #f3f4f9"></div>
      <div class="singer">
        <div class="icon icon_kf"></div>
        <p>联系客服</p>
      </div>
      <div class="singer">
        <div class="icon icon_fk"></div>
        <p>问题反馈</p>
      </div>
      <div class="singer">
        <div class="icon icon_wm"></div>
        <p>关于我们</p>
      </div>
    </div>
    <login></login>
  </div>
</template>

<script>
import Login from "../../components/login/Login.vue";
import { Notify } from 'vant';
export default {
  components: { Login },
  methods: {
    login() {
      if (!this.$store.state.token) {
        this.$store.commit("changeProupshow", true);
      }else{
          Notify({ type: 'success', message: '登录成功' });
      }
    },
  },
  computed:{
      show(){
          return this.$store.state.token;
      }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  width: 3.75rem;
  position: relative;
  height: 100vh;
  background: #f3f4f9;
  .profile_top {
    width: 100%;
    height: 1.84rem;
    background: url(https://m.chuangkit.com/ziyuan/images/uc_bg.png) no-repeat
      center;
    background-size: cover;
    padding: 0.55rem 0.2rem 0.73rem 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    img {
      width: 0.56rem;
      height: 0.56rem;
    }
    .text {
      color: #fff;
      display: flex;
      justify-content: space-between;
      width: 2.61rem;
      height: 0.56rem;
      align-items: center;
      .title {
        span {
          font-size: 0.13rem;
          display: block;
        }
        .dl {
          font-weight: bolder;
          margin-bottom: 0.04rem;
          font-size: 0.16rem;
        }
        .mf{
            width: 0.82rem;
            color: #fff;
            height: 0.24rem;
            border-radius: 0.12rem;
            background: rgba(255,255,255,.21);
            font-size: 0.12rem;
            text-align: center;
            line-height: 0.24rem;
        }
      }
      .sz {
        background: url(~assets/image/profile/sz.png) no-repeat;
        background-size: cover;
        width: 0.27rem;
        height: 0.27rem;
      }
    }
  }
  .profile_vip {
    width: 3.51rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 1.4rem;
    .vip {
      width: 100%;
      height: 0.6rem;
      background: url(https://m.chuangkit.com/ziyuan/images/vipbg.png) no-repeat
        center;
      background-size: cover;
      padding-left: 0.52rem;
      padding-right: 0.12rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .vip_title {
        color: #5e3917;
        span {
          display: block;
          font-size: 0.13rem;
          margin-bottom: 0.02rem;
        }
        .vip_text {
          font-size: 0.16rem;
          font-weight: bold;
        }
      }
      .btn {
        background: #cd9555;
        color: #fff;
        font-size: 0.13rem;
        text-align: center;
        width: 0.72rem;
        height: 0.3rem;
        border-radius: 0.04rem;
        line-height: 0.3rem;
      }
    }
    .cx {
      font-size: 0.12rem;
      color: #fff;
      width: 100%;
      padding: 0 0.12rem;
      box-sizing: border-box;
      background: #ff8f33;
      height: 0.24rem;
      border-radius: 0 0 0.06rem 0.06rem;
      white-space: nowrap;
    }
  }
  .profile_cont {
    width: 100%;
    padding-top: 0.35rem;
    background: #fff;
    .singer {
      width: 100%;
      height: 0.56rem;
      border-bottom: 1px solid rgb(250, 234, 234);
      display: flex;
      align-items: center;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .icon {
        width: 0.23rem;
        height: 0.23rem;
        background: url(~assets/image/profile/one.png) no-repeat center;
        background-size: cover;
        margin-right: 0.2rem;
      }
      .icon1 {
        background: url(~assets/image/profile/two.png) no-repeat center;
        background-size: cover;
      }
      .icon_kf {
        background: url(~assets/image/profile/thr.png) no-repeat center;
        background-size: cover;
      }
      .icon_fk {
        background: url(~assets/image/profile/fk.png) no-repeat center;
        background-size: cover;
      }
      .icon_wm {
        background: url(~assets/image/profile/wm.png) no-repeat center;
        background-size: cover;
      }
    }
  }
}
</style>