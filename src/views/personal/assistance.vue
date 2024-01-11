<template>
    <div class="pt-12 text-primary-color">
        <van-tabs class="pt-2" v-model:active="active" sticky shrink animated swipeable color="#e149ed"
            title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
            <van-tab :title="$t('assistance.pointMap')">
                <div v-if="isFinishPoint">
                    <div class="flex justify-center items-center mt-4">
                        <div class="w-11/12 text-center text-white rounded-full h-16 flex justify-between items-center">
                            <div class="flex-1 pr-4">
                                <input type="text" v-model="searchAddress"
                                    class="px-1 h-8 rounded-full text-sm bg-transparent w-full" placeholder="搜索地址">
                            </div>
                            <div class="operating-button rounded-full px-3 h-8 flex items-center text-sm"
                                @click="handleSearchAddress">搜索</div>
                        </div>
                    </div>
                    <point @clickPoint="clickPoint" :directReferrals="directReferrals" />
                    <div class="flex justify-center items-center mt-20">
                        <div class="card-content py-2 w-11/12 text-center text-white rounded-full"
                            @click="handleBackPreAddress">
                            返回上一级
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="$t('assistance.organisationChart')">
                <point-two @checkPoint="checkPoint" />
            </van-tab>
            <!-- <van-tab :title="$t('assistance.dynamicRewards')">
                <dynamic-rewards />
            </van-tab>
            <van-tab :title="$t('assistance.commitmentCard')">
                <div class="flex flex-col justify-start items-center mt-4">
                    <div class="w-11/12 mb-2" v-for="(item, index) in cardList" :key="index">
                        <performance-commitment-card @toggleShowMore="toggleShowMore(item, index)" :showMore="item.showMore"
                            :time="item.updated_at" :tokenID="item.nft_token_id" :price="item.reward_amount" />
                    </div>
                </div>
                <div v-if="cardList.length == 0" class="text-white font-bold mt-16 text-center">
                    暫無數據
                </div>
            </van-tab> -->
        </van-tabs>
        <!-- 帮自己购买package弹窗 -->
        <van-popup v-model:show="showBuyPackageSelf" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-6 text-white">购买配套</div>
                <div class="text-primary-color font-bold text-sm mb-2">
             * 請切記這個獎勵要在下個月7號前使用,過期則不可使用
          </div>        
                <div class="flex w-11/12 ml-auto mr-auto flex-wrap justify-between items-center mb-6">
                    <div v-for="(item, index) in coherentsList" :key="index"
                        class="border border-primary-color rounded px-2 py-1"
                        :class="currentSelf == index ? 'bg-primary-color text-white' : 'text-primary-color'"
                        @click="handleBuyPackageSelf(item, index)">
                        {{ item.type }}
                    </div>
                </div>
                <div class="w-11/12 mr-auto ml-auto flex justify-between items-center">
                    <div class="w-5/12 operating-button text-center py-2.5 rounded-full" @click="handleConfirmBuyForUSDT">
                        <!-- {{ $t('wallet.cancleSale') }} -->
                        USD3支付
                    </div>
                    <div class="w-5/12 operating-button text-center py-2.5 rounded-full" @click="handlePopupConfirmBuy">
                        RT支付
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 邀请方式弹窗 -->
        <van-popup v-model:show="showAttendPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-6 text-white">{{ $t('assistance.invitation') }}</div>
                <div class="flex justify-start items-center mb-6">
                    <div class="flex flex-col justify-start items-center mr-3 w-11/12" v-for="(item, index) in attendWays"
                        :key="index" @click="handleAttendItem(item, index)">
                        <div class="flex justify-center items-center">
                            <div
                                class="rounded-full w-14 h-14 flex justify-center items-center bg-primary-color text-white mb-1">
                                <div class="icon iconfont" style="font-size: 26px;" :class="item.icon"></div>
                            </div>
                        </div>
                        <div class="text-white text-sm">{{ item.title }}</div>
                    </div>
                </div>
                <div class="w-full flex justify-center items-center">
                    <div class="w-11/12 operating-button text-center py-2.5 rounded" @click="showAttendPopup = false">
                        {{ $t('modalConfirm.cancel') }}
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 直接购买弹窗 -->
        <van-popup v-model:show="showBuyPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <!-- <div class="text-center mb-6 text-white">请输入上级地址</div> -->
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="flex justify-between items-center w-11/12">
                        <div class="text-gray-200 text-sm text-left mb-1">{{ $t('assistance.inviterAddress') }}
                        </div>
                        <div class="flex justify-end items-center">
                            <div class="text-gray-200 text-xs px-1 text-left w-11/12 border border-gray-400 rounded active-white-color"
                                @click="enterPreAddress">鍵入上級地址
                            </div>
                            <div class="text-gray-200 text-xs px-1 text-left w-11/12 ml-2 border border-gray-400 rounded active-white-color"
                                @click="enterSelfAddress">
                                鍵入我的地址
                            </div>
                        </div>
                    </div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1">
                        <input type="text" :placeholder="$t('assistance.inviterAddress')" v-model="inviterAddressTwo"
                            class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <!-- <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        {{ $t('coherents.invalidAddress') }}
                    </div> -->
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ $t('assistance.preAddress') }}</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1">
                        <input type="text" disabled :placeholder="$t('assistance.preAddress')"
                            class="w-full h-full bg-bottom-content rounded" v-model="clickPointInfo.preAddress">
                    </div>
                    <!-- <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        {{ $t('coherents.invalidAddress') }}
                    </div> -->
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ $t('assistance.nextAddress') }}</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1">
                        <input type="text" :placeholder="$t('assistance.nextAddress')" v-model="helpNextAddress"
                            class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <!-- <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        {{ $t('coherents.invalidAddress') }}
                    </div> -->
                </div>
                <div class="text-gray-200 text-sm w-11/12 mb-1 ml-auto mr-auto">{{ $t('assistance.chooseCoherentBuy') }}
                </div>
                <div class="text-primary-color font-bold text-sm mb-2">
             * 請切記這個獎勵要在下個月7號前使用,過期則不可使用
          </div> 
                <div class="w-full flex justify-center items-center mb-4">
                    <div class="w-11/12 flex justify-between items-center">
                        <div v-for="(item, index) in coherentsList" @click="clickCurrentCoherent(item, index)"
                            class="border border-primary-color rounded w-2/12 text-center mb-2 py-1 text-sm text-white"
                            :class="currentCoherent == index ? 'operating-button' : ''">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center w-11/12 mr-auto ml-auto">
                    <!-- <div class="w-5/12 operating-button text-center py-2.5 rounded" @click="handleConfirmBuyForUSDTPOPUP"> -->
                    <div class="w-5/12 border border-primary-color text-center py-2.5 rounded"
                        @click="showBuyPopup = false">
                        取消
                    </div>
                    <div class="w-5/12 operating-button text-center py-2.5 rounded" @click="handleConfirmBuyForRTPOPUP">
                        RT支付
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 生成链接弹窗 -->
        <van-popup v-model:show="showInvitationLinksPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <!-- <div class="text-center mb-6 text-white">请输入上级地址</div> -->
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1"> {{ $t('assistance.inviterAddress') }}</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1">
                        <input type="text" v-model="invitationAddress" :placeholder="$t('assistance.inviterAddress')"
                            class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <!-- <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        {{ $t('coherents.invalidAddress') }}
                    </div> -->
                </div>
                <!-- <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">请填写上级地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1">
                        <input type="text" placeholder="请填写上级地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        {{ $t('coherents.invalidAddress') }}
                    </div>
                </div> -->

                <div class="w-11/12 flex justify-between items-center mr-auto ml-auto">

                    <div class="w-7/12 operating-button text-center py-2.5 rounded" @click="handleCreateInvitationLink">
                        {{ $t('assistance.createInviterLink') }}
                    </div>
                    <div class="w-4/12 border border-gray-700 text-center py-2.5 rounded"
                        @click="toggleInvitationLinksPopup">
                        {{ $t('modalConfirm.cancel') }}
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 邀请链接二维码弹窗 -->
        <van-popup v-model:show="showLinkQRCode" :style="{ padding: '10px', borderRadius: '10px' }">
            <div class="rounded w-full h-full relative flex text-white flex-col justify-center items-center">
                <!-- <div class="flex justify-end items-center pt-2 pr-2">
                    <div class="icon iconfont icon-close1 close" @click="toggleUserInfoPopup"></div>
                </div> -->
                <div class=" text-2xl mb-2 text-black">
                    {{ $t('assistance.inviterLink') }}
                </div>
                <div class="mb-6 bg-white">
                    <qrcode-vue :value="shareLink" logoSrc='../../assets/images/minter-logo-cro.png' :size="size" level="H"
                        id="qrcode" margin="2" />
                </div>
                <div class="w-full flex justify-between items-center text-sm">
                    <div class="w-5/12 operating-button text-center py-2.5 rounded" @click="handleSaveQRCode">
                        {{ $t('assistance.saveQRcode') }}
                    </div>
                    <div class="w-5/12 operating-button text-center py-2.5 rounded" @click="handleCopyLink">
                        {{ $t('assistance.copyLink') }}
                    </div>
                </div>
            </div>
        </van-popup>

        <!-- 点位操作弹窗 -->
        <van-popup v-model:show="showPointOperatingPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-6 text-xs text-white">{{ clickPointInfo.address }}</div>
                <div class="flex justify-start items-center mb-6">
                    <div class="flex flex-col justify-start items-center mr-3 w-11/12" :key="index"
                        v-for="(item, index) in addressOperating" @click="clickOperatingItem(item, index)">
                        <div class="flex justify-center items-center">
                            <div
                                class="rounded-full w-14 h-14 flex justify-center items-center bg-primary-color text-white mb-1">
                                <div class="icon iconfont" :class="item.icon" style="font-size: 26px;"></div>
                            </div>
                        </div>
                        <div class="text-white text-sm">{{ item.title }}</div>
                    </div>

                </div>
                <div class="w-full flex justify-center items-center">
                    <div class="w-11/12 operating-button text-center py-2.5 rounded" @click="showAttendPopup = false">
                        取消
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 帮下级升级点位弹窗 -->
        <van-popup v-model:show="showPointCoherentInfo" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-6 text-white">{{ $t('assistance.buyCoherent') }}</div>
                <div class="text-primary-color font-bold text-sm mb-2">
             * 請切記這個獎勵要在下個月7號前使用,過期則不可使用
          </div> 
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">{{ $t('assistance.currentPointAddress') }}
                    </div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-5">
                        {{ clickPointInfo.address }}
                    </div>
                </div>
                <div class="text-gray-300 text-sm  w-11/12 mb-1 ml-auto mr-auto">{{ $t('assistance.chooseCoherent') }}</div>
                <div class="w-11/12 mr-auto ml-auto flex justify-between items-center mb-4">
                    <div class="flex-1 pr-2 flex items-center">
                        <van-popover v-model:show="showCoherentList" theme="dark" @select="selectPackage" :actions="actions"
                            placement="bottom">
                            <template #reference>
                                <div class="rounded w-full h-8 border border-gray-700 mb-1 px-10 break-words leading-7">
                                    {{ buyPackage.text }}
                                </div>
                            </template>
                        </van-popover>
                    </div>
                    <!-- <div class="rounded-full operating-button text-sm px-2 py-1 mr-2" @click="handleConfirmUpPackage">
                        USD3支付
                    </div> -->
                    <div class="rounded-full operating-button text-sm py-1 px-2 " @click="handleConfirmUpPackage">
                        <!-- {{ $t('modalConfirm.confirm') }} -->
                        RT支付
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">全部PV</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-10">
                        {{ clickPointInfo.allPV }}
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">剩餘PV</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-10">
                        {{ clickPointInfo.remainPV }}
                    </div>
                </div>
                <!-- <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">{{ $t('assistance.left') }}PV</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-10">
                        1000PV
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">{{ $t('assistance.right') }}PV</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-10">
                        1000PV
                    </div>
                </div> -->

                <!-- <div class="w-full flex justify-between items-center">
                    <div class="w-5/12 operating-button text-center py-2.5 rounded-full" @click="showBuyPopup = false">
                        USD3支付
                    </div>
                    <div class="w-5/12 operating-button text-center py-2.5 rounded-full" @click="showBuyPopup = false">
                        RT支付
                    </div>
                </div> -->
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import QrcodeVue from 'qrcode.vue'
import Point from './point.vue';
import PointTwo from './pointTwo.vue';
import DynamicRewards from './DynamicRewards.vue';
import PerformanceCommitmentCard from './PerformanceCommitmentCard.vue'
import coherents_list from '@/datas/coherents_list'
// import { viewSpreads } from '@/request/contract'
import { DownloadImage } from '@/utils/saveImg'
import { CopyText } from '@/utils/copyText'
import { useI18n } from 'vue-i18n';
import { config } from '@/const/config'
import usdtContractApi from '@/request/usdt'
import pmtContractApi from '@/request/pmt'
import { addressLeg, upInferiorPackage, staticRecords, buyCoherent, joinTheThree, buyPackageToNext, updataRTBalance, rtBalance } from '@/request/api'
import { showToast } from 'vant'
import { ZeroAddress, isAddress } from 'ethers'
import Web3 from "web3";


