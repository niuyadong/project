import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {    
    path: "/login",
    name: "login",
    component: () => import("./view/login"),
    meta: {
      title: "用户登录",
      requiresAuth: false
    }
  },
  {    
    path: "/sms-login",
    name: "sms-login",
    component: () => import("./view/login/sms-login.vue"),
    meta: {
      title: "短信登录",
      requiresAuth: false
    }
  },
  {    
    path: "/register",
    name: "register",
    component: () => import("./view/login/register.vue"),
    meta: {
      title: "用户注册",
      requiresAuth: false
    }
  },
  {    
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("./view/login/forgot-password.vue"),
    meta: {
      title: "忘记密码",
      requiresAuth: false
    }
  },
  {    
    path: "/",
    redirect: "/home"
  },
  {    
    path: "/home",
    name: "home",
    component: () => import("./view/home/Home.vue"),
    meta: {
      title: "首页",
      requiresAuth: true
    }
  },
  {    
    path: "/cart",
    name: "cart",
    component: () => import("./view/cart"),
    meta: {
      title: "购物车",
      requiresAuth: true
    }
  },
  {    
    path: "/cart/checkout",
    name: "checkout",
    component: () => import("./view/cart/checkout.vue"),
    meta: {
      title: "确认订单",
      requiresAuth: true
    }
  },
  {    
    path: "/order/success",
    name: "order-success",
    component: () => import("./view/order/success.vue"),
    meta: {
      title: "订单提交成功",
      requiresAuth: true
    }
  },
  {    
    path: "/address/edit",
    name: "address-edit",
    component: () => import("./view/address/edit.vue"),
    meta: {
      title: "编辑地址",
      requiresAuth: true
    }
  },
  {    
    path: "/coupons",
    name: "coupons",
    component: () => import("./view/coupons.vue"),
    meta: {
      title: "选择优惠券",
      requiresAuth: true
    }
  },
  {    
    path: "/goods/:id",
    name: "goods",
    component: () => import("./view/goods"),
    meta: {
      title: "商品详情",
      requiresAuth: true
    }
  },  
  {    
    path: "/product-list",
    name: "product-list",    
    component: () => import("./view/product-list"),   
    meta: {      
      title: "产品列表",
      requiresAuth: true    
    } 
  },
  {    
    name: "user",
    path: "/user",
    component: () => import("./view/user"),
    meta: {
      title: "会员中心",
      requiresAuth: true
    }
  },
  {    
    path: "*",
    redirect: "/home"
  }
];

// add route path
routes.forEach((route) => {
  route.path = route.path || "/" + (route.name || "");
});

const router = new Router({
  routes,
  mode: "history", // 设置为 history 模式
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  
  // 登录验证逻辑
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const requiresAuth = to.meta.requiresAuth !== false;
  
  if (requiresAuth && !isLoggedIn) {
    return next('/login');
  }
  
  next();
});

export { router };
