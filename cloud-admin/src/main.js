import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "@/assets/css/style.scss";

import { message } from "ant-design-vue";
Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({ router, store, render: h => h(App) }).$mount("#app");
