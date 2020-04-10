<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.recUserName"
          clearable
          size="small"
          placeholder="输入接单人名称搜索"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="toQuery"
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
      <crudOperation :permission="permission"></crudOperation>
    </div>

    <!-- 粘贴图片 -->
    <el-dialog
      title="粘贴图片"
      :visible.sync="dialogFormVisible"
      customClass="customWidth"
      width="300px"
    >
      <div
        id="pastePic"
        contenteditable="true"
        v-on:focus="focus()"
        v-on:paste="handlePaste"
        style="height: 150px;margin-top:10px;border:1px solid #808080;text-align:center;line-height:100px;"
      >
        <span id="span" ref="span" style="color: rgb(202, 200, 200);">粘贴在这里</span>
        <img
          id="pastePreImg"
          ref="pastePreImg"
          :src="pastePreImgSrc"
          style="height: 150px; width: 150px;display: none;"
        />
        <input type="hidden" id="picType" name="picType" v-model="picType" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelButton()">取 消</el-button>
        <el-button type="primary" @click="confirmButton()">确 定</el-button>
      </div>
    </el-dialog>

    <!--Form表单-->
    <el-dialog
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      append-to-body
      width="800px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="right"
        size="small"
        label-width="110px"
      >
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="站点" prop="website">
              <el-select
                v-model="form.website"
                prop="website"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺名" prop="mktName">
              <el-input v-model="form.mktName" style="width: 200px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="商品图片" prop="goodImgUrl">
              <el-input type="hidden" v-model="form.goodImgUrl" />
              <img id="formImgUrl" :src="formImgUrl" style="height: 80px; width: 200px" alt />
              <el-button type="text" @click="paster(1)">粘贴</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" class="row-bg">
              <el-form-item label="员工代码" prop="recUserName">
                <el-input v-model="form.recUserName" style="width: 200px;" />
              </el-form-item>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-form-item label="卖家联系方式" prop="sellerContactType">
                <el-input v-model="form.sellerContactType" style="width: 200px;" />
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="Asin" prop="asin">
              <el-input v-model="form.asin" style="width: 200px;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-col :span="12">
              <el-form-item label="数量" prop="orderCount">
                <el-input-number
                  v-model.number="form.orderCount"
                  controls-position="right"
                  style="width: 80px;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="天数" prop="dayCount">
                <el-input-number
                  v-model.number="form.dayCount"
                  controls-position="right"
                  style="width: 80px;"
                />
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="价格" prop="recPrice">
              <el-input v-model="form.recPrice" style="width: 200px;" />
              <label style="color:red">USD</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接单佣金" prop="recCommission">
              <el-input v-model="form.recCommission" style="width: 200px;" />
              <label style="color:red">RMB</label>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="返现方式" prop="cashBackType">
              <el-select
                v-model="form.cashBackType"
                prop="cashBackType"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in cashBackTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="卖家订单类型" prop="sellerOrderType">
              <el-select
                v-model="form.sellerOrderType"
                prop="sellerOrderType"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in sellerOrderTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="工作性质" prop="workerType">
              <el-select
                v-model="form.workerType"
                prop="workerType"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in workerTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否留评" prop="isComment">
              <el-select
                v-model="form.isComment"
                prop="isComment"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in isSelects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="接单日期" prop="recDateTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.recDateTime"
                style="width: 200px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上评日期" prop="planReviewDateTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.planReviewDateTime"
                style="width: 200px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="下单要求" prop="xdRequirement">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入内容"
                v-model="form.xdRequirement"
                style="width: 200px;"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入内容"
                v-model="form.remark"
                style="width: 200px;"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="是否到货拍照" prop="isPhoto">
              <el-select
                v-model="form.isPhoto"
                prop="isPhoto"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in isSelects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="是否需要换仓" prop="isBinShift">
              <el-select
                v-model="form.isBinShift"
                prop="isBinShift"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in isSelects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="是否需要回收" prop="isRecover">
              <el-select
                v-model="form.isRecover"
                prop="isRecover"
                clearable
                placeholder="请选择"
                style="width: 200px;"
              >
                <el-option
                  v-for="item in isSelects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="回收佣金" prop="recoverCommission">
              <el-input v-model="form.recoverCommission" style="width: 200px;" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-form-item label="评论标题" prop="title">
            <el-input v-model="form.title" style="width: 600px;" />
          </el-form-item>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-form-item label="评论内容" prop="content">
            <el-input
              v-model="form.content"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"
              style="width: 600px;"
              rows="2"
              type="textarea"
            />
          </el-form-item>
        </el-row>
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
      style="width: 100%;"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column :selectable="checkboxT" type="selection" width="55" />
      <el-table-column
        v-if="columns.visible('id')"
        :show-overflow-tooltip="true"
        prop="id"
        width="80px"
        label="订单编号"
      />
      <el-table-column
        v-if="columns.visible('recDateTime')"
        :show-overflow-tooltip="true"
        prop="recDateTime"
        width="100px"
        label="接单日期"
      />
      <el-table-column
        v-if="columns.visible('goodImgUrl')"
        prop="goodImgUrl"
        label="商品图片"
        width="100px"
      >
        <template slot-scope="{row}">
          <el-image
            :src="row.goodImgUrl"
            :preview-src-list="[row.goodImgUrl]"
            fit="contain"
            lazy
            class="el-avatar"
          >
            <div slot="error">
              <i class="el-icon-document" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.visible('website')"
        :show-overflow-tooltip="true"
        prop="website"
        width="80px"
        label="站点/店铺"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.website }}</div>
          <div>{{ scope.row.mktName }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.visible('ASIN')"
        :show-overflow-tooltip="true"
        prop="ASIN"
        width="130px"
        label="ASIN/订单号"
      >
        <template slot-scope="scope">
          <div>
            <a
              target="_blank"
              :href="'http://www.amazon.com/gp/product/'+ scope.row.asin"
              style="color:red"
            >{{ scope.row.asin }}</a>
          </div>
          <div>
            <a
              target="_blank"
              :href="'https://www.amazon.com/progress-tracker/package/ref=pt_redirect_from_gp?_encoding=UTF8&from=gp&itemId=kooplollpnpuun&orderId='
          + scope.row.goodOrderNum"
              style="color:red"
            >{{ scope.row.goodOrderNum }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.visible('sellerContactType')"
        :show-overflow-tooltip="true"
        prop="sellerContactType"
        width="100px"
        label="卖家/类型"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.sellerContactType }}</div>
          <div>{{ scope.row.sellerOrderType }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.visible('recPrice')"
        :show-overflow-tooltip="true"
        prop="recPrice"
        width="100px"
        label="接单/下单金额"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.recPrice }}</div>
          <div>{{ scope.row.payPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.visible('recUserName')"
        :show-overflow-tooltip="true"
        prop="recUserName"
        width="100px"
        label="员工信息"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.recUserName }}</div>
          <div>{{ scope.row.shopCardId }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.visible('xdRequirement')"
        :show-overflow-tooltip="true"
        prop="xdRequirement"
        width="120px"
        label="下单要求"
      />
      <el-table-column
        v-if="columns.visible('remark')"
        :show-overflow-tooltip="true"
        prop="remark"
        width="120px"
        label="备注"
      />
      <el-table-column
        v-if="columns.visible('status')"
        :show-overflow-tooltip="true"
        prop="status"
        width="80px"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status > 4 ? 'warning' : 'success'">{{ dict.label.order_status[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="columns.visible('isComment')"
        :show-overflow-tooltip="true"
        prop="isComment"
        width="100px"
        label="额外要求"
      >
        <template slot-scope="scope">
          <div>留评:{{ scope.row.isComment }}</div>
          <div>换仓:{{ scope.row.isBinShift }}</div>
          <div>回收:{{ scope.row.isRecover }}</div>
        </template>
      </el-table-column>

      <el-table-column
        v-permission="['admin','order:edit','order:del']"
        label="操作"
        width="180px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            v-permission="['admin','order:list']"
            size="mini"
            style="margin-right: 3px;"
            type="text"
            @click="find(scope.row)"
          >查看</el-button>
          <el-button
            v-permission="['admin','order:edit']"
            size="mini"
            style="margin-right: 3px;"
            type="text"
            @click="crud.toEdit(scope.row)"
          >编辑</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudFile from "@/api/tools/localStorage";
import crudOrder from "@/api/order/order";
import CRUD, { presenter, header, form, crud } from "@crud/crud";
import rrOperation from "@crud/RR.operation";
import crudOperation from "@crud/CRUD.operation";
import pagination from "@crud/Pagination";

// crud交由presenter持有
const defaultCrud = CRUD({
  title: "订单操作",
  url: "api/order",
  params: {
    status: 7
  },
  crudMethod: { ...crudOrder }
});
const defaultForm = {
  id: null,
  mktName: null,
  goodImgUrl: null,
  goodOrderNum: null,
  recUserId: null,
  recUserName: null,
  orderCount: 1,
  dayCount: 1,
  workerType: null,
  sellerContactType: null,
  sellerOrderType: null,
  cashBackType: null,
  website: null,
  ASIN: null,
  xdRequirement: null,
  remark: null,
  trackNo: null,
  title: null,
  content: null,
  recDateTime: null,
  planReviewDateTime: null,
  recPrice: null,
  recCommission: null,
  recoverCommission: null,
  status: null,
  isComment: "是",
  isPhoto: "是",
  isBinShift: "是",
  isRecover: "是"
};
export default {
  name: "RecPayment",
  components: { crudFile, pagination, crudOperation, rrOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  dicts: ['order_status'],
  data() {
    return {
      delLoading: false,
      dialogFormVisible: false,
      picType: "",
      pastePreImgSrc: "",
      formImgUrl: "",
      permission: {
        add: ["admin", "order:add"],
        edit: ["admin", "order:edit"],
        del: ["admin", "order:del"]
      },
      rules: {
        mktName: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        sellerContactType: [
          { required: true, message: "请输入卖家联系方式", trigger: "blur" }
        ],
        ASIN: [{ required: true, message: "请输入ASIN", trigger: "blur" }]
      },
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
      ],
      cashBackTypes: [
        {
          value: "0",
          label: "先评后返(上评后返全款)"
        },
        {
          value: "1",
          label: "先本后佣(下单返本金,留评返佣金)"
        }
      ],
      sellerOrderTypes: [
        {
          value: "0",
          label: "中介单"
        },
        {
          value: "1",
          label: "卖家单"
        },
        {
          value: "2",
          label: "养号单"
        }
      ],
      workerTypes: [
        {
          value: "0",
          label: "全职"
        },
        {
          value: "1",
          label: "兼职"
        }
      ],
      isSelects: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        }
      ]
    };
  },
  methods: {
    // 执行
    execute(id) {
      crudOrder
        .execution(id)
        .then(res => {
          this.crud.notify("执行成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    // 改变状态
    updateStatus(id, status) {
      crudOrder
        .updateIsPause(id)
        .then(res => {
          this.crud.toQuery();
          this.crud.notify(status + "成功", CRUD.NOTIFICATION_TYPE.SUCCESS);
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    delMethod(id) {
      this.delLoading = true;
      crudOrder
        .del([id])
        .then(() => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.crud.dleChangePage(1);
          this.crud.delSuccessNotify();
          this.crud.toQuery();
        })
        .catch(() => {
          this.delLoading = false;
          this.$refs[id].doClose();
        });
    },
    checkboxT(row, rowIndex) {
      return row.id !== 1;
    },
    uploadImg(name, data) {
      let url = null;
      let param = new FormData();
      param.append("file", data);
      param.append("name", name);
      // 添加请求头
      crudFile.add(param).then(response => {
        url = response.url;
        document.getElementById("formImgUrl").setAttribute("src", url);
        form.goodImgUrl = url;
        console.log("form" + form.goodImgUrl);
      });
      return url;
    },
    handlePaste(event) {
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;

      if (!items || items.length === 0) {
        this.$message.error("当前浏览器不支持本地");
        return;
      }
      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        this.$message.error("粘贴内容非图片");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.file = file;
      reader.onload = event => {
        this.pastePreImgSrc = reader.result;
        this.$refs.pastePreImg.style.display = "block";
      };
      let url = this.$options.methods.uploadImg("商品图片", file);
      // 此时file就是我们的剪切板中的图片对象
    },
    paster(type) {
      this.picType = type;
      this.dialogFormVisible = true;
    },
    focus() {
      this.$refs.span.style.display = "none";
    },
    cancelButton() {
      this.dialogFormVisible = false;
      this.$refs.span.style.display = "block";
      this.$refs.pastePreImg.style.display = "none";
      this.pastePreImgSrc = "";
    },
    confirmButton() {
      this.dialogFormVisible = false;
      this.$refs.span.style.display = "block";
      this.$refs.pastePreImg.style.display = "none";
      this.pastePreImgSrc = "";
    }
  }
};
</script>
