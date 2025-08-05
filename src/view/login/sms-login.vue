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
import { CellGroup, Field, Button } from 'vant';

export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
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
        this.$toast.fail('请输入手机号');
        return;
      }

      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.$toast.fail('请输入正确的手机号');
        return;
      }

      // 模拟发送验证码
      this.countdown = 60;
      this.$toast.success('验证码发送成功');

      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    onSubmit() {
      if (!this.phone) {
        this.$toast.fail('请输入手机号');
        return;
      }

      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.$toast.fail('请输入正确的手机号');
        return;
      }

      if (!this.code) {
        this.$toast.fail('请输入验证码');
        return;
      }

      if (this.code.length !== 6) {
        this.$toast.fail('验证码长度为6位');
        return;
      }

      this.loading = true;
      setTimeout(() => {
        // 模拟登录成功
        this.$toast.success('登录成功');
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
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.login-form {
  margin-bottom: 20px;
}

.input-focus .van-field__control {
  border-color: #42b983 !important;
}

.code-btn {
  min-width: 100px;
  background-color: #42b983;
  border-color: #42b983;
}

.login-btn {
  width: 100%;
  background-color: #42b983;
  border-color: #42b983;
  margin-top: 20px;
}

.login-links {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.link-item {
  color: #42b983;
  text-decoration: none;
  font-size: 14px;
}

@keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>