<template>
  <div class="text-container" ref="wrapper">
    <div class="text" @mouseenter="handleMouseEnterEvt('show', 'template')" @mouseleave="handleMouseLeaveEvt">
      <div class="text-content show">hover1</div>
      <div class="text-content template">hover1</div>
    </div>
    <div class="text" @mouseenter="handleMouseEnterEvt('show2', 'template2')" @mouseleave="handleMouseLeaveEvt">
      <div class="text-content show2">hover2</div>
      <div class="text-content template2">hover2</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap, SplitText } from '@/utils/gsap';
const wrapper = ref(null)
let timeLine = null
const handleMouseEnterEvt = (fir, sec) => {
  const topSplit = SplitText.create(`.text-content.${fir}`, { type: 'chars' })
  const bottomSplit = SplitText.create(`.text-content.${sec}`, { type: 'chars' })
  timeLine = gsap.timeline()
  timeLine
    .to(topSplit.chars, {
      yPercent: -100,
      stagger: 0.05,
      duration: 1,
      mask: 'chars'
    })
    .to(bottomSplit.chars, {
      yPercent: -100,
      stagger: 0.05,
      duration: 1,
      mask: 'chars'
    }, '<')
}
const handleMouseLeaveEvt = () => {
  timeLine.reverse()
}
</script>

<style scoped lang='scss'>
.text-container {
  display: flex;

  .text {
    margin: 20px;
    position: relative;
    line-height: 60px;
    font-size: 40px;
    font-weight: 900;
    overflow: hidden;

    .text-content {
      height: 100%;

      &:last-child {
        position: absolute;
        top: 100%;
        left: 0;
      }
    }
  }
}
</style>