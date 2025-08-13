<template>
  <div class="root">
    <div class="img-item" v-for="(item, index) in imgsList" :key="index" :style="{ backgroundImage: `url(${item})` }">
      <p class="content">This is THE {{ index + 1 }} pictrue.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Observer, gsap, SplitText } from '@/utils/gsap';
console.log("Home", import.meta.env);
const createImgUrl = (file) => {
  return new URL(`../assets/static/imgs/${file}`, import.meta.url).href
}
const imgsList = ref([
  createImgUrl("1.jpeg"),
  createImgUrl("2.jpeg"),
  createImgUrl("3.jpeg"),
  createImgUrl("4.jpeg"),
  createImgUrl("5.jpg"),
  createImgUrl("6.jpeg"),
  createImgUrl("7.jpeg"),
  createImgUrl("8.jpg"),
  createImgUrl("9.jpeg"),
  createImgUrl("10.jpg"),
])
onMounted(() => {
  const split = SplitText.create('.content', { type: 'chars' });
  gsap.from(split.chars, {
    duration: 1,
    y: -100,
    stagger: 0.5,
    autoAlpha: 0,
    stagger: 0.1,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: '.root',
      start: 'top top',
      end: 'bottom bottom',
      // scrub: true
    },
  })
  Observer.create({
    target: '.root',
    type: 'wheel',
  })
})
</script>

<style scoped lang='scss'>
.root {
  .img-item {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 80px;
      color: #fff;
      font-weight: bold;
      text-shadow: 0 0 10px #000;
    }
  }
}
</style>