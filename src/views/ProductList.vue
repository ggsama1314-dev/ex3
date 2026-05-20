<template>
  <div class="product-list-page">
    <NavBar currentPath="/list" />
    
    <main class="main-content">
      <div class="search-bar-wrapper">
        <input type="text" v-model="searchKeyword" placeholder="搜索您心仪的商品..." @keyup.enter="handleSearch" />
        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>

      <div class="layout-container">
        <aside class="sidebar">
          <FilterPanel @onFilter="handleFilterChange" />
        </aside>
        
        <div class="list-container">
          <div class="sort-bar">
            <span class="sort-label">排序方式：</span>
            <span 
              class="sort-item" 
              :class="{ active: currentSort === 'default' }"
              @click="currentSort = 'default'"
            >综合推荐</span>
            <span 
              class="sort-item" 
              :class="{ active: currentSort === 'sales' }"
              @click="currentSort = 'sales'"
            >销量</span>
            <span 
              class="sort-item price-sort" 
              :class="{ active: currentSort === 'price' }"
              @click="togglePriceSort"
            >
              价格 
              <span class="arrows" v-show="currentSort === 'price'">
                {{ priceOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </span>
          </div>

          <div class="product-grid" v-if="filteredProducts.length > 0">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product"
              @onClick="goToDetail"
              @onAddCart="handleAddCart"
            />
          </div>
          
          <div class="empty-state" v-else>
            <div class="icon">🔍</div>
            <p>抱歉，没有找到符合条件的商品</p>
            <button @click="resetSearch">清除筛选条件</button>
          </div>

          <Pagination 
            v-if="filteredProducts.length > 0"
            :currentPage="currentPage" 
            :totalPages="totalPages" 
            @onChange="handlePageChange" 
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from '../components/common/NavBar.vue'
import FilterPanel from '../components/pages/FilterPanel.vue'
import ProductCard from '../components/common/ProductCard.vue'
import Pagination from '../components/pages/Pagination.vue'

/**
 * @component ProductList
 * @description 商品列表与搜索结果页
 */

const router = useRouter()
const route = useRoute()
const store = useStore()

const searchKeyword = ref(route.query.q || '')
const currentSort = ref('default')
const priceOrder = ref('asc') // asc or desc
const currentPage = ref(1)

const filters = ref({})

// We will use the recommended products as mock data and duplicate it for visual density
onMounted(() => {
  if (store.state.product.recommendedProducts.length === 0) {
    store.dispatch('product/fetchHomeData')
  }
})

const allProducts = computed(() => {
  // Duplicating the 6 mock products to simulate a larger list
  const base = store.state.product.recommendedProducts
  return [...base, ...base.map(p => ({...p, id: p.id + '_copy'})), ...base.map(p => ({...p, id: p.id + '_copy2'}))]
})

const filteredAndSortedList = computed(() => {
  let list = [...allProducts.value]
  
  // Apply Search
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword))
  }
  
  // Mock filter applying logic based on simple conditions
  if (filters.value.price) {
    if (filters.value.price === '0-999') list = list.filter(p => p.price < 1000)
    else if (filters.value.price === '1000-3999') list = list.filter(p => p.price >= 1000 && p.price < 4000)
    else list = list.filter(p => p.price >= 4000)
  }
  
  if (filters.value.brand) {
    const brand = filters.value.brand.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(brand))
  }

  // Apply Sort
  if (currentSort.value === 'price') {
    list.sort((a, b) => priceOrder.value === 'asc' ? a.price - b.price : b.price - a.price)
  } else if (currentSort.value === 'sales') {
    // Mock sort by sales (using stock inverse for demo)
    list.sort((a, b) => a.stock - b.stock)
  }
  
  return list
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredAndSortedList.value.length / 12))
})

const filteredProducts = computed(() => {
  // Slicing for Pagination mock (12 items per page)
  const itemsPerPage = 12
  return filteredAndSortedList.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
})

const handleSearch = () => {
  currentPage.value = 1
  router.replace({ path: '/list', query: { q: searchKeyword.value }})
}

const handleFilterChange = (newFilters) => {
  filters.value = newFilters
  currentPage.value = 1
}

const togglePriceSort = () => {
  if (currentSort.value === 'price') {
    priceOrder.value = priceOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = 'price'
    priceOrder.value = 'asc'
  }
}

const goToDetail = (productId) => {
  // Strip the mock _copy suffix
  const realId = String(productId).replace('_copy2', '').replace('_copy', '')
  router.push(`/product/${realId}`)
}

const handleAddCart = (product) => {
  store.commit('cart/ADD_ITEM', { ...product, quantity: 1 })
  alert(`已将 ${product.name} 加入购物车`)
}

const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetSearch = () => {
  searchKeyword.value = ''
  filters.value = {}
  router.replace('/list')
}
</script>

<style scoped>
.product-list-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 60px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.search-bar-wrapper {
  display: flex;
  margin: 0 auto 30px;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border-radius: 24px;
  overflow: hidden;
}

.search-bar-wrapper input {
  flex: 1;
  border: none;
  padding: 16px 24px;
  font-size: 16px;
  outline: none;
}

.search-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.search-btn:hover {
  opacity: 0.9;
}

.layout-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.sidebar {
  width: 260px;
  flex-shrink: 0;
}

.list-container {
  flex: 1;
}

.sort-bar {
  background: var(--white);
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.02);
}

.sort-label {
  color: var(--text-secondary);
  font-size: 14px;
}

.sort-item {
  font-size: 14px;
  color: var(--text-regular);
  cursor: pointer;
  transition: color 0.2s;
  user-select: none;
}

.sort-item:hover {
  color: var(--primary-color);
}

.sort-item.active {
  color: var(--primary-color);
  font-weight: 600;
}

.price-sort {
  display: flex;
  align-items: center;
  gap: 4px;
}

.arrows {
  font-size: 12px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.empty-state {
  background: var(--white);
  border-radius: 12px;
  padding: 100px 0;
  text-align: center;
}

.empty-state .icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.empty-state button {
  background: var(--white);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.empty-state button:hover {
  background: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
</style>
