<template>
    <div class="pt-2 text-primary-color">
        <van-tabs class="pt-2 bg-black" v-model:active="active" shrink animated swipeable color="#e149ed"
            title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
            <van-tab title="点位图">
                <point />
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Point from './point.vue';
import DynamicRewards from './DynamicRewards.vue';
import PerformanceCommitmentCard from './PerformanceCommitmentCard.vue'

import { viewSpreads } from '@/request/contract'

let active = ref(0)
let cardList = ref([{ showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }, { showMore: false }])

onMounted(() => {
    viewAddressPoint(window.ethereum.selectedAddress)
})

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