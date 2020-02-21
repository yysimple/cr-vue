<!--手机信息管理-->
<template>
  <div class="mobile-info-management app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" prop="computerNo" label="手机编号" min-width="100" />
      <el-table-column align="center" prop="brand" label="手机品牌" />
      <el-table-column align="center" prop="model" label="手机型号" />
      <el-table-column align="center" prop="price" label="手机价格" />
      <el-table-column align="center" prop="remark" label="描述" />
      <el-table-column align="center" prop="url" label="图片" />
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ ['卖出', '未卖出'][row.status] }}</span>
        </template>
      </el-table-column>
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

    <!--    添加/编辑 手机-->
    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible" width="80%">
      <el-form label-width="90px" style="margin: 0 30px;">
        <el-row type="flex" justify="space-between" style="width: 100%">
          <el-col :span="12">
            <el-form-item label="手机编号">
              <el-input v-model="form.computerNo" placeholder="请输入手机编号" />
            </el-form-item>
            <el-form-item label="手机品牌">
              <el-input v-model="form.brand" placeholder="请输入手机品牌" />
            </el-form-item>
            <el-form-item label="手机型号">
              <el-input v-model="form.model" placeholder="请输入手机型号" />
            </el-form-item>
            <el-form-item label="手机价格">
              <el-input v-model="form.price" placeholder="请输入手机价格" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述">
              <el-input v-model="form.remark" type="textarea" rows="3" placeholder="描述" />
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="imgVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
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
import { apiGetComputers, apiAddComputer, apiEditComputer, apiDeleteComputer } from '@/api/computer'
export default {
  name: 'MobileInfoManagement',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加手机',
        'edit': '编辑手机'
      },
      dialogVisible: false,
      form: {
        computerNo: '',
        brand: '',
        model: '',
        price: '',
        remark: '',
        url: ''
      },
      dialogImageUrl: '',
      imgVisible: false
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
        this.tableData = await apiGetComputers()
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
          computerNo: '',
          brand: '',
          model: '',
          price: '',
          remark: '',
          url: ''
        }
      } else {
        this.form = data
      }
      this.dialogVisible = true
    },

    // 删除手机信息
    handleDelete(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('确定要删除?', '提示', option).then(async() => {
        try {
          await apiDeleteComputer(data)
          this.$message({ message: '保存成功', type: 'success' })
          this.init()
        } catch (e) {
          this.$message.error(`${e}`)
          this.dialogVisible = false
        }
      }).catch(() => {})
    },

    // 保存手机信息
    async handleSave() {
      const type = this.dialogType
      try {
        if (type === 'add') {
          await apiAddComputer(this.form)
        } else {
          await apiEditComputer(this.form)
        }
        this.$message({ message: '保存成功', type: 'success' })
        this.dialogVisible = false
        this.init()
      } catch (e) {
        this.$message.error(`${e}`)
        this.dialogVisible = false
      }
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgVisible = true
    }
  }
}
</script>

<style lang="scss">
  .mobile-info-management {
    .el-dialog {
      min-width: 550px !important;
    }
  }
</style>

