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
                <div class="w-full">
                    <div class="w-full flex justify-between items-center px-2 py-1.5 bg-gray-800 rounded mb-2">
                        <div class="flex justify-start items-center">
                            <div class="pr-1 font-bold text-lg">0</div>
                            <div class="text-white">{{ $t('wallet.coherent') }}</div>
                        </div>
                        <div class="flex justify-end items-center text-white" @click="viewCoherents">
                            <div class="pr-1 text-sm">查看详情</div>
                            <div class="icon iconfont icon-right"></div>
                        </div>
                    </div>
                    <div class="w-full flex justify-start items-center px-2 py-1.5 bg-gray-800 rounded">
                        <div class="pr-1 font-bold text-lg">0</div>
                        <div class="text-white">NFTs</div>
                    </div>
                </div>
            </div>
            <div class="w-11/12 mr-auto ml-auto">
                <div class="flex justify-between items-center pt-2">
                    <div class="px-2 py-0.5 text-sm flex justify-start items-center mb-2">
                        <van-checkbox v-model="isUnanimous" checked-color="#e149ed" icon-size="18px"></van-checkbox>
                        <div class="pl-2" :class="isUnanimous ? 'text-primary-color' : 'text-white'">{{
                            $t('wallet.unanimous') }}</div>
                    </div>
                    <div class="px-2.5 py-1 text-base rounded  mb-2 operating-button text-white"
                        v-for="(item, index) in operatorList" :key="index" @click="handleOperatorItem(item, index)">
                        {{ item.title }}
                    </div>
                </div>
                <div class="border-b border-gray-800 mb-2 ">

                </div>
            </div>
            <div class="flex justify-start items-center  mr-auto ml-auto flex-wrap mb-2">
                <div class="ml-4 px-2 py-0.5 text-xs border  rounded  mb-2"
                    :class="currentCoherent == index ? 'border-primary-color text-primary-color' : 'border-menu-word text-menu-word'"
                    v-for="(item, index) in coherentList" :key="index" @click="handleCoherentItem(item, index)">
                    {{ item.title }}
                </div>
            </div>

            <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap">
                <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in 9" :key="index">
                    <nft-card />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from "vue-router";
import WalletCard from '@/components/WalletCard.vue';
import NftCard from '@/components/NftCard.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()
let coherentList = computed(() => {
    return [{ title: t('wallet.all') }, { title: '200' }, { title: '600' }, { title: '2000' }, { title: '6000' }, { title: '20000' }, { title: t('wallet.promiseCard') }, { title: t('wallet.onSale') }]
})

let operatorList = computed(() => {
    return [{ title: t('wallet.sale') }, { title: t('wallet.cancleSale') }, { title: t('wallet.gift') }]
})

let currentCoherent = ref(null)
let currentOperator = ref(null)
let showOperator = ref(false)
let isUnanimous = ref(false)

function viewCoherents() {
    router.push({
        path: '/personal/coherents'
    })
}

function toggleOperator() {
    showOperator.value = !showOperator.value
}

function handleCoherentItem(item, index) {
    currentCoherent.value = index
    if (index == 7) {
        operatorList.value = [{ title: t('wallet.cancleSale') }]
    } else if (index == 6) {
        operatorList.value = [{ title: t('wallet.gift') }]
    } else if (index !== 6 || index !== 7) {
        operatorList.value = [[{ title: t('wallet.sale') }, { title: t('wallet.cancleSale') }, { title: t('wallet.gift') }]]
    }
}

function handleOperatorItem(item, index) {
    currentOperator.value = index
}

</script>

<style scoped>
img {}
</style>