const { t } = useI18n()
const { proxy } = getCurrentInstance()
let isFinishPoint = ref(false)
let active = ref(0)
let showAttendPopup = ref(false)
let showBuyPopup = ref(false)
let showLinkQRCode = ref(false)
let showPointAddressPopup = ref(false)
let showPointCoherentInfo = ref(false)
let showPointOperatingPopup = ref(false)
let showInvitationLinksPopup = ref(false)
let invitationAddress = ref('')
let inviterAddressTwo = ref('')
let shareLink = ref('')
let currentPointInfo = ref()
let helpNextAddress = ref('')
let clickPointInfo = ref({})

let currentSelf = ref(0)
let size = ref(240)
let showBuyPackageSelf = ref(false)
let cardList = ref([])
let attendWays = computed(() => {
    return [{ title: t('assistance.buyDirect'), icon: 'icon-goumai' }, { title: t('assistance.createInviterLink'), icon: 'icon-lianjie' }]
})
let addressOperating = computed(() => {
    return [{ title: t('assistance.pointInfo'), icon: 'icon-Search' }, { title: t('assistance.buyCoherent'), icon: 'icon-shengji' }]
})
let showCoherentList = ref(false)
const actions = ref([
    { text: '200', id: 1 },
    { text: '600', id: 2 },
    { text: '2000', id: 3 },
    // { text: '6000', id: 4 },
    // { text: '20000', id: 5 },
])
const buyPackage = ref({ text: '請選擇配套' })
const pointLsit = ref([{ title: '左' }, { title: '右' }])
let currentPoint = ref(null)
let currentCoherent = ref(null)
const coherentsList = ref(coherents_list)
let directReferrals = ref({})
let searchAddress = ref(null)
onMounted(() => {
    // viewAddressPoint(window.ethereum.selectedAddress)
    // console.log('document.domain', document.domain)
    viewPointMap(localStorage.getItem('address'))
    getStaticRecords()
})

