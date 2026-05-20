<template>
  <nav class="nav-bar">
    <div class="nav-content">
      <div class="logo" @click="$router.push('/')">
        <span class="icon">🛒</span>
        <span class="text">云端商城</span>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="搜索商品..." />
        <button>搜索</button>
      </div>
      <div class="actions">
        <div class="cart-icon" @click="$router.push('/cart')">
          🛍️ <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
        </div>
        <div class="user-avatar" @click="$router.push('/profile')">
          👤
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

/**
 * @component NavBar
 * @description 全站通用顶部导航栏组件
 * @props {String} currentPath - 当前页面路径
 * @emits {String} onMenuClick - 菜单点击事件
 */
const props = defineProps({
  currentPath: {
    type: String,
    default: '/'
  }
})
const emit = defineEmits(['onMenuClick'])

const store = useStore()
const cartCount = computed(() => store.state.cart.items.length)

</script>

<style scoped>
.nav-bar {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  font-size: 24px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  cursor: pointer;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.search-bar {
  display: flex;
  flex: 1;
  max-width: 500px;
  margin: 0 40px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  border-radius: 24px;
  transition: box-shadow 0.3s ease;
}

.search-bar:focus-within {
  box-shadow: var(--shadow-hover);
}

.search-bar input {
  flex: 1;
  padding: 12px 24px;
  border: 1px solid var(--border-color);
  border-right: none;
  border-radius: 24px 0 0 24px;
  outline: none;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.search-bar input:focus {
  border-color: var(--primary-color);
  background: var(--white);
}

.search-bar button {
  padding: 0 28px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 0 24px 24px 0;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-bar button:hover {
  opacity: 0.9;
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.3);
}

.actions {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 24px;
}

.cart-icon, .user-avatar {
  cursor: pointer;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: rgba(255,255,255,0.5);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
}

.cart-icon:hover, .user-avatar:hover {
  transform: scale(1.1) rotate(5deg);
  background: var(--white);
  box-shadow: var(--shadow-hover);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--secondary-color);
  color: white;
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 2px solid var(--white);
  box-shadow: 0 2px 4px rgba(255, 64, 129, 0.3);
}
</style>
