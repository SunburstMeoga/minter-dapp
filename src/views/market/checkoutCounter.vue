<template>
  <div class="text-white pt-16">
    <div class="bg-black flex flex-col items-center w-full pb-4 text-white">
      <div class="flex w-11/12 py-10 px-16 justify-center mb-4 bg-page-content rounded-lg">
        <img src="../../assets/images/coherent-ssr.png" alt="">
      </div>
      <div class="flex justify-between items-center w-11/12 mb-2">
        <div>售价</div>
        <div class="font-bold text-red-500">$ 99.00</div>
      </div>
      <div class="flex justify-between items-center w-11/12 mb-2">
        <div>收益上限</div>
        <div>$ {{ coherentInfo.limit }}</div>
      </div>
      <div class="flex justify-between items-center w-11/12 mb-2">
        <div>可获取token数量</div>
        <div>2</div>
      </div>
      <div class="flex justify-between items-center w-11/12 mb-2">
        <div>配套等级奖励率</div>
        <div>10%</div>
      </div>
      <div class="flex justify-between items-center w-11/12 mb-2">
        <div>卡池中NFT金额区间</div>
        <div>[25, 100]</div>
      </div>
      <div class="flex justify-between items-center w-11/12 mb-4">
        <div>卡池中NFT数量区间</div>
        <div>[10000, 20000]</div>
      </div>
      <div class="w-full border-b border-gray-800 mb-4"></div>
      <div class="w-full">
        <div class="w-full flex flex-col items-center mb-2" v-for="(  item, index  ) in   addressList  " :key="index">
          <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ item.title }}</div>
          <div class="rounded-lg overflow-hidden w-11/12 h-11 border border-gray-500 mb-1 pl-2">
            <input type="text" :placeholder="item.placeholder" v-model="item.content"
              class="w-full h-full bg-black rounded-lg" @blur="directMarketing(index)">
          </div>
          <div v-show="isNoEffectAddr && currentEnter == index"
            class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated"
            :class="isNoEffectAddr && currentEnter == index ? 'animate__shakeX' : ''">該地址為無效地址
          </div>
        </div>
      </div>

      <div class="text-gray-200 text-sm text-left w-11/12 mb-2">請選擇上級地址的左右點位</div>
      <div class="w-11/12 flex justify-between items-center mb-6">
        <div @click="currentPoint = index" class="w-5/12 rounded-lg py-1.5 text-center border border-primary-color"
          :class="currentPoint == index ? 'operating-button text-white' : 'text-primary-color '"
          v-for="(  item, index  ) in   pointLsit  " :key="index">
          {{ item.title }}
        </div>
      </div>
      <div class="w-full flex justify-center items-center fixed bottom-3" @click="handleConfirmBuy">
        <div class="w-11/12 operating-button text-center py-2.5 rounded-lg">
          确认购买
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useRoute } from 'vue-router';

import { showToast } from 'vant';

import { erc20ApproveState, erc20Approve, buyCoherent } from '@/request/contract.js'

const route = useRoute()
const { proxy } = getCurrentInstance()

onMounted(() => {
  console.log(route.params.type)
})

let coherentInfo = ref({})
let isNoEffectAddr = ref(false)
let currentEnter = ref(null)
let isRT = ref(false)
let directSuperior = ref(null) //直接上级
let meetWithSuperiors = ref(null)//对碰上级
const pointLsit = ref([{ title: '左' }, { title: '右' }])
let addressList = computed(() => {
  return [{ title: '直推地址', placeholder: '請填寫直推地址', content: directSuperior.value }, { title: '上級地址', placeholder: '請填寫上級地址', content: meetWithSuperiors.value }]
})
let currentPoint = ref(null)
function directMarketing(index) {
  isNoEffectAddr.value = true
  currentEnter.value = index
  console.log('直推地址失去焦點', index)
}
function toggleBuyPopup() {
  showBuyPopup.value = !showBuyPopup.value
}
function toggleBottomPopup() {
  showBottomPopup.value = !showBottomPopup.value
}
async function handleConfirmBuy() {
  // toggleBuyPopup()
  // console.log(!addressList.value[0].content)
  // if (currentPoint.value == null) {
  //     showToast('請選擇點位')
  //     return
  // }
  // if (!addressList.value[0].content) {
  //     showToast('请填写直推地址')
  //     return
  // }
  // if (!addressList.value[1].content) {
  //     showToast('请填写上级地址')
  //     return
  // }
  let coherentInfoObj = {
    coherentType: coherentInfo.value.price,
    isRT: isRT.value,
    directSuperior: directSuperior.value,
    meetWithSuperiors: meetWithSuperiors.value,
    isLeft: currentPoint.value == 0 ? true : false
  }
  // return
  let approveState = await checkERC20ApproveState(window.ethereum.selectedAddress) //购买地址授权状态
  console.log(approveState)
  if (approveState == 0) { //未授權
    proxy.$confirm.show({
      title: "未授權",
      content: "未授权，请进行ERC20授权",
      showCancelButton: false,
      confirmText: '去授權',
      onConfirm: () => {

        erc20Approve.then(res => {
          console.log(res)
          proxy.$confirm.hide()
          showToast('已授權，請繼續購買')
        })
          .catch(err => {
            proxy.$confirm.hide()
            console.log(err)

            showToast('授權失敗，請重新授權')
          })
      },
    });
  } else if (approveState <= 3) { //授權金額不足
    showToast('授權金額不足，請重新授權')
  } else {
    userBuyCoherent(coherentInfoObj)
  }
}

//检查erc20授权状态
async function checkERC20ApproveState(walletAddress) {
  let approveState = await erc20ApproveState(walletAddress)
  console.log('授權狀態', approveState)
  return approveState
}

async function handleBuy(item) {
  console.log('click button')
  router.push({
    path: `/checkout-counter/${item.price}`
  })
  return
  coherentInfo.value = item
  console.log(window.ethereum.selectedAddress)

  toggleBottomPopup()
}

function userBuyCoherent(buyAddress, coherentType, isRT, directSuperior, meetWithSuperiors, isLeft) { //用戶購買配套
  buyCoherent(buyAddress, coherentType, isRT, directSuperior, meetWithSuperiors, isLeft)
    .then(res => {
      console.log('購買成功', res)
    })
    .catch(err => {
      console.log('購買失敗', err)
    })
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>