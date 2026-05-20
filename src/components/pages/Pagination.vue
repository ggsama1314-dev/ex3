<template>
  <div class="pagination">
    <button 
      class="page-btn prev" 
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      &lt; 上一页
    </button>
    
    <div class="page-numbers">
      <span 
        v-for="page in totalPages" 
        :key="page"
        class="page-num"
        :class="{ active: currentPage === page }"
        @click="changePage(page)"
      >
        {{ page }}
      </span>
    </div>
    
    <button 
      class="page-btn next" 
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      下一页 &gt;
    </button>
  </div>
</template>

<script setup>
/**
 * @component Pagination
 * @description 通用分页组件
 * @props {Number} totalPages - 总页数
 * @props {Number} currentPage - 当前页码
 * @emits {Number} onChange - 页码改变时触发
 */
const props = defineProps({
  totalPages: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['onChange'])

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('onChange', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.page-btn {
  background: var(--white);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 4px;
  color: var(--text-regular);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.page-btn:disabled {
  background: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--white);
  border: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--text-regular);
  cursor: pointer;
  transition: all 0.2s;
}

.page-num:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.page-num.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}
</style>
