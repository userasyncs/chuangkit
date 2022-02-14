<template>
  <div @click.stop>
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <div class="content">
        <p class="title">快捷登录</p>
         <van-field v-model="userName" size="large" style="marginTop:0.3rem" placeholder="请输入手机号" />
     <van-field
     style="marginTop:0.1rem"
    v-model="sms"
    center
    clearable
    placeholder="请输入短信验证码"
  >
    <template #button>
      <van-button size="small" type="primary">发送验证码</van-button>
    </template>
      </van-field>
        <div class="tips">
            <p>账号密码登录</p>
            <p>注册账号</p>
        </div>
        <div class="dl" @click="sumbit">登录</div>
        <p class="xy">登录即同意<span>用户协议</span>和<span>隐私政策</span></p>
        <p style="fontSize:0.13rem;fontWeight:bolder;textAlign:center;">其它方式登录</p>
        <div class="qq">
            <span class="iconfont">&#xe882;</span>
        </div>
        <div class="close" @click="close">
            <span class="iconfont">&#xe6ef;</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
import { Field, CellGroup } from "vant";
import { Button } from 'vant';
import { Notify } from 'vant';
export default {
  components: {
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]:Button
  },
  methods:{
      close(){
          this.$store.commit("changeProupshow",false)
      }
  },
  data() {
    return {
      userName:"",
      sms:"",
    };
  },
 computed:{
      show(){
         return this.$store.state.Proupshow;
      },
      sumbit(){
          if (!this.userName||!this.sms) {
              Notify({ type: 'warning', message: '请输入用户名或者验证码' });
              return false;
          }
          localStorage.setItem("token","userName=张三&password=123456");
          this.$store.commit("changeToken","userName=张三&password=123456")
          this.$store.commit("changeProupshow",false)
      }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  background: url(~assets/image/login/banner.png);
  background-size: cover;
  padding: 0.48rem 0.5rem;
  box-sizing: border-box;
  position: relative;
  .title {
    font-weight: bolder;
    font-size: 0.24rem;
    text-align: center;
  }
  .tips{
      padding: 0 0.12rem;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      color: #0773fc;
      font-size: 0.13rem;
      justify-content: space-between;
      line-height: 0.3rem;
      margin-bottom: 0.4rem;
  }
  .dl{
      width: 2.75rem;
      height: 0.48rem;
      background: #0773fc;
      text-align: center;
      color: #fff;
      line-height: 0.48rem;
      border-radius: 0.24rem;
  }
  .xy{
      font-size: 0.13rem;
      color: rgba($color: #666666, $alpha: 0.6);
      line-height: 0.3rem;
      text-align: center;
      margin-bottom: 0.33rem;
      span{
          color: #0773fc;
      }
  }
  .qq{
      width: 0.5rem;
      height: 0.5rem;
      background: #0773fc;
      border-radius: 50%;
      margin: 0.2rem auto;
      text-align: center;
      line-height: 0.5rem;
      span{
          font-size: 0.26rem;
          color: #fff;
      }
  }
  .close{
      width: 0.3rem;
      height: 0.3rem;
      background: #fff;
      border-radius: 50%;
      text-align: center;
       line-height: 0.3rem;
       position: absolute;
       right: 0.1rem;
       top: 0.1rem;
       span{
          font-size: 0.24rem;
          color: #999;
      }
  }
}
</style>