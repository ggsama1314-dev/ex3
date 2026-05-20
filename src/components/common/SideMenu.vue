<template>
  <aside class="side-menu">
    <ul>
      <li v-for="item in menuList" :key="item.id" @click="handleExpand(item.id)">
        {{ item.name }}
      </li>
    </ul>
  </aside>
</template>

<script setup>
/**
 * @component SideMenu
 * @description 侧边栏菜单组件
 * @props {Array} menuList - 菜单配置数组
 * @emits {String} onSubMenuExpand - 子菜单展开事件
 */
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['onSubMenuExpand'])

function handleExpand(id) {
  emit('onSubMenuExpand', id)
}
</script>
