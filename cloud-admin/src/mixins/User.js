import moment from "moment";
const data = [];
for (let i = 1; i < 201; i++) {
  data.push({
    key: i.toString(),
    username: `账号mixins${i}`,
    password: `ABCE${i}`,
    limit: `账号上限${i}`,
    dueTime: moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
  });
}

const columns = [
  {
    width: "15%",
    title: "账号",
    align: "center",
    dataIndex: "username",
    scopedSlots: { customRender: "username" }
  },
  {
    width: "15%",
    title: "密码",
    align: "center",
    dataIndex: "password",
    scopedSlots: { customRender: "password" }
  },
  {
    width: "15%",
    align: "center",
    title: "账号上限",
    dataIndex: "limit",
    scopedSlots: { customRender: "limit" }
  },
  {
    width: "15%",
    align: "center",
    title: "到期时间",
    dataIndex: "dueTime",
    scopedSlots: { customRender: "dueTime" }
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const pagination = {
  total: 200,
  position: "both",
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: total => `共有${total}条数据`,
  pageSizeOptions: ["10", "30", "50", "100", "200", "400"]
};

const UserMixin = {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      pagination,
      collapsed: false,
      dateScopedSlots: ["dueTime"],
      inputScopedSlots: ["password", "limit"]
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
    },
    onSearch(keyWords) {
      console.log(keyWords);
    },
    onCreate() {},
    toMoment(value) {
      return moment(value);
    },
    onChangeDate(event, rowKey, column) {
      const newData = [...this.data];
      const target = newData.filter(item => rowKey === item.key)[0];
      if (target) {
        target[column] = moment(event).format("YYYY-MM-DD HH:mm:ss");
        this.data = newData;
      }
    }
  }
};

export default UserMixin;
