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
  pageSizeOptions: ["10", "30", "50", "100", "200", "400"]
};

const UserMixin = {
  data() {
    return {
      columns,
      data: [],
      pagination,
      keyWords: "",
      cacheData: [],
      collapsed: false,
      dateScopedSlots: ["dueTime"],
      inputScopedSlots: ["account", "password", "username", "limit"],
      colScopedSlots: ["account", "password", "username", "limit", "dueTime", "isValid"]
    };
  },
  created() {
    this._initData();
  },
  methods: {
    _initDataStructure(data) {
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
    async _initData() {
      this.data = [];
      const params = { userRole: 1, pageIndex: "0", pageSize: "999" };
      const { msg, data } = await this.$http.get("/admin/getUser", { params });
      this.$message.info(msg);
      this._initDataStructure(data);
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    async save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        const args = {
          userRole: 1,
          userId: target.key,
          userPwd: target.password,
          userMaxAdd: target.limit,
          userName: target.username,
          userAccount: target.account,
          userExpirationDate: moment(target.dueTime).valueOf()
        };
        const { msg } = await this.$http.post("/admin/saveUser", args);
        this.$message.info(msg);
        this._initData();
        this.keyWords = "";
      }
    },
    remove(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        const args = { userIds: [target.key] };
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
          },
          onCancel() {}
        });
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
    async onSearch() {
      this.data = [];
      const params = { searchAccount: this.keyWords };
      const { data } = await this.$http.get("/admin/getUserByAccount", { params });
      this._initDataStructure(data);
    },
    onChange() {
      !this.keyWords ? this._initData() : "";
    },
    dateToMoment(value) {
      return moment(value);
    },
    onChangeInput(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    onChangeDate(event, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = moment(event).format("YYYY-MM-DD HH:mm:ss");
        this.data = newData;
      }
    }
  }
};

export default UserMixin;
