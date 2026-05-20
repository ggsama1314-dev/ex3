<template>
  <div class="cart-item">
    <div class="checkbox-wrapper">
      <input type="checkbox" :checked="item.selected" @change="toggleSelect" />
    </div>
    
    <div class="item-image">
      <img :src="item.image" :alt="item.name" />
    </div>
    
    <div class="item-info">
      <h3 class="name">{{ item.name }}</h3>
      <p class="desc">{{ item.description }}</p>
      
      <div class="item-bottom">
        <span class="price">¥{{ item.price.toFixed(2) }}</span>
        
        <div class="quantity-control">
          <button @click="decrease" :disabled="item.quantity <= 1">-</button>
          <input type="number" :value="item.quantity" @change="updateQuantity" min="1" :max="item.stock" />
          <button @click="increase" :disabled="item.quantity >= item.stock">+</button>
        </div>
      </div>
    </div>
    
    <button class="delete-btn" @click="removeItem">删除</button>
  </div>
</template>

<script setup>
/**
 * @component CartItem
 * @description 购物车商品列表项
 * @props {Object} item - 购物车项目数据
 */
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updateQuantity', 'toggleSelect', 'remove'])

const toggleSelect = (e) => {
  emit('toggleSelect', props.item.id, e.target.checked)
}

const decrease = () => {
  if (props.item.quantity > 1) {
    emit('updateQuantity', props.item.id, props.item.quantity - 1)
  }
}

const increase = () => {
  if (props.item.quantity < props.item.stock) {
    emit('updateQuantity', props.item.id, props.item.quantity + 1)
  }
}

const updateQuantity = (e) => {
  let val = parseInt(e.target.value)
  if (isNaN(val) || val < 1) val = 1
  if (val > props.item.stock) val = props.item.stock
  emit('updateQuantity', props.item.id, val)
}

const removeItem = () => {
  emit('remove', props.item.id)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: var(--white);
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  gap: 20px;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  color: var(--primary-color);
  font-weight: 600;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
}

.quantity-control button {
  width: 32px;
  height: 32px;
  background: #f5f7fa;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--text-primary);
}

.quantity-control button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.quantity-control input {
  width: 40px;
  height: 32px;
  text-align: center;
  border: none;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  font-size: 14px;
  outline: none;
}

.delete-btn {
  padding: 8px 16px;
  background: none;
  border: 1px solid #fbc4c4;
  color: #f56c6c;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #fef0f0;
}
</style>
