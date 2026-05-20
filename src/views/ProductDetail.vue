<template>
  <div class="product-detail-page">
    <NavBar :currentPath="`/product/${$route.params.id}`" />
    
    <main class="main-content" v-if="product">
      <div class="product-core">
        <div class="image-gallery">
          <div class="main-image">
            <img :src="currentImage || product.image" :alt="product.name" />
          </div>
          <div class="thumbnail-list">
            <img 
              v-for="(img, idx) in product.gallery" 
              :key="idx" 
              :src="img" 
              :class="{ active: currentImage === img }"
              @click="currentImage = img"
            />
          </div>
        </div>
        
        <div class="product-info">
          <h1 class="title">{{ product.name }}</h1>
          <p class="desc">{{ product.description }}</p>
          
          <div class="price-panel">
            <span class="symbol">¥</span>
            <span class="price">{{ currentPrice.toFixed(2) }}</span>
          </div>
          
          <SpecSelector 
            :specs="product.specs" 
            @onChange="handleSpecChange" 
          />
          
          <div class="action-panel">
            <div class="qty-selector">
              <span class="label">数量</span>
              <div class="controls">
                <button @click="quantity > 1 && quantity--" :disabled="quantity <= 1">-</button>
                <input type="number" v-model.number="quantity" min="1" :max="currentStock" />
                <button @click="quantity < currentStock && quantity++" :disabled="quantity >= currentStock">+</button>
              </div>
              <span class="stock-info">库存 {{ currentStock }} 件</span>
            </div>
            
            <div class="buttons">
              <button class="btn-cart" @click="addToCart" :disabled="currentStock === 0">加入购物车</button>
              <button class="btn-buy" @click="buyNow" :disabled="currentStock === 0">立即购买</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="product-extended">
        <CommentList :comments="product.comments" />
      </div>
    </main>
    <div v-else class="loading-state">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from '../components/common/NavBar.vue'
import SpecSelector from '../components/pages/SpecSelector.vue'
import CommentList from '../components/pages/CommentList.vue'

/**
 * @component ProductDetail
 * @description 商品详情页面
 */

const route = useRoute()
const router = useRouter()
const store = useStore()

const product = ref(null)
const currentImage = ref('')
const quantity = ref(1)
const selectedSpecs = ref({})

// Mock fetch
onMounted(async () => {
  const id = route.params.id
  // 模拟 API 请求
  setTimeout(() => {
    product.value = {
      id,
      name: 'Sony 降噪耳机 WH-1000XM5',
      description: '旗舰级主动降噪，30小时超长续航，AI智能音频通话体验。',
      basePrice: 2499.00,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=800&auto=format&fit=crop'
      ],
      specs: [
        { name: '颜色', options: ['铂金银', '黑色', '午夜蓝'] },
        { name: '服务', options: ['标准版', '2年延保版'] }
      ],
      skus: [
        { spec: '铂金银_标准版', price: 2499.00, stock: 50 },
        { spec: '铂金银_2年延保版', price: 2699.00, stock: 30 },
        { spec: '黑色_标准版', price: 2499.00, stock: 10 },
        { spec: '黑色_2年延保版', price: 2699.00, stock: 5 },
        { spec: '午夜蓝_标准版', price: 2599.00, stock: 0 },
        { spec: '午夜蓝_2年延保版', price: 2799.00, stock: 2 }
      ],
      comments: [
        { id: 1, avatar: '👨', userName: '数码玩家', rating: 5, content: '降噪效果非常震撼，几乎听不到外面的噪音，舒适度也极高！', date: '2023-10-12' },
        { id: 2, avatar: '👩', userName: '音乐爱好者', rating: 4, content: '音质提升很大，就是外观比较容易沾指纹。', date: '2023-11-05' }
      ]
    }
    currentImage.value = product.value.gallery[0]
  }, 500)
})

