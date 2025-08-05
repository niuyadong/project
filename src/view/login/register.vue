<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">用户注册</div>
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
            v-model="email"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            :class="{ 'input-focus': focusState.email }"
            @focus="focusState.email = true"
            @blur="focusState.email = false"
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
          <van-field
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="请确认密码"
            :class="{ 'input-focus': focusState.confirmPassword }"
            @focus="focusState.confirmPassword = true"
            @blur="focusState.confirmPassword = false"
          />
        </van-cell-group>
        <div class="login-actions">
          <van-button type="primary" :loading="loading" class="login-btn" @click="onSubmit">
            注册
          </van-button>
        </div>
      </div>
      <div class="login-links">
        <router-link to="/login" class="link-item">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { CellGroup, Field, Button } from 'vant';

export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      focusState: {
        username: false,
        email: false,
        password: false,
        confirmPassword: false
      }
    };
  },
  methods: {
    onSubmit() {
      if (!this.username || !this.email || !this.password || !this.confirmPassword) {
        this.$toast.fail('请填写所有字段');
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.$toast.fail('两次密码输入不一致');
        return;
      }

      this.loading = true;
      setTimeout(() => {
        this.$toast.success('注册成功');
        this.$router.push('/login');
        this.loading = false;
      }, 1000);
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

.login-links {
  display: flex;
  justify-content: center;
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