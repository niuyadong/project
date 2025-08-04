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
    redirect: "/login"
  },
  {    
    path: "*",
    redirect: "/login"
  },
  {    
    name: "user",
    component: () => import("./view/user"),
    meta: {
      title: "会员中心",
      requiresAuth: true
    }
  },
  {    
    name: "cart",
    component: () => import("./view/cart"),
    meta: {
      title: "购物车",
      requiresAuth: true
    }
  },
  {    
    name: "goods",
    path: "/goods/:id",
    component: () => import("./view/goods"),
    meta: {
      title: "商品详情",
      requiresAuth: true
    }
  },  
  {    
    name: "product-list",    
    path: "/product-list",
    component: () => import("./view/product-list"),   
    meta: {      
      title: "产品列表",
      requiresAuth: true    
    } 
  },
  {
    name: "demos",
    component: () => import("./view/demoPage"),
    meta: {
      title: "demos",
    },
  },
  {
    name: "calendar",
    component: () => import("./view/demoPage/calendar.vue"),
    meta: {
      title: "calendar",
    },
  },
  {
    name: "Acalendar",
    component: () => import("./view/demoPage/Acalendar.vue"),
    meta: {
      title: "Acalendar",
    },
  },
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
