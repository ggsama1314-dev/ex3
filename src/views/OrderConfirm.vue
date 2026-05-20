<template>
  <div class="order-confirm-page">
    <NavBar currentPath="/order/confirm" />
    
    <main class="main-content">
      <h2 class="page-title">确认订单</h2>
      
      <div class="content-wrapper">
        <div class="left-section">
          <AddressPicker v-model="selectedAddressId" :addresses="addresses" />
          <PaymentMethod v-model="selectedPayment" />
          
          <div class="order-items">
            <h3>商品清单</h3>
            <div class="item-list">
              <div v-for="item in selectedItems" :key="item.id" class="item-row">
                <img :src="item.image" :alt="item.name" />
                <div class="item-info">
                  <p class="name">{{ item.name }}</p>
                  <p class="desc">{{ item.description }}</p>
                </div>
                <div class="item-price">¥{{ item.price.toFixed(2) }}</div>
                <div class="item-qty">x{{ item.quantity }}</div>
                <div class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>
            <div class="remark">
              <label>订单备注：</label>
              <input type="text" v-model="remark" placeholder="选填，建议留言前先与商家沟通确认" />
            </div>
          </div>
        </div>
        
        <div class="right-section">
          <div class="summary-card">
            <h3>结算明细</h3>
            <div class="summary-row">
              <span>商品总价</span>
              <span>¥{{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>运费</span>
              <span>¥0.00</span>
            </div>
            <div class="summary-row discount">
              <span>活动优惠</span>
              <span>-¥0.00</span>
            </div>
            <div class="divider"></div>
            <div class="summary-row final">
              <span>应付总额</span>
              <span class="price">¥{{ totalPrice.toFixed(2) }}</span>
            </div>
            
            <div class="address-preview" v-if="selectedAddress">
              <p><strong>寄送至：</strong>{{ selectedAddress.province }} {{ selectedAddress.city }} {{ selectedAddress.district }} {{ selectedAddress.detail }}</p>
              <p><strong>收件人：</strong>{{ selectedAddress.name }} {{ selectedAddress.phone }}</p>
            </div>
            
            <button class="submit-btn" @click="submitOrder" :disabled="!isReady">提交订单</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NavBar from '../components/common/NavBar.vue'
import AddressPicker from '../components/pages/AddressPicker.vue'
import PaymentMethod from '../components/pages/PaymentMethod.vue'

/**
 * @component OrderConfirm
 * @description 订单确认组件
 */
const store = useStore()
const router = useRouter()

const addresses = computed(() => store.state.user.addresses)
const selectedItems = computed(() => store.state.cart.items.filter(i => i.selected))
const totalPrice = computed(() => store.getters['cart/totalPrice'])

const selectedAddressId = ref('')
const selectedPayment = ref('wechat')
const remark = ref('')

// 如果没有选中的商品，直接跳回购物车
onMounted(() => {
  if (selectedItems.value.length === 0) {
    alert('没有待结算的商品，请先选择商品')
    router.replace('/cart')
  } else {
    selectedAddressId.value = addresses.value.find(a => a.isDefault)?.id || ''
  }
})

const selectedAddress = computed(() => addresses.value.find(a => a.id === selectedAddressId.value))

const isReady = computed(() => selectedAddressId.value && selectedPayment.value && selectedItems.value.length > 0)

const submitOrder = () => {
  if (!isReady.value) return
  
  // 模拟提交订单
  alert(`订单提交成功！\n支付方式：${selectedPayment.value}\n应付金额：¥${totalPrice.value.toFixed(2)}`)
  
  // 提交成功后清除购物车已选中商品，然后跳转首页
  store.commit('cart/CLEAR_SELECTED')
  router.push('/')
}
</script>

<style scoped>
.order-confirm-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 60px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-title {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.content-wrapper {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.left-section {
  flex: 1;
}

.order-items {
  background: var(--white);
  padding: 24px;
  border-radius: 12px;
}

.order-items h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.item-row {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px dashed var(--border-color);
}

.item-row img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
  background: #f5f5f5;
}

.item-info {
  flex: 1;
}

.item-info .name {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.item-info .desc {
  font-size: 12px;
  color: var(--text-secondary);
}

.item-price, .item-qty {
  width: 100px;
  text-align: center;
  color: var(--text-primary);
}

.item-total {
  width: 100px;
  text-align: right;
  color: var(--primary-color);
  font-weight: 600;
}

.remark {
  margin-top: 24px;
  display: flex;
  align-items: center;
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 8px;
}

.remark label {
  font-size: 14px;
  color: var(--text-primary);
  width: 80px;
}

.remark input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
}

.right-section {
  width: 360px;
  position: sticky;
  top: 90px;
}

.summary-card {
  background: var(--white);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.summary-card h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-regular);
}

.summary-row.discount {
  color: var(--primary-color);
}

.divider {
  height: 1px;
  background: var(--border-color);
  margin: 16px 0;
}

.summary-row.final {
  align-items: flex-end;
}

.summary-row.final .price {
  font-size: 28px;
  color: var(--primary-color);
  font-weight: bold;
}

.address-preview {
  margin: 20px 0;
  padding: 16px;
  background: #fdf6ec;
  border-radius: 8px;
  font-size: 13px;
  color: #e6a23c;
  line-height: 1.6;
}

.address-preview strong {
  color: #b88230;
}

.submit-btn {
  width: 100%;
  height: 48px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

.submit-btn:disabled {
  background: #fbc4c4;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
  }
  .right-section {
    width: 100%;
    position: static;
  }
}
</style>