//输入我的地址
function enterSelfAddress() {
    inviterAddressTwo.value = localStorage.getItem('address')
}
//输入上级地址
function enterPreAddress() {
    inviterAddressTwo.value = clickPointInfo.value.preAddress
}
//點擊搜索下級地址
async function handleSearchAddress() {
    if (!searchAddress.value) {
        showToast('請輸入要搜索的下級地址')
        return
    }
    if (searchAddress.value == ZeroAddress || !isAddress(searchAddress.value)) {
        showToast('請輸入有效的下級地址')
        return
    }
    isFinishPoint.value = false
    viewPointMap(searchAddress.value)
}

async function handleBackPreAddress() {
    isFinishPoint.value = false
    viewPointMap(localStorage.getItem('address'))
}
function clickCurrentCoherent(item, index) {
    if (!item.isSale) {
        showToast(t('toast.notYetOpen'))
        return
    }
    currentCoherent.value = index
}
async function handleConfirmBuyForRTPOPUP() {
    //   toggleConfirmPayPopup()
    //判斷rt餘額是否充足
    console.log('用rt幫下級購買package')
    // return
    if (currentCoherent.value == null) {
        showToast('請先選擇要購買的配套')
        return
    }
    toggleBuyPopup()
    proxy.$loading.show()

    let data = { package_id: coherentsList.value[currentCoherent.value].id, address: helpNextAddress.value, legSide: clickPointInfo.value.point, leg_address: clickPointInfo.value.preAddress, referrer_address: inviterAddressTwo.value }
    console.log('幫助購買的下級地址', data, data.address)

    proxy.$loading.hide()
    proxy.$confirm.hide()

    proxy.$confirm.show({
        title: '提示',
        content: `是否確認購買 ${coherentsList.value[currentCoherent.value].type} 配套`,
        showCancelButton: true,
        confirmText: '確定',
        onConfirm: async () => {
            try {
                proxy.$loading.hide()
                buyPackageToNext(data)
                    .then(res => {
                        console.log('購買成功', res)
                        if (res.error) {
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: '購買失敗',
                                content: `${res.error}`,
                                showCancelButton: false,
                                confirmText: '確定',
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
                                title: '餘額不足',
                                content: `當前配套價格為 ${coherentsList.value[currentCoherent.value].type} RT，您的 RT 餘額不足。`,
                                showCancelButton: false,
                                confirmText: '確定',
                                onConfirm: () => {
                                    proxy.$confirm.hide()
                                },
                            });
                            return
                        }
                        if (res.message == "推薦人地址不存在") {
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: '提示',
                                content: `推薦人地址不存在`,
                                showCancelButton: false,
                                confirmText: '確定',
                                onConfirm: () => {
                                    proxy.$confirm.hide()
                                },
                            });
                            return
                        }
                        if (res.message == "Address not found in leg tree") {
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: '購買失敗',
                                content: `對碰地址必須在上級地址的點位圖中`,
                                showCancelButton: false,
                                confirmText: '確定',
                                onConfirm: () => {
                                    proxy.$confirm.hide()

                                },
                            });
                            return
                        }
                        if (!res.player) {
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: '購買失敗',
                                content: `购买失败：该地址已有上级`,
                                showCancelButton: false,
                                confirmText: '確定',
                                onConfirm: () => {
                                    proxy.$confirm.hide()
                                },
                            });
                            return
                        }
                        setTimeout(() => {
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: '購買成功',
                                content: `已成功為下級購買 ${coherentsList.value[currentCoherent.value].type} 配套`,
                                showCancelButton: false,
                                confirmText: '確定',
                                onConfirm: () => {
                                    proxy.$confirm.hide()
                                    proxy.$loading.show()
                                    setTimeout(() => {
                                        proxy.$loading.hide()
                                        let data = {
                                            address: helpNextAddress.value,
                                            leg_address: clickPointInfo.value.preAddress,
                                            legSide: clickPointInfo.value.point
                                        }
                                        joinTheThree(data)
                                            .then(_res => {
                                                isFinishPoint.value = false
                                                viewPointMap(localStorage.getItem('address'))
                                            })
                                    }, 3000)
                                },
                            });
                        }, 8000);
                    })
                    .catch(err => {
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        proxy.$confirm.show({
                            title: '購買失敗',
                            content: `購買 ${coherentsList.value[currentCoherent.value].type} 配套失敗，請重新購買。`,
                            showCancelButton: false,
                            confirmText: '確定',
                            onConfirm: () => {
                                proxy.$confirm.hide()
                                proxy.$loading.show()

                            },
                        });
                    })
            } catch (err) {
                proxy.$loading.hide()
                showToast('購買失敗，請重新購買。')
                toggleBuyPackageSelf()
                console.log(err)
                proxy.$confirm.hide()
            }
        },
        onCacncel: async () => {
            proxy.$confirm.hide()
        }
    });
}

