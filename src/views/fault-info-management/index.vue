<!--故障信息管理-->
<template>
  <div class="fault-info-management app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" prop="troubleNo" label="问题编号" />
      <el-table-column align="center" prop="troubleName" label="问题名称" />
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ ['不可维修', '可维修'][row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remark" min-width="100" label="备注" />
      <el-table-column align="center" width="150" prop="updateTime" label="更新时间" />
      <el-table-column align="center" width="150" prop="createTime" label="创建时间" />
      <el-table-column align="center" label="操作" width="90" fixed="right">
        <template slot-scope="{row}">
          <el-link :underline="false" type="primary" title="编辑" @click="openDialog('edit', row)"><i class="el-icon-edit-outline" /></el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" type="danger" title="删除" @click="handleDelete(row)"><i class="el-icon-delete" /></el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible">
      <el-form label-width="50px" style="margin: 0 30px;">
        <el-form-item label="编号">
          <el-input v-model="form.troubleNo" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.troubleName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option value="0" label="不可修复" />
            <el-option value="1" label="可修复" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" rows="3" placeholder="备注" />
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
import { apiGetTroubles, apiAddTrouble, apiEditTroubleStatus, apiDeleteTrouble } from '@/api/fault'
export default {
  name: 'FaultInfoManagement',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加故障信息',
        'edit': '编辑故障信息'
      },
      dialogVisible: false,
      form: {
        troubleNo: '',
        troubleName: '',
        status: '',
        remark: ''
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
        this.tableData = await apiGetTroubles()
        this.tableLoading = false
      } catch (e) {
        this.$message.error(`${e}`)
        this.tableLoading = false
      }
    },

    // 打开模态框
    openDialog(type, data) {
      this.dialogType = type
      if (type === 'add') {
        this.form = {
          troubleNo: '',
          troubleName: '',
          status: '',
          remark: ''
        }
      } else {
        const { id, troubleNo, troubleName, status, remark } = data
        this.form = { id, troubleNo, troubleName, status, remark }
      }
      this.dialogVisible = true
    },

    // 删除故障信息
    handleDelete(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('确定要删除?', '提示', option).then(async() => {
        try {
          await apiDeleteTrouble(data)
          this.$message({ message: '保存成功', type: 'success' })
          this.init()
        } catch (e) {
          this.dialogVisible = false
          this.$message.error(`${e}`)
        }
      }).catch(() => {})
    },

    // 保存故障信息
    async handleSave() {
      const type = this.dialogType
      try {
        if (type === 'add') {
          await apiAddTrouble(this.form)
        } else {
          await apiEditTroubleStatus(this.form)
        }
        this.$message({ message: '保存成功', type: 'success' })
        this.dialogVisible = false
        this.init()
      } catch (e) {
        this.dialogVisible = false
        this.$message.error(`${e}`)
      }
    }
  }
}
</script>

<style scoped></style>

