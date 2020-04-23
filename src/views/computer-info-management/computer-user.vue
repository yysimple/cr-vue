<!--电脑信息管理-->
<template>
  <div class="computer-user app-container">
    <el-table v-loading="tableLoading" :data="tableData" fit highlight-current-row style="width: 100%" @row-click="openDialog">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column align="center" prop="computerNo" label="电脑编号" min-width="100" />
      <el-table-column align="center" prop="brand" label="电脑品牌" />
      <el-table-column align="center" prop="model" label="电脑型号" />
      <el-table-column align="center" prop="price" label="电脑价格" />
      <el-table-column align="center" prop="remark" label="描述" />
      <el-table-column align="center" min-width="120" label="图片">
        <template slot-scope="{ row }">
          <img :src="row.url" alt="" style="width: 106px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{ ['卖出', '未卖出'][row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" prop="updateTime" label="卖出时间" />
      <el-table-column align="center" width="150" prop="createTime" label="进货时间" />
    </el-table>

    <!--    添加/编辑 电脑-->
    <el-dialog :title="dialogTitleMap[dialogType]" :visible.sync="dialogVisible" width="80%">
      <el-form label-width="90px" style="margin: 0 30px;">
        <el-row type="flex" justify="space-between" style="width: 100%">
          <el-col :span="10">
            <el-form-item label="电脑编号">
              <el-input v-model="form.computerNo" placeholder="请输入电脑编号" />
            </el-form-item>
            <el-form-item label="电脑品牌">
              <el-input v-model="form.brand" placeholder="请输入电脑品牌" />
            </el-form-item>
            <el-form-item label="电脑型号">
              <el-input v-model="form.model" placeholder="请输入电脑型号" />
            </el-form-item>
            <el-form-item label="电脑价格">
              <el-input v-model="form.price" placeholder="请输入电脑价格" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="描述">
              <el-input v-model="form.remark" type="textarea" rows="3" placeholder="描述" />
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                action="http://www.wcx412.xyz:6543/file/computerFileUpload"
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

    <!--    详情-->
    <el-dialog title="详情" :visible.sync="detailVisible" width="80%">
      <el-form label-width="90px" style="margin: 0 30px;">
        <el-row type="flex" justify="space-between" style="width: 100%">
          <el-col :span="10">
            <el-form-item label="电脑编号">
              {{ form.computerNo }}
            </el-form-item>
            <el-form-item label="电脑品牌">
              {{ form.brand }}
            </el-form-item>
            <el-form-item label="电脑型号">
              {{ form.model }}
            </el-form-item>
            <el-form-item label="电脑价格">
              {{ form.price }}
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="描述">
              {{ form.remark }}
            </el-form-item>
            <el-form-item label="图片">
              <el-image
                style="width: 100px; height: 100px"
                :src="form.url"
                :preview-src-list="[form.url]"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiGetComputers, apiAddComputer, apiEditComputer, apiDeleteComputer, apiBuyComputer, apiGetComputersByUser } from '@/api/computer'
export default {
  name: 'ComputerInfoManagement',
  data() {
    return {
      activeName: 'admin',
      tableData: [],
      tableLoading: false,
      dialogType: 'add',
      dialogTitleMap: {
        'add': '添加电脑',
        'edit': '编辑电脑'
      },
      dialogVisible: false,
      detailVisible: false,
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
        this.tableData = await apiGetComputersByUser(this.user.user.id)
        this.tableLoading = false
      } catch (e) {
        this.$message.error(`${e.msg}`)
        this.tableLoading = false
      }
    },

    // 打开模态框
    openDialog(row) {
      if (!row) {
        this.dialogType = 'add'
        this.form = {
          computerNo: '',
          brand: '',
          model: '',
          price: '',
          remark: '',
          url: ''
        }
        this.dialogVisible = true
      } else {
        this.detailVisible = true
        this.dialogType = 'edit'
        this.form = row
      }
    },

    // 删除电脑信息
    handleDelete(data) {
      const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      this.$confirm('确定要删除?', '提示', option).then(async() => {
        try {
          await apiDeleteComputer(data)
          this.$message({ message: '保存成功', type: 'success' })
          this.init()
        } catch (e) {
          this.$message.error(`${e.msg}`)
          this.dialogVisible = false
        }
      }).catch(() => {})
    },

    // 保存电脑信息
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
        this.$message.error(`${e.msg}`)
        this.dialogVisible = false
      }
    },

    // 购买
    async handleShopping(row) {
      this.$confirm(`确定要购买该台电脑吗？`, '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async() => {
          try {
            await apiBuyComputer(row.id, this.user.user.id)
            this.$message({ message: '购买成功', type: 'success' })
            this.init()
          } catch (e) {
            this.$message.error(`${e.msg}`)
          }
        })
        .catch(action => {})
    },

    handleGetPic(file) {
      this.form.url = file
      console.log(this.form.url)
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
    .computer-user {
        .el-dialog {
            min-width: 550px !important;
            max-width: 684px !important;
        }
    }
</style>

