<template>
  <div class="login-container">
    <start-layout>
      <div slot="content" class="form-box">
        <div class="box-header">
          <span class="ml-10">电脑维修订单管理系统</span>
        </div>
        <el-form ref="loginForm" label-width="50px" class="box-form" :model="loginForm" :rules="loginRules">
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="loginForm.role" placeholder="请选择">
                <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                />
              </el-select>
          </el-form-item>
          <div class="form-remark">
            <el-checkbox v-model="remember" class="fl">记住密码</el-checkbox>
            <router-link to="register" class="fz-10 register remarks">注册</router-link>
<!--            <el-link :underline="false" class="fz-10 register remarks">注册</el-link>-->
          </div>
          <el-button
                  :loading="loading"
                  type="primary"
                  size="medium"
                  round
                  style="width: 100%"
                  @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form>
      </div>
    </start-layout>
  </div>
</template>

<script>
import StartLayout from './component/StartLayout'
import { apiLogin } from '@/api/login'
const Base64 = require('js-base64').Base64
export default {
  name: 'Login',
  components: { StartLayout },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      systemMode: process.env.VUE_APP_ENV === 'dev',
      remember: true,
      loginForm: {
        username: '',
        password: '',
        role: ''
      },
      roleOptions: [
        {
          label: '用户',
          value: 'user'
        },
        {
          label: '管理员',
          value: 'admin'
        }
      ],
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        role: [{ required: true, trigger: 'change', message: '请选择用户角色' }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {},
      loginIcon: require(`@/assets/login/logo@2x.png`)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const username = this.getCookie('username')
      const password = Base64.decode(this.getCookie('password'))
      if (username) {
        this.loginForm.username = username
        this.loginForm.password = password
        this.remember = true
      } else {
        this.$refs.username.focus()
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            const role = this.loginForm.role
            const username = this.loginForm.username
            const password = this.loginForm.password
            const pathMap = {
              'admin': 'UserInfoManagement',
              'user': 'NotificationManagement'
            }
            // const userData = {}
            const userData = await apiLogin({ username, password })
            setTimeout(() => {
              this.setUserInfo()
              this.$store.dispatch('user/setUser', Object.assign(userData, this.loginForm))
              sessionStorage.setItem("token", userData.token);
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$router.push({ name: pathMap[role] })
              this.loading = false
            }, 1.5 * 1000)
          } catch (e) {
            this.$message.error(`${e.msg}`)
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 储存表单信息
    setUserInfo() {
      if (this.remember) {
        this.setCookie('username', this.loginForm.username)
        const password = Base64.encode(this.loginForm.password)
        this.setCookie('password', password)
      } else {
        this.setCookie('username', '')
        this.setCookie('password', '')
      }
    },

    // 获取cookie
    getCookie(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },

    // 保存cookie
    setCookie(cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
        ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    }
  }
}
</script>

<style scoped lang="scss">
  .login-container {
    height: 100%;
    .form-box {
      width: 420px;
      background: #fff;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -210px;
      transform: translateY(-50%);
      &:before {
        content: "";
        background-image: linear-gradient(rgba(255,255,255, .3), rgba(255,255,255, 0));
        border-radius: 10px;
        position: absolute;
        height: 80px;
        width: 420px;
        bottom: -85px;
        left: 0px;
      }

      .box-header {
        font-size: 20px;
        font-weight: 500;
        height: 60px;
        /*line-height: 50px;*/
        text-align: center;
        color: #3F78D3;
        border-bottom: 2px dashed #C3C6CB;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .box-form {
        width: 250px;
        margin: auto;
        padding: 10px 0 20px 0;
        position: relative;
        .code {
          width: 30%;
          height: 28px;
          background: #ccc;
          margin-left: 14px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .form-remark {
          overflow: hidden; margin-bottom: 20px;
          display: flex; align-items: center; justify-content: space-between;
        }
        /*.register {*/
        /*  position: absolute;*/
        /*  bottom: 0;*/
        /*  right: 0;*/
        /*}*/
      }
    }
  }
</style>
