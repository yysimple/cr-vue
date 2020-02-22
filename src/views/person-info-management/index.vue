<!--个人信息管理-->
<template>
  <div class="person-info-management app-container">
    <el-card v-if="!editMode">
      <el-link :underline="false" class="fr fz-16" type="primary" @click="openEdit">
        <i class="el-icon-edit-outline" text="编辑" />
      </el-link>
      <div class="info flex">
        <img :src="infoData.url" alt="">
        <div class="pl-15 flex" style="align-items: flex-start; height: 100px;flex-direction:column">
          <div style="line-height: 22px" class="flex">
            <strong class="el-form-item__label line_28">姓名</strong>
            <span>{{ infoData.realName }}</span>
          </div>
          <div style="line-height: 22px" class="flex">
            <strong class="el-form-item__label line_28">性别</strong>
            <span>{{ infoData.gender }}</span>
          </div>
          <div style="line-height: 22px" class="flex">
            <strong class="el-form-item__label line_28">联系方式</strong>
            <span>{{ infoData.tel }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <el-divider content-position="left" />
        <el-form class="content-form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="出生日期">
                {{ infoData.birthday }}
              </el-form-item>
              <el-form-item label="邮箱">
                {{ infoData.email }}
              </el-form-item>
              <el-form-item label="地址">
                {{ infoData.address }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="qq">
                {{ infoData.qq }}
              </el-form-item>
              <el-form-item label="备注">
                {{ infoData.remark }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <el-card v-else>
      <div class="info active flex">
        <div class="img">
          <el-upload
            action="http://www.wcx412.xyz:6543/file/personalHeaderFileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleGetPic"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="imgVisible">
            <img width="100%" :src="form.url" alt="">
          </el-dialog>
        </div>
        <div class="pl-15 flex" style="align-items: flex-start; height: 100px;flex-direction:column">
          <div style="line-height: 22px" class="flex">
            <strong class="el-form-item__label line_28">姓名</strong>
            <el-input v-model="form.realName" class="info_input" placeholder="请输入姓名" />
          </div>
          <div style="line-height: 22px" class="flex">
            <strong class="el-form-item__label line_28">性别</strong>
            <el-input v-model="form.gender" class="info_input" placeholder="请输入性别" />
          </div>
          <div style="line-height: 22px" class="flex">
            <strong class="el-form-item__label line_28">联系方式</strong>
            <el-input v-model="form.tel" class="info_input" placeholder="请输入联系方式" />
          </div>
        </div>
      </div>
      <div class="content">
        <el-divider content-position="left" />
        <el-form class="content-form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="出生日期">
                <el-input v-model="form.birthday" class="info_input" placeholder="请输入出生日期" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" class="info_input" placeholder="请输入邮箱" />
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address" class="info_input" placeholder="请输入地址" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="qq">
                <el-input v-model="form.qq" class="info_input" placeholder="请输入qq" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remark" class="info_input" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div align="center" style="width: 100%; margin-top: 30px">
        <el-button @click="editMode = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiGetPersonalInfo, apiUpdatePersonalInfo } from '@/api/person'
export default {
  name: 'PersonInfoManagement',
  data() {
    return {
      infoData: {
        url: '',
        realName: '',
        gender: '',
        birthday: '',
        email: '',
        address: '',
        tel: '',
        qq: '',
        remark: ''
      },
      form: {
        url: '',
        realName: '',
        gender: '',
        birthday: '',
        email: '',
        address: '',
        tel: '',
        qq: '',
        remark: ''
      },
      editMode: false,
      imgVisible: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.infoData = await apiGetPersonalInfo(this.user.user)
      } catch (e) {
        this.$message.error(`${e.msg}`)
      }
    },

    async handleSave() {
      try {
        await apiUpdatePersonalInfo(this.form)
        this.$message({ message: '保存成功', type: 'success' })
        this.editMode = false
        this.init()
      } catch (e) {
        this.$message.error(`${e.msg}`)
      }
    },

    openEdit() {
      this.editMode = true
      this.form = this.infoData
    },

    handleGetPic(file) {
      this.form.url = file
      console.log(file)
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    handlePictureCardPreview(file) {
      // this.form.url = file.url
      this.imgVisible = true
    }
  }
}
</script>
<style lang="scss">
  .person-info-management{
    .el-divider--horizontal {
      margin: 30px 0 !important;
    }
    .active {
      .el-form-item__label {
        width: 100px!important;
        text-align: left!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  .info {
    margin-top: 10px;
    padding-left: 25px;
    min-height: 100px;
    img {
      width: 100px;
      height: 100px;
      background: #ccc;
    }
  }
  .info_input {
    width: 190px;
  }
  .line_28 {
    line-height: 35px;
  }
  .content-form {
    padding-left: 25px;
  }
  .indent-detail-container >>> .el-form-item--small .el-form-item__label {
    color: #ccc;
  }
</style>
