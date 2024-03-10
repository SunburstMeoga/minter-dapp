<template>
  <div class="text-white pt-16 pb-20">
    <div class="flex flex-col items-center w-full pb-4 text-white">
      <div class="flex justify-start items-center w-11/12 mb-4 bg-card-content p-2 rounded-md">
        <div class="flex w-24 p-2 justify-center bg-black rounded shadow-xl">
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
              {{ $t('coherents.package') }}:
            </div>
            <div class="text-red-500 font-bold">
              {{ FormatAmount(coherentInfo.type - 5).pointPre }}.<span class="text-xs">{{
            FormatAmount(coherentInfo.type - 5).pointOffside }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.pbcc') }}:
            </div>
            <div class="text-red-500 font-bold">
              {{ FormatAmount(5).pointPre }}.<span class="text-xs">{{
            FormatAmount(5).pointOffside }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.coherentCap') }}
            </div>
            <div class="text-red-500 font-bold">
              {{ FormatAmount(coherentInfo.limit * 2).pointPre }}.<span class="text-xs">{{
            FormatAmount(coherentInfo.limit * 2).pointOffside }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{ $t('assistance.proceed') }}
            </div>
            <div class="text-red-500 font-bold">
              {{ FormatAmount(coherentInfo.limit).pointPre }}.<span class="text-xs">{{
            FormatAmount(coherentInfo.limit).pointOffside }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{ $t('assistance.bonus') }}
            </div>
            <div class="text-red-500 font-bold">
              {{ FormatAmount(coherentInfo.limit).pointPre }}.<span class="text-xs">{{
            FormatAmount(coherentInfo.limit).pointOffside }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.contribution') }}
            </div>
            <div>
              {{ coherentInfo.shareholdings }}
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div>
              {{ $t('coherents.MatchingLevelBonusRate') }}
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

      <div class="w-11/12 flex justify-between items-center fixed bottom-3">
        <!-- <div class="w-5/12 operating-button text-center py-2.5 rounded-full" @click="handleConfirmBuyForUSDT">
          USD3 {{ $t('invitePage.pay') }}
        </div> -->
        <div class="w-full operating-button text-center py-2.5 rounded-full" @click="handleConfirmBuyForRT">
          <!-- {{ $t('modalConfirm.confirm') }} {{ $t('coherents.buy') }} -->
          RT {{ $t('invitePage.pay') }}
        </div>

      </div>
    </div>
    <!-- 直接上級彈窗 -->
    <van-popup v-model:show="showReferrerAddressPopup" round position="bottom">
      <div class="bg-page-content text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-10">
          <div class="text-center mb-4 font-bold">{{ propertiesList[0].title }}</div>
          <div class="w-full flex flex-col items-center mb-2">
            <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ propertiesList[0].title }}</div>
            <div class="rounded overflow-hidden w-11/12 h-11  mb-1">
              <input @focus="isErrReferrer = false; canUseReferrer = false;" type="text"
                :placeholder="propertiesList[0].placeholder + propertiesList[0].title" v-model="referrerAddress"
                class="w-full h-full bg-page-content rounded text-sm">
            </div>
            <div class="flex justify-between items-center w-11/12">
              <div class="text-gray-200 underline text-sm active-white-color flex justify-end items-center">
                <div class="w-4 mr-2" v-show="calibratingReferrer">
                  <img src="@/assets/images/calibration-loading.gif" alt="">
                </div>
                <div @click="handleCalibrationReferrer">{{ $t('coherents.proAddress') }}</div>
              </div>
              <div class="text-sm text-left animate__animated text-red-500" v-show="isErrReferrer"
                :class="isErrReferrer ? 'animate__shakeX text-red-500' : ''">{{ $t('coherents.invalidAddress') }}
              </div>
              <div class="text-sm text-left animate__animated " v-show="canUseReferrer"
                :class="canUseReferrer ? 'animate__heartBeat text-green-500' : ''">
                {{ $t('coherents.canUse') }}
              </div>
            </div>
          </div>
        </div>


        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 text-center py-2.5 rounded-full operating-button" @click="handleConfirmReferrerAddress">
            {{ $t('modalConfirm.confirm') }}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 對碰上級彈窗 -->
    <van-popup v-model:show="showLegAddressPopup" round position="bottom">
      <div class="bg-page-content text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-4">
          <div class="text-center mb-4 font-bold">{{ propertiesList[1].title }}</div>
          <div class="w-full flex flex-col items-center mb-4">
            <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ propertiesList[1].title }}</div>
            <div class="rounded overflow-hidden w-11/12 h-11  mb-1">
              <input @focus="isErrLeg = false; canUseLeg = false;" type="text"
                :placeholder="propertiesList[1].placeholder + propertiesList[1].title" v-model="legAddress"
                class="w-full h-full bg-page-content rounded text-sm">
            </div>
            <div class="flex justify-between items-center w-11/12">
              <div class="text-gray-200 underline text-sm active-white-color flex justify-end items-center">
                <div class="w-4 mr-2" v-show="calibratingLeg">
                  <img src="@/assets/images/calibration-loading.gif" alt="">
                </div>
                <div @click="handleCalibrationLeg">{{ $t('coherents.proAddress') }}</div>
              </div>
              <div v-show="isErrLeg" class="text-sm text-left animate__animated text-red-500"
                :class="isErrLeg ? 'animate__shakeX text-red-500' : ''">{{ $t('coherents.invalidAddress') }}
              </div>
              <div class="text-sm text-left animate__animated " v-show="canUseLeg"
                :class="canUseReferrer ? 'animate__heartBeat text-green-500' : ''">
                {{ $t('coherents.canUse') }}
              </div>
            </div>
          </div>

        </div>
        <!-- <div class="w-full flex justify-center items-center" v-show="canUseLeg"> -->
        <div class="w-full flex justify-center items-center">

          <div class="w-11/12 operating-button text-center py-2.5 rounded-full" @click="handleConfirmLegAddress">
            {{ $t('modalConfirm.confirm') }}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 對碰上級點位彈窗 -->
    <van-popup v-model:show="showPointPopup" round position="bottom">
      <div class="bg-page-content text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-10">
          <div class="text-center mb-4 font-bold">{{ propertiesList[2].title }}</div>
          <div class="w-full flex justify-center items-center">
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
          <div class="w-11/12 operating-button text-center py-2.5 rounded-full" @click="handleConfirmPoint">
            {{ $t('modalConfirm.confirm') }}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 下級地址彈窗 -->
    <van-popup v-model:show="showNextPopup" round position="bottom">
      <div class="bg-page-content text-white py-4 flex flex-col justify-center">
        <div class="w-full mb-4">
          <div class="text-center mb-4 font-bold">{{ propertiesList[3].title }}</div>
          <div class="w-full flex flex-col items-center mb-4">
            <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ propertiesList[3].title }}</div>
            <div class="rounded overflow-hidden w-11/12 h-11  mb-1">
              <input @focus="isErrLeg = false" type="text"
                :placeholder="propertiesList[3].placeholder + propertiesList[3].title" v-model="helpNextAddress"
                class="w-full h-full bg-page-content rounded text-sm">
            </div>
            <!-- <div class="flex justify-between items-center w-11/12">
              <div class="text-gray-200 underline text-sm active-white-color flex justify-end items-center">
                <div class="w-4 mr-2" v-show="calibratingLeg">
                  <img src="@/assets/images/calibration-loading.gif" alt="">
                </div>
                <div @click="handleCalibrationLeg">{{ $t('coherents.proAddress') }}</div>
              </div>
              <div v-show="isErrLeg" class="text-sm text-left animate__animated text-red-500"
                :class="isErrLeg ? 'animate__shakeX text-red-500' : ''">{{ $t('coherents.invalidAddress') }}
              </div>
            </div> -->
          </div>

        </div>
        <div class="w-full flex justify-center items-center">
          <div class="w-11/12 operating-button text-center py-2.5 rounded-full" @click="handleConfirmNextAddress">
            {{ $t('modalConfirm.confirm') }}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 確認支付彈窗 -->
    <van-popup v-model:show="showConfirmPayPopup" round position="bottom">
      <div class="bg-black text-white py-4 flex flex-col justify-center">
        <div class="flex justify-start items-center w-11/12 mr-auto ml-auto mb-2 border-b border-gray-900 pb-4">
          <div class="flex w-24 p-2 justify-center bg-black shadow-xl border border-gray-600 rounded">
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
            <div class="text-primary-color font-bold pl-1"> {{ $t('order.balance') }}: {{ palayBanalce.rt }} RT</div>
          </div>
          <div class="w-full mb-4 flex justify-between items-center">
            <div class="rounded pl-3 border border-gray-700 flex-1 py-1.5 text-sm ">
              {{ $t('order.needPay') }} {{ Number(palayBanalce.rt) - Number(coherentInfo.type) >= 0 ?
            Number(coherentInfo.type) : Number(palayBanalce.rt) }}
            </div>
          </div>
          <div v-show="rtBind.length && rtBind.length !== 0">
            <div v-for="(item, index) in rtBind" :key="index" class="mb-3">
              <div class="text-white text-xs flex justify-between items-baseline mb-1">
                <div class="text-base">{{ $t('order.bind') + ' ' }}RT </div>
                <div class="text-primary-color font-bold pl-1"> {{ $t('assistance.expiryTime') }}: {{
            FilterTime(item.expire_date) }}
                </div>
              </div>
              <div class="w-full flex justify-between items-center">
                <!-- <div class="rounded pl-3 border border-gray-700 flex-1 py-1.5 text-sm ">
                  {{ $t('order.needPay') }} {{ Number(palayBanalce.rt) - Number(coherentInfo.type) < 0 ?
                    Number(coherentInfo.type) - Number(palayBanalce.rt) : '0.0000' }} </div>
                </div> -->
                <div class="rounded pl-3 border border-gray-700 flex-1 py-1.5 text-sm ">
                  餘額: {{ Number(item.amount).toFixed(4) }} RT </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-primary-color font-bold pl-4 text-sm mb-4" v-show="rtBind.length && rtBind.length !== 0">
          * {{ $t('raffle.welfareTips') }}
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
import { FilterTime } from '@/utils/format';

