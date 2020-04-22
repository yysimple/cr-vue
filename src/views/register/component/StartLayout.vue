<template>
  <div class="login-layout">
    <div class="header">
      <slot name="header-left" />
      <div class="header-right">
        <!--        <span>服务平台</span>-->
        <!--        <el-divider direction="vertical" />-->
        <!--        <span>帮助</span>-->
        <!--        <el-divider direction="vertical" />-->
        <!--        <span>公司网站</span>-->
        <!--        <el-divider direction="vertical" />-->
        <!--        <span>公司邮箱</span>-->
        <!--        <el-divider direction="vertical" />-->
        <!--        <span>简体中文</span>-->
      </div>
    </div>
    <slot name="content" />
    <div class="footer" align="center">
      <!--      xxx信息技术（集团）有限公司-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  $header-h: 35px;
  $footer-h: 50px;
  .login-layout {
    height: 100%;
    background: #D7EEFE;
    background-image: url("../../../assets/login/login-bg.png");
    background-size: cover;
    background-position: 50%;
    position: relative;
    box-sizing: border-box;
    .header {
      height:  $header-h;
      line-height: $header-h;
      padding: 0 10px;
      font-size: 10px;
      position: relative;
      .header-right {
        position: absolute;
        right: 10px;
      }
    }
    .footer {
      height: $footer-h;
      line-height: $footer-h;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 10px;
      color: #ccc;
    }
  }
</style>
