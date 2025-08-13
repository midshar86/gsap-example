<template>
  <div class="text-container">
    <div class="split-item">This</div>
    <div class="split-item">Is</div>
    <div class="split-item">A</div>
    <div class="split-item">Test</div>
    <div class="split-item">Text</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap, SplitText } from '@/utils/gsap'
onMounted(() => {
  const wrappers = gsap.utils.toArray('.split-item')
  wrappers.forEach((itm, idx) => {
    const split = SplitText.create(itm, { type: 'chars', charsClass: 'split-char' })
    split.chars.forEach((char, i) => {
      char.style.transitionDelay = `${i * 0.05}s`
    })
  })
})
</script>

<style scoped lang='scss'>
.text-container {
  display: flex;
  padding: 10px;

  .split-item {
    line-height: 60px;
    overflow: hidden;
    font-size: 50px;
    font-weight: 900;
    margin: 0 10px;
    text-shadow: 0 60px 0 #000;

    .split-char {
      transition: all 0.5s ease-in-out;
    }

    &:hover {
      .split-char {
        transform: translateY(-60px);
      }
    }
  }
}
</style>