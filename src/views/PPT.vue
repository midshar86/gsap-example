<template>
  <div class="ppt-root">
    <div class="btns">
      <button class="btn" @click="handleStartAnimationEvt">开始</button>
      <button class="btn" @click="handleReverseAnimaionEvt">反转</button>
    </div>
    <main class="main">
      <div class="wrapper" ref="wrapper">
        <div class="left">
          <p class="big-title">This is BIG-TITLE</p>
          <p class="small-title">This is small-title</p>
          <p class="main-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolorum quo amet?
            Corrupti,
            beatae ullam,
            ut temporibus rem fugiat totam ipsam animi error repellendus dicta nemo tempora mollitia labore accusantium!
          </p>
          <button class="btn">Click Me!</button>
        </div>
        <div class="right">
          <SVGIcons class="icon" v-for="(item, index) in svgsName" :key="index" :name="item" size="120px" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from '@/utils/gsap';
import SVGIcons from '@/components/SVGIcons.vue';
const dirs = import.meta.glob('@/assets/static/icons/*.svg')
const svgsName = ref([])
for (const path in dirs) {
  const name = dirs[path].name.split('/').pop().split('.')[0]
  svgsName.value.push(name)
}

const wrapper = ref(null)
const animate = ref(null)
const renderAnimate = () => {
  const tl = gsap.timeline({
    defaults: {
      opacity: 0,
    },
    paused: true
  })
  nextTick(() => {
    const wrapperDom = gsap.utils.selector(wrapper.value) // 获取父容器，需要在nextTick中调用
    tl.from('.wrapper', { autoAlpha: 0, duration: 0.5 })
      .from(wrapperDom('.big-title'), { x: 100, ease: 'back.out', duration: 0.8 })
      .from(wrapperDom('.small-title'), { x: -100, ease: 'back.out', duration: 0.8 }, '<')
      .from(wrapperDom('.main-content'), { y: 100, ease: 'back.out', duration: 0.8 }, '-=0.5')
      .from(wrapperDom('.btn'), { y: 50, ease: 'back.out', duration: 0.8 }, '-=0.4')
      .from(wrapperDom('.icon'), { scale: 0, ease: 'back.out', stagger: 0.1, duration: 0.5 }, '<0.3')
  })
  return tl
}
onMounted(() => {
  animate.value = renderAnimate()
})
const handleStartAnimationEvt = () => {
  animate.value.restart()
}
const handleReverseAnimaionEvt = () => {
  animate.value.reverse()
}
</script>

<style scoped lang='scss'>
.ppt-root {
  height: 100vh;
  overflow: auto;

  .btns {
    height: 80px;
    display: flex;
    align-items: center;
  }

  .main {
    height: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;

    .wrapper {
      visibility: hidden;
      border: 1px solid #ccc;
      height: 70%;
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-image: url("@/assets/static/imgs/10.jpg");
      background-size: cover;
      overflow: hidden;
      position: relative;

      .left {
        position: absolute;
        width: 50%;
        height: 50%;

        .big-title {
          font-size: 40px;
          font-weight: 900;
          text-transform: capitalize;
        }

        .small-title {
          font-size: 30px;
          font-weight: 800;
          text-transform: capitalize;
        }

        .main-content {
          color: yellow;
          font-size: 20px;
        }

        .btn {
          background: rgb(6, 93, 224);
          outline: none;
          font-size: 28px;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          color: white;
          font-weight: 700;
          box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
          position: relative;
          top: 40px;
        }
      }

      .right {
        position: absolute;
        height: 70%;
        top: 0;
        right: 0;
        width: 50%;

        svg {
          width: 120px !important;
          height: 120px !important;
          position: absolute;

          &:nth-child(2) {
            bottom: 20%;
          }

          &:nth-child(3) {
            top: 15%;
            left: 29%;
          }

          &:nth-child(4) {
            top: 50%;
            left: 29%;
          }

          &:nth-child(5) {
            top: 23%;
            left: 68%;
          }

          &:nth-child(6) {
            top: 40%;
            left: 65%;
          }

          &:nth-child(7) {
            top: 35%;
            left: 14%;
          }

          &:nth-child(8) {
            top: 80%;
            left: 5%;
          }

        }
      }
    }
  }
}
</style>