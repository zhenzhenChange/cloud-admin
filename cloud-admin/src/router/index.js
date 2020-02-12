import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      { path: "/user", name: "User", component: () => import("../views/User.vue") },
      { path: "/admin", name: "Admin", component: () => import("../views/Admin.vue") }
    ]
  }
];

const router = new VueRouter({ routes });

export default router;
