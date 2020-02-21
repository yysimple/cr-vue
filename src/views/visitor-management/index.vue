<!--访客管理-->
<template>
  <div class="visitor-management app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="90" fixed="right">
        <template slot-scope="{row}">
          <el-link :underline="false" type="primary" title="编辑" @click="openDialog('edit', row)"><i class="el-icon-edit-outline" /></el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" type="danger" title="删除"><i class="el-icon-delete" /></el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible">
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
import { apiGetUsers } from '@/api/user'
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
      this.tableData = await apiGetUsers()
      console.log(this.tableData)
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

