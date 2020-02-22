<!--通知信息管理-->
<template>
  <div class="notification-management app-container">
    <h2 slot="title" class="text_con">通知</h2>
    <el-divider />
    <div class="text">
      <p>1.请各位看好自己的物品</p>
      <p>2.请保管好自己的订单发票</p>
      <p>3.维修完毕后我们会通知各位前来取电脑</p>
      <p>4.谢谢大家的光顾</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationManagement',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
  .notification-management {
    .text_con {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      margin: 20px auto 25px auto;
      font-family: "微软雅黑";
      font-weight: normal;
      line-height: 120%;
    }
    .text {
      margin: 20px auto;
      width: 90%;
      font-size: 14px;
      padding-bottom: 15px;
    }
  }
</style>

