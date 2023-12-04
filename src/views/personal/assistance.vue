<template>
    <div class="pt-2 text-primary-color">
        <van-tabs class="pt-2 bg-black " v-model:active="active" sticky shrink animated swipeable color="#e149ed"
            title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
            <van-tab title="点位图(双轨制)">
                <point @clickPoint="clickPoint" />
            </van-tab>
            <van-tab title="架构图(直接推荐)">
                <point-two @clickPoint="clickPoint" />
            </van-tab>
            <van-tab title="动态奖励">
                <dynamic-rewards />
            </van-tab>
            <van-tab title="承诺卡">
                <div class="flex flex-col justify-start items-center mt-4">
                    <div class="w-11/12 mb-2" v-for="(item, index) in cardList" :key="index">
                        <performance-commitment-card @toggleShowMore="toggleShowMore(item, index)"
                            :showMore="item.showMore" />
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <!-- 邀请方式弹窗 -->
        <van-popup v-model:show="showAttendPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-6 text-white">请选择邀请方式</div>
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
                        取消
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 直接购买弹窗 -->
        <van-popup v-model:show="showBuyPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <!-- <div class="text-center mb-6 text-white">请输入上级地址</div> -->
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">请填写邀请人地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1 pl-2">
                        <input type="text" placeholder="请输入邀请人地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        該地址為無效地址
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">请填写上级地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1 pl-2">
                        <input type="text" placeholder="请填写上级地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        該地址為無效地址
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">请填写下级地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1 pl-2">
                        <input type="text" placeholder="请填写下级地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        該地址為無效地址
                    </div>
                </div>
                <div class="text-gray-200 text-sm w-11/12 mb-1 ml-auto mr-auto">选择配套购买</div>
                <div class="w-full flex justify-center items-center mb-4">
                    <div class="w-11/12 flex justify-between items-center">
                        <div v-for="(item, index) in coherentsList" @click="currentCoherent = index"
                            class="border border-primary-color rounded w-2/12 text-center mb-2 py-1 text-sm text-white"
                            :class="currentCoherent == index ? 'operating-button' : ''">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center w-11/12 mr-auto ml-auto">
                    <div class="w-5/12 operating-button text-center py-2.5 rounded" @click="showBuyPopup = false">
                        确认
                    </div>
                    <div class="w-5/12 border border-gray-700 text-center py-2.5 rounded" @click="showBuyPopup = false">
                        取消
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 生成链接弹窗 -->
        <van-popup v-model:show="showInvitationLinksPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <!-- <div class="text-center mb-6 text-white">请输入上级地址</div> -->
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">请填写邀请人地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1 pl-2">
                        <input type="text" placeholder="请输入邀请人地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        該地址為無效地址
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">请填写上级地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-700 mb-1 pl-2">
                        <input type="text" placeholder="请填写上级地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        該地址為無效地址
                    </div>
                </div>

                <div class="w-11/12 flex justify-between items-center mr-auto ml-auto">

                    <div class="w-7/12 operating-button text-center py-2.5 rounded" @click="handleCreateInvitationLink">
                        生成邀请链接
                    </div>
                    <div class="w-4/12 border border-gray-700 text-center py-2.5 rounded"
                        @click="toggleInvitationLinksPopup">
                        取消
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 邀请链接弹窗 -->
        <van-popup v-model:show="showLinkQRCode" :style="{ padding: '10px', borderRadius: '10px' }">
            <div class="rounded w-full h-full relative flex text-white flex-col justify-center items-center">
                <!-- <div class="flex justify-end items-center pt-2 pr-2">
                    <div class="icon iconfont icon-close1 close" @click="toggleUserInfoPopup"></div>
                </div> -->
                <div class=" text-2xl mb-2 text-black">
                    邀请链接
                </div>
                <div class="mb-6 bg-white">
                    <qrcode-vue value="http://localhost:5173/personal/assistance"
                        logoSrc='../../assets/images/minter-logo-cro.png' :size="size" level="H" id="qrcode" margin="2" />
                </div>
                <div class="w-full flex justify-between items-center text-sm">
                    <div class="w-5/12 operating-button text-center py-2.5 rounded" @click="handleSaveQRCode">
                        保存二维码
                    </div>
                    <div class="w-5/12 operating-button text-center py-2.5 rounded" @click="handleCopyLink">
                        复制邀请链接
                    </div>
                </div>
            </div>
        </van-popup>

        <!-- 点位操作弹窗 -->
        <van-popup v-model:show="showPointOperatingPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-6 text-xs text-white">0x83906217A773022db1aDe203292B957961e67d1B</div>
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
        <!-- 点位配套信息弹窗 -->
        <van-popup v-model:show="showPointCoherentInfo" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-6 text-white">购买配套</div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">当前点位地址</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-5">
                        {{ currentPointInfo.address }}
                    </div>
                </div>
                <div class="text-gray-300 text-sm  w-11/12 mb-1 ml-auto mr-auto">选择配套</div>
                <div class="w-11/12 mr-auto ml-auto flex justify-between items-center mb-4">
                    <div class="flex-1 pr-2">
                        <van-popover v-model:show="showCoherentList" theme="dark" :actions="actions" placement="bottom">
                            <template #reference>
                                <div class="rounded w-full h-8 border border-gray-700 mb-1 px-10 break-words leading-7">
                                    200
                                </div>
                            </template>
                        </van-popover>
                    </div>
                    <div class="rounded operating-button h-8 leading-8 px-2">
                        确认购买
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">当前点位pv</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-10">
                        100
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">当前下级左PV</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-10">
                        1000PV
                    </div>
                </div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-300 text-sm text-left w-11/12 mb-1">当前下级右PV</div>
                    <div class="rounded w-11/12 h-11 border border-gray-700 mb-1 px-1 break-words leading-10">
                        1000PV
                    </div>
                </div>

                <!-- <div class="w-full flex justify-center items-center">
                    <div class="w-11/12 operating-button text-center py-2.5 rounded" @click="showBuyPopup = false">
                        确认
                    </div>
                </div> -->
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import Point from './point.vue';
import PointTwo from './pointTwo.vue';

