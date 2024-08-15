<template>
  <div>
    <div class="py-2 w-full bg-gray-bottom ">
      <div class="flex justify-between w-11/12 ml-auto mr-auto items-center text-white">
        <div class="w-20">
          <img src="../assets/images/minter-logo-ver.png" alt="">
        </div>
        <div class="flex justify-end items-center">
          <div v-for="(item, index) in officialMedias" class="ml-3" :key="index">
            <div class="icon iconfont" style="font-size: 24px;" :class="item.icon"></div>
          </div>
        </div>
        <!-- <div class="w-20 py-0.5 flex justify-center text-xs text-gray-500 rounded ">
          <div class="icon iconfont icon-duoyuyan" style="font-size:14px;"></div>
          <div class="pl-2" @click="changeLanguage">{{ $t('language') }}</div>
        </div> -->
      </div>
      <div class="w-11/12 ml-auto mr-auto flex justify-between items-center text-xs text-gray-500 ">
        <div>{{ $t('footBar.copyright') }}</div>
        <div class="flex justify-end items-center underline">
          <div class="pr-2">{{ $t('footBar.connectUS') }}</div>
          <div>{{ $t('menu.feedback') }}</div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import { ref, getCurrentInstance, onMounted } from 'vue'
const officialMedias = ref([{ icon: 'icon-tuite', url: '' }, { icon: 'icon-telegram1', url: '' }, { icon: 'icon-medium', url: '' }, { icon: 'icon-discord', url: '' }])
const { proxy } = getCurrentInstance()

function changeLanguage() {
  //console.log(proxy.$i18n.locale)
  if (proxy.$i18n.locale == "zh-hk") {
    proxy.$i18n.locale = "en-us";
  } else if (proxy.$i18n.locale == "en-us") {
    proxy.$i18n.locale = "zh-hk"
  }
  //console.log(proxy);
};
</script>

<style></style>