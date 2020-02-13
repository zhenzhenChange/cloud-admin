<template>
  <a-card class="text-center" id="login" title="云控平台管理员后台" :hoverable="true">
    <a-form :form="form" class="login-form">
      <a-form-item>
        <a-input
          allowClear
          size="large"
          placeholder="管理员账号"
          v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }] }]"
        >
          <a-icon slot="prefix" type="user" class="color-black" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          allowClear
          size="large"
          type="password"
          placeholder="管理员密码"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
        >
          <a-icon slot="prefix" type="lock" class="color-black" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button size="large" type="primary" icon="login" @click="login" block>登录</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { Form, Card, Button, Input, Icon } from "ant-design-vue";
export default {
  components: {
    [Form.name]: Form,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Input.name]: Input,
    [Button.name]: Button,
    [Form.Item.name]: Form.Item
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "loginForm" });
  },
  methods: {
    login() {
      this.form.validateFields(async (err, values) => {
        if (err) return;
        const args = { user_account: values.username, user_pwd: values.password };
        const { data, msg, code } = await this.$http.post("/login", args);
        if (code === 0) {
          this.$store.commit("saveUserName", data.userName);
          this.$message.success(msg);
          this.$router.push("/user");
        } else {
          this.$message.error(msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  .login-form {
    width: 300px;
    height: 200px;
  }
}
</style>
