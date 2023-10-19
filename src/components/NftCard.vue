<template>
  <div>
    <div class="text-white rounded overflow-hidden border" :class="checked ? ' border-primary-color' : ' border-black'">
      <div>
        <img src="https://dmdc5rs64g5fy.cloudfront.net/nftPres/800/0x6543CAC7EeD0bEe28b58fF75f406cd297208b497/5771.png"
          alt="">
      </div>
      <div class="p-2 bg-gray-800">
        <div class="flex justify-between items-cente">
          <div class="text-primary-color">Minter</div>
          <div class="font-bold">#1024</div>
        </div>
        <div class="flex justify-between items-center">
          <div>4.000 MT</div>
          <van-checkbox v-show="showCheckbox" icon-size="18px" v-model="checked" checked-color="#e149ed" shape="square" />
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