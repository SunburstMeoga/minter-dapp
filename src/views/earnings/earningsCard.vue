<template>
    <div class="mb-3 rounded overflow-hidden p-2 bg-card-content text-card-word text-sm">
        <div v-show="isEarning">
            <div class="flex justify-between items-center mb-2" v-show="showOutput">
                <div>产出地址</div>
                <div class="text-red-500 font-bold">{{ FilterAddress(address) }}</div>
            </div>

            <div class="flex justify-between items-center mb-2">
                <div>{{ $t('assistance.awardAmount') }}</div>
                <div class="text-red-500 font-bold">{{ Number(price).toFixed(4) }} {{ symbol }}</div>
            </div>
            <div class="flex justify-between items-center mb-2" v-show="tokenID !== 0">
                <div>Token ID</div>
                <div># {{ tokenID }}</div>
            </div>
            <div class="flex justify-between items-center mb-2" v-show="time">
                <div>{{ $t('assistance.releaseTime') }}</div>
                <div>{{ FilterTime(time) }}</div>
            </div>
            <div class="flex justify-between items-center mb-3" v-show="showAward">
                <div>派獎情況:</div>
                <div class="">{{ isRewarded ? '已派獎' : '未派獎' }}</div>
            </div>
            <div class="flex justify-between items-center" v-show="promiseCardValidDate">
                <div>到期時間</div>
                <div>{{ FilterTime(promiseCardValidDate) }}</div>
            </div>
            <div class="flex justify-between items-center" v-show="showExpire">
                <div>清零時間</div>
                <div>{{ expireDate }}</div>
            </div>
        </div>
        <div v-show="isNFT">
            <div class="flex justify-between items-center mb-2">
                <div>購買金額</div>
                <div class="text-red-500 font-bold">{{ Number(price).toFixed(4) }} {{ symbol }}</div>
            </div>
            <div class="flex justify-between items-center mb-2">
                <div>Token ID</div>
                <div># {{ tokenID }}</div>
            </div>
            <div class="flex justify-between items-center mb-2" v-show="operationType === true || operationType === false">
                <div>操作類型</div>
                <div>{{ operationType ? '掛單' : '取消掛單' }}</div>
            </div>
            <div class="flex justify-between items-center ">
                <div>时间</div>
                <div>{{ FilterTime(time) }}</div>
            </div>

        </div>
        <div v-show="isToken">
            <div class="flex justify-between items-center mb-2">
                <div>操作地址</div>
                <div class="text-red-500 font-bold">{{ FilterAddress(address) }}</div>
            </div>
            <!-- <div class="flex justify-between items-center mb-2">
                <div>兌換幣種</div>
                <div class="text-red-500 font-bold">{{ currentType }}</div>
            </div> -->
            <div class="flex justify-between items-center mb-2">
                <div>金額</div>
                <div class="text-red-500 font-bold">{{ price }} {{ symbol }}</div>
            </div>
            <div class="flex justify-between items-center mb-2" v-show="remark && !transfer">
                <div>兌換類型</div>
                <div class="text-red-500 font-bold">{{ remark }}</div>
            </div>
            <div class="flex justify-between items-center mb-2" v-show="transfer">
                <div>交易類型</div>
                <div class="text-red-500 font-bold">{{ transferType }}</div>
            </div>
            <div class="flex justify-between items-center mb-2">
                <div>到賬時間</div>
                <div class="text-red-500 font-bold">{{ FilterTime(time) }}</div>
            </div>
            <!-- <div class="flex justify-between items-center mb-2">
                <div>發起時間</div>
                <div class="text-red-500 font-bold">{{ FilterTime(launchTime) }}</div>
            </div> -->
            <!-- <div class="flex justify-between items-center mb-2">
                <div>兌換幣種:</div>
                <div class="text-red-500 font-bold">{{ operationType}}</div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { FilterTime, FilterAddress } from '@/utils/format';
// let operationType = ref('兌換')
// let currentType = ref('USD3 兌換成 RT')
// let amount = ref('34.0000MT')
// let exchangeTime = ref("2023-12-23T15:15:11.000000Z")
// let creditCardTime = ref("2023-12-23T15:15:11.000000Z")
// let launchTime = ref("2023-12-23T15:15:11.000000Z")
// let payeeAddress = ref('0x234...234234')
defineProps({
    price: {
        type: String,
        default: ''
    },
    remark: {
        type: String,
        default: ''
    },
    showAward: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    expireDate: {
        type: String,
        default: ''
    },
    symbol: {
        type: String,
        default: ''
    },
    transferType: {
        type: String,
        default: ''
    },
    operationType: {
        type: Number,
        default: null
    },
    promiseCardValidDate: {
        type: String,
        default: ''
    },
    tokenID: {
        type: Number,
        default: 0
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
    transfer: {
        type: Boolean,
        default: false
    },
    showOutput: {
        type: Boolean,
        default: false
    },
    showExpire: {
        type: Boolean,
        default: false
    },
    isRewarded: {
        type: Boolean,
        default: false
    }
})
</script>

<style></style>