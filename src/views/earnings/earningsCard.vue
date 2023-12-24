<template>
    <div class="mb-3 rounded overflow-hidden p-2 bg-card-content text-card-word text-sm">
        <div v-show="isEarning">
            <div class="flex justify-between items-center mb-2">
                <div>{{ $t('assistance.awardAmount') }}</div>
                <div class="text-red-500 font-bold">{{ Number(price).toFixed(4) }} {{ symbol }}</div>
            </div>
            <div class="flex justify-between items-center">
                <div>{{ $t('assistance.releaseTime') }}</div>
                <div>{{ FilterTime(time) }}</div>
            </div>
        </div>
        <div v-show="isNFT">
            <div class="flex justify-between items-center mb-2">
                <div>{{ $t('assistance.awardAmount') }}</div>
                <div class="text-red-500 font-bold">{{ Number(price).toFixed(4) }} {{ symbol }}</div>
            </div>
            <div class="flex justify-between items-center">
                <div>时间</div>
                <div>{{ FilterTime(time) }}</div>
            </div>
        </div>
        <div v-show="isToken">
            <div class="flex justify-between items-center mb-2">
                <div>操作類型:</div>
                <div class="text-red-500 font-bold">{{ operationType }}</div>
            </div>
            <div class="flex justify-between items-center mb-2">
                <div>兌換幣種:</div>
                <div class="text-red-500 font-bold">{{ currentType }}</div>
            </div>
            <div class="flex justify-between items-center mb-2">
                <div>兌換金額:</div>
                <div class="text-red-500 font-bold">{{ amount }}</div>
            </div>
            <div class="flex justify-between items-center mb-2">
                <div>兌換時間:</div>
                <div class="text-red-500 font-bold">{{ FilterTime(exchangeTime) }}</div>
            </div>
            <div class="flex justify-between items-center mb-2">
                <div>到賬時間:</div>
                <div class="text-red-500 font-bold">{{ FilterTime(creditCardTime) }}</div>
            </div>
            <div class="flex justify-between items-center mb-2">
                <div>發起時間:</div>
                <div class="text-red-500 font-bold">{{ FilterTime(launchTime) }}</div>
            </div>
            <!-- <div class="flex justify-between items-center mb-2">
                <div>兌換幣種:</div>
                <div class="text-red-500 font-bold">{{ operationType}}</div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FilterTime } from '@/utils/format';
let operationType = ref('兌換')
let currentType = ref('USD3 兌換成 RT')
let amount = ref('34.0000MT')
let exchangeTime = ref("2023-12-23T15:15:11.000000Z")
let creditCardTime = ref("2023-12-23T15:15:11.000000Z")
let launchTime = ref("2023-12-23T15:15:11.000000Z")
let payeeAddress = ref('0x234...234234')
defineProps({
    price: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    symbol: {
        type: String,
        default: ''
    },
    isEarning: {
        type: Boolean,
        default: false
    },
    isNFT: {
        type: Boolean,
        default: false
    },
    isToken: {
        type: Boolean,
        default: false
    },
})
</script>

<style></style>