<template>
  <div class="bg-black h-screen">
    <div class="static top-0 left-0">
      <top-bar :pageTitle="pageTitle" showLogo></top-bar>
    </div>
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar.vue'
  export default {
    components: { TopBar },
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