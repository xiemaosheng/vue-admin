<template>
  <el-dialog :visible.sync="dialog" append-to-body title="订单详情" width="60%">
    <!--Form表单-->
    <el-row type="flex" class="row-bg">
      <label>订单信息</label>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>站点:</label>
        <div>{{form.order.website}}</div>
      </el-col>
      <el-col :span="12">
        <label>店铺:</label>
        <div>{{form.order.mktName}}</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>商品图片:</label>
        <div>
          <img id="formImgUrl" :src="form.order.goodImgUrl" style="height: 80px; width: 200px" alt />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <label>员工代码:</label>
            <div>{{form.order.recUserName}}</div>
          </el-col>
          <el-col :span="12">
            <label>卖家联系方式:</label>
            <div>{{form.order.sellerContactType}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <label>下单信息</label>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>站点:</label>
        <div>{{form.order.website}}</div>
      </el-col>
      <el-col :span="12">
        <label>店铺:</label>
        <div>{{form.order.mktName}}</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>商品图片:</label>
        <div>
          <img id="formImgUrl" :src="form.order.goodImgUrl" style="height: 80px; width: 200px" alt />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <label>员工代码:</label>
            <div>{{form.order.recUserName}}</div>
          </el-col>
          <el-col :span="12">
            <label>卖家联系方式:</label>
            <div>{{form.order.sellerContactType}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <label>反馈信息</label>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>站点:</label>
        <div>{{form.order.website}}</div>
      </el-col>
      <el-col :span="12">
        <label>店铺:</label>
        <div>{{form.order.mktName}}</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>商品图片:</label>
        <div>
          <img id="formImgUrl" :src="form.order.goodImgUrl" style="height: 80px; width: 200px" alt />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <label>员工代码:</label>
            <div>{{form.order.recUserName}}</div>
          </el-col>
          <el-col :span="12">
            <label>卖家联系方式:</label>
            <div>{{form.order.sellerContactType}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <label>上评信息</label>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>站点:</label>
        <div>{{form.order.website}}</div>
      </el-col>
      <el-col :span="12">
        <label>店铺:</label>
        <div>{{form.order.mktName}}</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>商品图片:</label>
        <div>
          <img id="formImgUrl" :src="form.order.goodImgUrl" style="height: 80px; width: 200px" alt />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <label>员工代码:</label>
            <div>{{form.order.recUserName}}</div>
          </el-col>
          <el-col :span="12">
            <label>卖家联系方式:</label>
            <div>{{form.order.sellerContactType}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <label>收款信息</label>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>站点:</label>
        <div>{{form.order.website}}</div>
      </el-col>
      <el-col :span="12">
        <label>店铺:</label>
        <div>{{form.order.mktName}}</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <label>商品图片:</label>
        <div>
          <img id="formImgUrl" :src="form.order.goodImgUrl" style="height: 80px; width: 200px" alt />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <label>员工代码:</label>
            <div>{{form.order.recUserName}}</div>
          </el-col>
          <el-col :span="12">
            <label>卖家联系方式:</label>
            <div>{{form.order.sellerContactType}}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <label>订单流程信息</label>
    </el-row>
    <el-table v-loading="loading" :data="data" style="width: 100%;margin-top: -10px;">
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="jobName" label="操作人" />
      <el-table-column :show-overflow-tooltip="true" prop="jobName" label="内容" />
    </el-table>

    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      :page-size="6"
      style="margin-top:8px;"
      layout="total, prev, pager, next"
      @size-change="sizeChange"
      @current-change="pageChange"
    />

    <div slot="footer" class="dialog-footer">
      <!-- <el-button type="text" @click="crud.cancelCU">关闭</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import crud from "@/mixins/crud";
export default {
  mixins: [crud],
  data() {
    return {
      title: "订单详情",
      form: { order: {} },
      log: [
        {
          createTime: new Date(),
          optUserName: "xms",
          content: "流程"
        }
      ]
    };
  },
  methods: {
    doInit() {
      this.form = {
        order: {
          website: "美国",
          mktName: "测试"
        }
      };
      this.$nextTick(() => {
        this.init()
      })
    },
    // 获取数据前设置好接口地址
    beforeInit() {
      this.url = "api/jobs/logs";
      this.size = 6;
      return true;
    }
  }
};
</script>