import DynamicRewards from './DynamicRewards.vue';
import PerformanceCommitmentCard from './PerformanceCommitmentCard.vue'
import coherents_list from '@/datas/coherents_list'
import { viewSpreads } from '@/request/contract'
import { DownloadImage } from '@/utils/saveImg'
import { CopyText } from '@/utils/copyText'

let active = ref(0)
let showAttendPopup = ref(false)
let showBuyPopup = ref(false)
let showLinkQRCode = ref(false)
let showPointAddressPopup = ref(false)
let showPointCoherentInfo = ref(false)
let showPointOperatingPopup = ref(false)
let showInvitationLinksPopup = ref(false)
let currentPointInfo = ref({ address: '0x83906217A773022db1aDe203292B957961e67d1B' })
let size = ref(240)
let cardList = ref([{ showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }])
let attendWays = ref([{ title: '直接购买', icon: 'icon-goumai' }, { title: '生成邀请链接', icon: 'icon-lianjie' }])
let addressOperating = ref([{ title: '查看点位信息', icon: 'icon-Search' }, { title: '购买配套', icon: 'icon-shengji' }])
let showCoherentList = ref(false)
const actions = ref([
    { text: '200' },
    { text: '600' },
    { text: '2000' },
    { text: '6000' },
    { text: '20000' },
])

const pointLsit = ref([{ title: '左' }, { title: '右' }])
let currentPoint = ref(null)
let currentCoherent = ref(null)
const coherentsList = ref(coherents_list)

onMounted(() => {
    viewAddressPoint(window.ethereum.selectedAddress)
})
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
    await CopyText('http://localhost:5173/personal/assistance')
    toggleLinkPopup()

}
//点击生成邀请链接按钮
function handleCreateInvitationLink() {
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
        toggleAddressOfPoint()
        viewAddressPoint()
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
//点击点位图点位
function clickPoint(haveAddress) {
    // toggleAttendPopup()
    console.log('是否拥有点位', haveAddress)
    if (haveAddress) {
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
function viewAddressPoint(walletAddress) {
    viewSpreads(walletAddress)
        .then(res => {
            console.log('res', res)
        })
        .catch(err => {
            console.log('err', err)
        })
}

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