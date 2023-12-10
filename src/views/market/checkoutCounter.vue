<template>
  <div class="text-white pt-16 pb-20">
    <div class="bg-black flex flex-col items-center w-full pb-4 text-white">
      <div class="flex justify-start items-center w-11/12 mb-4 bg-card-content p-2 rounded-md">
        <div class="flex w-30 p-2 justify-center bg-page-content rounded shadow-xl">
          <img :src="coherentInfo.levelImg" alt="">
        </div>
        <div class="text-gray-400 flex-1 ml-2 h-full flex flex-col justify-start text-sm">
          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.price') }}:
            </div>
            <div class="text-red-500 font-bold">
              {{ FormatAmount(coherentInfo.type).pointPre }}.<span class="text-xs">{{
                FormatAmount(coherentInfo.type).pointOffside }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.coherentCap') }}:
            </div>
            <div class="text-red-500 font-bold">
              {{ FormatAmount(coherentInfo.limit).pointPre }}.<span class="text-xs">{{
                FormatAmount(coherentInfo.limit).pointOffside }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.contribution') }}:
            </div>
            <div>
              {{ coherentInfo.shareholdings }}
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.MatchingLevelBonusRate') }}:
            </div>
            <div>
              {{ coherentInfo.incentiveRate * 100 + '%' }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-11/12 border-b border-gray-900 pb-2">
        <div class="flex justify-between text-gray-400 items-center p-2 rounded">
          <div class="">
            {{ $t('coherents.totalReleased') }} <van-popover v-model:show="showPMTPopover" theme="dark"
              placement="bottom-start">
              <div class="text-xs p-2 text-left text-gray-400">
                {{ $t('coherents.totalReleased') }}{{ Number(coherentInfo.type) * (6 / 10) }}PMT
              </div>
              <div class="text-xs p-2 text-left text-gray-400">
                <!-- 购买成功之后即时释放{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT -->
                {{ $t('coherents.buyAfterReleased') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT
              </div>
              <div class="text-xs p-2 text-left text-gray-400">
                {{ $t('coherents.24Released') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT
              </div>
              <div class="text-xs p-2 text-left text-gray-400">
                {{ $t('coherents.48Released') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT
              </div>
              <template #reference>
                <span class="icon iconfont icon-wenzishuoming_wenzishuoming active-white-color"></span>
              </template>
            </van-popover>

          </div>
          <div>{{ coherentInfo.releasePMT }}PMT</div>
        </div>

        <div class="flex justify-between text-gray-400 items-center p-2 rounded active-primary-color"
          v-for="(item, index) in propertiesList" :key="index" @click="handlePropertiesItem(item, index)">
          <div>{{ item.title }}</div>
          <div class="flex justify-end items-center">
            <div class="mr-0.5">{{ item.content }}</div>
            <div class=" icon iconfont icon-right"></div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center items-center fixed bottom-3" @click="handleConfirmBuy">
        <div class="w-11/12 operating-button text-center py-2.5 rounded-full">
          {{ $t('modalConfirm.confirm') }} {{ $t('coherents.buy') }}
        </div>
      </div>
    </div>
    <!-- 直接上級 -->
    <van-popup v-model:show="showReferrerAddressPopup" round position="bottom">
      <div class="bg-page-content text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-10">
          <div class="text-center mb-4 font-bold">{{ propertiesList[0].title }}</div>
          <div class="w-full flex flex-col items-center mb-2">
            <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ propertiesList[0].title }}</div>
            <div class="rounded overflow-hidden w-11/12 h-11  mb-1">
              <input @focus="isErrReferrer = false" type="text"
                :placeholder="propertiesList[0].placeholder + propertiesList[0].title" v-model="referrerAddress"
                class="w-full h-full bg-page-content rounded text-sm">
            </div>
            <div class="flex justify-between items-center w-11/12">
              <div class="text-gray-200 underline text-sm active-white-color flex justify-end items-center">
                <div class="w-4 mr-2" v-show="calibratingReferrer">
                  <img src="@/assets/images/calibration-loading.gif" alt="">
                </div>
                <div @click="handleCalibrationReferrer">校驗地址</div>
              </div>
              <div class="text-sm text-left animate__animated text-red-500" v-show="isErrReferrer"
                :class="isErrReferrer ? 'animate__shakeX text-red-500' : ''">{{ $t('coherents.invalidAddress') }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center items-center" v-show="canUseReferrer">
          <div class="w-11/12 text-center py-2.5 rounded-full operating-button" @click="handleConfirmReferrerAddress">
            {{ $t('modalConfirm.confirm') }}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 對碰上級 -->
    <van-popup v-model:show="showLegAddressPopup" round position="bottom">
      <div class="bg-page-content text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-4">
          <div class="text-center mb-4 font-bold">{{ propertiesList[1].title }}</div>
          <div class="w-full flex flex-col items-center mb-4">
            <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ propertiesList[1].title }}</div>
            <div class="rounded overflow-hidden w-11/12 h-11  mb-1">
              <input @focus="isErrLeg = false" type="text"
                :placeholder="propertiesList[1].placeholder + propertiesList[1].title" v-model="legAddress"
                class="w-full h-full bg-page-content rounded text-sm">
            </div>



            <div class="flex justify-between items-center w-11/12">
              <div class="text-gray-200 underline text-sm active-white-color flex justify-end items-center">
                <div class="w-4 mr-2" v-show="calibratingLeg">
                  <img src="@/assets/images/calibration-loading.gif" alt="">
                </div>
                <div @click="handleCalibrationLeg">校驗地址</div>
              </div>
              <div v-show="isErrLeg" class="text-sm text-left animate__animated text-red-500"
                :class="isErrLeg ? 'animate__shakeX text-red-500' : ''">{{ $t('coherent.invalidAddress') }}
              </div>
            </div>


          </div>
          <div class="w-full flex justify-center items-center">
            <!-- 對碰上級點位 -->
            <div class="w-11/12 flex justify-between items-center">
              <div v-for="(item, index) in pointList" @click="handlePoint(item, index)" v-show="pointList.length !== 0"
                class=" rounded py-2 w-5/12 text-center mb-2 "
                :class="currentPoint == index ? 'current-item text-text' : 'bg-bottom-content text-black'">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 operating-button text-center py-2.5 rounded-full" @click="handleConfirmLegAddress">
            {{ $t('modalConfirm.confirm') }}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 確認支付彈窗 -->
    <van-popup v-model:show="showConfirmPayPopup" round position="bottom">
      <div class="bg-black text-white py-4 flex flex-col justify-center">
        <div class="flex justify-start items-center w-11/12 mr-auto ml-auto mb-2 border-b border-gray-900 pb-4">
          <div class="flex w-30 p-2 justify-center bg-page-content rounded shadow-xl">
            <img :src="coherentInfo.levelImg" alt="">
          </div>
          <div class="text-gray-400 flex-1 ml-2 h-full flex flex-col justify-start">
            <div class="flex justify-between items-center">
              <div>
                {{ $t('coherents.price') }}:
              </div>
              <div class="text-red-500 font-bold">
                {{ FormatAmount(coherentInfo.type).pointPre }}.<span class="text-xs">{{
                  FormatAmount(coherentInfo.type).pointOffside }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div>
                {{ $t('coherents.coherentCap') }}:
              </div>
              <div class="text-red-500 font-bold">
                {{ FormatAmount(coherentInfo.limit).pointPre }}.<span class="text-xs">{{
                  FormatAmount(coherentInfo.limit).pointOffside }}</span>
              </div>
            </div>

          </div>
        </div>
        <div class="w-11/12 mr-auto ml-auto mb-4">
          <div class="text-white text-xs flex justify-between items-baseline mb-1">
            <div class="text-base">RT </div>
            <div class="text-primary-color font-bold pl-1"> {{ $t('order.balance') }}: 0.0000 RT</div>
          </div>
          <div class="w-full mb-4 flex justify-between items-center">
            <div class="rounded pl-3 border border-gray-700 flex-1 py-1.5 text-sm ">
              {{ $t('order.needPay') }} 0.0000
            </div>
          </div>
          <div class="text-white text-xs flex justify-between items-baseline mb-1">
            <div class="text-base">{{ $t('order.bind') }}RT </div>
            <div class="text-primary-color font-bold pl-1"> {{ $t('order.balance') }}: 0.0000 RT</div>
          </div>
          <div class="w-full mb-4 flex justify-between items-center">
            <div class="rounded pl-3 border border-gray-700 flex-1 py-1.5 text-sm ">
              {{ $t('order.needPay') }} 0.0000
            </div>
          </div>
        </div>

        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 operating-button text-center py-2.5 rounded-full" @click="handlePopupConfirmBuy">
            {{ $t('modalConfirm.confirm') }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ZeroAddress, isAddress } from 'ethers'
import { showToast } from 'vant';
// import { MUSDTERC20AllowanceState, MUSDTERC20Approve, RTERC20AllowanceState, RTERC20Approve, buyCoherent, viewSpreads } from '@/request/contract.js'
import coherents_list from '@/datas/coherents_list'
import { FormatAmount, FilterAddress } from '@/utils/format'
import { useI18n } from 'vue-i18n';
import { buyCoherent, adequateBalance, addressLeg, checkReferrerAddress } from '@/request/api'

const { t } = useI18n()
const route = useRoute()
const { proxy } = getCurrentInstance()

let isErrReferrer = ref(false) //直接上级是否为无效地址
let isErrLeg = ref(false) //对碰上级是否为无效地址
let coherentInfo = ref({})
let referrerAddress = ref(null) //直接上级
let legAddress = ref(null)//对碰上级
let calibratingReferrer = ref(false) //正在校驗直接上級地址
let calibratingLeg = ref(false) //正在校驗直接上級地址
let canUseReferrer = ref(false)
let canUseLeg = ref(false)
const pointList = ref([])
let propertiesList = computed(() => {
  return [
    { title: t('coherents.directAddress'), placeholder: t('coherents.pleaseEnter'), content: '' },
    { title: t('coherents.collisionAddress'), placeholder: t('coherents.pleaseEnter'), content: '' },
  ]
})
let currentPoint = ref(null)
let showReferrerAddressPopup = ref(false)
let showLegAddressPopup = ref(false)
let showConfirmPayPopup = ref(false)
let showPMTPopover = ref(false)
//點擊點位選擇
function handlePoint(item, index) {
  if (!item.address) {
    currentPoint.value = index
  } else {
    showToast('該點位已有地址')
  }
}
//點擊校驗直接上級地址
async function handleCalibrationReferrer() {
  if (calibratingReferrer.value) {
    showToast('正在校驗，請稍後')
    return
  }
  calibratingReferrer.value = true
  if (!referrerAddress.value) {
    showToast(`${t('coherents.pleaseEnter')}${t('coherents.directAddress')}`)
    calibratingReferrer.value = false
    return
  }
  if (referrerAddress.value == ZeroAddress || !isAddress(referrerAddress.value)) {
    console.log('无效地址')
    calibratingReferrer.value = false
    isErrReferrer.value = true
    return
  }
  let isValidAddress
  try {
    isValidAddress = await checkReferrerAddress(referrerAddress.value)
    if (isValidAddress.message == '該地址是有效地址。') {
      calibratingReferrer.value = false
      canUseReferrer.value = true
    } else {
      canUseReferrer.value = false
      isErrReferrer.value = true
      calibratingReferrer.value = false
    }
    console.log('isValidAddress', isValidAddress)

  } catch (err) {
    console.log(err)
    canUseReferrer.value = false
    calibratingReferrer.value = false
    return
  }

  // setTimeout(() => {
  //   calibratingReferrer.value = false
  //   propertiesList.value[0].content = FilterAddress(referrerAddress.value)
  //   toggleReferrerAddressPopup()
  // }, 2000);
}
//點擊校驗對碰上級地址
async function handleCalibrationLeg() {
  if (calibratingLeg.value) {
    showToast('正在校驗，請稍後')
    return
  }
  calibratingLeg.value = true
  if (legAddress.value == ZeroAddress || !isAddress(legAddress.value)) {
    console.log('无效地址')
    isErrLeg.value = true
    calibratingLeg.value = false
    return
  }
  try {
    let legAddressInfo
    console.log(addressLeg)
    legAddressInfo = await addressLeg(legAddress.value)
    if (legAddressInfo.message == '該地址沒有購買配套記錄，不是有效地址。') {
      isErrLeg.value = true
      canUseLeg.value = false
      calibratingLeg.value = false
      return
    }
    canUseLeg.value = true
    console.log(legAddressInfo)
    pointList.value = [{ title: '左点位', address: null }, { title: '右点位', address: null }]
    pointList.value[0].address = legAddressInfo.directReferrals.left_leg
    pointList.value[1].address = legAddressInfo.directReferrals.right_leg
    calibratingLeg.value = false
  } catch (err) {
    console.log(err)
    proxy.$loading.hide()

  }
}
//点击填写直接上级弹窗确认按钮
function handleConfirmReferrerAddress() {
  if (calibratingReferrer.value) {
    showToast('正在校驗地址，請稍後')
    return
  }
  if (!referrerAddress.value) {
    showToast(`${t('coherents.pleaseEnter')}${t('coherents.directAddress')}`)
    return
  }
  propertiesList.value[0].content = FilterAddress(referrerAddress.value)
  toggleReferrerAddressPopup()
}

//点击填写对碰上级弹窗确认按钮
async function handleConfirmLegAddress() {
  if (!legAddress.value) {
    showToast(t('coherents.pleaseEnter' + t('coherents.collisionAddress')))
    calibratingLeg.value = false
    return
  }
  let legAddressInfo
  // try {
  //   console.log(addressLeg)
  //   legAddressInfo = await addressLeg(legAddress.value)
  //   pointList.value = [{ title: '左点位', address: null }, { title: '右点位', address: null }]
  //   pointList.value[0].address = legAddressInfo.directReferrals.left_leg
  //   pointList.value[1].address = legAddressInfo.directReferrals.right_leg
  // } catch (err) {
  //   console.log(err)
  //   proxy.$loading.hide()

  // }
  console.log(legAddressInfo)
  if (currentPoint.value == null) {
    showToast('請選擇點位')
    return
  }
  propertiesList.value[1].content = FilterAddress(legAddress.value)
  toggleLegAdddressPopup()
}
//切换直接上级弹窗
function toggleReferrerAddressPopup() {
  showReferrerAddressPopup.value = !showReferrerAddressPopup.value
}
//切换对碰上级弹窗
function toggleLegAdddressPopup() {
  showLegAddressPopup.value = !showLegAddressPopup.value
}

//獲取某個地址的左右點位和pv值
// async function addressLeg(address) {
//   addressLeg(address)
// }

function toggleConfirmPayPopup() {
  showConfirmPayPopup.value = !showConfirmPayPopup.value
}

async function handlePopupConfirmBuy() {
  toggleConfirmPayPopup()
  //判斷rt餘額是否充足
  proxy.$loading.show()
  let isAdequateBalance
  try {
    isAdequateBalance = await adequateBalance({ package_id: coherentInfo.value.id })
  } catch (err) {
    showToast('獲取餘額失敗，請重試')
  }

  let data = { package_id: 1, referrer_address: referrerAddress.value, leg_address: legAddress.value, legSide: currentPoint.value == 0 ? 'left' : 'right' }
  buyCoherent(data)
    .then(res => {
      console.log('購買成功', res)
      proxy.$loading.hide()
    })
    .catch(err => {
      proxy.$loading.hide()
      console.log('購買失敗', err)
      showToast('購買失敗')
      toggleConfirmPayPopup()

    })
}

//選擇購買配套地址相應屬性
function handlePropertiesItem(item, index) {
  console.log(item, index)
  // if (index == 0) {
  //   toggleReferrerAddressPopup()
  // } else {
  //   if (!referrerAddress.value) {
  //     showToast('請先填寫上級地址')
  //     return
  //   }
  //   toggleLegAdddressPopup()
  // }
  switch (index) {
    case 0: toggleReferrerAddressPopup()
      break;
    case 1: toggleLegAdddressPopup()
      break;
  }
}
//检查erc20授权状态
async function checkERC20ApproveState(walletAddress) {
  // let approveState = currentPayWay == 1 ? await MUSDTERC20AllowanceState(walletAddress) : await RTERC20AllowanceState(walletAddress) //根据支付方式返回该币种erc20授权状态
  // console.log(`${payWays.value[currentPayWay.value].title}授权状态`, approveState)
  return true
}
//RT授權erc20
// function userRTERC20Approve() {
//   RTERC20Approve()
//     .then(res => {
//       proxy.$loading.hide()
//       showToast(`${payWays.value[currentPayWay.value].title}授权成功`)

//       console.log(`${payWays.value[currentPayWay.value].title}授权成功`, res)
//     })
//     .catch(err => {
//       proxy.$loading.hide()
//       showToast(`${payWays.value[currentPayWay.value].title}授权失败`)

//       console.log(`${payWays.value[currentPayWay.value].title}授权失敗`, err)
//     })
// }
//MUSDT授權erc20
// function userMUSDTERC20Approve() {
//   MUSDTERC20Approve()
//     .then(res => {
//       proxy.$loading.hide()
//       showToast(`${payWays.value[currentPayWay.value].title}授权成功`)
//       console.log(`${payWays.value[currentPayWay.value].title}授权成功`, res)
//     })
//     .catch(err => {
//       proxy.$loading.hide()
//       showToast(`${payWays.value[currentPayWay.value].title}授权失败`)

//       console.log(`${payWays.value[currentPayWay.value].title}授权失敗`, err)
//     })
// }
// 用户授权erc20
// function erc20Approve() {
//   proxy.$loading.show()
//   switch (currentPayWay.value) {
//     case 0: userRTERC20Approve()
//       break;
//     case 1: userMUSDTERC20Approve()
//       break;
//   }
// }

async function handleConfirmBuy() {
  if (referrerAddress.value == null) {
    showToast(t('coherents.pleaseEnter') + t('coherents.directAddress'))
    return
  }
  if (legAddress.value == null) {
    showToast(t('coherents.pleaseEnter') + t('coherents.collisionAddress'))
    return
  }
  // proxy.$loading.show()

  toggleConfirmPayPopup()
}


// function userBuyCoherent(buyAddress, coherentType, isRT, referrerAddress, legAddress, isLeft) { //用戶購買配套
//   buyCoherent(buyAddress, coherentType, isRT, referrerAddress, legAddress, isLeft)
//     .then(res => {
//       proxy.$loading.hide()

//       showToast('購買成功')
//       console.log('購買成功', res)
//     })
//     .catch(err => {
//       proxy.$loading.hide()

//       showToast('購買失敗')
//       console.log('購買失敗', err)
//     })
// }

onMounted(() => {
  // FormatAmount()
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