<template>
  <div class="user-profile-page">
    <NavBar currentPath="/profile" />
    
    <main class="main-content">
      <div class="profile-layout">
        <aside class="sidebar">
          <div class="user-card">
            <div class="avatar">{{ userInfo?.avatar || '👤' }}</div>
            <div class="name">{{ userInfo?.name || '未登录' }}</div>
          </div>
          <nav class="side-nav">
            <a href="#" class="nav-item active" @click.prevent="$router.push('/profile')">个人信息</a>
            <a href="#" class="nav-item" @click.prevent="$router.push('/profile')">收货地址</a>
            <a href="#" class="nav-item" @click.prevent="$router.push('/order/list')">我的订单</a>
            <a href="#" class="nav-item text-danger" @click.prevent="handleLogout">退出登录</a>
          </nav>
        </aside>
        
        <section class="content-area">
          <div class="section-card">
            <h3>基本信息</h3>
            <div class="info-form">
              <div class="form-group">
                <label>昵称</label>
                <input type="text" :value="userInfo?.name" readonly />
              </div>
              <div class="form-group">
                <label>账号绑定</label>
                <div class="bind-info">
                  <span>📱 138****8000</span>
                  <button class="text-btn">修改</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section-card">
            <div class="section-header">
              <h3>收货地址管理</h3>
              <button class="add-btn">+ 新增地址</button>
            </div>
            
            <div class="address-grid">
              <div class="address-card" v-for="addr in addresses" :key="addr.id">
                <div class="card-header">
                  <span class="name">{{ addr.name }}</span>
                  <span class="tag" v-if="addr.isDefault">默认</span>
                </div>
                <div class="card-body">
                  <p class="phone">{{ addr.phone }}</p>
                  <p class="detail">{{ addr.province }} {{ addr.city }} {{ addr.district }} {{ addr.detail }}</p>
                </div>
                <div class="card-actions">
                  <span class="action-btn" v-if="!addr.isDefault" @click="setDefault(addr.id)">设为默认</span>
                  <span class="action-btn edit">编辑</span>
                  <span class="action-btn delete" @click="deleteAddress(addr.id)">删除</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NavBar from '../components/common/NavBar.vue'

/**
 * @component UserProfile
 * @description 用户个人中心组件
 */

const store = useStore()
const router = useRouter()

const userInfo = computed(() => store.state.user.userInfo)
const addresses = computed(() => store.state.user.addresses)

const setDefault = (id) => {
  store.commit('user/SET_DEFAULT_ADDRESS', id)
}

const deleteAddress = (id) => {
  if (confirm('确定要删除这条地址吗？')) {
    store.commit('user/REMOVE_ADDRESS', id)
  }
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    store.commit('user/SET_TOKEN', '')
    store.commit('user/SET_USER_INFO', null)
    router.push('/login')
  }
}
</script>

<style scoped>
.user-profile-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 60px;
}

.main-content {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
}

.profile-layout {
  display: flex;
  gap: 24px;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
}

.user-card {
  background: var(--white);
  padding: 30px 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.avatar {
  width: 80px;
  height: 80px;
  background: #f0f2f5;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  border: 4px solid white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.name {
  font-size: 18px;
  color: var(--text-primary);
  font-weight: 600;
}

.side-nav {
  background: var(--white);
  border-radius: 12px;
  padding: 12px 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.nav-item {
  display: block;
  padding: 16px 24px;
  color: var(--text-regular);
  text-decoration: none;
  font-size: 15px;
  transition: all 0.2s;
  border-left: 4px solid transparent;
}

.nav-item:hover {
  background: #f5f7fa;
  color: var(--primary-color);
}

.nav-item.active {
  color: var(--primary-color);
  font-weight: 600;
  background: #fef0f0;
  border-left-color: var(--primary-color);
}

.nav-item.text-danger {
  color: #f56c6c;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-card {
  background: var(--white);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.section-card h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 24px;
  font-weight: 600;
}

.info-form {
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.form-group label {
  width: 100px;
  font-size: 14px;
  color: var(--text-secondary);
}

.form-group input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: #f5f7fa;
  color: var(--text-regular);
  font-size: 14px;
  outline: none;
}

.bind-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 10px 16px;
  background: #f5f7fa;
  border-radius: 6px;
  font-size: 14px;
}

.text-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h3 {
  margin-bottom: 0;
}

.add-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-btn:hover {
  opacity: 0.9;
}

.address-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.address-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s;
}

.address-card:hover {
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border-color: #c0c4cc;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-header .name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.tag {
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-body {
  margin-bottom: 16px;
}

.card-body .phone {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.card-body .detail {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.card-actions {
  display: flex;
  gap: 16px;
  border-top: 1px dashed var(--border-color);
  padding-top: 12px;
}

.action-btn {
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}

.action-btn:hover {
  color: var(--primary-color);
}

.action-btn.delete:hover {
  color: #f56c6c;
}
</style>
