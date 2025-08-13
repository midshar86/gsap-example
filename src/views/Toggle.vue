<template>
  <div class="toggle-container">
    <button :class="['btn', { active: isActive }]" @click="isActive = !isActive">
      <div class="template"></div>
    </button>
    <svg width="90px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg"
      xmlns-xlink="http://www.w3.org/1999/xlink">
      <path id="F1" d="M 0 0 V 100 H 20 V 65 H 40 V 45 H 20 V 20 H 40 V 0 Z" fill="#999" />
      <path id="F2" d="M 50 0 V 100 H 70 V 65 H 90 V 45 H 70 V 20 H 90 V 0 Z" fill="#999" />
      <path id="N1" d="M 0 0 V 100 H 35 V 0 Z" fill="skyblue" visibility="hidden" />
      <path id="N2" d="M 35 0 V 50 L 55 100 H 90 V 0 H 55 V 40 Z" fill="skyblue" visibility="hidden" />
    </svg>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { gsap } from "@/utils/gsap"
const isActive = ref(false)
let tl = null
const toggleFun = () => {
  const tm = gsap.timeline({
    defaults: {
      duration: 0.3,
      fill: "blue",
      ease: 'none'
    },
    paused: true
  })
  tm.to("#F1", { morphSVG: "#N1" }).to("#F2", { morphSVG: "#N2" }, '<')
  return tm
}
onMounted(() => {
  tl = toggleFun()
})
watch(isActive, (val) => {
  console.log("val==>", val);
  if (val) {
    tl.play()
  } else {
    tl.reverse()
  }
})
</script>

<style scoped lang='scss'>
.toggle-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 50px;

  .btn {
    box-sizing: border-box;
    outline: none;
    border: none;
    height: 60px;
    width: 150px;
    border-radius: 30px;
    position: relative;
    transition: all .3s ease-out;

    .template {
      background: #fff;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      top: 5px;
      left: 5px;
      transition: all .3s ease-out;
    }

    &.active {
      background-color: rgb(3, 115, 195);

      .template {
        left: calc(100% - 55px);
      }
    }
  }
}
</style>