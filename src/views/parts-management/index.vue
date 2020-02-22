<!--零件管理-->
<template>
  <div class="parts-management app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table v-loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" prop="num" label="数量(个)" />
      <el-table-column align="center" prop="partName" label="零件名称" />
      <el-table-column align="center" prop="price" label="价格" />
      <el-table-column align="center" width="150" prop="updateTime" label="更新时间" />
      <el-table-column align="center" width="150" prop="createTime" label="创建时间" />
      <el-table-column align="center" label="操作" width="50" fixed="right">
        <template slot-scope="{row}">
          <el-link :underline="false" type="primary" title="使用零件" @click="handleUsed(row)"><i class="el-icon-thumb" /></el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible">
      <el-form label-width="50px" style="margin: 0 30px;">
        <el-form-item label="个数">
          <el-input v-model="form.num" placeholder="请输入个数" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.partName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="http://www.wcx412.xyz:6543/file/partFileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleGetPic"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="imgVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
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
import { apiGetParts, apiAddPart, apiUsePart } from '@/api/parts'
export default {
  name: 'PartsManagement',
  data() {
    return {
      tableData: [],
      tableLoading: false,
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加零件信息',
        'edit': '编辑零件信息'
      },
      dialogVisible: false,
      form: {
        num: '',
        partName: '',
        price: '',
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
        this.tableData = await apiGetParts()
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
          num: '',
          partName: '',
          price: '',
          url: ''
        }
      } else {
        this.form = data
      }
      this.dialogVisible = true
    },

    // 保存零件信息
    async handleSave() {
      const type = this.dialogType
      try {
        if (type === 'add') {
          await apiAddPart(this.form)
        } else {
          await apiUsePart(this.form)
        }
        this.$message({ message: '保存成功', type: 'success' })
        this.dialogVisible = false
        this.init()
      } catch (e) {
        this.dialogVisible = false
        this.$message.error(`${e.msg}`)
      }
    },

    // 使用零件
    handleUsed(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('使用该零件?', '提示', option).then(async() => {
        try {
          await apiUsePart(data)
          this.$message({ message: '使用成功', type: 'success' })
        } catch (e) {
          this.$message.error(`${e.msg}`)
        }
      })
    },

    handleGetPic(file) {
      this.form.url = file
      console.log(file)
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

<style scoped></style>

