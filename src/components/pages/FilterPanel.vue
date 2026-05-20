<template>
  <div class="filter-panel">
    <div class="filter-group" v-for="(group, index) in filters" :key="index">
      <div class="group-name">{{ group.name }}</div>
      <div class="group-options">
        <span 
          v-for="option in group.options" 
          :key="option.value"
          class="option-item"
          :class="{ active: selected[group.key] === option.value }"
          @click="selectFilter(group.key, option.value)"
        >
          {{ option.label }}
        </span>
      </div>
    </div>
    
    <div class="filter-actions">
      <button class="reset-btn" @click="resetFilters">重置</button>
      <button class="confirm-btn" @click="applyFilters">确定</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

/**
 * @component FilterPanel
 * @description 商品列表高级筛选面板组件
 * @emits {Object} onFilter - 筛选条件变化时触发
 */
const emit = defineEmits(['onFilter'])

const filters = [
  {
    name: '商品分类',
    key: 'category',
    options: [
      { label: '全部', value: '' },
      { label: '智能数码', value: 'digital' },
      { label: '电脑办公', value: 'computer' },
      { label: '摄影摄像', value: 'camera' },
      { label: '音频娱乐', value: 'audio' }
    ]
  },
  {
    name: '品牌',
    key: 'brand',
    options: [
      { label: '全部', value: '' },
      { label: 'Apple', value: 'apple' },
      { label: 'Sony', value: 'sony' },
      { label: 'DJI', value: 'dji' },
      { label: 'Bose', value: 'bose' },
      { label: '徕卡', value: 'leica' }
    ]
  },
  {
    name: '价格区间',
    key: 'price',
    options: [
      { label: '全部', value: '' },
      { label: '0-999', value: '0-999' },
      { label: '1000-3999', value: '1000-3999' },
      { label: '4000以上', value: '4000-max' }
    ]
  }
]

const selected = reactive({
  category: '',
  brand: '',
  price: ''
})

const selectFilter = (key, value) => {
  selected[key] = value
}

const resetFilters = () => {
  selected.category = ''
  selected.brand = ''
  selected.price = ''
  emit('onFilter', { ...selected })
}

const applyFilters = () => {
  emit('onFilter', { ...selected })
}
</script>

<style scoped>
.filter-panel {
  background: var(--white);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.03);
}

.filter-group {
  margin-bottom: 24px;
}

.group-name {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 12px;
}

.group-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.option-item {
  font-size: 13px;
  color: var(--text-regular);
  padding: 6px 16px;
  background: #f5f7fa;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.option-item:hover {
  color: var(--primary-color);
  background: #fef0f0;
}

.option-item.active {
  background: #fef0f0;
  color: var(--primary-color);
  border-color: var(--primary-color);
  font-weight: 500;
}

.filter-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.filter-actions button {
  flex: 1;
  height: 36px;
  border-radius: 18px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.reset-btn {
  background: #f5f7fa;
  color: var(--text-regular);
}

.reset-btn:hover {
  background: #e4e7ed;
}

.confirm-btn {
  background: var(--primary-color);
  color: white;
}

.confirm-btn:hover {
  opacity: 0.9;
}
</style>
