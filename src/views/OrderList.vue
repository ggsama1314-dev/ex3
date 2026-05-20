<template>
  <div class="order-list-page">
    <NavBar currentPath="/order/list" />
    
    <main class="main-content">
      <div class="profile-layout">
        <aside class="sidebar">
          <div class="user-card">
            <div class="avatar">{{ userInfo?.avatar || '👤' }}</div>
            <div class="name">{{ userInfo?.name || '未登录' }}</div>
          </div>
          <nav class="side-nav">
            <a href="#" class="nav-item" @click.prevent="$router.push('/profile')">个人信息</a>
            <a href="#" class="nav-item" @click.prevent="$router.push('/profile')">收货地址</a>
            <a href="#" class="nav-item active" @click.prevent="$router.push('/order/list')">我的订单</a>
            <a href="#" class="nav-item text-danger" @click.prevent="handleLogout">退出登录</a>
          </nav>
        </aside>

        <section class="content-area">
          <div class="section-card">
            <div class="tabs">
              <span :class="{ active: currentTab === 'all' }" @click="currentTab = 'all'">全部订单</span>
              <span :class="{ active: currentTab === 'unpaid' }" @click="currentTab = 'unpaid'">待付款</span>
              <span :class="{ active: currentTab === 'shipping' }" @click="currentTab = 'shipping'">待收货</span>
              <span :class="{ active: currentTab === 'completed' }" @click="currentTab = 'completed'">已完成</span>
            </div>

            <div class="orders-container" v-if="filteredOrders.length > 0">
              <div class="order-card" v-for="order in filteredOrders" :key="order.id">
                <div class="order-header">
                  <span class="order-time">{{ order.date }}</span>
                  <span class="order-id">订单号：{{ order.id }}</span>
                  <span class="order-status" :class="order.status">{{ getStatusText(order.status) }}</span>
                </div>
                
                <div class="order-body">
                  <div class="goods-list">
                    <div class="good-item" v-for="item in order.items" :key="item.id">
                      <img :src="item.image" :alt="item.name">
                      <div class="good-info">
                        <p class="name">{{ item.name }}</p>
                        <p class="desc">{{ item.description }}</p>
                      </div>
                      <div class="good-price">
                        <p>¥{{ item.price.toFixed(2) }}</p>
                        <p class="qty">x{{ item.quantity }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="order-summary">
                    <p class="total-price">
                      <span>实付款：</span>
                      <strong>¥{{ order.total.toFixed(2) }}</strong>
                    </p>
                    <div class="actions">
                      <button class="btn-primary" v-if="order.status === 'unpaid'">立即付款</button>
                      <button class="btn-primary" v-if="order.status === 'shipping'">确认收货</button>
                      <button class="btn-outline" v-if="order.status === 'completed'">评价商品</button>
                      <button class="btn-outline">查看物流</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="empty-state" v-else>
              <div class="icon">📦</div>
              <p>暂无相关订单记录</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from '../components/common/NavBar.vue'

/**
 * @component OrderList
 * @description 订单列表页面组件
 */

const router = useRouter()
const store = useStore()

const userInfo = computed(() => store.state.user.userInfo)

const currentTab = ref('all')

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    store.commit('user/SET_TOKEN', '')
    store.commit('user/SET_USER_INFO', null)
    router.push('/login')
  }
}

// Mock Order Data
const mockOrders = ref([
  {
    id: 'ORD202311120001',
    date: '2023-11-12 14:30:00',
    status: 'completed',
    total: 2499.00,
    items: [
      { id: '1', name: 'Sony 降噪耳机 WH-1000XM5', description: '铂金银_标准版', price: 2499.00, quantity: 1, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop' }
    ]
  },
  {
    id: 'ORD202311150088',
    date: '2023-11-15 09:15:00',
    status: 'shipping',
    total: 4788.00,
    items: [
      { id: '5', name: 'DJI Mini 3 Pro', description: '带屏遥控器版', price: 4788.00, quantity: 1, image: 'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?w=500&auto=format&fit=crop' }
    ]
  },
  {
    id: 'ORD202311180120',
    date: '2023-11-18 20:45:00',
    status: 'unpaid',
    total: 25998.00,
    items: [
      { id: '2', name: 'Apple MacBook Pro M3', description: '16GB 512GB 银色', price: 12999.00, quantity: 2, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop' }
    ]
  }
])

const filteredOrders = computed(() => {
  if (currentTab.value === 'all') return mockOrders.value
  return mockOrders.value.filter(o => o.status === currentTab.value)
})

const getStatusText = (status) => {
  const map = {
    unpaid: '待付款',
    shipping: '待收货',
    completed: '已完成'
  }
  return map[status] || status
}
</script>

<style scoped>
.order-list-page {
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
}

.section-card {
  background: var(--white);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.tabs {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
}

.tabs span {
  padding-bottom: 12px;
  font-size: 16px;
  color: var(--text-regular);
  cursor: pointer;
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

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.order-header {
  background: #f5f7fa;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.order-time {
  margin-right: 20px;
}

.order-id {
  flex: 1;
}

.order-status {
  font-weight: 600;
}

.order-status.unpaid {
  color: #f56c6c;
}

.order-status.shipping {
  color: #e6a23c;
}

.order-status.completed {
  color: #67c23a;
}

.order-body {
  display: flex;
}

.goods-list {
  flex: 1;
  border-right: 1px solid var(--border-color);
}

.good-item {
  display: flex;
  padding: 20px;
  border-bottom: 1px dashed var(--border-color);
}

.good-item:last-child {
  border-bottom: none;
}

.good-item img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
  background: #f5f5f5;
}

.good-info {
  flex: 1;
}

.good-info .name {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.good-info .desc {
  font-size: 12px;
  color: var(--text-secondary);
}

.good-price {
  width: 100px;
  text-align: right;
  font-size: 14px;
  color: var(--text-primary);
}

.good-price .qty {
  color: var(--text-secondary);
  margin-top: 4px;
}

.order-summary {
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white);
}

.total-price {
  font-size: 14px;
  color: var(--text-regular);
  margin-bottom: 16px;
}

.total-price strong {
  font-size: 20px;
  color: var(--primary-color);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
}

.actions button {
  width: 120px;
  height: 36px;
  border-radius: 18px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  opacity: 0.9;
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

.btn-outline {
  background: white;
  border: 1px solid var(--border-color);
  color: var(--text-regular);
}

.btn-outline:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.empty-state {
  text-align: center;
  padding: 80px 0;
}

.empty-state .icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
  filter: grayscale(1);
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
