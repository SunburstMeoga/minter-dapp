<template>
    <div class="pt-2 text-primary-color">
        <van-tabs class="pt-2 bg-black h-screen w-screen" v-model:active="active" shrink animated swipeable color="#e149ed"
            title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
            <van-tab title="点位图">
                <point @clickPoint="clickPoint" />
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
                <div class="text-center mb-6 text-white">请输入上级地址</div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">上级地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-500 mb-1 pl-2">
                        <input type="text" placeholder="请输入上级地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        該地址為無效地址
                    </div>
                </div>
                <div class="text-gray-200 text-sm  w-11/12 mb-1 ml-auto mr-auto">点位</div>
                <div class="w-full flex justify-center items-center mb-4">
                    <div class="w-11/12 flex justify-between items-center">
                        <div v-for="(item, index) in pointLsit" @click="currentPoint = index"
                            class="border border-primary-color rounded py-2 w-5/12 text-center mb-2 text-white"
                            :class="currentPoint == index ? 'operating-button' : ''">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
                <div class="text-gray-200 text-sm w-11/12 mb-1 ml-auto mr-auto">购买的配套等级</div>
                <div class="w-full flex justify-center items-center mb-4">
                    <div class="w-11/12 flex justify-between items-center">
                        <div v-for="(item, index) in coherentsList" @click="currentCoherent = index"
                            class="border border-primary-color rounded w-2/12 text-center mb-2 py-1 text-sm text-white"
                            :class="currentCoherent == index ? 'operating-button' : ''">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center items-center">
                    <div class="w-11/12 operating-button text-center py-2.5 rounded" @click="showBuyPopup = false">
                        确认
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- 邀请链接二维码 -->
        <van-popup v-model:show="showLinkQRCode" :style="{ padding: '6px' }">
            <div class=" w-full h-full relative flex text-white flex-col justify-center items-center">
                <!-- <div class="flex justify-end items-center pt-2 pr-2">
                    <div class="icon iconfont icon-close1 close" @click="toggleUserInfoPopup"></div>
                </div> -->
                <div class=" text-2xl mb-2 text-black">
                    邀请链接QR碼
                </div>
                <div class="p-2 bg-white">
                    <qrcode-vue value="http://localhost:5173/personal/assistance" :size="size" level="H" />
                </div>
                <!-- <div class="w-full flex justify-center items-center">
                    <div class="w-11/12 operating-button text-center py-2.5 rounded" @click="showLinkQRCode = false">
                        确认
                    </div>
                </div> -->
            </div>
        </van-popup>
        <!-- 点位操作弹窗 -->
        <van-popup v-model:show="showPointOperatingPopup" round position="bottom">
            <div class="bg-bottom-content text-white py-4 flex flex-col justify-center">
                <!-- <div class="text-center mb-6 text-white"></div> -->
                <div class="flex justify-start items-center mb-6">
                    <div class="flex flex-col justify-start items-center mr-3 w-11/12" :key="index"
                        @click="showPointCoherentInfo = true">
                        <div class="flex justify-center items-center">
                            <div
                                class="rounded-full w-14 h-14 flex justify-center items-center bg-primary-color text-white mb-1">
                                <div class="icon iconfont icon-goumai" style="font-size: 26px;"></div>
                            </div>
                        </div>
                        <div class="text-white text-sm">查看当前地址信息</div>
                    </div>
                    <div class="flex flex-col justify-start items-center mr-3 w-11/12" :key="index"
                        @click="showPointCoherentInfo = true">
                        <div class="flex justify-center items-center">
                            <div
                                class="rounded-full w-14 h-14 flex justify-center items-center bg-primary-color text-white mb-1">
                                <div class="icon iconfont icon-goumai" style="font-size: 26px;"></div>
                            </div>
                        </div>
                        <div class="text-white text-sm">升级配套</div>
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
                <div class="text-center mb-6 text-white">请输入上级地址</div>
                <div class="w-full flex flex-col items-center mb-2">
                    <div class="text-gray-200 text-sm text-left w-11/12 mb-1">上级地址</div>
                    <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-500 mb-1 pl-2">
                        <input type="text" placeholder="请输入上级地址" class="w-full h-full bg-bottom-content rounded">
                    </div>
                    <div class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated animate__shakeX">
                        該地址為無效地址
                    </div>
                </div>
                <div class="text-gray-200 text-sm  w-11/12 mb-1 ml-auto mr-auto">点位</div>
                <div class="w-full flex justify-center items-center mb-4">
                    <div class="w-11/12 flex justify-between items-center">
                        <div v-for="(item, index) in pointLsit" @click="currentPoint = index"
                            class="border border-primary-color rounded py-2 w-5/12 text-center mb-2 text-white"
                            :class="currentPoint == index ? 'operating-button' : ''">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
                <div class="text-gray-200 text-sm w-11/12 mb-1 ml-auto mr-auto">购买的配套等级</div>
                <div class="w-full flex justify-center items-center mb-4">
                    <div class="w-11/12 flex justify-between items-center">
                        <div v-for="(item, index) in coherentsList" @click="currentCoherent = index"
                            class="border border-primary-color rounded w-2/12 text-center mb-2 py-1 text-sm text-white"
                            :class="currentCoherent == index ? 'operating-button' : ''">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-center items-center">
                    <div class="w-11/12 operating-button text-center py-2.5 rounded" @click="showBuyPopup = false">
                        确认
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import Point from './point.vue';
import DynamicRewards from './DynamicRewards.vue';
import PerformanceCommitmentCard from './PerformanceCommitmentCard.vue'
import coherents_list from '@/datas/coherents_list'
import { viewSpreads } from '@/request/contract'

let active = ref(0)
let showAttendPopup = ref(false)
let showBuyPopup = ref(false)
let showLinkQRCode = ref(false)
let showPointAddressPopup = ref(false)
let showPointCoherentInfo = ref(false)
let showPointOperatingPopup = ref(false)
let size = ref(240)
let cardList = ref([{ showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }])
let attendWays = ref([{ title: '直接购买', icon: 'icon-goumai' }, { title: '生成邀请链接', icon: 'icon-lianjie' }])
const pointLsit = ref([{ title: '左' }, { title: '右' }])
let currentPoint = ref(null)
let currentCoherent = ref(null)
const coherentsList = ref(coherents_list)

onMounted(() => {
    viewAddressPoint(window.ethereum.selectedAddress)
})
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
        toggleLinkPopup()
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
function clickPoint() {
    // toggleAttendPopup()
    console.log('ssssss')
    toggleAddressOfPoint()
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