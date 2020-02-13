<template>
  <div class="user">
    <a-button class="mr-10" type="primary" icon="user-add">添加</a-button>
    <a-button type="primary" icon="search">搜索</a-button>
    <a-table
      bordered
      size="middle"
      class="mt-20"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
    >
      <template
        :slot="col"
        slot-scope="text, record"
        v-for="col in ['password', 'dueTime', 'limit']"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
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
            <a-popconfirm title="取消将不保存更改！" @confirm="cancel(record.key)">
              <a-button icon="minus-circle">取消</a-button>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button type="primary" icon="edit" @click="edit(record.key)" class="mr-10">
              编辑
            </a-button>
            <a-button type="danger" icon="delete" @click="edit(record.key)">删除</a-button>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { Button, Icon, Input, Popconfirm, Table } from "ant-design-vue";

const columns = [
  {
    align: "center",
    title: "账号",
    dataIndex: "username",
    width: "15%",
    scopedSlots: { customRender: "username" }
  },
  {
    align: "center",
    title: "密码",
    dataIndex: "password",
    width: "15%",
    scopedSlots: { customRender: "password" }
  },
  {
    align: "center",
    title: "账号上限",
    dataIndex: "limit",
    width: "15%",
    scopedSlots: { customRender: "limit" }
  },
  {
    align: "center",
    title: "到期时间",
    dataIndex: "dueTime",
    width: "15%",
    scopedSlots: { customRender: "dueTime" }
  },
  {
    align: "center",
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const pagination = {
  total: 100,
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: total => `共有${total}条数据`,
  pageSizeOptions: ["10", "30", "50", "100", "200", "400"]
};

const data = [];
for (let i = 1; i < 101; i++) {
  data.push({
    key: i.toString(),
    username: `${i}`,
    password: `${i}`,
    limit: `${i}`,
    dueTime: new Date().toLocaleString()
  });
}
export default {
  components: {
    [Icon.name]: Icon,
    [Table.name]: Table,
    [Input.name]: Input,
    [Button.name]: Button,
    [Popconfirm.name]: Popconfirm
  },
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      pagination,
      collapsed: false
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    }
  }
};
</script>

<style></style>
