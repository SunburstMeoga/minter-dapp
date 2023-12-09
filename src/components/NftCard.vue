<template>
  <div>
    <div class="text-white rounded-lg overflow-hidden border"
      :class="checkedStatus ? ' border-primary-color' : ' border-black'">
      <div>
        <img :src="nftImg" alt="">
      </div>
      <div class="p-2 bg-bottom-content">
        <div class="flex justify-between items-cente mb-2">
          <div class="text-primary-color">Minter</div>
          <div class="font-bold">#1024</div>
        </div>
        <div class="flex justify-between items-center">
          <div>4.000 MT</div>
          <div v-show="showCheckbox" class="border  rounded w-5 h-5 flex justify-center items-center"
            :class="checkedStatus ? 'border-primary-color bg-primary-color' : 'border-gray-200'"
            @click="$emit('checkedStatusHasChange')">
            <div class="icon iconfont icon-right1" v-show="checkedStatus"></div>
          </div>
        </div>
        <div class="flex justify-center items-center mt-2" v-show="showBuyButton" @click="$emit('handleBuyButton')">
          <div class="operating-button w-full py-1 rounded-full text-center">
            {{ $t('coherents.buy') }}
          </div>
        </div>
        <div class="flex justify-center items-center mt-2" v-show="showListedButton" @click="$emit('handleListed')">
          <div class="operating-button w-full py-1 rounded-full text-center">
            掛單
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  showCheckbox: {
    type: Boolean,
    default: true
  },
  showBuyButton: {
    type: Boolean,
    default: false
  },
  showListedButton: {
    type: Boolean,
    default: false
  },

  checkedStatus: {
    type: Boolean,
    default: false
  },
  nftImg: {
    type: String,
    default: ''
  }
})
// let checked = ref(false)
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>