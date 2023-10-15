<template>
    <div class="text-primary-color">
        <div class="py-20 bg-black">
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card isMUSDT currency="MUSDT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="PMT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="MT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="BT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="RT" />
            </div>
            <div class="border-b border-gray-800 w-11/12 mr-auto ml-auto mb-3"></div>
            <div class="flex justify-between items-center w-11/12 mr-auto ml-auto mb-2">
                <div class="flex justify-start items-center">
                    <div class="flex justify-start items-center pr-10">
                        <div class="pr-1 font-bold text-lg">0</div>
                        <div class="text-white">配套</div>
                    </div>
                    <div class="flex justify-start items-center ">
                        <div class="pr-1 font-bold text-lg">0</div>
                        <div class="text-white">NFTs</div>
                    </div>
                </div>
                <div @click="toggleOperator">
                    <div class="flex justify-end items-center" v-show="!showOperator">
                        <div class="text-white icon iconfont icon-caozuo" style="font-size: 20px;">

                        </div>
                        <div class="text-base text-white pl-2">
                            批量操作
                        </div>
                    </div>
                    <div v-show="showOperator">
                        完成
                    </div>
                </div>
            </div>
            <div v-show="showOperator" class="w-11/12 mr-auto ml-auto">
                <div class="flex justify-between items-center pt-2">
                    <div class="px-2 py-0.5 text-sm rounded  mb-2">
                        全選/取消全選
                    </div>
                    <div class="px-2.5 py-1 text-base rounded  mb-2 operating-button text-white"
                        v-for="(item, index) in operatorList" :key="index" @click="handleOperatorItem(item, index)">
                        {{ item.title }}
                    </div>
                </div>
                <div class="border-b border-gray-800 mb-2 ">

                </div>
            </div>
            <div class="flex justify-start items-center  mr-auto ml-auto flex-wrap">
                <div class="ml-4 px-2 py-0.5 text-xs border  rounded  mb-2"
                    :class="currentCoherent == index ? 'border-primary-color text-primary-color' : 'border-menu-word text-menu-word'"
                    v-for="(item, index) in coherentList" :key="index" @click="handleCoherentItem(item, index)">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import WalletCard from '@/components/WalletCard.vue';
const coherentList = ref([{ title: '全部' }, { title: '200' }, { title: '600' }, { title: '2000' }, { title: '6000' }, { title: '20000' }, { title: '承诺卡' }, { title: '在售中' }, { title: 'NFTs' }])
const operatorList = ref([{ title: '掛單' }, { title: '撤銷掛單' }, { title: '贈送' }])

let currentCoherent = ref(null)
let currentOperator = ref(null)
let showOperator = ref(false)

function toggleOperator() {
    showOperator.value = !showOperator.value
}

function handleCoherentItem(item, index) {
    currentCoherent.value = index
}

function handleOperatorItem(item, index) {
    currentOperator.value = index
}

</script>

<style scoped>
img {}
</style>