<template>
  <a-layout id="home-layout">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline" :selectedKeys="[$route.path]" :defaultSelectedKeys="[key]">
        <a-menu-item v-for="item in menu" :key="item.index" :index="item.index">
          <a-icon :type="item.icon" />
          <router-link class="span-link" :to="item.path" tag="span">{{ item.text }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="home-header">
        <a-icon
          class="trigger"
          @click="collapsed = !collapsed"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        />
        <a-button type="primary" @click="logout">退出登录</a-button>
        <span class="mr-20 float-right">
          <h2>操作员：{{ username }}</h2>
        </span>
      </a-layout-header>
      <a-layout-content class="home-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
import { Menu, Icon, Button, Layout } from "ant-design-vue";

export default {
  name: "Home",
  components: {
    [Icon.name]: Icon,
    [Menu.name]: Menu,
    [Button.name]: Button,
    [Layout.name]: Layout,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Header.name]: Layout.Header,
    [Layout.Footer.name]: Layout.Footer,
    [Layout.Content.name]: Layout.Content
  },
  data() {
    return {
      key: "/user",
      collapsed: false,
      menu: [
        { text: "用户", icon: "user", path: "/user", index: "/user" },
        { text: "管理员", icon: "setting", path: "/admin", index: "/admin" },
        { text: "创建用户", icon: "setting", path: "/create", index: "/create" }
      ]
    };
  },
  computed: {
    ...mapState({ username: state => state.username })
  },
  methods: {
    logout() {
      this.$router.push("/");
      localStorage.removeItem("username");
    }
  }
};
</script>

<style lang="scss" scoped>
#home-layout {
  height: 100vh;
  .trigger {
    cursor: pointer;
    padding: 0 16px;
    font-size: 18px;
    line-height: 64px;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 32px;
    margin: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("../assets/images/cloud.jpg");
  }

  .span-link {
    width: 130px;
    height: 40px;
    display: inline-block;
  }

  .home-header {
    padding: 0;
    background: rgb(231, 227, 227);
  }

  .home-content {
    padding: 24px;
    margin: 24px 16px;
    min-height: 280px;
    background: #fff;
  }
}
</style>
