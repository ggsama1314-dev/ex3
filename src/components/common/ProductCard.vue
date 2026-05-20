<template>
  <div class="product-card" @click="handleClick">
    <div class="image-wrapper">
      <img :src="product.image" :alt="product.name" />
      <div v-if="product.stock < 10 && product.stock > 0" class="stock-warning">
        仅剩 {{ product.stock }} 件
      </div>
      <div v-if="product.stock === 0" class="stock-out">
        已售罄
      </div>
    </div>
    <div class="info">
      <h3 class="name">{{ product.name }}</h3>
      <p class="desc">{{ product.description }}</p>
      <div class="bottom">
        <span class="price">¥{{ product.price.toFixed(2) }}</span>
        <button class="add-btn" @click.stop="addToCart" :disabled="product.stock === 0">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @component ProductCard
 * @description 商品卡片组件
 * @props {Object} product - 商品信息对象
 * @emits {Object} onClick - 卡片点击事件
 * @emits {Object} onAddCart - 添加购物车事件
 */
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['onClick', 'onAddCart'])

const handleClick = () => {
  emit('onClick', props.product.id)
}

const addToCart = () => {
  if (props.product.stock > 0) {
    emit('onAddCart', props.product)
  }
}
</script>

<style scoped>
.product-card {
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  border: 1px solid var(--border-color);
  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.image-wrapper {
  width: 100%;
  padding-top: 100%; /* 1:1 aspect ratio */
  position: relative;
  background: #f8f9fa;
  overflow: hidden;
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.product-card:hover .image-wrapper img {
  transform: scale(1.08);
}

.stock-warning, .stock-out {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  backdrop-filter: blur(4px);
}

.stock-warning {
  background: rgba(255, 64, 129, 0.9);
  box-shadow: 0 2px 8px rgba(255, 64, 129, 0.3);
}

.stock-out {
  background: rgba(148, 163, 184, 0.9);
}

.info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.name {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  flex-grow: 1;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-size: 22px;
  color: var(--primary-color);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.add-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 10px rgba(138, 43, 226, 0.3);
}

.add-btn:hover:not(:disabled) {
  transform: scale(1.15) rotate(90deg);
  box-shadow: 0 6px 15px rgba(138, 43, 226, 0.5);
}

.add-btn:disabled {
  background: var(--text-secondary);
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
</style>
