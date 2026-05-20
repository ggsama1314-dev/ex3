<template>
  <div class="spec-selector">
    <div v-for="(specGroup, index) in specs" :key="index" class="spec-group">
      <h4 class="spec-name">{{ specGroup.name }}</h4>
      <div class="options">
        <span 
          v-for="option in specGroup.options" 
          :key="option"
          class="option-btn"
          :class="{ active: selectedSpecs[specGroup.name] === option }"
          @click="selectSpec(specGroup.name, option)"
        >
          {{ option }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'

/**
 * @component SpecSelector
 * @description 规格选择组件
 * @props {Array} specs - 规格配置数组 [{name: '颜色', options: ['黑', '白']}]
 * @props {Object} initialSelection - 初始选中状态
 * @emits {Object} onChange - 选中规格发生变化时触发
 */
const props = defineProps({
  specs: {
    type: Array,
    default: () => []
  },
  initialSelection: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['onChange'])

const selectedSpecs = reactive({ ...props.initialSelection })

// Initialize if empty
onMounted(() => {
  let changed = false
  props.specs.forEach(group => {
    if (!selectedSpecs[group.name] && group.options.length > 0) {
      selectedSpecs[group.name] = group.options[0]
      changed = true
    }
  })
  if (changed || Object.keys(selectedSpecs).length > 0) {
    emit('onChange', { ...selectedSpecs })
  }
})

const selectSpec = (groupName, option) => {
  selectedSpecs[groupName] = option
  emit('onChange', { ...selectedSpecs })
}
</script>

<style scoped>
.spec-selector {
  margin: 20px 0;
}

.spec-group {
  margin-bottom: 16px;
}

.spec-name {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 10px;
  font-weight: normal;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.option-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  background: var(--white);
}

.option-btn:hover {
  color: var(--primary-color);
  border-color: #fbc4c4;
}

.option-btn.active {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: #fef0f0;
  font-weight: 500;
}
</style>
