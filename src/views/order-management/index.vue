<!--订单管理-->
<template>
  <div class="order-management app-container">
    <div v-if="user.role === 'user'" class="filter-container">
      <el-button class="filter-item" type="primary" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" prop="computerInfoId" label="电脑编号" />
      <el-table-column align="center" prop="contact" label="联系人" />
      <el-table-column align="center" prop="contactTel" label="联系电话" />
      <el-table-column align="center" prop="remark" label="备注" />
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ ['未完成', '已完成'][row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" prop="updateTime" label="更新时间" />
      <el-table-column align="center" width="150" prop="createTime" label="创建时间" />
      <el-table-column v-if="user.role === 'admin'" align="center" label="操作" width="90" fixed="right">
        <template slot-scope="{row}">
          <!--          <el-link :underline="false" type="primary" title="编辑" @click="openDialog('edit', row)"><i class="el-icon-edit-outline" /></el-link>-->
          <el-link :underline="false" type="primary" title="处理订单" @click="handleChangeStatus(row)"><i class="el-icon-document-checked" /></el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" type="danger" title="删除" @click="handleDelete(row)"><i class="el-icon-delete" /></el-link>
        </template>
      </el-table-column>
    </el-table>

    <!--    添加订单-->
    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="70px" style="margin: 0 30px;">
        <el-form-item label="电脑编号" prop="extendedDeviceType">
          <el-select v-model="form.computerInfoId" placeholder="请选择电脑编号" style="width: 100%">
            <el-option v-for="(i, j) in computerOptions" :key="j+'s'" :label="i.computerNo" :value="i.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.contactTel" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { apiGetOrders, apiAddOrder, apiEditOrderStatus, apiDeleteOrder } from '@/api/order'
import { apiGetComputersByUser } from '@/api/computer'

export default {
  name: 'OrderManagement',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      computerOptions: [],
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加订单信息',
        'edit': '编辑订单信息'
      },
      dialogVisible: false,
      form: {
        computerInfoId: '',
        contact: '',
        contactTel: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    async init() {
      this.tableLoading = true
      try {
        this.tableData = await apiGetOrders()
        this.tableLoading = false
      } catch (e) {
        this.$message.error(`${e.msg}`)
        this.tableLoading = false
      }
    },

    // 打开模态框
    async openDialog(type, data) {
      this.dialogType = type
      if (type === 'add') {
        try {
          this.computerOptions = await apiGetComputersByUser(this.user.user.id)
          this.form = {
            contact: '',
            contactTel: '',
            remark: '',
            computerInfoId: ''
          }
        } catch (e) {
          this.$message.error(`${e.msg}`)
        }
      } else {
        this.form = data
      }
      this.dialogVisible = true
    },

    // 删除订单信息
    handleDelete(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('确定要删除?', '提示', option).then(async() => {
        try {
          await apiDeleteOrder(data)
          this.$message({ message: '保存成功', type: 'success' })
          this.init()
        } catch (e) {
          this.dialogVisible = false
          this.$message.error(`${e.msg}`)
        }
      }).catch(() => {})
    },

    // 保存订单信息
    async handleSave() {
      const type = this.dialogType
      try {
        if (type === 'add') {
          await apiAddOrder(this.form)
        } else {
          await apiEditOrderStatus(this.form)
        }
        this.$message({ message: '保存成功', type: 'success' })
        this.dialogVisible = false
        this.init()
      } catch (e) {
        this.dialogVisible = false
        this.$message.error(`${e.msg}`)
      }
    },

    // 处理订单
    handleChangeStatus(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('处理该订单?', '提示', option).then(async() => {
        try {
          console.log(data.status)
          data.status = 1
          await apiEditOrderStatus(data)
          this.$message({ message: '处理成功', type: 'success' })
          this.init()
        } catch (e) {
          // this.$message.error(`${e.msg}`)
          this.$message.error(`${e}`)
        }
      })
    }
  }
}
</script>

<style scoped></style>

