<!--用户列表-->
<template>
  <div class="user-info-management app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" prop="username" label="账号" />
      <el-table-column align="center" label="角色">
        <template slot-scope="{ row }">
          <span>{{ ['管理员', '普通用户'][row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ ['禁用', '启用'][row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" prop="updateTime" label="更新时间" />
      <el-table-column align="center" width="150" prop="createTime" label="创建时间" />
      <el-table-column align="center" label="操作" width="90" fixed="right">
        <template slot-scope="{ row }">
          <el-link :underline="false" type="primary" title="编辑" @click="openDialog('edit', row)"><i class="el-icon-edit-outline" /></el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" type="danger" title="删除" @click="handleDelete(row)"><i class="el-icon-delete" /></el-link>
        </template>
      </el-table-column>
    </el-table>

    <!--    添加/编辑用户-->
    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible">
      <el-form label-width="50px" style="margin: 0 30px;">
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item v-if="dialogType === 'add'" label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
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
import { apiGetUsers, apiAddUser, apiEditUser, apiDeleteUser } from '@/api/user'
export default {
  name: 'UserInfoManagement',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加用户',
        'edit': '编辑用户'
      },
      dialogVisible: false,
      form: {
        username: '',
        password: ''
      }
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
        this.tableData = await apiGetUsers()
        this.tableLoading = false
      } catch (e) {
        this.tableLoading = false
      }
    },

    // 打开模态框
    openDialog(type, data) {
      this.dialogType = type
      if (type === 'add') {
        this.form = {
          username: '',
          password: ''
        }
      } else {
        const { id, username, password } = data
        this.form = { id, username, password }
      }
      this.dialogVisible = true
    },

    // 删除用户
    handleDelete(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('确定要删除该用户?', '提示', option).then(async() => {
        try {
          await apiDeleteUser(data)
          this.$message({ message: '保存成功', type: 'success' })
          this.init()
        } catch (e) {
          this.dialogVisible = false
          this.$message.error(e)
        }
      }).catch(() => {})
    },

    // 保存用户
    async handleSave() {
      const type = this.dialogType
      try {
        if (type === 'add') {
          await apiAddUser(this.form)
        } else {
          await apiEditUser(this.form)
        }
        this.$message({ message: '保存成功', type: 'success' })
        this.dialogVisible = false
        this.init()
      } catch (e) {
        this.dialogVisible = false
        this.$message.error(e)
      }
    }
  }
}
</script>

<style scoped></style>