const currentSku = computed(() => {
  if (!product.value) return null
  const specKey = product.value.specs.map(s => selectedSpecs.value[s.name]).join('_')
  return product.value.skus.find(sku => sku.spec === specKey)
})

const currentPrice = computed(() => {
  return currentSku.value ? currentSku.value.price : (product.value?.basePrice || 0)
})

const currentStock = computed(() => {
  return currentSku.value ? currentSku.value.stock : 0
})

const handleSpecChange = (specs) => {
  selectedSpecs.value = specs
  if (quantity.value > currentStock.value && currentStock.value > 0) {
    quantity.value = currentStock.value
  }
}

const buildCartItem = () => {
  const specString = Object.entries(selectedSpecs.value).map(([k,v]) => `${k}:${v}`).join(' ')
  return {
    id: `${product.value.id}_${currentSku.value.spec}`,
    productId: product.value.id,
    name: product.value.name,
    description: specString,
    price: currentPrice.value,
    stock: currentStock.value,
    image: product.value.image
  }
}

const addToCart = () => {
  if (currentStock.value === 0) return
  const item = buildCartItem()
  // 考虑到购物车是直接累加数量的逻辑，这里我们调用 ADD_ITEM
  for(let i=0; i<quantity.value; i++) {
    store.commit('cart/ADD_ITEM', item)
  }
  alert('成功加入购物车')
}

const buyNow = () => {
  if (currentStock.value === 0) return
  const item = buildCartItem()
  
  // 先把其他项取消选中
  store.commit('cart/TOGGLE_ALL', false)
  
  // 检查是否已存在
  const existingItem = store.state.cart.items.find(i => i.id === item.id)
  if(!existingItem) {
     store.commit('cart/ADD_ITEM', item)
     store.commit('cart/UPDATE_QUANTITY', { id: item.id, quantity: quantity.value })
  } else {
     store.commit('cart/UPDATE_QUANTITY', { id: item.id, quantity: quantity.value })
     store.commit('cart/TOGGLE_SELECT', { id: item.id, selected: true })
  }
  
  router.push('/order/confirm')
}
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 60px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.product-core {
  display: flex;
  gap: 40px;
  background: var(--white);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.image-gallery {
  width: 450px;
  flex-shrink: 0;
}

.main-image {
  width: 100%;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  background: #f5f5f5;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
  display: flex;
  gap: 12px;
}

.thumbnail-list img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.thumbnail-list img.active {
  border-color: var(--primary-color);
}

.product-info {
  flex: 1;
}

.title {
  font-size: 28px;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.price-panel {
  background: #fef0f0;
  padding: 20px;
  border-radius: 8px;
  color: var(--primary-color);
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-panel .symbol {
  font-size: 18px;
}

.price-panel .price {
  font-size: 36px;
  font-weight: bold;
}

.action-panel {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
}

.qty-selector {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
}

.qty-selector .label {
  font-size: 14px;
  color: var(--text-regular);
}

.controls {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.controls button {
  width: 36px;
  height: 36px;
  background: #f5f7fa;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.controls button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.controls input {
  width: 50px;
  text-align: center;
  border: none;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  outline: none;
}

.stock-info {
  font-size: 13px;
  color: var(--text-secondary);
}

.buttons {
  display: flex;
  gap: 16px;
}

.buttons button {
  flex: 1;
  height: 50px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-cart {
  background: #fdf6ec;
  color: #e6a23c;
  border: 1px solid #faecd8;
}

.btn-cart:hover:not(:disabled) {
  background: #faecd8;
}

.btn-buy {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

.btn-buy:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 108, 108, 0.4);
}

.buttons button:disabled {
  background: #f5f7fa;
  color: #c0c4cc;
  border-color: var(--border-color);
  cursor: not-allowed;
  box-shadow: none;
}

.product-extended {
  margin-top: 30px;
  background: var(--white);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 18px;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .product-core {
    flex-direction: column;
  }
  .image-gallery {
    width: 100%;
  }
}
</style>
