<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.id" clearable placeholder="输入名称" style="width: 200px" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-date-picker
          v-model="query.createTime"
          :default-time="['00:00:00','23:59:59']"
          type="daterange"
          range-separator=":"
          size="small"
          class="date-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <rrOperation :crud="crud" />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--表单组件-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="470px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="站点" prop="website">
          <el-select v-model="form.website" prop="website" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="地址名称" prop="addressName">
          <el-input v-model="form.addressName" style="width: 300px" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入地址" v-model="form.address" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.remark" />
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-radio v-for="item in dict.orderAddress_status" :key="item.id" v-model="form.enabled" :label="item.value">{{ item.label }}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%" row-key="id"  @select="crud.selectChange" @select-all="crud.selectAllChange" @selection-change="crud.selectionChangeHandler">
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column v-if="columns.visible('website')" prop="website" label="站点" />
      <el-table-column v-if="columns.visible('addressName')" prop="addressName" label="地址名称" />
      <el-table-column v-if="columns.visible('address')" prop="address" label="地址" />
      <el-table-column v-if="columns.visible('remark')" prop="remark" label="备注" />
      <el-table-column v-if="columns.visible('enabled')" label="状态" align="center" prop="enabled">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            :disabled="scope.row.id === 1"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeEnabled(scope.row, scope.row.enabled,)"
          />
        </template>
      </el-table-column>
      <el-table-column v-if="columns.visible('createTime')" prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-permission="['admin','orderAddress:edit','orderAddress:del']" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>  
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>

import crudServer from '@/api/system/orderAddress'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
// crud交由presenter持有
const defaultCrud = CRUD({ title: '下单地址管理', url: 'api/orderAddress', crudMethod: { ...crudServer }})
const defaultForm = { id: null, companyId: null, website: null, addressName: null, address: null, remark: null, enabled: 'true' }
export default {
  name: 'OrderAddress',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
   // 设置数据字典
  dicts: ['orderAddress_status'],
  data() {
    return {
      orderAddressList: [],
      orderAddressMap: {},
      loading: false,
      permission: {
        add: ['admin', 'orderAddress:add'],
        edit: ['admin', 'orderAddress:edit'],
        del: ['admin', 'orderAddress:del']
      },
      rules: {
        addressName: [
          { required: true, message: '请输入地址名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      },
      enabledTypeOptions: [
        { key: 'true', display_name: '正常' },
        { key: 'false', display_name: '禁用' }
      ],
      options: [
        {
          value: "日本",
          label: "日本"
        },
        {
          value: "美国",
          label: "美国"
        },
        {
          value: "加拿大",
          label: "加拿大"
        },
        {
          value: "美国",
          label: "美国"
        },
        {
          value: "澳大利亚",
          label: "澳大利亚"
        },
        {
          value: "德国",
          label: "德国"
        },
        {
          value: "法国",
          label: "法国"
        },
        {
          value: "西班牙",
          label: "西班牙"
        },
        {
          value: "意大利",
          label: "意大利"
        }
      ]
    }
  },
  // 改变状态
  changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.orderAddress_status[val] + '" ' + data.addressName + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudCompany.edit(data).then(res => {
          this.crud.notify(this.dict.label.orderAddress_status[val] + '成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        }).catch(err => {
          data.enabled = !data.enabled
          console.log(err.response.data.message)
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
  },
  checkboxT(row, rowIndex) {
     return row.id !== 1
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
