<template>
  <div class="cart-page">
    <NavBar currentPath="/cart" />
    
    <main class="main-content">
      <div class="cart-header">
        <h2>购物车</h2>
        <span class="total-items">共 {{ cartItems.length }} 件商品</span>
      </div>

      <div class="cart-body" v-if="cartItems.length > 0">
        <!-- 商品列表 -->
        <div class="items-list">
          <div class="list-header">
            <div class="select-all">
              <input type="checkbox" id="selectAll" :checked="isAllSelected" @change="toggleAll" />
              <label for="selectAll">全选</label>
            </div>
            <span class="header-info">商品信息</span>
            <span class="header-price">单价</span>
            <span class="header-qty">数量</span>
            <span class="header-action">操作</span>
          </div>
          
          <CartItem 
            v-for="item in cartItems" 
            :key="item.id" 
            :item="item"
            @updateQuantity="handleUpdateQuantity"
            @toggleSelect="handleToggleSelect"
            @remove="handleRemove"
          />
        </div>

        <!-- 底部结算栏 -->
        <div class="checkout-bar">
          <div class="checkout-bar-inner">
            <div class="left-actions">
              <div class="select-all">
                <input type="checkbox" id="selectAllBottom" :checked="isAllSelected" @change="toggleAll" />
                <label for="selectAllBottom">全选</label>
              </div>
              <button class="text-btn" @click="clearSelected">删除选中商品</button>
            </div>
            
            <div class="right-actions">
              <div class="summary">
                已选商品 <span class="highlight">{{ selectedCount }}</span> 件
                <span class="total-label">合计：</span>
                <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
              </div>
              <button class="checkout-btn" :disabled="selectedCount === 0" @click="checkout">
                去结算
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空购物车提示 -->
      <div class="empty-cart" v-else>
        <div class="empty-icon">🛒</div>
        <h3>购物车还是空的</h3>
        <p>去挑一些心仪的商品吧</p>
        <button class="go-shopping-btn" @click="$router.push('/')">去逛逛</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NavBar from '../components/common/NavBar.vue'
import CartItem from '../components/pages/CartItem.vue'

/**
 * @component CartPage
 * @description 购物车页面
 */
const store = useStore()
const router = useRouter()

const cartItems = computed(() => store.state.cart.items)
const isAllSelected = computed(() => store.getters['cart/isAllSelected'])
const selectedCount = computed(() => store.getters['cart/selectedCount'])
const totalPrice = computed(() => store.getters['cart/totalPrice'])

const toggleAll = (e) => {
  store.commit('cart/TOGGLE_ALL', e.target.checked)
}

const handleToggleSelect = (id, selected) => {
  store.commit('cart/TOGGLE_SELECT', { id, selected })
}

const handleUpdateQuantity = (id, quantity) => {
  store.commit('cart/UPDATE_QUANTITY', { id, quantity })
}

const handleRemove = (id) => {
  if (confirm('确定要删除该商品吗？')) {
    store.commit('cart/REMOVE_ITEM', id)
  }
}

const clearSelected = () => {
  if (selectedCount.value === 0) return
  if (confirm(`确定要删除选中的 ${selectedCount.value} 件商品吗？`)) {
    store.commit('cart/CLEAR_SELECTED')
  }
}

const checkout = () => {
  router.push('/order/confirm')
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 100px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.cart-header {
  margin-bottom: 24px;
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.cart-header h2 {
  font-size: 28px;
  color: var(--text-primary);
}

.total-items {
  color: var(--text-secondary);
  font-size: 14px;
}

.list-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: var(--white);
  border-radius: 12px;
  margin-bottom: 16px;
  color: var(--text-regular);
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.select-all {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 80px;
  cursor: pointer;
}

.select-all input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.header-info {
  flex: 1;
  padding-left: 40px;
}

.header-price {
  width: 120px;
  text-align: center;
}

.header-qty {
  width: 150px;
  text-align: center;
}

.header-action {
  width: 100px;
  text-align: center;
}

.checkout-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
  z-index: 100;
}

.checkout-bar-inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.left-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.text-btn {
  background: none;
  border: none;
  color: var(--text-regular);
  cursor: pointer;
  font-size: 14px;
}

.text-btn:hover {
  color: var(--primary-color);
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.summary {
  font-size: 14px;
  color: var(--text-regular);
}

.highlight {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 18px;
  margin: 0 4px;
}

.total-label {
  margin-left: 20px;
  font-size: 16px;
}

.total-price {
  color: var(--primary-color);
  font-size: 24px;
  font-weight: bold;
}

.checkout-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 36px;
  padding: 0 40px;
  height: 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.checkout-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

.checkout-btn:disabled {
  background: #fbc4c4;
  cursor: not-allowed;
}

.empty-cart {
  text-align: center;
  padding: 100px 0;
  background: var(--white);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
  filter: grayscale(1);
  opacity: 0.5;
}

.empty-cart h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-cart p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.go-shopping-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.go-shopping-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}
</style>
