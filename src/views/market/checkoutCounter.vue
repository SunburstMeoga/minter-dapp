<template>
  <div class="text-white pt-16 pb-20">
    <div class="bg-black flex flex-col items-center w-full pb-4 text-white">
      <div class="flex justify-start items-center w-11/12 mb-4 border-b border-gray-900 pb-2">
        <div class="flex w-30 p-2 justify-center bg-page-content rounded-lg shadow-xl">
          <img src="../../assets/images/coherent-ssr.png" alt="">
        </div>
        <div class="text-gray-400 text-sm flex-1 ml-2 flex flex-col justify-start">
          <div class="flex justify-between items-center">
            <div>
              售价:
            </div>
            <div class="text-red-500 font-bold">
              $ {{ coherentInfo.type }}
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              收益上限:
            </div>
            <div class="text-red-500 font-bold">
              $ {{ coherentInfo.limit }}
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              可獲取Token數量:
            </div>
            <div>
              2
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div>
              配套等级奖励率:
            </div>
            <div>
              10%
            </div>
          </div>
        </div>
      </div>

      <div class="w-11/12 border-b border-gray-900 pb-2">
        <div class="flex justify-between text-gray-400 items-center py-1.5">
          <div>卡池中NFT金额区间</div>
          <div>≥25 且 ≤100</div>
        </div>
        <div class="flex justify-between text-gray-400 items-center  py-1.5">
          <div>卡池中NFT数量区间</div>
          <div>10000 至 20000</div>
        </div>
        <div class="flex justify-between text-gray-400 items-center py-1.5 rounded"
          @click="handlePropertiesItem(item, index)" v-for="(item, index) in propertiesList" :key="index">
          <div>{{ item.title }}</div>
          <div class="flex justify-end items-center">
            <div class="mr-0.5">{{ item.placeholder }}</div>
            <div class=" icon iconfont icon-right"></div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center items-center fixed bottom-3" @click="handleConfirmBuy">
        <div class="w-11/12 operating-button text-center py-2.5 rounded-lg">
          确认购买
        </div>
      </div>
    </div>
    <!-- 直推地址 -->
    <van-popup v-model:show="showsDirectSuperiorPopup" round position="bottom">
      <div class="bg-black text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-4">
          <div class="text-center">{{ propertiesList[0].title }}</div>
          <div class="w-full flex flex-col items-center mb-2">
            <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ propertiesList[0].title }}</div>
            <div class="rounded-lg overflow-hidden w-11/12 h-11 border border-gray-500 mb-1 pl-2">
              <input type="text" :placeholder="propertiesList[0].placeholder + propertiesList[0].title"
                v-model="propertiesList[0].content" class="w-full h-full bg-black rounded-lg">
            </div>
            <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated"
              :class="isNoEffectAddr && currentEnter == index ? 'animate__shakeX' : ''">該地址為無效地址
            </div>
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 operating-button text-center py-2.5 rounded-lg">
            確認
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 上级地址 -->
    <van-popup v-model:show="showPreAddressPopup" round position="bottom">
      <div class="bg-black text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-4">
          <div class="text-center">{{ propertiesList[1].title }}</div>
          <div class="w-full flex flex-col items-center mb-2">
            <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ propertiesList[1].title }}</div>
            <div class="rounded-lg overflow-hidden w-11/12 h-11 border border-gray-500 mb-1 pl-2">
              <input type="text" :placeholder="propertiesList[1].placeholder + propertiesList[0].title"
                v-model="propertiesList[0].content" class="w-full h-full bg-black rounded-lg">
            </div>
            <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated"
              :class="isNoEffectAddr && currentEnter == index ? 'animate__shakeX' : ''">該地址為無效地址
            </div>
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 operating-button text-center py-2.5 rounded-lg">
            確認
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 点位选择 -->
    <van-popup v-model:show="showPrePointPopup" round position="bottom">
      <div class="bg-black text-white py-4 flex flex-col justify-center">
        <div class="text-center mb-2">上级地址点位选择</div>
        <div class="w-full flex flex-col justify-center items-center mb-4">
          <div v-for="(item, index) in pointLsit"
            class="border border-primary-color rounded py-2 w-11/12 text-center mb-2 text-white">
            {{ item.title }}
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 operating-button text-center py-2.5 rounded-lg">
            確認
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 支付方式 -->
    <van-popup v-model:show="showPayWayPopup" round position="bottom">
      <div class="bg-black text-white py-4 flex flex-col justify-center">
        <div class="text-center mb-2">请选择支付方式</div>
        <div class="w-full flex flex-col justify-center items-center mb-4">
          <div v-for="(item, index) in pointLsit"
            class="border border-primary-color rounded py-2 w-11/12 text-center mb-2 text-white">
            {{ item.title }}
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 operating-button text-center py-2.5 rounded-lg">
            確認
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useRoute } from 'vue-router';

import { showToast } from 'vant';

import { erc20ApproveState, erc20Approve, buyCoherent } from '@/request/contract.js'
import coherents_list from '@/datas/coherents_list'

const route = useRoute()
const { proxy } = getCurrentInstance()

let coherentInfo = ref({})
let isNoEffectAddr = ref(false)
let currentEnter = ref(null)

let isRT = ref(false)
let directSuperior = ref(null) //直接上级
let meetWithSuperiors = ref(null)//对碰上级
let preAddressPoint = ref(null)
const pointLsit = ref([{ title: '左' }, { title: '右' }])
let propertiesList = computed(() => {
  return [
    { title: '直推地址', placeholder: '請填寫', content: directSuperior.value },
    { title: '上級地址', placeholder: '請填寫', content: meetWithSuperiors.value },
    { title: '上級地址點位', placeholder: '請填寫', content: preAddressPoint.value },
    { title: '支付方式', placeholder: '請選擇', content: preAddressPoint.value }


  ]
})
let currentPoint = ref(null)
let showsDirectSuperiorPopup = ref(false)
let showPreAddressPopup = ref(false)
let showPrePointPopup = ref(false)
let showPayWayPopup = ref(false)

function toggleDirectSuperiorPopup() {
  showsDirectSuperiorPopup.value = !showsDirectSuperiorPopup.value
}

function togglePreAddressPopup() {
  showPreAddressPopup.value = !showPreAddressPopup.value
}

function togglePrePointPopup() {
  showPrePointPopup.value = !showPrePointPopup.value
}

function togglePayWayPopup() {
  showPayWayPopup.value = !showPayWayPopup.value
}

function handlePropertiesItem(item, index) {
  switch (index) {
    case 0: toggleDirectSuperiorPopup()
      break;
    case 1: togglePreAddressPopup()
      break;
    case 2: togglePrePointPopup()
      break;
    case 3: togglePayWayPopup()
      break;
  }
}

function directMarketing(index) {
  isNoEffectAddr.value = true
  currentEnter.value = index
  console.log('直推地址失去焦點', index)
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

function userBuyCoherent(buyAddress, coherentType, isRT, directSuperior, meetWithSuperiors, isLeft) { //用戶購買配套
  buyCoherent(buyAddress, coherentType, isRT, directSuperior, meetWithSuperiors, isLeft)
    .then(res => {
      console.log('購買成功', res)
    })
    .catch(err => {
      console.log('購買失敗', err)
    })
}

onMounted(() => {
  console.log(route.params.type)
  console.log(coherents_list)
  let targetCoherents = coherents_list.filter(item => {
    return item.type == route.params.type
  })
  coherentInfo.value = targetCoherents[0]
  console.log(coherentInfo.value)
})
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>