import { useRoute } from 'vue-router';
import { ZeroAddress, isAddress } from 'ethers'
import { showToast } from 'vant';
// import { MUSDTERC20AllowanceState, MUSDTERC20Approve, RTERC20AllowanceState, RTERC20Approve, buyCoherent, viewSpreads } from '@/request/contract.js'
import coherents_list from '@/datas/coherents_list'
import { FormatAmount, FilterAddress } from '@/utils/format'
import { useI18n } from 'vue-i18n';
import { buyCoherent, adequateBalance, addressLeg, checkReferrerAddress, joinTheThree, playersInfo, updataRTBalance, rtBalance, buyPackageToNext, checkAddressInTree, rtBindBalance } from '@/request/api'
import pmtContractApi from '@/request/pmt'
import usdtContractApi from '@/request/usdt'
import { config } from '@/const/config'
import Web3 from "web3";
import { useRouter } from "vue-router";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { proxy } = getCurrentInstance()

let isErrReferrer = ref(false) //直接上级是否为无效地址
let isErrLeg = ref(false) //对碰上级是否为无效地址
let coherentInfo = ref({})
let referrerAddress = ref(null) //直接上级
let legAddress = ref(null)//对碰上级
let helpNextAddress = ref(null)
let calibratingReferrer = ref(false) //正在校驗直接上級地址
let calibratingLeg = ref(false) //正在校驗直接上級地址
let canUseReferrer = ref(false)
let canUseLeg = ref(false)

