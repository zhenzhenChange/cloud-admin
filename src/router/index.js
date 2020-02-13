import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Login", component: Login, meta: { isLogin: true } },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      { path: "/user", name: "User", component: () => import("../views/User.vue") },
      { path: "/admin", name: "Admin", component: () => import("../views/Admin.vue") },
      { path: "/create", name: "Create", component: () => import("../views/Create.vue") }
    ]
  }
];

const router = new VueRouter({ base: "/cloud-admin/", mode: "history", routes });

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  if (!to.meta.isLogin && !localStorage.getItem("username")) {
    Vue.prototype.$message.warning("请先登录~");
    return next("/");
  }
  next();
});

export default router;
