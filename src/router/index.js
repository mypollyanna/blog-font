import Vue from 'vue'
import Router from 'vue-router'
import UserManage from "../views/UserManage";
import UserAdd from "../views/UserAdd";
import Index from '../views/Index'
import UserUpdate from "../views/UserUpdate";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "用户管理",
      component: Index,
      redirect: "/UserManage",
      show: true,
      children: [
        {
          path: "/UserManage",
          name: "查询用户",
          component: UserManage,
          show: true
        },
        {
          path: "/UserAdd",
          name: "添加用户",
          component: UserAdd,
          show: true
        },
        {
          path: '/UserUpdate',
          name: '修改',
          component: UserUpdate,
          show: false
        }
      ]
    },

  ]
})
