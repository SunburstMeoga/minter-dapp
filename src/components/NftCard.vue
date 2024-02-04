<template>
  <div>
    <!-- <div class="text-white rounded-lg overflow-hidden border "
      :class="checkedStatus ? ' border-primary-color' : ' border-black'"> -->
    <div class="text-white rounded-lg overflow-hidden relative border border-nft-cover">
      <!-- <div class="absolute left-0 top-10 w-full">
        <img :src="nftImg" alt="">
      </div> -->
      <div class="p-2 bg-nft-cover">
        <div class="flex justify-between items-cente mb-2" v-show="showToken">
          <!-- <div class="text-primary-color">Minter</div> -->
          <div class="text-xs text-gray-500"># {{ tokenID }}</div>
        </div>
        <div class="flex justify-between items-cente mb-2">
          <div class="text-primary-color font-bold text-center w-full">Minter</div>
          <!-- <div class="text-xs text-gray-600"># {{ tokenID }}</div> -->
        </div>
        <div class="w-full">
          <img :src="nftImg" alt="">
        </div>
        <div class="flex justify-center items-center text-center w-full" @click="$emit('handleBuyButton')">
          <div class="" v-show="showPrice">{{ Number(price).toFixed(4) }} MT</div>
          <!-- <div v-show="showCheckbox" class="border  rounded w-5 h-5 flex justify-center items-center"
            :class="checkedStatus ? 'border-primary-color bg-primary-color' : 'border-gray-200'"
            @click="$emit('checkedStatusHasChange')">
            <div class="icon iconfont icon-right1" v-show="checkedStatus"></div>
          </div> -->
          <!-- <div class="icon  iconfont icon-Buy ml-1" style="font-size: 22px;" v-show="showBuyButton">

          </div> -->
        </div>
        <div class="flex justify-center items-center mt-2 active-primary-color" v-show="showBuyButton"
          @click="$emit('handleBuyButton')">
          <div class="w-full py-1 rounded-full text-center" :class="canBuy ? 'operating-button' : 'disable-button'">
            {{ $t('coherents.buy') }}
          </div>
        </div>
        <div class="flex justify-center items-center mt-2 active-primary-color" v-show="showListedButton"
          @click="$emit('handleListed')">
          <div class="operating-button w-full py-1 rounded-full text-center">
            {{ $t('wallet.sale') }}
          </div>
        </div>
        <div class="flex justify-center items-center mt-2 active-primary-color" v-show="showCancelButton"
          @click="$emit('handleCancel')">
          <div class="module-content w-full py-1 rounded-full text-center">
            {{ $t('wallet.cancleSale') }}
          </div>
        </div>
        <div class="flex justify-center items-center mt-2 active-primary-color" v-show="showToRaffle"
          @click="$emit('handleToRaffle')">
          <div class="module-content w-full py-1 rounded-full text-center flex justify-center items-center">
            {{ $t('wallet.toLottery') }}
          </div>
        </div>
        <div class="flex justify-center items-center mt-2 active-primary-color" v-show="showOperting"
          @click="handleOperting">
          <div class="disable-button w-full py-1 rounded-full text-center flex justify-center items-center">
            <span class="icon iconfont icon-loading animate-spin mr-1"></span>
            <!-- {{ opertingType }} -->
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
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  showToRaffle: {
    type: Boolean,
    default: false
  },
  showOperting: {
    type: Boolean,
    default: false
  },
  opertingType: {
    type: String,
    default: ''
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
  showToken: {
    type: Boolean,
    default: false
  }
})
function handleOperting() {
  showToast('正在操作，请稍候')
  return
}
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