<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.id"
          clearable
          placeholder="输入微信"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
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
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="470px"
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="中介微信" prop="weixin">
          <el-input v-model="form.weixin" style="width: 300px" />
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-select v-model="form.tag" prop="tag" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column v-if="columns.visible('weixin')" prop="weixin" label="中介微信" />
      <el-table-column v-if="columns.visible('tag')" prop="tag" label="标签" />
      <el-table-column v-if="columns.visible('remark')" prop="remark" label="备注" />
      <el-table-column v-if="columns.visible('createTime')" prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-permission="['admin','mediumInfo:edit','mediumInfo:del']"
        label="操作"
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <udOperation :data="scope.row" :permission="permission" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudMediumInfo from "@/api/system/mediumInfo";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import udOperation from "@crud/UD.operation";
import pagination from "@crud/Pagination";
// crud交由presenter持有
const defaultCrud = CRUD({
  title: "中介信息管理",
  url: "api/mediumInfo",
  crudMethod: { ...crudMediumInfo }
});
const defaultForm = {
  id: null,
  companyId: null,
  weixin: null,
  tag: null,
  remark: null
};
export default {
  name: "MediumInfo",
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      mediumInfoList: [],
      mediumInfoMap: {},
      loading: false,
      permission: {
        add: ["admin", "mediumInfo:add"],
        edit: ["admin", "mediumInfo:edit"],
        del: ["admin", "mediumInfo:del"]
      },
      rules: {
        weixin: [{ required: true, message: "请输入微信", trigger: "blur" }]
      },
      options: [
        {
          value: "优",
          label: "优"
        },
        {
          value: "良",
          label: "良"
        },
        {
          value: "差",
          label: "差"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-input-number .el-input__inner {
  text-align: left;
}
</style>
