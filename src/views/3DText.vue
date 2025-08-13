<template>
  <div class="container">
    <div class="box">
      <div class="box-item face" @mouseenter="tween.pause()" @mouseleave="tween.resume()">
        <h1>This Is A Test Text</h1>
      </div>
      <div class="box-item side" @mouseenter="tween.pause()" @mouseleave="tween.resume()">
        <h1>This Is A Test Text</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap, GSDevTools } from "@/utils/gsap"
let tween = null;
onMounted(() => {
  tween = gsap.fromTo("h1", {
    x: 400,
    xPercent: 0,
  }, {
    xPercent: -100,
    x: 0,
    duration: 3,
    stagger: 0.78,
    ease: 'none',
    repeat: -1,
    repeatDelay: 0.5
  })
  // GSDevTools.create()
})
</script>

<style scoped lang='scss'>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    display: flex;
    flex-direction: row-reverse;
    perspective: 900px; // 设置景深效果

    .box-item {
      width: 400px;
      height: 400px;
      font-size: 80px;
      font-weight: 900;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: default;
      // transform-style: preserve-3d;

      &.face {
        background-color: #9b9999;
      }

      &.side {
        background-color: #565656;
        transform-origin: right center;
        transform: rotateY(-65deg);
      }

      h1 {
        position: relative;
        left: 0;
      }
    }
  }
}
</style>