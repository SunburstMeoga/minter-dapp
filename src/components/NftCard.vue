<template>
  <div>
    <div class="text-white rounded-lg overflow-hidden border"
      :class="checked ? ' border-primary-color' : ' border-black'">
      <div>
        <img :src="nftImg" alt="">
      </div>
      <div class="p-2 bg-bottom-content">
        <div class="flex justify-between items-cente">
          <div class="text-primary-color">Minter</div>
          <div class="font-bold">#1024</div>
        </div>
        <div class="flex justify-between items-center mb-2">
          <div>4.000 MT</div>
          <van-checkbox v-show="showCheckbox" icon-size="18px" v-model="checked" checked-color="#e149ed" shape="square" />
        </div>
        <div class="flex justify-center items-center" v-show="showBuyButton" @click="$emit('handleBuyButton')">
          <div class="operating-button w-full py-1 rounded-full text-center">
            购买
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
  nftImg: {
    type: String,
    default: ''
  }
})
let checked = ref(false)
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>