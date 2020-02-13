<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import { LocaleProvider } from "ant-design-vue";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  components: { [LocaleProvider.name]: LocaleProvider },
  data() {
    return {
      locale: zh_CN
    };
  }
};
</script>

<style lang="scss" scoped>
#app {
  color: #2c3e50;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
