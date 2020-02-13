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
    </a-row>
    <a-table
      bordered
      size="middle"
      class="mt-20"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :rowSelection="rowSelection"
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
            <a-button type="dashed" icon="save" @click="save(record.key)" class="mr-10">
              保存
            </a-button>
            <a-button type="danger" icon="minus-circle" @click="cancel(record.key)">取消</a-button>
          </span>
          <span v-else>
            <a-button type="primary" icon="edit" @click="edit(record.key)" class="mr-10">
              编辑
            </a-button>
            <a-button type="danger" icon="delete" @click="remove(record.key)">删除</a-button>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import UserMixin from "../mixins/User";
import { Row, Col, Icon, Input, Table, Button, Popconfirm, DatePicker } from "ant-design-vue";

export default {
  mixins: [UserMixin],
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