async function handlePopupConfirmBuy() {
    //   toggleConfirmPayPopup()
    //判斷rt餘額是否充足
    toggleBuyPackageSelf()
    proxy.$loading.show()
    // console.log('是否余额不足', await isSufficientRT(coherentsList.value[currentSelf.value].type))
    try {
        if (!await isSufficientRT(coherentsList.value[currentSelf.value].type)) {
            proxy.$loading.hide()
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: '餘額不足',
                content: `當前配套價格為 ${coherentsList.value[currentSelf.value].type} RT，您的 RT 餘額不足。`,
                showCancelButton: false,
                confirmText: '確定',
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
            title: '錯誤',
            content: `獲取RT餘額失敗，請重試`,
            showCancelButton: false,
            confirmText: '確定',
            onConfirm: () => {
                proxy.$confirm.hide()
            },
        });
        return
    }

    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: '提示',
        content: `是否確認購買 ${coherentsList.value[currentSelf.value].type} 配套`,
        showCancelButton: true,
        confirmText: '確定',
        onConfirm: async () => {
            try {
                let data = { package_id: coherentsList.value[currentSelf.value].id }
                buyCoherent(data)
                    .then(res => {
                        console.log(res)
                        setTimeout(() => {
                            // showToast(res.message)
                            if (res.error) {
                                proxy.$confirm.hide()
                                proxy.$confirm.show({
                                    title: '購買失敗',
                                    content: `${res.error}`,
                                    showCancelButton: false,
                                    confirmText: '確定',
                                    onConfirm: () => {
                                        proxy.$confirm.hide()

                                    },
                                });
                                return
                            }
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: '提示',
                                content: `成功購買購買 ${coherentsList.value[currentSelf.value].type} 配套`,
                                showCancelButton: false,
                                confirmText: '確定',
                                onConfirm: () => {
                                    proxy.$confirm.hide()
                                    updataRTBalance(localStorage.getItem('address'))
                                        .then(_res => {
                                            console.log('更新rt餘額', _res)
                                            // console.log('購買成功', _res)
                                            proxy.$loading.hide()
                                            proxy.$confirm.hide()
                                            // showToast('購買成功')
                                        })
                                        .catch(err => {
                                            console.log('更新rt餘額失敗', err)
                                        })
                                }
                            })
                        }, 3000);
                    })
                    .catch(err => {
                        proxy.$confirm.hide()
                        proxy.$loading.hide()
                        console.log('購買失敗', err)
                        showToast('購買失敗')
                        toggleBuyPackageSelf()

                    })
            } catch (err) {
                proxy.$loading.hide()
                showToast('購買失敗，請重新購買。')
                toggleBuyPackageSelf()
                console.log(err)
                proxy.$confirm.hide()
            }
        },
    });
}