let showPointPopup = ref(false)
const pointList = ref([])
let propertiesList = computed(() => {
  return [
    { title: t('invitePage.inviteAddress'), placeholder: t('coherents.pleaseEnter'), content: '' },
    { title: t('coherents.collisionAddress'), placeholder: t('coherents.pleaseEnter'), content: '' },
    { title: t('assistance.pointInfo'), placeholder: t('coherents.pleaseEnter'), content: '' },
    { title: t('assistance.nextAddress'), placeholder: t('coherents.pleaseEnter'), content: '' },
  ]
})
let currentPoint = ref(null)
let showReferrerAddressPopup = ref(false)
let showLegAddressPopup = ref(false)
let showConfirmPayPopup = ref(false)
let showPMTPopover = ref(false)
let palayBanalce = ref({})
let showNextPopup = ref(false)
let preAddressUse = ref(t('coherents.invalidAddress'))
let rtBind = ref([])
onMounted(() => {
  // FormatAmount()
  // console.log(route.params.type)
  //console.log(coherents_list)
  let targetCoherents = coherents_list.filter(item => {
    return item.type == route.params.type
  })
  coherentInfo.value = targetCoherents[0]
  console.log(coherentInfo.value)
  getPlayersInfo(localStorage.getItem('address'))
  getRTBalance()
})
//获取绑定rt列表
function getRTBalance() {
  rtBindBalance()
    .then(res => {
      //console.log(res, '绑定rt余额')
      rtBind.value = res.rt_locked
    })
    .catch(err => {
      //console.log(err)
    })
}
//獲取玩家信息
function getPlayersInfo(address) {
  playersInfo(address)
    .then(res => {
      //console.log('res', res)
      palayBanalce.value.rt = res.player.rt
      palayBanalce.value.rtLocked = res.player.rt_locked
    })
    .catch(err => {
      //console.log('err', err)
    })
}
function togglePointPopup() {
  showPointPopup.value = !showPointPopup.value
}
function toggleNextPopup() {
  showNextPopup.value = !showNextPopup.value
}
//點擊點位選擇彈窗確認按鈕
function handleConfirmPoint() {
  //console.log(pointList.value[currentPoint.value])
  propertiesList.value[2].content = pointList.value[currentPoint.value].title
  togglePointPopup()
}
//點擊點位選擇
function handlePoint(item, index) {
  if (!item.address) {
    currentPoint.value = index
  } else {
    showToast(t('modalConfirm.pointAddressHadAddress'))
  }
}
//點擊校驗直接上級地址
async function handleCalibrationReferrer() {
  //console.log('referrerAddress', referrerAddress.value)
  //console.log(referrerAddress.value.toLowerCase() == localStorage.getItem('address').toLowerCase())
  if (!referrerAddress.value) {
    showToast(t('modalConfirm.enterInvterAddress'))
    return
  }
  // if (referrerAddress.value.toLowerCase() == localStorage.getItem('address').toLowerCase()) {
  //   showToast('自己的地址不能作為自己的直接上級')
  //   return
  // }
  isErrLeg.value = false
  if (calibratingReferrer.value) {
    showToast(t('modalConfirm.progress'))
    return
  }

  calibratingReferrer.value = true
  if (!referrerAddress.value) {
    showToast(`${t('coherents.pleaseEnter')}${t('coherents.directAddress')}`)
    calibratingReferrer.value = false
    return
  }
  if (referrerAddress.value == ZeroAddress || !isAddress(referrerAddress.value)) {
    //console.log('无效地址')
    calibratingReferrer.value = false
    isErrReferrer.value = true

    return
  }
  let isValidAddress
  let isSelfNext
  try {
    isSelfNext = await checkAddressInTree(referrerAddress.value)
    //console.log(isSelfNext)
    if (isSelfNext.message == '所檢示的地址不是自己的下級。') {
      calibratingReferrer.value = false

      proxy.$confirm.hide()
      proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        content: t('modalConfirm.addressTipsFour'),
        showCancelButton: false,
        confirmText: t('modalConfirm.confirm'),
        onConfirm: () => {
          proxy.$loading.hide()
          proxy.$confirm.hide()
        },
      });
      return
    }
    // return
    isValidAddress = await checkReferrerAddress(referrerAddress.value)
    if (isValidAddress.message == '該地址是有效地址。') {
      calibratingReferrer.value = false
      canUseReferrer.value = true
    } else {
      canUseReferrer.value = false
      isErrReferrer.value = true
      calibratingReferrer.value = false
    }
    //console.log('isValidAddress', isValidAddress)

  } catch (err) {
    //console.log(err)
    canUseReferrer.value = false
    calibratingReferrer.value = false
    return
  }
}
//點擊校驗對碰上級地址
async function handleCalibrationLeg() {
  // if (legAddress.value.toLowerCase() == localStorage.getItem('address').toLowerCase()) {
  //   showToast('自己的地址不能作為自己的對碰上級')
  //   return
  // }
  isErrReferrer.value = false
  if (calibratingLeg.value) {
    showToast(t('modalConfirm.progress'))
    return
  }
  calibratingLeg.value = true
  if (legAddress.value == ZeroAddress || !isAddress(legAddress.value)) {
    //console.log('无效地址')
    isErrLeg.value = true
    calibratingLeg.value = false
    return
  }
  try {
    let legAddressInfo
    let isSelfNext
    isSelfNext = await checkAddressInTree(referrerAddress.value)
    //console.log(isSelfNext)
    if (isSelfNext.message == '所檢示的地址不是自己的下級。') {
      calibratingReferrer.value = false
      proxy.$confirm.hide()
      proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        content: t('modalConfirm.addressTipsThree'),
        showCancelButton: false,
        confirmText: t('modalConfirm.confirm'),
        onConfirm: () => {
          proxy.$loading.hide()
          proxy.$confirm.hide()
        },
      });
      return
    }
    //console.log(addressLeg)
    legAddressInfo = await addressLeg(legAddress.value)
    if (legAddressInfo.message == '該地址沒有購買配套記錄，不是有效地址。') {
      isErrLeg.value = true
      canUseLeg.value = false
      calibratingLeg.value = false
      return
    }
    canUseLeg.value = true
    //console.log(legAddressInfo)
    pointList.value = [{ title: t('assistance.left'), address: null }, { title: t('assistance.right'), address: null }]
    pointList.value[0].address = legAddressInfo.directReferrals.left_leg
    pointList.value[1].address = legAddressInfo.directReferrals.right_leg
    calibratingLeg.value = false
  } catch (err) {
    //console.log(err)
    proxy.$loading.hide()

  }
}
//点击填写直接上级弹窗确认按钮
function handleConfirmReferrerAddress() {
  if (calibratingReferrer.value) {
    showToast(t('modalConfirm.progress'))
    return
  }
  if (!referrerAddress.value) {
    showToast(`${t('coherents.pleaseEnter')}${t('coherents.directAddress')}`)
    return
  }
  propertiesList.value[0].content = FilterAddress(referrerAddress.value)
  toggleReferrerAddressPopup()
}
//判断rt余额是否充足
async function isSufficientRT(amount) {
  try {
    let balance = await rtBalance({ address: localStorage.getItem('address') })
    // balance = parseInt(balance)
    balance = balance.player
    balance = balance.rt
    //console.log('rt餘額', balance)
    //console.log('rt餘額', parseInt(balance))
    return Number(amount).toFixed(0) <= parseInt(balance)
  } catch (err) {
    //console.log(err)
  }
}

