<template>
    <div class="register-container">
        <start-layout>
            <div slot="content" class="form-box">
                <div class="box-header">
                    <span class="ml-10">用户注册</span>
                </div>
                <el-form ref="loginForm" label-width="50px" class="box-form" :model="loginForm" :rules="loginRules">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
                    </el-form-item>
                    <div>
                        <router-link to="/" class="fz-10 register remarks fr">登录</router-link>
                    </div>
                    <el-button :loading="loading" type="primary" size="medium" round style="width: 100%; margin-top: 30px" @click.native.prevent="handleRegister">注册</el-button>
                </el-form>
            </div>
        </start-layout>
    </div>
</template>

<script>
  import StartLayout from './component/StartLayout'
  import { apiLogin } from '@/api/login'
  import { apiGetUsers, apiAddUser, apiEditUser, apiDeleteUser } from '@/api/user'
  const Base64 = require('js-base64').Base64
  export default {
    name: 'Register',
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
          role: 'user'
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
    },
    methods: {
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
      handleRegister() {
        this.$refs.loginForm.validate(async valid => {
          if (valid) {
            this.loading = true
            try {
              await apiAddUser(this.loginForm)
              setTimeout(() => {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.push({ path: '/' })
                this.loading = false
              }, 1.5 * 1000)
            } catch (e) {
              this.$message.error(`${e}`)
              this.loading = false
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .register-container {
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
                padding: 33px 0 20px 0;

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
            }
        }
    }
</style>
