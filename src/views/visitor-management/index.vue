<!--访客管理-->
<template>
  <div class="visitor-management app-container">
    <el-table v-loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" prop="username" label="账号" />
      <el-table-column align="center" width="150" prop="createTime" label="访问时间" />
    </el-table>

    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="50px" style="margin: 0 30px;">
        <el-form-item label="k1">
          <el-input v-model="form.key" />
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
import { apiGetVisitors } from '@/api/visitor'
export default {
  name: 'VisitorManagement',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加',
        'edit': '编辑'
      },
      dialogVisible: false,
      form: {
        key: 1
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.tableLoading = true
      try {
        this.tableData = await apiGetVisitors()
        this.tableLoading = false
      } catch (e) {
        this.$message.error(`${e.msg}`)
        this.tableLoading = false
      }
    },
    openDialog(type, data) {
      this.dialogType = type
      if (type === 'add') {
        this.form = {
          key: 1
        }
      } else {
        this.form = data
      }
      this.dialogVisible = true
    },
    handleSave() {}
  }
}
</script>

<style scoped></style>

