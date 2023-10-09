<template>
  <div class="bg-black">
    <div class="static top-0 left-0">
      <top-bar :pageTitle="pageTitle" showLogo></top-bar>
    </div>
    <router-view></router-view>
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