<template>
    <div class="text-primary-color bg-black pt-12">
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
                                <nft-card :nftImg="nftOne" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="R">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftTwo" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftThree" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SSR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftFour" :showCheckbox="false" @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="UR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftFive" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

    </div>
</template>

<script setup>
import NftCard from '@/components/NftCard.vue';
import ModuleTitle from "@/components/ModuleTitle.vue";

import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';

import nftOne from '@/assets/images/nftOne.png'
import nftTwo from '@/assets/images/nftTwo.png'
import nftThree from '@/assets/images/nftThree.png'
import nftFour from '@/assets/images/nftFour.png'
import nftFive from '@/assets/images/nftFive.png'


const router = useRouter()

const { proxy } = getCurrentInstance()

function handleBuyButton() {
    // console.log(proxy.$confirm)
    proxy.$confirm.show({
        title: "购买成功",
        content: "已经购买NFT卡，请进行抽奖",
        showCancelButton: false,
        confirmText: '确认抽奖',
        onConfirm: () => {
            proxy.$confirm.hide()
            router.push({
                path: '/market/raffle'
            })
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