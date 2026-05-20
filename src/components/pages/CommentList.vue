<template>
  <div class="comment-list">
    <h3>用户评价 ({{ comments.length }})</h3>
    <div class="comments" v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="user-info">
          <div class="avatar">{{ comment.avatar }}</div>
          <span class="name">{{ comment.userName }}</span>
          <span class="rating">{{'★'.repeat(comment.rating)}}{{'☆'.repeat(5-comment.rating)}}</span>
        </div>
        <div class="content">{{ comment.content }}</div>
        <div class="date">{{ comment.date }}</div>
      </div>
    </div>
    <div class="empty-comments" v-else>
      暂无评价
    </div>
  </div>
</template>

<script setup>
/**
 * @component CommentList
 * @description 商品评价列表组件
 * @props {Array} comments - 评价数组
 */
const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.comment-list {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.comment-list h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.comment-item {
  padding: 16px 0;
  border-bottom: 1px dashed var(--border-color);
}

.comment-item:last-child {
  border-bottom: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  background: #e4e7ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.name {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

.rating {
  color: #e6a23c;
  font-size: 14px;
  letter-spacing: 2px;
}

.content {
  font-size: 14px;
  color: var(--text-regular);
  line-height: 1.6;
  margin-bottom: 10px;
}

.date {
  font-size: 12px;
  color: var(--text-secondary);
}

.empty-comments {
  text-align: center;
  padding: 40px 0;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
