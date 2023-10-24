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
            <welcome :hasChange="welcomeHasChange" />
          </swiper-slide>

          <swiper-slide>
            <news :hasChange="newsHasChange" />
          </swiper-slide>

          <swiper-slide>
            <vision :hasChange="visionHasChange" />
          </swiper-slide>

          <swiper-slide>
            <mission :hasChange="missionHasChange" />
          </swiper-slide>



          <swiper-slide>
            <present />
          </swiper-slide>

          <swiper-slide>
            <game />
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
import News from './news.vue'
import Vision from './vision.vue'
import Mission from './mission.vue'

import Present from './present.vue'
import Game from './game.vue'
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
let welcomeHasChange = ref(false)
let visionHasChange = ref(false)
let newsHasChange = ref(false)
let missionHasChange = ref(false)

onMounted(() => {
  // changeSwiper()
  console.log(swiperStore.index)
  welcomeHasChange.value = true
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

function swiperChange(swiper) {
  console.log('發生了變化', swiper)
  if (swiper.activeIndex == 0) {
    welcomeHasChange.value = true
    visionHasChange.value = false
    newsHasChange.value = false
    missionHasChange.value = false
  } else if (swiper.activeIndex == 1) {
    newsHasChange.value = true
    visionHasChange.value = false
    welcomeHasChange.value = false
    missionHasChange.value = false
  } else if (swiper.activeIndex == 2) {
    visionHasChange.value = true
    welcomeHasChange.value = false
    newsHasChange.value = false
    missionHasChange.value = false
  } else if (swiper.activeIndex == 3) {
    visionHasChange.value = false
    welcomeHasChange.value = false
    newsHasChange.value = false
    missionHasChange.value = true
  }
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