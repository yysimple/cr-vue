<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">

      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!--<el-tooltip content="Global Size" effect="dark" placement="bottom">-->
        <!--<size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--</el-tooltip>-->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <div class="user-avatar">
            <el-avatar shape="square" size="small" :src="squareUrl" />
            <span class="pl-5">{{ user.username }}</span>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <div id="avatar-dropdown-container">
            <div class="user-info">
              <div class="avatar"><el-avatar :size="50" :src="squareUrl" /></div>
              <div class="detail">
                <span class="fz-14">{{ user.username }}</span><br>
                <span class="fz-10 remarks">{{ user.role | typeFilter }}</span>
              </div>
            </div>
            <div class="user-menu">
<!--              <div class="menu-item" @click="openDialog(user)">-->
<!--                <svg-icon icon-class="edit-user" style="margin-bottom: 2px" />-->
<!--                编辑用户信息-->
<!--              </div>-->
              <div class="menu-item" @click="logout">
                <svg-icon icon-class="out-login" />
                退出登录
              </div>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" :modal="false" width="30%">
      <el-form ref="dialogRef" :model="dialogForm" :rules="rules" label-position="right" label-width="60px" style="margin: 0 20px">
        <el-form-item label="账户" prop="username">
          <el-input v-model="dialogForm.username" placeholder="请填写账户" />
        </el-form-item>
        <el-button v-if="!resetPassword" type="text" style="margin-left: 60px" @click="resetPassword = true">重置密码</el-button>
        <el-form-item v-else label="密码" prop="password">
          <el-input v-model="dialogForm.password" type="password" placeholder="请填写密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" align="center">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitUser"> 保存 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'

export default {
  inject: ['reload'],
  filters: {
    typeFilter(type) {
      const roles = {
        'admin': '管理员',
        'user': '用户'
      }
      return roles[type]
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    Search
  },
  data() {
    return {
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      systemMode: process.env.VUE_APP_ENV,
      dialogVisible: false,
      dialogForm: {
        id: null,
        username: '',
        password: ''
      },
      resetPassword: false,
      rules: {
        username: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        role: [{ required: true, message: '请选择', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'avatar',
      'user'
    ])
  },
  methods: {

    // 用户编辑模态框
    openDialog(data) {
      this.dialogVisible = true
      this.$nextTick(() => { this.$refs['dialogRef'].clearValidate() })
      this.resetPassword = false
      this.dialogForm = {
        id: data.id,
        username: data.username,
        role: data.role
      }
    },

    submitUser() {
      this.$refs['dialogRef'].validate(async(valid) => {
        if (valid) {
          const params = {
            id: this.dialogForm.id,
            role: this.dialogForm.role,
            username: this.dialogForm.username
          }
          if (this.resetPassword) { params.password = this.dialogForm.password }
          // if (await this.saveUser(params)) {
          //   setTimeout(() => {
          //     this.logout()
          //   }, 1.6 * 1000)
          // }
        }
      })
    },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$router.push(`/`)
    }
  }
}
</script>

<style lang="scss">
  .navbar {
    .el-dialog__wrapper {
      background: rgba(0,0,0,.5);
    }
  }
</style>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          color: #236EF3
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          text-align: right;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 14px;
          font-size: 12px;
        }
      }
    }
    .project-container {
      font-size: 15px;
      cursor: pointer;
    }
  }
}
#avatar-dropdown-container {
  min-width: 180px;
  /*background:rgba(245,248,252,1);*/
  /*padding: 0 20px 10px 10px;*/
  .user-info {
    max-width: 200px;
    display: flex;
    .avatar {
      margin: 10px 10px 10px 20px;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      img {
        border-radius: 50%;
      }
    }
    .detail {
      margin: 10px 20px 10px 0px;
    }
  }
  .user-menu {
    .menu-item {
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      font-size: 12px;
      color: #8998AC;
      &:hover {
        background: #F0F3F7;
        color: #2196F3;
      }
      &:last-child {
        border: unset;
      }
      svg {
        font-size: 16px;
        margin-right: 7px;
      }
    }
  }
}
</style>
