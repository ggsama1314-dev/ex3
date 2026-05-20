<template>
  <div class="swiper-container" @mouseenter="pause" @mouseleave="play">
    <div 
      class="swiper-wrapper" 
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        class="swiper-slide" 
        v-for="(item, index) in items" 
        :key="index"
      >
        <img :src="item.image" :alt="item.title">
        <div class="slide-content" v-if="item.title || item.subtitle">
          <h2 v-if="item.title">{{ item.title }}</h2>
          <p v-if="item.subtitle">{{ item.subtitle }}</p>
        </div>
      </div>
    </div>
    
    <!-- Controls -->
    <button class="nav-btn prev" @click="prev">&#10094;</button>
    <button class="nav-btn next" @click="next">&#10095;</button>
    
    <!-- Pagination -->
    <div class="pagination">
      <span 
        class="dot" 
        v-for="(_, index) in items" 
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * @component Swiper
 * @description 首页轮播组件
 * @props {Array} items - 轮播项目数组 { image, title, subtitle }
 */
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  }
})

const currentIndex = ref(0)
let timer = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

const goTo = (index) => {
  currentIndex.value = index
}

const play = () => {
  if (props.autoPlay && props.items.length > 1) {
    timer = setInterval(next, props.interval)
  }
}

const pause = () => {
  if (timer) clearInterval(timer)
}

onMounted(() => {
  play()
})

onUnmounted(() => {
  pause()
})
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: var(--bg-color);
}

.swiper-wrapper {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.swiper-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px 30px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.slide-content h2 {
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: 700;
}

.slide-content p {
  font-size: 16px;
  opacity: 0.9;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.6);
  color: var(--primary-color);
}

.nav-btn.prev {
  left: 20px;
}

.nav-btn.next {
  right: 20px;
}

.pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  width: 24px;
  border-radius: 5px;
}
</style>