async function handleConfirmBuyForUSDTPOPUP() {
    toggleBuyPopup()
    console.log('用usd3幫下級購買package')
    proxy.$loading.show()
    // let data = { package_id: coherentsList.value[currentCoherent.value].id }
    let allowance
    try { //检查usdt对pmt_purchase的授权状态
        allowance = await usdtContractApi.allowance(localStorage.getItem('address'), config.pmt_purchase_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast('檢查USD3授權失敗，請重試')
        console.log(err)
    }
    console.log('allowance', allowance)

    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '需要進行USD3授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                proxy.$loading.show()
                // usdt对pmt授權
                usdtContractApi.approve(config.pmt_purchase_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$loading.hide()
                        showToast(t('toast.success'))
                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$loading.hide()
                        showToast('授權失敗，請重試')
                    })
            },
        });
        return
    }
    try {
        proxy.$loading.show()
        isFinishPoint.value = false
        await pmtContractApi.purchasePackage(coherentsList.value[currentCoherent.value].id - 1)
        viewPointMap(localStorage.getItem('address'))
        // await joinTheThree(data)
        proxy.$loading.hide()
        showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast('購買失敗，請重新購買')
        toggleBuyPackageSelf()
        console.log(err)
    }
}

//判断rt余额是否充足
async function isSufficientRT(amount) {
    try {
        let balance = await rtBalance({ address: localStorage.getItem('address') })
        // balance = parseInt(balance)
        balance = balance.player
        balance = balance.rt
        console.log('rt餘額', balance)
        console.log('rt餘額', parseInt(balance))
        return Number(amount).toFixed(0) <= parseInt(balance)
    } catch (err) {
        console.log(err)
    }
}

