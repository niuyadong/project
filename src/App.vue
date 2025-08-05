<template>
	<div id="app">
		<router-view />
		<!-- 底部导航 (排除登录页面) -->
		<van-tabbar v-model="active" route v-if="!isLoginPage">
			<van-tabbar-item to="/home" icon="home-o" text="首页" />
			<!-- <van-tabbar-item to="/product-list" icon="list-switch" text="产品列表" /> -->
			<van-tabbar-item to="/cart" icon="shopping-cart-o" text="购物车" />
			<van-tabbar-item to="/user" icon="user-o" text="我的" />
		</van-tabbar>
	</div>
</template>

<script>
// 虽然配置了babel-plugin-import自动引入，但为确保Tabbar组件正确注册，这里显式引入
import { Tabbar, TabbarItem } from 'vant';

export default {
	components: {
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem
	},
	data() {
		return {
			active: 0
		}
	},
	computed: {
		isLoginPage() {
			// 排除登录相关页面
			const loginPaths = ['/login', '/sms-login', '/register', '/forgot-password'];
			return loginPaths.includes(this.$route.path);
		}
	}
}
</script>

<style>
body {
	margin: 0;
	font-size: 16px;
	background-color: #f8f8f8;
	-webkit-font-smoothing: antialiased;
}
html {
	scroll-behavior: smooth;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin: 0;
	padding: 0;
}
/* 整个滚动条 */
::-webkit-scrollbar {
	width: 10px; /* 滚动条宽度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
	background: #f1f1f1; /* 轨道背景色 */
	border-radius: 10px; /* 增加圆角 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
	background: #d3d3d3; /* 淡灰色滑块背景色 */
	border-radius: 10px; /* 增加圆角 */
	box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1); /* 内阴影效果 */
}

/* 滚动条滑块悬停状态 */
::-webkit-scrollbar-thumb:hover {
	background: #b3b3b3; /* 悬停时的淡灰色背景色 */
}

/* Firefox 滚动条样式 */
* {
	scrollbar-width: thin; /* 可选值：auto, thin, none */
	scrollbar-color: #d3d3d3 #f1f1f1; /* 滑块颜色 轨道颜色 */
}
</style>
