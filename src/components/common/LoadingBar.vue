<template>
  <div class="loading-bar" v-if="isLoading">
    <div class="progress"></div>
  </div>
</template>

<script setup>
/**
 * @component LoadingBar
 * @description 全局加载进度条
 * @props {Boolean} isLoading - 加载状态
 */
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: transparent;
  z-index: 9999;
}
.progress {
  height: 100%;
  background: var(--primary-color, #f56c6c);
  animation: loading 2s infinite ease-in-out;
}
@keyframes loading {
  0% { width: 0; }
  50% { width: 50%; }
  100% { width: 100%; }
}
</style>
