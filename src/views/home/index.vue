<template>
  <div>
    <button class="pt-20 text-primary-color" @click="changeSwiper">change</button>
    <swiper :direction="'vertical'" @swiper="setSwiperRef" :pagination="{
      clickable: true,
    }" :modules="modules" class="mySwiper">
      <swiper-slide>Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide
        1Slide 1Slide 1</swiper-slide>
      <swiper-slide>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide 2>Slide
        2>Slide 2</swiper-slide>
      <swiper-slide>Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide 3Slide
        3</swiper-slide>
      <swiper-slide>Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide 4Slide
        4Slide 4Slide 4</swiper-slide>
      <swiper-slide>Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide 5Slide
        5Slide 5</swiper-slide>
      <swiper-slide>Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide
        6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6Slide 6</swiper-slide>
      <swiper-slide>Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide 7Slide
        7</swiper-slide>
      <swiper-slide>Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide 8Slide
        8Slide 8Slide 8Slide 8</swiper-slide>
      <swiper-slide>Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide
        9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9Slide 9</swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
const modules = ref[Pagination]
let swiperRef = ref(null)

function setSwiperRef(swiper) {
  console.log(swiper)
  swiperRef = swiper;
};

function changeSwiper() {
  console.log(swiperRef)
  swiperRef.slideTo(3)
}
</script>

<style scoped>
#app {
  height: 100vh;
}

html,
body {
  position: relative;
  height: 100vh;
}

body {
  background: #eee;
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

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>