<template>
  <div>
    <!-- <div class="text-white rounded-lg overflow-hidden border "
      :class="checkedStatus ? ' border-primary-color' : ' border-black'"> -->
    <div class="text-white rounded-lg overflow-hidden relative border border-nft-cover">
      <div class="absolute left-0 top-10 w-full">
        <img :src="nftImg" alt="">
      </div>
      <div class="p-2 bg-nft-cover">
        <div class="flex justify-between items-cente mb-2">
          <!-- <div class="text-primary-color">Minter</div> -->
          <div class="text-xs text-gray-500"># {{ tokenID }}</div>
        </div>
        <div class="flex justify-between items-cente mb-36">
          <div class="text-primary-color font-bold text-center w-full">Minter</div>
          <!-- <div class="text-xs text-gray-600"># {{ tokenID }}</div> -->
        </div>
        <div class="flex justify-center items-center text-center w-full">
          <div class="" v-show="showPrice">{{ Number(price).toFixed(4) }} MT</div>
          <!-- <div v-show="showCheckbox" class="border  rounded w-5 h-5 flex justify-center items-center"
            :class="checkedStatus ? 'border-primary-color bg-primary-color' : 'border-gray-200'"
            @click="$emit('checkedStatusHasChange')">
            <div class="icon iconfont icon-right1" v-show="checkedStatus"></div>
          </div> -->
          <div class="icon  iconfont icon-Buy ml-1" style="font-size: 22px;" v-show="showBuyButton"
            @click="$emit('handleBuyButton')">

          </div>
        </div>
        <!-- <div class="flex justify-center items-center mt-2" v-show="showBuyButton" @click="$emit('handleBuyButton')">
          <div class="w-full py-1 rounded-full text-center" :class="canBuy ? 'operating-button' : 'disable-button'">
            {{ $t('coherents.buy') }}
          </div>
        </div> -->
        <div class="flex justify-center items-center mt-2" v-show="showListedButton" @click="$emit('handleListed')">
          <div class="operating-button w-full py-1 rounded-full text-center">
            掛單
          </div>
        </div>
        <div class="flex justify-center items-center mt-2" v-show="showCancelButton" @click="$emit('handleCancel')">
          <div class="module-content w-full py-1 rounded-full text-center">
            取消掛單
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import nftOne from '@/assets/images/200.png'
import nftTwo from '@/assets/images/600.png'
import nftThree from '@/assets/images/2000.png'
import nftFour from '@/assets/images/6000.png'
import nftFive from '@/assets/images/20000.png'
const nftProps = defineProps({
  canBuy: {
    type: Boolean,
    default: true
  },
  showPrice: {
    type: Boolean,
    default: true
  },
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
  showCancelButton: {
    type: Boolean,
    default: false
  },
  price: {
    type: String,
    default: ''
  },
  tokenID: {
    type: Number,
    default: 0
  },
  checkedStatus: {
    type: Boolean,
    default: false
  },
  nftImg: {
    type: String,
    default: ''
  },
  nftTokenType: {
    type: Number,
    default: null
  },
})
// function getNFTImage() {  
//   if (nftProps.nftTokenType == 1) {
//     nftImg
//   }
// }
// let checked = ref(false)
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>