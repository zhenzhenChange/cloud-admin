<template>
  <div>
    <div class="page-location-wrapper">
      <bread-nav :nav-list="['数据模版', '数据模版DEMO']" />
      <h1>数据模版DEMO</h1>
    </div>
    <div class="public-container">
      <div class="public-operation-bar">
        <div class="button-wrapper">
          <a-button icon="plus-circle" type="primary" @click="addRow">新增 </a-button>
          <a-button type="primary">批量发布</a-button>
        </div>
      </div>
      <a-divider />
      <div class="table-wrapper">
        <!--每个列的宽度必须比列名总长度大才能使表格所有列对齐，留一个列不设置宽度-->
        <a-table
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
            onSelectAll: onSelectAllChange
          }"
          :columns="columns"
          :dataSource="tableData"
          bordered
          size="middle"
          :pagination="pagination"
          :loading="tableLoading"
          :scroll="{ x: 2050 }"
        >
          <template v-for="col in customRenderList" v-slot:[col]="(text, record, index)">
            <div :key="col">
              <a-input
                :read-only="readonlyArr.includes(col)"
                placeholder="请输入"
                v-if="record.editable && inputScopedSlots.includes(col)"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <a-date-picker
                placeholder="请选择时间"
                v-else-if="record.editable && dateScopedSlots.includes(col)"
                :value="momentDateStr(text)"
                @change="onChangeDate($event, record.key, col)"
              />
              <a-select
                placeholder="请选择"
                style="display: block;"
                v-else-if="record.editable && selectScopedSlots.includes(col)"
                :value="text"
                @change="onChangeSelect($event, record.key, col)"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="jack">Jack</a-select-option>
              </a-select>
              <span v-else>{{ text }}</span>
            </div>
          </template>

          <template #action="text, record, index">
            <div class="editable-row-operations">
              <div v-if="record.editable">
                <a @click="save(record.key)">保存</a>
                <a-divider type="vertical" />
                <a @click="cancel(record.key)">取消</a>
              </div>
              <div v-else>
                <a @click="edit(record.key)">编辑</a>
              </div>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
// import Mixin from "./mixin";
// import Moment from "moment";

export default {
  name: "DataTemplateDemo",
  mixins: [Mixin],
  methods: {
    // 将时间字符串 转换 为 Moment
    // momentDateStr(dateStr) {
    // return Moment(dateStr);
    // }
  }
};
</script>
