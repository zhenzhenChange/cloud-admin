import moment from "moment";

const columns = [
  {
    width: "5%",
    title: "序号",
    align: "center",
    dataIndex: "num",
    scopedSlots: { customRender: "num" }
  },
  {
    title: "账号",
    align: "center",
    dataIndex: "account",
    scopedSlots: { customRender: "account" }
  },
  {
    title: "密码",
    align: "center",
    dataIndex: "password",
    scopedSlots: { customRender: "password" }
  },
  {
    title: "昵称",
    align: "center",
    dataIndex: "username",
    scopedSlots: { customRender: "username" }
  },
  {
    align: "center",
    title: "账号上限",
    dataIndex: "limit",
    scopedSlots: { customRender: "limit" }
  },
  {
    align: "center",
    title: "账号是否有效",
    dataIndex: "isValid",
    scopedSlots: { customRender: "isValid" }
  },
  {
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
  position: "both",
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: total => `共有${total}条数据`,
  pageSizeOptions: ["2", "10", "30", "50", "100", "200", "400"]
};

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
  getCheckboxProps: record => ({
    props: { name: record.name }
  })
};

const UserMixin = {
  data() {
    return {
      columns,
      data: [],
      pagination,
      rowSelection,
      cacheData: [],
      collapsed: false,
      dateScopedSlots: ["dueTime"],
      // selectScopedSlots: ["isValid"],
      inputScopedSlots: ["account", "password", "username", "limit"],
      colScopedSlots: ["account", "password", "username", "limit", "dueTime", "isValid"]
    };
  },
  created() {
    this._initData();
  },
  methods: {
    async _initData() {
      const params = { userRole: 0, pageIndex: "0", pageSize: "999" };
      const { msg, data } = await this.$http.get("/admin/getUser", { params });
      this.$message.info(msg);
      data.forEach((item, index) => {
        this.data.push({
          num: index + 1,
          key: item.userId,
          limit: item.userMaxAdd,
          password: item.userPwd,
          username: item.userName,
          account: item.userAccount,
          isValid: item.userIsValid ? "有效" : "无效",
          dueTime: moment(item.userExpirationDate).format("YYYY-MM-DD HH:mm:ss")
        });
      });
      this.cacheData = this.data.map(item => ({ ...item }));
    },
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
    onChangeDate(event, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = moment(event).format("YYYY-MM-DD HH:mm:ss");
        this.data = newData;
      }
    }
    /*  onChangeSelect(event, key, column) {
      console.log(event);
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = event;
        // 根据select框的值自动带出某个input的值 - 因为第三列列名为c
        event === "lucy" ? (target.c = "根据lucy带出的值") : (target.c = "根据jack带出的值");
        this.data = newData;
      }
    } */
  }
};

export default UserMixin;
