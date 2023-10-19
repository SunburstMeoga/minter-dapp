<template>
  <div>
    <div class="relative">
      <div class="absolute top-0 w-full left-0 h-full">
        <img src="../../assets/images/home-bg.png" alt="">
      </div>
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
      <div>
        <swiper :direction="'vertical'" @swiper="setSwiperRef" @slideChange="swiperChange" :pagination="{
          clickable: true,
        }" :modules="modules" class="mySwiper">
          <swiper-slide>
            <welcome />
          </swiper-slide>
          <swiper-slide>
            <present />
          </swiper-slide>
          <swiper-slide>
            <game />
          </swiper-slide>
          <swiper-slide>
            <news />
          </swiper-slide>
          <swiper-slide>
            <collaborative />
          </swiper-slide>
          <swiper-slide>
            <future />
          </swiper-slide>
          <swiper-slide>
            <investor />
          </swiper-slide>

        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Welcome from './welcome.vue';
import Present from './present.vue'
import Game from './game.vue'
import News from './news.vue'
import Collaborative from './collaborative.vue'
import Investor from './investor.vue'
import Future from './future.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import { useStore } from "@/stores/swiper";
const swiperStore = useStore();
const modules = ref[Pagination]
let swiperRef = ref(null)

onMounted(() => {
  // changeSwiper()
  console.log(swiperStore.index)
})

watch(
  () => swiperStore.index,
  (newValue, oldValue) => {
    console.log("新值:" + newValue + "旧值:" + oldValue)
    // if (newValue == 5) {
    //   changeSwiper(6)
    //   return
    // }
    changeSwiper(newValue)
  },
  {
    deep: true
  }
)

function swiperChange(index) {
  console.log('發生了變化', index)
}

function setSwiperRef(swiper) {
  console.log(swiper)
  swiperRef = swiper
}

function changeSwiper(index) {
  console.log(swiperRef)
  swiperRef.slideTo(index, 1000, false)
  window.scroll(0, 0);
}
</script>

<style scoped>
img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

#app {
  height: 100vh;
}

html,
body {
  position: relative;
  height: 100vh;
}

body {
  /* background: #eee; */
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100vh;
}

/* .swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @apply text-white;
} */
</style>