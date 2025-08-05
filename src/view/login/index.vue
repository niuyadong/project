<template>
  <div class="login-container">
    <!-- 账号密码登录界面 -->
    <div class="login-card">
      <div class="login-title">
        用户登录
      </div>
      <div class="login-form">
        <van-cell-group>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :class="{ 'input-focus': focusState.username }"
            @focus="focusState.username = true"
            @blur="focusState.username = false"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :class="{ 'input-focus': focusState.password }"
            @focus="focusState.password = true"
            @blur="focusState.password = false"
          />
        </van-cell-group>
        <div class="login-actions">
          <van-button type="primary" :loading="loading" class="login-btn" @click="onSubmit">
            登录
          </van-button>
        </div>
        <div class="quick-login">
          <div class="quick-login-title">其他登录方式</div>
          <div class="quick-login-options">
            <div class="quick-login-item" @click="smsLogin">
              <van-icon name="message-square" class="icon" />
              <span>手机短信登录</span>
            </div>
            <div class="quick-login-item" @click="wechatLogin">
              <van-icon name="wechat" class="icon" />
              <span>微信登录</span>
            </div>
            <div class="quick-login-item" @click="qqLogin">
              <van-icon name="qq" class="icon" />
              <span>QQ登录</span>
            </div>
            <div class="quick-login-item" @click="appleLogin">
              <van-icon name="apple" class="icon" />
              <span>苹果账号登录</span>
            </div>
          </div>
        </div>
      </div>
      <div class="login-links">
        <router-link to="/register" class="link-item">注册账号</router-link>
        <router-link to="/forgot-password" class="link-item">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// 显式引入并注册Vant组件
import { CellGroup, Field, Button, Icon, Toast } from 'vant';

export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      focusState: {
        username: false,
        password: false
      }
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      setTimeout(() => {
        if (this.username === 'admin' && this.password === '123456') {
          Toast.success('登录成功');
          localStorage.setItem('isLoggedIn', 'true');
          this.$router.push('/home');
        } else {
          Toast.fail('用户名或密码错误');
        }
        this.loading = false;
      }, 1000);
    },
    smsLogin() {
      this.$router.push('/sms-login');
    },
    wechatLogin() {
      Toast('微信登录功能开发中');
    },
    qqLogin() {
      Toast('QQ登录功能开发中');
    },
    appleLogin() {
      Toast('苹果账号登录功能开发中');
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #42b983 0%, #35495e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: bgAnimation 15s ease infinite;
  position: relative;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  animation: cardFloat 3s ease-in-out infinite;
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  position: relative;
}

.login-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: #42b983;
  border-radius: 3px;
}

.van-field {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  // 使label与输入框在同一行
  .van-field__label-wrap {
    float: left;
    width: 80px;  // 调整label宽度
  }
  
  .van-field__control-wrap {
    margin-left: 80px;  // 与label宽度保持一致
  }
}

.van-field.input-focus {
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.login-actions {
  margin-top: 20px;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  background: #42b983;
  border: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #359469;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3);
}

.quick-login {
  margin: 30px 0;
}

.quick-login-title {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-bottom: 15px;
  position: relative;
}

.quick-login-title::before, .quick-login-title::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: #eee;
}

.quick-login-title::before {
  left: 0;
}

.quick-login-title::after {
  right: 0;
}

.quick-login-options {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.quick-login-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-login-item:hover {
  transform: translateY(-3px);
}

.icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  margin-bottom: 8px;
  font-size: 24px;
}

.quick-login-item:nth-child(1) .icon {
  background: #e8f4ff;
  color: #1989fa;
}

.quick-login-item:nth-child(2) .icon {
  background: #e7f7ee;
  color: #07c160;
}

.quick-login-item:nth-child(3) .icon {
  background: #e8f4ff;
  color: #1da1f2;
}

.quick-login-item:nth-child(4) .icon {
  background: #f5f5f5;
  color: #333;
}

.quick-login-item span {
  font-size: 12px;
  color: #666;
}

.login-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 10px;
}

.link-item {
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-item:hover {
  color: #42b983;
}

@keyframes bgAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
