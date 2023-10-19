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
            <div class="bg-black border border-black flex flex-col items-center w-full pb-4 text-white">
                <div class="w-full px-24 py-4 border-b border-gray-600 mb-4">
                    <img alt="">
                </div>
                <div class="flex justify-between items-center w-11/12 mb-2">
                    <div>售价</div>
                    <div class="font-bold text-red-500">$ 200</div>
                </div>
                <div class="flex justify-between items-center w-11/12 mb-2">
                    <div>收益上限</div>
                    <div>$ 200</div>
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
                <div class="w-11/12 operating-button text-center py-2 rounded-full" @click="togglePrizePopup">确认购买</div>
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
let active = ref('2')
let showPrizePopup = ref(false)

const { proxy } = getCurrentInstance()


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