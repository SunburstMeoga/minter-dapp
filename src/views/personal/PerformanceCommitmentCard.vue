<template>
    <div class="rounded overflow-hidden p-2 bg-card-content text-card-word text-sm">
        <!-- <div class="flex justify-between items-center mb-3">
            <div>邀请地址:</div>
            <div class="">0x83...5796</div>
        </div> -->
        <div class="flex justify-between items-center mb-3">
            <div>tokenID</div>
            <div class="text-red-500 font-bold">NO. {{ tokenID }}</div>
        </div>

        <!-- <div class="flex justify-between items-center">
            <div>购买时间</div>
            <div>2023-09-30 16:01:12</div>
        </div> -->

        <div v-show="showMore">
            <div class="flex justify-between items-center mb-3">
                <div>{{ $t('assistance.packageAmount') }}:</div>
                <div class="text-red-500 font-bold">{{ Number(price).toFixed(2) }}</div>
            </div>
            <div class="flex justify-between items-center mb-3 mt-3">
                <div>{{ $t('assistance.proceed') }}:</div>
                <div class="text-red-500 font-bold">{{ Number(price * 0.1).toFixed(2) }}</div>
            </div>
            <div class="flex justify-between items-center mb-3">
                <div>{{ $t('assistance.expiryTime') }}:</div>
                <div class="">{{ FilterTime(time) }}</div>
            </div>
            <!-- <div class="flex justify-between items-center mb-3">
                <div>转账:</div>
                <div class="text-red-500 font-bold">22.00</div>
            </div> -->
        </div>

        <div class="flex justify-center items-center pt-1.5 pb-1 border-t border-gray-800 mt-2"
            @click="$emit('toggleShowMore')">
            <div class="icon iconfont icon-down1 transform ease-in-out duration-300" :class="showMore ? 'rotate-180' : ' '">
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { staticRecords } from '@/request/api'
import { FilterTime } from '@/utils/format'

const { proxy } = getCurrentInstance()
let dataList = ref([])
onMounted(() => {
    // getStaticRecords()
})
// function getStaticRecords() {
//     proxy.$loading.show()
//     let params = { prize_type_id: 3, perPage: 100000 }
//     staticRecords(params)
//         .then(res => {
//             //console.log(res)
//             proxy.$loading.hide()

//         })
//         .catch(err => {
//             //console.log(err)
//             proxy.$loading.hide()

//         })
// }
defineProps({
    showMore: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        default: ''
    },
    tokenID: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    }
})
let coherentAmount = ref(100)

</script>

<style></style>