<template>
  <div class="user">
    <a-row>
      <a-col :span="4" class="mr-10">
        <a-input placeholder="请输入账号" allowClear v-model="keyWords" @change="onChange">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-col>
      <a-col :span="2">
        <a-button type="primary" icon="search" @click="onSearch">搜索</a-button>
      </a-col>
      <a-col :span="2">
        <a-button type="danger" icon="delete" @click="onDelete">批量删除</a-button>
      </a-col>
    </a-row>
    <a-table
      bordered
      size="middle"
      class="mt-20"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange }"
    >
      <template :slot="col" slot-scope="text, record" v-for="col in colScopedSlots">
        <div :key="col">
          <a-input
            allowClear
            :value="text"
            v-if="record.editable && inputScopedSlots.includes(col)"
            @change="e => onChangeInput(e.target.value, record.key, col)"
          />
          <a-date-picker
            showTime
            :allowClear="false"
            :value="dateToMoment(text)"
            placeholder="请选择时间"
            @change="onChangeDate($event, record.key, col)"
            v-else-if="record.editable && dateScopedSlots.includes(col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div>
          <span v-if="record.editable">
            <a-button
              icon="save"
              class="mr-10"
              type="dashed"
              :disabled="flag"
              @click="save(record.key)"
            >
              保存
            </a-button>
            <a-button
              type="danger"
              icon="minus-circle"
              :disabled="flag"
              @click="cancel(record.key)"
            >
              取消
            </a-button>
          </span>
          <span v-else>
            <a-button
              icon="edit"
              class="mr-10"
              type="primary"
              :disabled="flag"
              @click="edit(record.key)"
            >
              编辑
            </a-button>
            <a-button type="danger" icon="delete" @click="remove(record.key)" :disabled="flag"
              >删除</a-button
            >
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import AdminMixin from "../mixins/Admin";
import { Row, Col, Icon, Input, Table, Button, Popconfirm, DatePicker } from "ant-design-vue";

export default {
  mixins: [AdminMixin],
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Table.name]: Table,
    [Input.name]: Input,
    [Button.name]: Button,
    [DatePicker.name]: DatePicker,
    [Popconfirm.name]: Popconfirm,
    [Input.Search.name]: Input.Search
  },
  data() {
    return {
      selectedRowKeys: []
    };
  },
  computed: {
    flag() {
      return this.selectedRowKeys.length === 0 ? false : true;
    }
  },
  methods: {
    onChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    onDelete() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning("请选择要删除的账号~");
        return;
      }
      const args = { userIds: this.selectedRowKeys };
      this.$modal.confirm({
        icon: "delete",
        okText: "确定",
        centered: true,
        keyboard: false,
        okType: "danger",
        title: "删除用户",
        cancelText: "取消",
        content: "确定要删除吗？",
        onOk: async () => {
          const { msg } = await this.$http.post("/admin/deleteUser", args);
          this.$message.info(msg);
          this._initData();
          this.keyWords = "";
          this.selectedRowKeys = [];
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#back-top .ant-back-top {
  bottom: 100px;
  .ant-back-top-inner {
    width: 40px;
    height: 40px;
    color: #fff;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    background-color: #1088e9;
  }
}
</style>
