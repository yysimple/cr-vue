<!--留言回复-->
<template>
  <div class="feedback-management app-container">
    <div class="filter-container" v-if="userRole === 'user'">
      <el-button class="filter-item" type="primary" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" min-width="150" prop="question" label="问题描述" />
      <el-table-column align="center" min-width="150" prop="answer" label="回复" />
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ ['未回答', '已答复'][row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="图片">
        <template slot-scope="{ row }">
          <img :src="row.url" alt="" style="width: 106px">
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" prop="updateTime" label="更新时间" />
      <el-table-column align="center" width="150" prop="createTime" label="创建时间" />
      <el-table-column align="center" label="操作" width="90" fixed="right" v-if="userRole === 'admin'">
        <template slot-scope="{row}">
          <el-link :underline="false" type="primary" title="回复" @click="openDialog('edit', row)"><i class="el-icon-edit" /></el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" type="danger" title="删除" @click="handleDelete(row)"><i class="el-icon-delete" /></el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" style="margin: 0 30px;">
        <el-form-item v-if="dialogType === 'add'" label="问题描述">
          <el-input v-model="form.question" type="textarea" rows="3" placeholder="请输入问题描述" />
        </el-form-item>
        <el-form-item v-if="dialogType === 'edit'" label="回复信息">
          <el-input v-model="form.answer" type="textarea" rows="3" placeholder="请输入回复信息" />
        </el-form-item>
        <el-form-item v-if="dialogType === 'add'" label="图片">
          <el-upload
            action="http://www.wcx412.xyz:6543/file/feedBackFilesUpload"
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
        </el-form-item>
      </el-form>
      <div slot="footer" align="center">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSave">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiAllFeedback, apiAddQuestion, apiAddAnswer, apiDeleteFeedback, apiAllFeedbackByUserId } from '@/api/feedBack'
export default {
  name: 'FeedbackManagement',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加问题',
        'edit': '回复'
      },
      dialogVisible: false,
      form: {
        question: '',
        answer: '',
        url: ''
      },
      imgVisible: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    userRole() {
      return this.user.role
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    async init() {
      this.tableLoading = true
      try {
        if(this.userRole === 'admin') {
          this.tableData = await apiAllFeedback()
        } else {
          this.tableData = await apiAllFeedbackByUserId(this.user.user)
        }
        this.tableLoading = false
      } catch (e) {
        this.$message.error(`${e.msg}`)
        this.tableLoading = false
      }
    },

    // 打开模态框
    openDialog(type, data) {
      this.dialogType = type
      if (type === 'add') {
        this.form = {
          question: '',
          answer: '',
          url: ''
        }
      } else {
        const { id, question, answer, url } = data
        this.form = { id, question, answer, url }
      }
      this.dialogVisible = true
    },

    // 删除故障信息
    handleDelete(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('确定要删除?', '提示', option).then(async() => {
        try {
          await apiDeleteFeedback(data)
          this.$message({ message: '保存成功', type: 'success' })
          this.init()
        } catch (e) {
          this.dialogVisible = false
          this.$message.error(`${e.msg}`)
        }
      }).catch(() => {})
    },

    // 保存故障信息
    async handleSave() {
      const type = this.dialogType
      try {
        if (type === 'add') {
          this.form.userId = this.user.user.id
          await apiAddQuestion(this.form)
        } else {
          await apiAddAnswer(this.form)
        }
        this.$message({ message: '保存成功', type: 'success' })
        this.dialogVisible = false
        this.init()
      } catch (e) {
        this.dialogVisible = false
        this.$message.error(`${e.msg}`)
      }
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

<style scoped></style>