//判斷usdt餘額是否充足
async function isSufficientUSD3(amount) {
  let balance = await usdtContractApi.balanceOf(localStorage.getItem('address'))
  let WEB3 = new Web3(window.ethereum)
  balance = WEB3.utils.fromWei(balance.toString(), 'ether')
  balance = parseInt(balance)
  //console.log('u餘額', balance)
  return Number(amount).toFixed(0) <= balance
}
//使用usdt購買package
async function handleConfirmBuyForUSDT() {
  proxy.$loading.show()
  try {
    if (!await isSufficientUSD3(coherentInfo.value.type)) {
      proxy.$loading.hide()
      proxy.$confirm.hide()
      proxy.$confirm.show({
        title: t('modalConfirm.notBalance'),
        // content: `當前配套價格為 ${coherentInfo.value.type} USD3，您的 USD3 餘額不足。`,
        content: `${t('modalConfirm.notEnoughBalance', { amount: coherentInfo.value.type, currency: 'USD3' })}`,

        showCancelButton: false,
        confirmText: t('modalConfirm.confirm'),
        onConfirm: () => {
          proxy.$confirm.hide()
        },
      });
      return
    }

  } catch (err) {
    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
      title: t('modalConfirm.error'),
      content: t('modalConfirm.getBalanceFail'),
      showCancelButton: false,
      confirmText: t('modalConfirm.confirm'),
      onConfirm: () => {
        proxy.$confirm.hide()
      },
    });
    return
  }
  let allowance
  try { //检查usdt对pmt_purchase的授权状态
    allowance = await usdtContractApi.allowance(localStorage.getItem('address'), config.pmt_purchase_addr)
    proxy.$loading.hide()
  } catch (err) {
    proxy.$loading.hide()
    showToast(`${t('modalConfirm.checkAuthFail', { type: 'USD3' })}`)
    //console.log(err)
  }
  //console.log('allowance', allowance)

  if (Number(allowance) == 0) { //當前領取方式未授權
    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
      title: t('modalConfirm.authorize'),
      content: t('modalConfirm.pleaseAuthorize', { type: 'USD3' }),
      showCancelButton: false,
      confirmText: t('modalConfirm.toAuthorize'),
      onConfirm: () => {
        // proxy.$loading.show()
        // usdt对pmt授權
        usdtContractApi.approve(config.pmt_purchase_addr)
          .then(res => {
            //console.log(res)
            proxy.$confirm.hide()
            // proxy.$loading.hide()
            showToast(t('modalConfirm.successAuthorize'))

          })
          .catch(err => {
            //console.log(err)
            proxy.$confirm.hide()
            showToast(t('modalConfirm.authorizeFail', { type: 'USD3' }))
          })
      },
    });
    return
  }

  proxy.$loading.hide()
  proxy.$confirm.hide()
  proxy.$confirm.show({
    title: t('modalConfirm.confirm'),
    // content: `是否確認購買 ${coherentInfo.value.type} 配套`,
    content: `${t('modalConfirm.confirmBuyPackage', { package: coherentInfo.value.type })}`,
    showCancelButton: true,
    confirmText: t('modalConfirm.confirm'),
    cancelText: t('modalConfirm.cancel'),
    onConfirm: async () => {
      try {
        //console.log(Number(coherentInfo.value.id))
        let purchase = await pmtContractApi.purchasePackage(Number(coherentInfo.value.id - 1))
        proxy.$confirm.hide()
        proxy.$confirm.show({
          title: t('modalConfirm.buySuccess'),
          content: `${t('modalConfirm.successBuyPackage', { package: coherentInfo.value.name })}`,
          showCancelButton: false,
          confirmText: t('modalConfirm.confirm'),
          onConfirm: () => {
            proxy.$confirm.hide()
            // toggleConfirmPayPopup()
          },
        });
        //console.log(purchase)
        let data = {
          address: referrerAddress.value,
          leg_address: legAddress.value,
          legSide: currentPoint.value == 0 ? 'left' : 'right'
        }
        await joinTheThree(data)
        // proxy.$confirm.hide()
        // showToast('購買成功')
      } catch (err) {
        proxy.$confirm.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
          title: t('modalConfirm.tips'),
          content: t('toast.error'),
          showCancelButton: false,
          confirmText: t('modalConfirm.confirm'),
          onConfirm: () => {
            proxy.$confirm.hide()
            // toggleConfirmPayPopup()
          },
        });
        // showToast('購買失敗，請重試')
        // //console.log(err)
      }
    },
    // onCancel: () => {
    //   proxy.$confirm.hide()
    // },
  });
}
//點擊填寫下級彈窗確認按鈕
async function handleConfirmNextAddress() {
  if (!helpNextAddress.value) {
    showToast(t('toast.enterNextAddress'))
    // calibratingLeg.value = false
    return
  }
  propertiesList.value[3].content = FilterAddress(helpNextAddress.value)
  toggleNextPopup()
}
//点击填写对碰上级弹窗确认按钮
async function handleConfirmLegAddress() {
  if (!legAddress.value) {
    showToast(t('coherents.pleaseEnter' + t('coherents.collisionAddress')))
    calibratingLeg.value = false
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
    //console.log('isAdequateBalance', isAdequateBalance)
    proxy.$loading.hide()
    if (isAdequateBalance.message == "RT餘額不足") {
      proxy.$loading.hide()
      proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        // content: `RT餘額不足，無法購買 ${coherentInfo.value.type} 配套`,
        content: `${t('modalConfirm.notEnoughBalance', { amount: coherentInfo.value.type, currency: 'RT' })}`,
        showCancelButton: true,
        cancelText: t('modalConfirm.cancel'),
        confirmText: t('toast.exchangeTitle'),
        onConfirm: () => {
          proxy.$confirm.hide()
          proxy.$loading.hide()
          router.push({
            path: '/personal/exchange'
          })
        },
        onCancel: () => {
          proxy.$confirm.hide()
          proxy.$loading.hide()
        }
      });
      return
    }


  } catch (err) {
    showToast(t('modalConfirm.getBalanceFail'),)
    proxy.$loading.hide()
    return
  }
  proxy.$loading.hide()
  proxy.$confirm.hide()
  proxy.$confirm.show({
    title: t('modalConfirm.tips'),
    // content: `是否確認購買 ${coherentInfo.value.type} 配套`,
    content: `${t('modalConfirm.confirmBuyPackage', { package: coherentInfo.value.type })}`,
    showCancelButton: true,
    confirmText: t('modalConfirm.confirm'),
    cancelText: t('modalConfirm.cancel'),
    onConfirm: async () => {
      let data = {
        package_id: coherentInfo.value.id,
        address: helpNextAddress.value,
        leg_address: legAddress.value,
        legSide: currentPoint.value == 0 ? 'left' : 'right',
        referrer_address: referrerAddress.value
      }
      //console.log(data)
      buyPackageToNext(data)
        .then(res => {
          //console.log('購買', res)
          if (res.error) {
            proxy.$confirm.hide()
            proxy.$confirm.show({
              title: t('toast.error'),
              content: `${res.error}`,
              showCancelButton: false,
              confirmText: t('modalConfirm.confirm'),
              onConfirm: () => {
                proxy.$confirm.hide()

              },
            });
            return
          }
          if (res.message == 'RT餘額不足') {
            proxy.$loading.hide()
            proxy.$confirm.hide()
            proxy.$confirm.show({
              title: t('modalConfirm.notBalance'),
              // content: `當前配套價格為 ${coherentInfo.value.type} RT，您的 RT 餘額不足。`,
              content: `${t('modalConfirm.notEnoughBalance', { amount: coherentInfo.value.type, currency: 'RT' })}`,
              showCancelButton: true,
              confirmText: t('exchange.title'),
              onConfirm: () => {
                proxy.$confirm.hide()
                proxy.$loading.hide()
                router.push({
                  path: '/personal/exchange'
                })
              },
              onCancel: () => {
                proxy.$confirm.hide()
                proxy.$loading.hide()
              }
            });
            return
          }
          if (res.message == '你已經擁有NFT，不能購買配套，請先出售所有nft才能繼續購買。') {
            proxy.$loading.hide()
            proxy.$confirm.hide()
            proxy.$confirm.show({
              title: t('modalConfirm.tips'),
              content: `該地址必須賣出所有的NFT才可以購買新的配套`,
              showCancelButton: false,
              confirmText: t('modalConfirm.confirm'),
              onConfirm: () => {
                proxy.$confirm.hide()
              },
            });
            return
          }
          // showToast(res.message)
          if (res.message == "推薦人地址不存在") {
            proxy.$confirm.hide()
            proxy.$confirm.show({
              title: t('toast.error'),
              content: t('modalConfirm.addressDoesNotExist'),
              showCancelButton: false,
              confirmText: t('modalConfirm.confirm'),
              onConfirm: () => {
                proxy.$confirm.hide()

              },
            });
            return
          }

          if (res.message == "Address not found in leg tree") {
            proxy.$confirm.hide()
            proxy.$confirm.show({
              title: t('toast.error'),
              content: t('modalConfirm.addressTipsOne'),
              showCancelButton: false,
              confirmText: t('modalConfirm.confirm'),
              onConfirm: () => {
                proxy.$confirm.hide()

              },
            });
            return
          }


          if (!res.player) {
            proxy.$confirm.hide()
            proxy.$confirm.show({
              title: t('toast.error'),
              content: t('modalConfirm.addressTipsTwo'),
              showCancelButton: false,
              confirmText: t('modalConfirm.confirm'),
              onConfirm: () => {
                proxy.$confirm.hide()
              },
            });
            return
          }
          setTimeout(() => {
            // proxy.$confirm.hide()
            setTimeout(() => {
              proxy.$confirm.hide()
              proxy.$confirm.show({
                title: t('modalConfirm.buySuccess'),
                // content: `已成功為下級購買 ${coherentInfo.value.type} 配套`,
                content: `${t('modalConfirm.successBuyPackage', { package: coherentInfo.value.name })}`,
                showCancelButton: false,
                confirmText: t('modalConfirm.confirm'),
                onConfirm: () => {
                  proxy.$confirm.hide()
                  let data = {
                    address: helpNextAddress.value,
                    leg_address: legAddress.value,
                    legSide: currentPoint.value == 0 ? 'left' : 'right',
                  }
                  joinTheThree(data)
                  updataRTBalance(localStorage.getItem('address'))
                    .then(result => {
                      proxy.$loading.hide()
                      //console.log('購買成功', result)
                      // showToast(res.message)
                      proxy.$confirm.hide()
                      // clearTimeout(timer)
                    })
                    .catch(err => {
                      proxy.$loading.hide()
                      //console.log('更新rt餘額失敗', err)
                      proxy.$confirm.hide()
                    })
                },
              });
            }, 8000);
          }, 5000);


        })
        .catch(err => {
          proxy.$confirm.hide()
          proxy.$confirm.show({
            title: t('modalConfirm.tips'),
            content: t('toast.error'),
            showCancelButton: false,
            confirmText: t('modalConfirm.confirm'),
            onConfirm: () => {
              proxy.$confirm.hide()
              toggleConfirmPayPopup()
            },
          });


        })
    },
    onCacncel: async () => {
      proxy.$confirm.hide()
    }
  });


}

