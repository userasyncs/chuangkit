<template>
  <div>
    <div class="my"></div>
    <p class="mb">登录后才可以看到你的设计</p>
    <div class="dl" @click="login">立即登录</div>
    <login path="/design"></login>
  </div>
</template>

<script>
import Login from '../components/login/Login.vue';
export default {
  components: { Login },
    methods:{
        login(){
              this.$store.commit("changeProupshow",true)
        }
    }
};
</script>

<style lang="scss" scoped>
.my {
  width: 1rem;
  height: 1rem;
  background: url(~assets/image/search/my.png);
  background-size: cover;
  margin: 1.3rem auto;
  margin-bottom: 0.2rem;
}
.mb {
  text-align: center;
  display: block;
  margin: 0 auto;
  width: 100%;
  font-size: 0.15rem;
  color: rgba(0, 0, 0, 0.6);
}
.dl {
  width: 1.9rem;
  height: 0.43rem;
  border-radius: 0.215rem;
  background: #0773fc;
  color: #fff;
  font-size: 0.15rem;
  text-align: center;
  line-height: 0.43rem;
  margin: 0.2rem auto;
}
</style>