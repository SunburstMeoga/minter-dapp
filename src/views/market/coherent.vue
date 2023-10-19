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
                <div class="w-11/12 operating-button text-center py-2 rounded-full" @click="toggleBuyPopup">确认购买</div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import ModuleTitle from "../../components/ModuleTitle.vue";
import coherentInfoCard from "./coherentInfoCard.vue";
import levelN from '@/assets/images/coherent-n.png';
import levelR from '@/assets/images/coherent-r.png';
import levelSR from '@/assets/images/coherent-sr.png';
import levelSSR from '@/assets/images/coherent-ssr.png';
import levelUR from '@/assets/images/coherent-ur.png';

const levelNimg = ref(levelN)
const levelRimg = ref(levelR)
const levelSRimg = ref(levelSR)
const levelSSRimg = ref(levelSSR)
const levelURimg = ref(levelUR)
let showBuyPopup = ref(false)
const coherentsList = ref([{ name: 'N', levelImg: levelNimg, price: '200', limit: '200' }, { name: 'R', levelImg: levelRimg, price: '200', limit: '200' }, { name: 'SR', levelImg: levelSRimg, price: '200', limit: '200' }, { name: 'SSR', levelImg: levelSSRimg, price: '200', limit: '200' }, { name: 'UR', levelImg: levelURimg, price: '200', limit: '200' }])
let coherentInfo = ref({})
function toggleBuyPopup() {
    showBuyPopup.value = !showBuyPopup.value
}

function handleBuy(item) {
    console.log('click button')
    coherentInfo.value = item
    toggleBuyPopup()
}
</script>

<style>
.van-overlay {
    backdrop-filter: blur(5px);
}
</style>