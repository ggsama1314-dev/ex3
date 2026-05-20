<template>
  <div class="address-picker">
    <div class="header">
      <h3>收货地址</h3>
      <button class="add-btn">新增地址</button>
    </div>
    <div class="address-list">
      <div 
        v-for="addr in addresses" 
        :key="addr.id" 
        class="address-card"
        :class="{ selected: modelValue === addr.id }"
        @click="selectAddress(addr.id)"
      >
        <div class="addr-info">
          <div class="name-phone">
            <span class="name">{{ addr.name }}</span>
            <span class="phone">{{ addr.phone }}</span>
            <span class="tag" v-if="addr.isDefault">默认</span>
          </div>
          <div class="detail-address">
            {{ addr.province }} {{ addr.city }} {{ addr.district }} {{ addr.detail }}
          </div>
        </div>
        <div class="check-icon" v-if="modelValue === addr.id">✓</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @component AddressPicker
 * @description 地址选择组件
 * @props {String} modelValue - 当前选中的地址ID (v-model)
 * @props {Array} addresses - 地址列表数据
 * @emits {String} update:modelValue - 更新选中的地址ID
 */
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  addresses: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const selectAddress = (id) => {
  emit('update:modelValue', id)
}
</script>

<style scoped>
.address-picker {
  background: var(--white);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header h3 {
  font-size: 18px;
  color: var(--text-primary);
}

.add-btn {
  background: none;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-btn:hover {
  background: var(--primary-color);
  color: white;
}

.address-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.address-card {
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.address-card:hover {
  border-color: #fbc4c4;
}

.address-card.selected {
  border-color: var(--primary-color);
  background: #fef0f0;
}

.name-phone {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.name {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-primary);
}

.phone {
  font-size: 14px;
  color: var(--text-secondary);
}

.tag {
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.detail-address {
  font-size: 14px;
  color: var(--text-regular);
  line-height: 1.5;
}

.check-icon {
  position: absolute;
  right: -2px;
  bottom: -2px;
  background: var(--primary-color);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 8px 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
