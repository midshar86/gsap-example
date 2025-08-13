<template>
  <div>
    <header>
      <button :class="['btn', { active: route.path === item.path }]" v-for="(item) in btnsList" :key="item.path"
        @click="handleClick(item.path)">{{ item.name
        }}</button>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
console.log(route);
const btnsList = ref([
  { path: '/home', name: '首页' },
  { path: '/ppt', name: 'PPT' },
  { path: '/text', name: '文本' },
  { path: '/toggle', name: '开关' },
  { path: '/scroll', name: '滚动' },
  { path: '/gridpic', name: '网格图片' },
  { path: '/3dtext', name: '3D文字' },
])
const handleClick = (path) => {
  router.push(path)
}
</script>

<style scoped lang='scss'>
header {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 9999;

  .btn {
    outline: none;
    border: none;
    background-color: rgba(0, 255, 255, 0.561);
    width: 120px;
    white-space: nowrap;
    height: 50px;
    border-radius: 25px;
    &.active{
      background-color: rgba(2, 120, 120, 0.561);
      color: #fff;
    }
  }
}
</style>