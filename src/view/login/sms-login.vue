<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">短信登录</div>
      <div class="login-form">
        <van-cell-group>
          <van-field
            v-model="phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            type="tel"
            :maxlength="11"
            :class="{ 'input-focus': focusState.phone }"
            @focus="focusState.phone = true"
            @blur="focusState.phone = false"
          />
          <van-field
            v-model="code"
            name="code"
            label="验证码"
            placeholder="请输入验证码"
            :class="{ 'input-focus': focusState.code }"
            @focus="focusState.code = true"
            @blur="focusState.code = false"
          >
            <template #button>
              <van-button
                type="primary"
                size="small"
                :disabled="countdown > 0"
                @click="sendCode"
                class="code-btn"
              >
                {{ countdown > 0 ? `${countdown}秒后重新发送` : '获取验证码' }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="login-actions">
          <van-button type="primary" :loading="loading" class="login-btn" @click="onSubmit">
            登录
          </van-button>
        </div>
      </div>
      <div class="login-links">
        <router-link to="/login" class="link-item">返回密码登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { CellGroup, Field, Button, Toast } from 'vant';

export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      phone: '',
      code: '',
      loading: false,
      countdown: 0,
      focusState: {
        phone: false,
        code: false
      }
    };
  },
  methods: {
    sendCode() {
      if (!this.phone) {
        Toast.fail('请输入手机号');
        return;
      }

      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        Toast.fail('请输入正确的手机号');
        return;
      }

      // 模拟发送验证码
      this.countdown = 60;
      Toast.success('验证码发送成功');

      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    onSubmit() {
      if (!this.phone) {
        Toast.fail('请输入手机号');
        return;
      }

      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        Toast.fail('请输入正确的手机号');
        return;
      }

      if (!this.code) {
        Toast.fail('请输入验证码');
        return;
      }

      if (this.code.length !== 6) {
        Toast.fail('验证码长度为6位');
        return;
      }

      this.loading = true;
      setTimeout(() => {
        // 模拟登录成功
        Toast.success('登录成功');
        localStorage.setItem('isLoggedIn', 'true');
        this.$router.push('/product-list');
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

.code-btn {
  width: 100px;
  height: 32px;
  font-size: 12px;
  padding: 0;
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