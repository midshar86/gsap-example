<template>
  <!-- 视觉差效果 -->
  <!-- 当用户滑动页面时，背景也会随着下滑或者上滑而滑动，而文字则保持不动，形成视觉差效果。 -->
  <div class="scroll-container">
    <section class="sec" v-for="(item, index) in imgsList" :key="index">
      <div class="bg" :style="{ backgroundImage: `url(${item})` }"></div>
      <div class="text" @mouseenter="handleMouseEnter($event)" @mouseleave="handleMouseLeave($event)">This is The {{
        index + 1 }} Image</div>
      <div class=" title" @mouseenter="handleMouseEnter($event)" @mouseleave="handleMouseLeave($event)">Big Show</div>
      <div class="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus eveniet culpa obcaecati
        veniam ipsam blanditiis laboriosam voluptate, consectetur dolores! Blanditiis exercitationem iusto impedit
        ratione dolores soluta a incidunt? Labore, corrupti?
        Sequi animi repellat quasi deserunt odit quod similique magnam recusandae nisi, architecto voluptates inventore?
        Voluptas porro dolores esse dignissimos quae, magnam natus expedita, molestias nesciunt minima aliquid officia
        numquam odit!
        Veniam explicabo eaque, impedit ullam tempora sit eligendi perferendis repellendus id, commodi illum qui
        voluptas atque optio dignissimos asperiores beatae sunt delectus? Perferendis deleniti aspernatur inventore
        ducimus ea numquam blanditiis.</div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap, SplitText } from '@/utils/gsap'
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
  const sectionsEle = gsap.utils.toArray('.sec')
  sectionsEle.forEach((section, index) => {
    const bgDom = section.querySelector('.bg')
    const titleDom = section.querySelector('.title')
    const descDom = section.querySelector('.desc')
    const titleStartValue = window.innerHeight / 10 * 3
    const value = window.innerHeight / 2
    gsap.fromTo(bgDom, {
      backgroundPosition: () => index === 0 ? '50% 0%' : `50% -${value}px`,
    }, {
      ease: 'none',
      backgroundPosition: `50% ${value}px`,
      scrollTrigger: {
        trigger: section,
        start: () => index === 0 ? 'top top' : 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
    gsap.fromTo(titleDom, {
      y: 0,
    }, {
      ease: 'none',
      y: 2.8 * titleStartValue,
      scrollTrigger: {
        scrub: true,
        trigger: section,
        start: (i) => i ? 'top bottom' : 'top top',
        end: 'bottom top'
      }
    })
    SplitText.create(descDom, {
      type: 'words',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          opacity: 0,
          y: 50,
          stagger: 0.01,
          scrollTrigger: {
            trigger: descDom,
            start: (i) => i ? 'top center' : 'top top',
            end: 'bottom top',
            toggleActions: 'play pause resume reverse',
          }
        })
      }
    })
  })
})

// 鼠标移入移出事件
const mouseEvent = (ele, y, stagger) => {
  return SplitText.create(ele, {
    type: 'chars',
    charsClass: 'char',
    onSplit(self) {
      return gsap.to(self.chars, {
        y,
        stagger,
      })
    }
  })
}

const handleMouseEnter = (e) => {
  mouseEvent(e.target, -60, 0.05)
}
const handleMouseLeave = (e) => {
  mouseEvent(e.target, 60, 0.05)
}
</script>

<style scoped lang='scss'>
.scroll-container {
  .sec {
    position: relative;
    height: 100vh;

    .bg {
      height: 100%;
      background-size: cover;
    }

    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: 0 60px #000;
      font-size: 40px;
      color: #fff;
      font-weight: bold;
      overflow: hidden;
      cursor: default;
    }

    .title {
      line-height: 60px;
      position: absolute;
      font-size: 60px;
      color: rgb(4, 208, 4);
      font-weight: 900;
      top: 10%;
      text-shadow: 0 60px skyblue;
      overflow: hidden;
      cursor: default;
    }

    .desc {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      padding: 20px;
      color: #fff;
      font-size: 20px;
      line-height: 1.5;
      font-weight: 900;
      text-shadow: 5px 5px 5px #000;
    }

    &:nth-child(odd) {
      .title {
        right: 10%;
      }
    }

    &:nth-child(even) {
      .title {
        left: 10%;
      }
    }
  }
}
</style>