<template>
  <div class="bg-black h-screen relative">
    <div class="w-full top-0 left-0 z-50 shadow-xl sticky" v-if="this.$route.meta.showLogo">
      <top-bar :pageTitle="pageTitle" showLogo></top-bar>
    </div>
    <div class="fixed bg-black w-full top-0 left-0 z-50 shadow-xl" v-if="this.$route.meta.showBack">
      <top-back-bar :pageTitle="this.$route.meta.pageTitle" />
    </div>
    <div class="bg-black">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import TopBar from '@/components/TopBar.vue'
import TopBackBar from './components/TopBackBar.vue'


</script>

<style  scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>