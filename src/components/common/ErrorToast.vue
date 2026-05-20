<template>
  <div class="error-toast" v-if="visible">
    <span>{{ message }}</span>
    <button @click="close">x</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
/**
 * @component ErrorToast
 * @description 错误提示吐司组件
 * @props {String} message - 错误信息
 * @emits {void} onClose - 关闭事件
 */
const props = defineProps({
  message: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['onClose'])

const visible = ref(!!props.message)

watch(() => props.message, (newVal) => {
  visible.value = !!newVal
})

function close() {
  visible.value = false
  emit('onClose')
}
</script>

<style scoped>
.error-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fef0f0;
  color: #f56c6c;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10000;
  border: 1px solid #fde2e2;
}
</style>
