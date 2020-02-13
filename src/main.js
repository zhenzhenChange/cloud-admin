import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "@/assets/css/style.scss";

import { message, modal } from "ant-design-vue";
Vue.prototype.$modal = modal;
Vue.prototype.$message = message;

import http from "./http";
Vue.prototype.$http = http;

Vue.config.productionTip = false;

new Vue({ router, store, render: h => h(App) }).$mount("#app");
