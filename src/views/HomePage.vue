<template>
  <div class="home-page">
    <NavBar currentPath="/" @onMenuClick="handleMenu" />
    
    <main class="main-content">
      <!-- 轮播图区域 -->
      <section class="banner-section">
        <Swiper :items="banners" :interval="4000" />
      </section>

      <!-- 营销活动区 -->
      <section class="marketing-section">
        <div class="glass-card promo-box">
          <div class="promo-icon">⚡</div>
          <div class="promo-info">
            <h3>限时抢购</h3>
            <p>低至 1 折起，最后 2 小时</p>
          </div>
        </div>
        <div class="glass-card promo-box">
          <div class="promo-icon">🎟️</div>
          <div class="promo-info">
            <h3>优惠券中心</h3>
            <p>领券防身，最高满 300 减 50</p>
          </div>
        </div>
        <div class="glass-card promo-box">
          <div class="promo-icon">🎁</div>
          <div class="promo-info">
            <h3>新品首发</h3>
            <p>最新科技好物抢先看</p>
          </div>
        </div>
      </section>

      <!-- 推荐商品区 -->
      <section class="recommend-section">
        <div class="section-header">
          <h2>为您推荐</h2>
          <span class="subtitle">根据您的喜好精选</span>
        </div>
        
        <div class="product-grid">
          <ProductCard 
            v-for="product in recommendedProducts" 
            :key="product.id" 
            :product="product"
            @onClick="goToDetail"
            @onAddCart="handleAddCart"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NavBar from '../components/common/NavBar.vue'
import Swiper from '../components/common/Swiper.vue'
import ProductCard from '../components/common/ProductCard.vue'

/**
 * @component HomePage
 * @description 首页组件
 */

const store = useStore()
const router = useRouter()

const banners = computed(() => store.state.product.banners)
const recommendedProducts = computed(() => store.state.product.recommendedProducts)

onMounted(() => {
  store.dispatch('product/fetchHomeData')
})

const handleMenu = (menuId) => {
  console.log('Menu clicked:', menuId)
}

const goToDetail = (productId) => {
  router.push(`/product/${productId}`)
}

const handleAddCart = (product) => {
  store.commit('cart/ADD_ITEM', { ...product, quantity: 1 })
  // Here we would typically show a success toast
  alert(`已将 ${product.name} 加入购物车`)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding-bottom: 60px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.banner-section {
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-hover);
}

.marketing-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.glass-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.glass-card:hover::before {
  opacity: 1;
}

.promo-icon {
  font-size: 36px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(138, 43, 226, 0.1);
  border-radius: 16px;
  z-index: 1;
}

.promo-info {
  z-index: 1;
}

.promo-info h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 6px;
  font-weight: 700;
}

.promo-info p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.section-header {
  margin-bottom: 30px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  position: relative;
}

.section-header::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.section-header h2 {
  font-size: 32px;
  color: var(--text-primary);
  font-weight: 800;
  letter-spacing: -1px;
}

.section-header .subtitle {
  font-size: 15px;
  color: var(--text-secondary);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .marketing-section {
    grid-template-columns: 1fr;
  }
}
</style>
