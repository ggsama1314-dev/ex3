<template>
  <div class="login-page">
    <div class="login-container glass-card">
      <div class="login-header">
        <h2>欢迎登录云端商城</h2>
        <p>探索极简体验，发现科技好物</p>
      </div>

      <div class="tabs">
        <span :class="{ active: loginType === 'account' }" @click="loginType = 'account'">账号登录</span>
        <span :class="{ active: loginType === 'phone' }" @click="loginType = 'phone'">手机快捷登录</span>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="loginType === 'account'" class="input-group">
          <input type="text" v-model="form.username" placeholder="用户名/邮箱/手机号" required />
          <input type="password" v-model="form.password" placeholder="请输入密码" required />
        </div>
        
        <div v-if="loginType === 'phone'" class="input-group">
          <input type="tel" v-model="form.phone" placeholder="请输入手机号" required />
          <div class="sms-group">
            <input type="text" v-model="form.code" placeholder="验证码" required />
            <button type="button" class="btn-sms" :disabled="countdown > 0" @click="sendSms">
              {{ countdown > 0 ? `${countdown}s 后重发` : '获取验证码' }}
            </button>
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登 录' }}
        </button>
      </form>

      <div class="login-footer">
        <a href="#">忘记密码？</a>
        <a href="#">立即注册</a>
      </div>
      
      <div class="third-party">
        <div class="divider"><span>其他方式登录</span></div>
        <div class="icons">
          <span class="icon wechat">💬</span>
          <span class="icon github">🐱</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

/**
 * @component LoginPage
 * @description 登录页面组件
 */
const router = useRouter()
const route = useRoute()
const store = useStore()

const loginType = ref('account') // 'account' or 'phone'
const loading = ref(false)
const countdown = ref(0)

const form = reactive({
  username: '',
  password: '',
  phone: '',
  code: ''
})

const sendSms = () => {
  if (!form.phone) return alert('请输入手机号')
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
  alert('验证码已发送: 1234')
}

const handleLogin = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    // Mock login success
    store.commit('user/SET_TOKEN', 'mock_token_12345')
    store.commit('user/SET_USER_INFO', { name: form.username || form.phone || '云端用户', avatar: '👤' })
    
    // Redirect back to intended page or home
    const redirect = route.query.redirect || '/'
    router.replace(redirect)
  }, 1000)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  background-image: url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.glass-card {
  width: 420px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.login-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.tabs span {
  padding-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  color: var(--text-regular);
  position: relative;
}

.tabs span.active {
  color: var(--primary-color);
  font-weight: 600;
}

.tabs span.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-color);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.input-group input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s;
}

.input-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(245, 108, 108, 0.1);
}

.sms-group {
  display: flex;
  gap: 12px;
}

.btn-sms {
  width: 120px;
  height: 48px;
  background: white;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.btn-sms:disabled {
  border-color: var(--border-color);
  color: var(--text-secondary);
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.login-footer a {
  color: var(--text-secondary);
  font-size: 13px;
  text-decoration: none;
}

.login-footer a:hover {
  color: var(--primary-color);
}

.third-party {
  margin-top: 40px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--text-secondary);
  font-size: 12px;
  margin-bottom: 20px;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border-color);
}

.divider span {
  padding: 0 10px;
}

.icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.icons .icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid var(--border-color);
  transition: all 0.2s;
}

.icons .icon:hover {
  transform: scale(1.1);
  border-color: var(--primary-color);
}
</style>