//判斷usdt餘額是否充足
async function isSufficientUSD3(amount) {
    let balance = await usdtContractApi.balanceOf(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    balance = WEB3.utils.fromWei(balance.toString(), 'ether')
    balance = parseInt(balance)
    console.log('u餘額', balance)
    return Number(amount).toFixed(0) <= balance
}

async function handleConfirmBuyForUSDT() {
    toggleBuyPackageSelf()
    proxy.$loading.show()
    try {
        if (!await isSufficientUSD3(coherentsList.value[currentSelf.value].type)) {
            proxy.$loading.hide()
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: '餘額不足',
                content: `當前配套價格為 ${coherentsList.value[currentSelf.value].type} USD3，您的 USD3 餘額不足。`,
                showCancelButton: false,
                confirmText: '確定',
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
            title: '錯誤',
            content: `獲取USD3餘額失敗，請重試`,
            showCancelButton: false,
            confirmText: '確定',
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
        showToast('檢查USD3授權失敗，請重試')
        console.log(err)
    }
    console.log('allowance', allowance)

    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '需要進行USD3授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                proxy.$loading.show()
                // usdt对pmt授權
                usdtContractApi.approve(config.pmt_purchase_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        showToast(t('toast.success'))
                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        showToast('授權失敗，請重試')
                    })
            },
        });
        return
    }
    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: '提示',
        content: `是否確認購買 ${coherentsList.value[currentSelf.value].type} 配套`,
        showCancelButton: true,
        confirmText: '確定',
        onConfirm: async () => {
            try {
                proxy.$loading.hide()
                isFinishPoint.value = false
                await pmtContractApi.purchasePackage(coherentsList.value[currentSelf.value].id - 1)
                viewPointMap(localStorage.getItem('address'))
                proxy.$confirm.hide()
                showToast('購買成功。')
            } catch (err) {
                proxy.$loading.hide()
                showToast('購買失敗，請重新購買。')
                toggleBuyPackageSelf()
                console.log(err)
                proxy.$confirm.hide()
            }
        },
        // onCacncel: async () => {
        //     proxy.$confirm.hide()
        // }
    });
}
function handleBuyPackageSelf(item, index) {
    if (!item.isSale) {
        showToast(t('toast.notYetOpen'))
        return
    }
    currentSelf.value = index
}
//显示隐藏自己购买package弹窗
function toggleBuyPackageSelf() {
    showBuyPackageSelf.value = !showBuyPackageSelf.value
}
function getStaticRecords() {
    proxy.$loading.show()
    let params = { prize_type_id: 3, perPage: 100000 }
    staticRecords(params)
        .then(res => {
            console.log(res)
            proxy.$loading.hide()
            cardList.value = res.records
            cardList.value.map(item => {
                item.showMore = false
            })
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()

        })
}
//查看某個地址下的點位圖
function viewPointMap(address) {
    proxy.$loading.show()
    addressLeg(address)
        .then(res => {
            console.log('點位圖', res)
            if (res.message.address && res.message.address.length == 1) {
                proxy.$loading.hide()
                proxy.$confirm.hide()
                isFinishPoint.value = true
                proxy.$confirm.show({
                    title: '提示',
                    content: `您無法查詢不在您點位圖內的地址信息`,
                    showCancelButton: false,
                    confirmText: '確定',
                    onConfirm: async () => {
                        proxy.$confirm.hide()
                    }
                })
                return
            }
            if (res.message == '所檢示的地址不是自己的下級。') {
                proxy.$loading.hide()
                proxy.$confirm.hide()
                isFinishPoint.value = true
                proxy.$confirm.show({
                    title: '提示',
                    content: `所檢示的地址不是自己的下級。`,
                    showCancelButton: false,
                    confirmText: '確定',
                    onConfirm: async () => {
                        proxy.$confirm.hide()
                    }
                })
                return
            }

            directReferrals.value = res.directReferrals
            proxy.$loading.hide()
            isFinishPoint.value = true
        })
        .catch(err => {
            proxy.$loading.hide()
            isFinishPoint.value = true
            console.log(err)
        })
}
//點擊幫下級升級配套按鈕
function handleConfirmUpPackage() {
    console.log(buyPackage.value)
    if (!buyPackage.value.id) {
        showToast('請先選擇要購買的配套')
        return
    }
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: '提示',
        content: `是否確認将下级配套升级为 ${buyPackage.value.text} 配套`,
        showCancelButton: true,
        confirmText: '確定',
        onConfirm: async () => {

            let params = { address: clickPointInfo.value.address, package_id: buyPackage.value.id }
            // proxy.$loading.show()
            upInferiorPackage(params)
                .then(res => {
                    let tipContent
                    if (res.error) {
                        proxy.$confirm.hide()
                        proxy.$confirm.show({
                            title: '購買失敗',
                            content: `${res.error}`,
                            showCancelButton: false,
                            confirmText: '確定',
                            onConfirm: () => {
                                proxy.$confirm.hide()

                            },
                        });
                        return
                    }
                    if (res.message == "RT餘額不足") {
                        proxy.$confirm.hide()

                        proxy.$confirm.show({
                            title: '失败',
                            content: `RT余额不足，无法购买 ${buyPackage.value.text} 配套`,
                            showCancelButton: false,
                            confirmText: '確定',
                            onConfirm: () => {
                                proxy.$confirm.hide()
                                proxy.$loading.hide()

                            },
                        });
                        return
                    }

                    setTimeout(() => {
                        proxy.$confirm.hide()
                        proxy.$confirm.show({
                            title: '成功',
                            content: `成功将下级配套升级为 ${buyPackage.value.text} 配套`,
                            showCancelButton: false,
                            confirmText: '確定',
                            onConfirm: () => {
                                proxy.$confirm.hide()
                                proxy.$loading.hide()
                                showPointCoherentInfo.value = false
                            },
                        });
                    }, 3000);

                })
                .catch(err => {
                    proxy.$loading.hide()
                    proxy.$confirm.hide()
                    proxy.$confirm.show({
                        title: '失败',
                        content: `将下级配套升级为 ${buyPackage.value.text} 配套失败，请重试`,
                        showCancelButton: false,
                        confirmText: '確定',
                        onConfirm: () => {
                            proxy.$confirm.hide()

                        },
                    });
                })
        },
        onCacncel: async () => {
            proxy.$confirm.hide()
        }
    });


}
//选择配套
function selectPackage(action) {
    console.log(action)
    buyPackage.value = action
}
//点击保存二维码按钮
function handleSaveQRCode() {
    let qrcode = document.getElementById("qrcode")//获取到页面的元素
    let imgBASE64 = qrcode.toDataURL('image/png')
    console.log(qrcode.toDataURL('image/png'))
    // canvas.toDataURL(type, encoderOptions);
    DownloadImage(imgBASE64, '邀请链接QR码')
    toggleLinkPopup()
    // DownloadImage()
}
//复制二维码链接
async function handleCopyLink() {
    await CopyText(shareLink.value)
    toggleLinkPopup()
}
//点击生成邀请链接按钮
function handleCreateInvitationLink() {
    console.log(clickPointInfo.value)
    let shareLinkStr = `${window.location.origin}/market/invite-buy-package?inviter=${invitationAddress.value}&pre=${clickPointInfo.value.preAddress}&point=${clickPointInfo.value.point}`
    console.log(shareLinkStr)

    // return
    shareLink.value = shareLinkStr
    toggleInvitationLinksPopup()
    toggleLinkPopup()
}
//显示隐藏生成邀请链接弹窗
function toggleInvitationLinksPopup() {
    showInvitationLinksPopup.value = !showInvitationLinksPopup.value
}
//点击地址操作面板操作按钮
function clickOperatingItem(item, index) {
    if (index == 0) {
        viewPointMap(clickPointInfo.value.address)
        toggleAddressOfPoint()
        // viewAddressPoint()
    } else {
        showPointCoherentInfo.value = !showPointCoherentInfo.value
        toggleAddressOfPoint()
    }
}
//显示隐藏当前点位配套信息
function togglePointCoherentInfo() {
    showPointAddressPopup.value = !showPointAddressPopup.value
}
//点击已有地址的点位
function clickAddressOfPoint() {
    toggleAddressOfPoint()
}
//显示隐藏已有点位的地址操作弹窗
function toggleAddressOfPoint() {
    showPointOperatingPopup.value = !showPointOperatingPopup.value
}
//选择邀请方式，直接购买或者邀请链接
function handleAttendItem(item, index) {
    toggleAttendPopup()
    if (index == 0) {
        toggleBuyPopup()
    } else if (index == 1) {
        toggleInvitationLinksPopup()
    }
}
//显示隐藏邀请链接弹窗
function toggleLinkPopup() {
    showLinkQRCode.value = !showLinkQRCode.value
}
//显示隐藏购买配套的弹窗
function toggleBuyPopup() {
    showBuyPopup.value = !showBuyPopup.value
}

//點擊架構圖點位查看點位圖
function checkPoint(address) {
    active.value = 0
    viewPointMap(address)
}

//点击点位图点位
function clickPoint(pointInfo) {
    // toggleAttendPopup()
    clickPointInfo.value = pointInfo
    console.log('點位信息', pointInfo)
    if (!pointInfo.preAddress && pointInfo.address !== localStorage.getItem('address') && !pointInfo.address) {
        showToast('請先將點位佈置在上一級')
        return
    }
    if (pointInfo.address == localStorage.getItem('address')) {
        console.log('自己')
        toggleBuyPackageSelf()
        return
    }

    if (pointInfo.address) {
        toggleAddressOfPoint()
    } else {
        toggleAttendPopup()
    }

}
//显示隐藏邀请方式弹窗
function toggleAttendPopup() {
    showAttendPopup.value = !showAttendPopup.value
}
//查找當前地址點位圖
// function viewAddressPoint(walletAddress) {
//     viewSpreads(walletAddress)
//         .then(res => {
//             console.log('res', res)
//         })
//         .catch(err => {
//             console.log('err', err)
//         })
// }

//顯示更多
function toggleShowMore(item, index) {
    item.showMore = !item.showMore
    console.log(item, index)
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;

}
</style>