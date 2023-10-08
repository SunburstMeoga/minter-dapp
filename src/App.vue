<template>
  <!-- <ConfigProvider theme="light">
  </ConfigProvider>
  <Popup v-model:show="showTop" position="top">
    <van-cell-group>
      <van-cell title="软件名称" value="HAH推广游戏" label="推荐好友加盟游戏" />
      <van-cell title="版本" :value="config.version" label="Copyright ©2022~2023 HAH" />
    </van-cell-group>
  </Popup>
  <NavBar title="HAH推广游戏" @click-left="showTop = true" v-show="showApp">
    <template #left>
      <van-image width="30" height="30" src="./logo.png" />
      <van-tag round plain type="primary" style="margin-left: var(--van-padding-base);">HAH</van-tag>
    </template>
  </NavBar>
  <router-view></router-view>
  <Tabbar v-model="active" placeholder v-show="showApp">
    <TabbarItem name="home" icon="share-o" to="/home">朋友</TabbarItem>
    <TabbarItem name="static" icon="balance-o" to="/static">配套</TabbarItem>
    <TabbarItem name="trends" icon="chart-trending-o" to="/trends">收益</TabbarItem>
    <TabbarItem name="user" icon="user-o" to="/user">我的</TabbarItem>
  </Tabbar> -->
  <div class="h-screen bg-red-400 color-red-400">
    1111
  </div>
</template>
 
<script setup>
import { ref, watch } from 'vue'
import { Tabbar, TabbarItem, NavBar, ConfigProvider, Popup } from 'vant'
import { useRouter } from 'vue-router'
import { config } from '@/const/config'

const showTop = ref(false)
const active = ref('home')
const router = useRouter()
const showApp = ref(true)

watch([() => router.currentRoute.value.name], (R) => {
  active.value = R[0]
  if (active.value == 'reward' || active.value == 'principal') {
    showApp.value = false
  } else {
    showApp.value = true
  }
})

</script>

<!-- <style>
body {
  color: var(--van-text-color);
  background-color: var(--van-background-2);
}
</style> -->
