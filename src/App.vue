<template>
  <div class="bg-black h-screen">
    <div class="fixed bg-black w-full top-0 left-0 z-50 shadow-xl" v-if="this.$route.meta.showLogo">
      <top-bar :pageTitle="pageTitle" showLogo></top-bar>
    </div>
    <div class="fixed bg-black w-full top-0 left-0 z-50 shadow-xl" v-if="this.$route.meta.showBack">
      <top-back-bar :pageTitle="this.$route.meta.pageTitle"/>
    </div>
    <div class="">
      <router-view />
    </div>
  </div>
 
</template>

<script>
  import TopBar from '@/components/TopBar.vue'
  import TopBackBar from './components/TopBackBar.vue';
  export default {
    components: { TopBar, TopBackBar},
    data() {
      return {
        pageTitle: '页面标题'
      }
    }
  }
</script>

<style  scoped>
   img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>