//選擇購買配套地址相應屬性
function handlePropertiesItem(item, index) {
  //console.log(item, index)
  if (index == 0) {
    toggleReferrerAddressPopup()
  } else if (index == 1) {
    toggleLegAdddressPopup()
  } else if (index == 2) {
    // pointList.value[0].address = legAddressInfo.directReferrals.left_leg
    // if (pointList.value[0].address && pointList.value[1].address) {
    //   showToast('对碰上级左右点位均被占用，请重新输入对碰上级地址')
    //   return
    // }
    // if (!legAddress.value) {
    //   showToast('填入对碰地址再选择点位')
    //   return
    // }
    togglePointPopup()
  } else if (index == 3) {
    toggleNextPopup()
  }
  // switch (index) {
  //   case 0: toggleReferrerAddressPopup()
  //     break;
  //   case 1: toggleLegAdddressPopup()
  //     break;
  //   case 2: togglePointPopup()
  //     break;
  // }
}
//检查erc20授权状态
async function checkERC20ApproveState(walletAddress) {
  // let approveState = currentPayWay == 1 ? await MUSDTERC20AllowanceState(walletAddress) : await RTERC20AllowanceState(walletAddress) //根据支付方式返回该币种erc20授权状态
  // //console.log(`${payWays.value[currentPayWay.value].title}授权状态`, approveState)
  return true
}
async function handleConfirmBuyForRT() {
  if (referrerAddress.value == null) {
    showToast(t('coherents.pleaseEnter') + t('coherents.directAddress'))
    return
  }
  if (legAddress.value == null) {
    showToast(t('coherents.pleaseEnter') + t('coherents.collisionAddress'))
    return
  }
  if (helpNextAddress.value == null) {
    showToast(t('toast.enterNextAddress'))
  }
  // proxy.$loading.show()

  toggleConfirmPayPopup()
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>