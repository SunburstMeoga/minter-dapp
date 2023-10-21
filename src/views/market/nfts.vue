<template>
    <div class="text-primary-color bg-black">
        <div class="pt-2 bg-black">
            <div class="w-11/12 mr-auto ml-auto mt-4">
                <module-title titleWord="NFTs" />
            </div>
            <div class="border-b border-gray-700">
                <van-tabs class="pt-2 bg-black" v-model:active="active" animated swipeable color="#e149ed"
                    title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
                    <van-tab title="N">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" showBuyButton @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="R">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" showBuyButton @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" showBuyButton @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SSR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="UR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" showBuyButton @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <van-popup v-model:show="showPrizePopup" round>

            <div class="bg-black border border-black flex flex-col items-center w-full py-4 px-2 text-white">
                <div class="mb-4">
                    <LuckyWheel ref="myLucky" width="300px" height="300px" :prizes="prizes" :blocks="blocks"
                        :buttons="buttons" @start="startCallback" @end="endCallback" />
                </div>
                <div v-if="isPrized" class="text-white">
                    <div>
                        <div class="">
                            恭喜您抽中了{{ prizes[currentPrize].fonts[0].text }}
                        </div>
                        <div class="">
                            币种: {{ prizes[currentPrize].fonts[0].currency }}
                        </div>
                        <div class="">
                            收益率: <span>{{ prizes[currentPrize].fonts[0].corridor.join(',') }}</span>
                        </div>
                        <div v-show="currentPrize == 2">
                            已开始加速
                        </div>
                        <div v-show="currentPrize == 0">
                            卡价格由10.00升级为11.00
                        </div>
                        <div class="" v-show="currentPrize == 0 || currentPrize == 3">
                            到期时间 <span>2023-11-12 22:23:02</span>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import NftCard from '@/components/NftCard.vue';
import ModuleTitle from "@/components/ModuleTitle.vue";

import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const myLucky = ref()
let active = ref('2')
let showPrizePopup = ref(false)
let prizeName = ref('')
let showPrizeDetails = ref(false)

const { proxy } = getCurrentInstance()
let isPrized = ref(false)
let currentPrize = ref(null)
const blocks = ref([{ padding: '13px', background: '#617df2' }])
const prizes = ref([
    { fonts: [{ text: '业绩承诺卡', top: '10%', currency: 'RT', corridor: ['0.5%', '1%', '2%', '3%', '4%', '5%', '6%',] }], background: '#e9e8fe' },
    { fonts: [{ text: '每日收益', top: '10%', currency: 'MT', corridor: ['0.5%', '1%', '2%', '3%', '4%', '5%', '6%',] },], background: '#b8c5f2' },
    { fonts: [{ text: '收益加速器', top: '10%', currency: 'PMT', corridor: ['0.5%', '1%', '2%', '3%', '4%', '5%', '6%',] }], background: '#e9e8fe' },
    { fonts: [{ text: '推荐福利', top: '10%', currency: 'RT', corridor: ['0.5%', '1%', '2%', '3%', '4%', '5%', '6%',] }], background: '#b8c5f2' },
])
const buttons = ref([{
    radius: '35%',
    background: '#8a9bf3',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }]
}])

function viewPrizeDetaisl() {
    showPrizeDetails.value = true
}

function startCallback() {
    // 调用抽奖组件的play方法开始游戏
    isPrized.value = false
    myLucky.value.play()
    // 模拟调用接口异步抽奖
    const index = Math.floor(Math.random() * 4)
    setTimeout(() => {
        // 假设后端返回的中奖索引是0

        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(index)
        currentPrize.value = index
        console.log('currentPrize', currentPrize, index)

    }, 2000);

}
// 抽奖结束会触发end回调
function endCallback(prize) {
    console.log(prize)
    isPrized.value = true

}
function togglePrizePopup() {
    showPrizePopup.value = !showPrizePopup.value
}


function handleBuyButton() {
    // console.log(proxy.$confirm)
    proxy.$confirm.show({
        title: "购买成功",
        content: "已经购买NFT卡，请进行抽奖",
        showCancelButton: false,
        confirmText: '确认抽奖',
        onConfirm: () => {
            proxy.$confirm.hide()
            isPrized.value = false
            togglePrizePopup()
        },
    });
}

onMounted(() => {
    // console.log(route.query.target)
    // active.value = route.query.target
})
</script>

<style scoped>
.term {
    @apply px-3 py-0.5 border border-secondary-icon rounded text-secondary-icon;
}

.tabs-content {
    @apply pt-10 w-11/12 mr-auto ml-auto text-secondary-icon flex justify-between flex-wrap;
}

.tabs-item {
    width: 48%;
}
</style>
<style>
.van-tabs,
.van-tabs--line {
    height: 52px;
}

.van-tab__panel {
    background: #000;
    padding-bottom: 20px;
    margin-top: 0.5px;
}
</style>