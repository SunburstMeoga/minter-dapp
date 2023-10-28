<template>
    <div class="flex flex-col justify-start items-center bg-black pb-20">
        <div class="w-11/12 mb-4 mt-4">
            <module-title titleWord="配套信息" />
        </div>
        <div class="w-11/12">
            <div class="flex justify-between items-center flex-wrap">
                <div style="width: 48%;" class="mb-4" v-for="(item, index) in coherentsList" :key="index">
                    <coherent-info-card @handleBuy="handleBuy(item)" :levelImg="item.levelImg" :price="item.price"
                        :limit="item.limit" />
                </div>
            </div>
        </div>
        <van-popup v-model:show="showBuyPopup" round>
            <div class="bg-black border border-black flex flex-col items-center w-full pb-4 text-white">
                <div class="w-full px-24 py-4 border-b border-gray-600 mb-4">
                    <img :src="coherentInfo.levelImg" alt="">
                </div>
                <div class="flex justify-between items-center w-11/12 mb-2">
                    <div>售价</div>
                    <div class="font-bold text-red-500">$ {{ coherentInfo.price }}</div>
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
                <div class="w-11/12 operating-button text-center py-2 rounded-full" @click="handleConfirmBuy">确认购买</div>
            </div>
        </van-popup>
        <van-popup v-model:show="showBottomPopup" round position="bottom">
            <div class="bg-black border border-black flex flex-col items-center w-full pb-4 text-white">
                <div class="w-full flex justify-center py-4 mb-4">
                    <img :src="coherentInfo.levelImg" alt="">
                </div>
                <div class="w-full">
                    <div class="w-full flex flex-col items-center mb-2" v-for="(item, index) in addressList" :key="index">
                        <div class="text-gray-200 text-sm text-left w-11/12 mb-1">{{ item.title }}</div>
                        <div class="rounded overflow-hidden w-11/12 h-11 border border-gray-500 mb-1 pl-2">
                            <input type="text" name="" :placeholder="item.placeholder" class="w-full h-full bg-black"
                                @blur="directMarketing(index)">
                        </div>
                        <div v-show="isNoEffectAddr && currentEnter == index"
                            class="text-red-500 text-xs text-left w-11/12 mb-1 animate__animated"
                            :class="isNoEffectAddr && currentEnter == index ? 'animate__shakeX' : ''">該地址為無效地址
                        </div>
                    </div>
                </div>

                <div class="text-gray-200 text-sm text-left w-11/12 mb-2">請選擇上級地址的左右點位</div>
                <div class="w-11/12 flex justify-between items-center mb-6">
                    <div @click="currentPoint = index" class="w-5/12 rounded py-1.5 text-center border border-primary-color"
                        :class="currentPoint == index ? 'operating-button text-white' : 'text-primary-color '"
                        v-for="(item, index) in pointLsit" :key="index">
                        {{ item.title }}
                    </div>
                </div>
                <div class="w-11/12 operating-button text-center py-2 rounded-full" @click="toggleBottomPopup">确认购买</div>

            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'

import ModuleTitle from "../../components/ModuleTitle.vue";
import coherentInfoCard from "./coherentInfoCard.vue";
import levelN from '@/assets/images/coherent-n.png';
import levelR from '@/assets/images/coherent-r.png';
import levelSR from '@/assets/images/coherent-sr.png';
import levelSSR from '@/assets/images/coherent-ssr.png';
import levelUR from '@/assets/images/coherent-ur.png';

import { erc20ApproveState, erc20Approve, buyCoherent } from '@/request/contract.js'
import { showToast } from 'vant';

const { proxy } = getCurrentInstance()
const levelNimg = ref(levelN)
const levelRimg = ref(levelR)
const levelSRimg = ref(levelSR)
const levelSSRimg = ref(levelSSR)
const levelURimg = ref(levelUR)
let showBuyPopup = ref(false)
let showBottomPopup = ref(false)
const coherentsList = ref([
    {
        name: 'N',
        levelImg: levelNimg,
        price: '200',
        limit: '200',
        isSale: true
    },
    {
        name: 'R',
        levelImg: levelRimg,
        price: '600',
        limit: '200',
        isSale: true
    },
    {
        name: 'SR',
        levelImg: levelSRimg,
        price: '2000',
        limit: '200',
        isSale: true
    },
    {
        name: 'SSR',
        levelImg: levelSSRimg,
        price: '6000',
        limit: '200',
        isSale: false
    },
    {
        name: 'UR',
        levelImg: levelURimg,
        price: '20000',
        limit: '200',
        isSale: false
    }
])
let coherentInfo = ref({})
let isNoEffectAddr = ref(false)
let currentEnter = ref(null)
let isRT = ref(false)
const pointLsit = ref([{ title: '左' }, { title: '右' }])
let addressList = computed(() => {
    return [{ title: '直推地址', placeholder: '請填寫直推地址' }, { title: '上級地址', placeholder: '請填寫上級地址' }]
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
function handleConfirmBuy() {
    toggleBuyPopup()
    toggleBottomPopup()
}

//检查erc20授权状态
async function checkERC20ApproveState(walletAddress) {
    let approveState = await erc20ApproveState(walletAddress)
    console.log('授權狀態', approveState)
    return approveState
}

async function handleBuy(item) {
    console.log('click button')
    coherentInfo.value = item
    console.log(window.ethereum.selectedAddress)
    if (!currentPoint.value) {
        showToast('請選擇點位')
        return
    }
    let coherentInfoObj = {
        coherentType: coherentInfo.value.price,
        isRT: isRT.value,
        directSuperior: directSuperior.value,
        meetWithSuperiors: meetWithSuperiors.value,
        isLeft: currentPoint.value == 0 ? true : false
    }
    // return
    let approveState = await checkERC20ApproveState(window.ethereum.selectedAddress)
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
    // toggleBuyPopup()
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

<style>
.van-overlay {
    backdrop-filter: blur(5px);
}
</style>