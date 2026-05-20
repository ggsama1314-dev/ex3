<template>
  <div class="payment-method">
    <h3>支付方式</h3>
    <div class="method-list">
      <div 
        v-for="method in methods" 
        :key="method.id"
        class="method-card"
        :class="{ selected: modelValue === method.id }"
        @click="selectMethod(method.id)"
      >
        <span class="icon">{{ method.icon }}</span>
        <span class="name">{{ method.name }}</span>
        <div class="check-circle" :class="{ active: modelValue === method.id }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @component PaymentMethod
 * @description 支付方式选择组件
 * @props {String} modelValue - 当前选中的支付方式ID (v-model)
 * @emits {String} update:modelValue - 更新选中的支付方式ID
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const methods = [
  { id: 'wechat', name: '微信支付', icon: '💬' },
  { id: 'alipay', name: '支付宝', icon: '💳' },
  { id: 'credit', name: '信用卡', icon: '🏦' }
]

const selectMethod = (id) => {
  emit('update:modelValue', id)
}
</script>

<style scoped>
.payment-method {
  background: var(--white);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.method-list {
  display: flex;
  gap: 16px;
}

.method-card {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border-color);
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px;
}

.method-card:hover {
  border-color: #c0c4cc;
}

.method-card.selected {
  border-color: var(--primary-color);
}

.icon {
  font-size: 20px;
}

.name {
  font-size: 16px;
  color: var(--text-primary);
  flex: 1;
}

.check-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  position: relative;
}

.check-circle.active {
  border-color: var(--primary-color);
}

.check-circle.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: var(--primary-color);
  border-radius: 50%;
}
</style>
