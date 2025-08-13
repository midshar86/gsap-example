<template>
  <div class="pic-container">
    <div @click="handleClickImgEvt($event)" class="pic-item" v-for="(itm, idx) in imgsList" :key="itm"
      :data-pic="'pic-item-' + (idx + 1)">
      <img class="pic" :src="itm" alt="pic">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap, Flip } from "@/utils/gsap"
const imgsList = ref([
  "/src/assets/static/imgs/1.jpeg",
  "/src/assets/static/imgs/2.jpeg",
  "/src/assets/static/imgs/3.jpeg",
  "/src/assets/static/imgs/4.jpeg",
  "/src/assets/static/imgs/5.jpg",
  "/src/assets/static/imgs/6.jpeg",
])
let bigPic = null
onMounted(() => {
  const picItemArr = gsap.utils.toArray('.pic-container .pic-item')
  bigPic = picItemArr[0] // 初始最大的图片
})
const handleClickImgEvt = async (e) => {
  const target = e.target // 目标元素
  if (target === bigPic) return // 如果点击的是最大的图片，则不执行
  const currentState = Flip.getState('.pic-container .pic-item') // !点击时获取当前状态，而不是在一开始获取初始状态
  const oldBigPic = bigPic
  oldBigPic.dataset.pic = target.dataset.pic
  target.dataset.pic = 'pic-item-1'
  bigPic = target
  // await nextTick()
  let flipInstance = Flip.from(currentState, {
    absolute: true,
    duration: 0.8,                  // 增加动画持续时间
    ease: "power2.out",            // 添加缓动效果
    scale: true,                     // 确保缩放动画生效
    onComplete: () => {
      // 可选：动画完成后清理
      flipInstance.kill()
      flipInstance = null
    }
  })
}
</script>

<style scoped lang='scss'>
.pic-container {
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;

  .pic-item {
    width: 200px;
    height: 200px;
    position: relative;
    overflow: hidden;

    .pic {
      pointer-events: none;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    &[data-pic="pic-item-1"] {
      grid-column: 1/3;
      grid-row: 1/3;
      width: 420px;
      height: 420px;
    }

    &[data-pic="pic-item-2"] {
      grid-row: 1/2;
      grid-column: 3/4;
    }

    &[data-pic="pic-item-3"] {
      grid-row: 2/3;
      grid-column: 3/4;
    }

    &[data-pic="pic-item-4"] {
      grid-row: 3/4;
      grid-column: 1/2;
    }

    &[data-pic="pic-item-5"] {
      grid-row: 3/4;
      grid-column: 2/3;
    }

    &[data-pic="pic-item-6"] {
      grid-row: 3/4;
      grid-column: 3/4;
    }

  }
}
</style>