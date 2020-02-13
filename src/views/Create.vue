<template>
  <a-card title="添加用户" hoverable class="create">
    <a-input
      allowClear
      addonBefore="用户账号"
      placeholder="请输入账号"
      v-model="createData.userAccount"
    />
    <a-input
      allowClear
      class="mt-10"
      addonBefore="用户密码"
      placeholder="请输入密码"
      v-model="createData.userPwd"
    />
    <a-input
      class="mt-10"
      allowClear
      addonBefore="用户昵称"
      placeholder="请输入昵称"
      v-model="createData.userName"
    />
    <a-input
      allowClear
      class="mt-10"
      addonBefore="账号上限"
      placeholder="请输入上限"
      v-model="createData.userMaxAdd"
    />
    <a-divider />
    <a-row class="mb-10">
      <a-col :span="4">
        <div class="span">所属角色</div>
      </a-col>
      <a-col :span="20">
        <a-select style="width:100%" v-model="createData.userRole">
          <a-icon slot="suffixIcon" type="smile" />
          <a-select-option :value="1">用户</a-select-option>
          <a-select-option :value="0">管理员</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="4">
        <div class="span">到期时间</div>
      </a-col>
      <a-col :span="20">
        <a-date-picker
          showTime
          class="mt-10"
          style="width:100%"
          v-model="createData.userExpirationDate"
        />
      </a-col>
    </a-row>
    <a-button class="mt-20" type="primary" block icon="check" @click="onCreate">立即提交</a-button>
  </a-card>
</template>

<script>
import moment from "moment";
import { Row, Col, Card, Icon, Input, Button, Divider, DatePicker, Select } from "ant-design-vue";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Divider.name]: Divider,
    [DatePicker.name]: DatePicker,
    [Select.Option.name]: Select.Option
  },
  data() {
    return {
      createData: {
        userId: "",
        userPwd: "",
        userRole: 1,
        userName: "",
        userMaxAdd: "",
        userAccount: "",
        userExpirationDate: moment(new Date().getTime())
      }
    };
  },
  methods: {
    async onCreate() {
      let { userExpirationDate } = this.createData;
      userExpirationDate = moment(userExpirationDate).valueOf();
      const args = { ...this.createData, userExpirationDate };
      const { msg } = await this.$http.post("/admin/saveUser", args);
      this.$message.info(msg);
      this.createData.userId = "";
      this.createData.userPwd = "";
      this.createData.userName = "";
      this.createData.userMaxAdd = "";
      this.createData.userAccount = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  width: 450px;
  margin: 50px auto;
  text-align: center;
  .span {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
}
</style>
