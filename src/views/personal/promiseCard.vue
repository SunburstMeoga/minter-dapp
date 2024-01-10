<template>
    <div>
        <div class="flex flex-col justify-start items-center mt-20">
            <div class="w-11/12 mb-2" v-for="(item, index) in cardList" :key="index">
                <div class="rounded overflow-hidden p-2 bg-card-content text-card-word text-sm" :key="index">

                    <div class="flex justify-between items-center mb-3">
                        <div>tokenID</div>
                        <div class="text-red-500 font-bold"># {{ item.updated_at }}</div>
                    </div>


                    <div v-show="item.showMore">
                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('assistance.packageAmount') }}:</div>
                            <div class="text-red-500 font-bold">{{ Number(item.reward_amount).toFixed(2) }}</div>
                        </div>
                        <div class="flex justify-between items-center mb-3 mt-3">
                            <div>{{ $t('assistance.proceed') }}:</div>
                            <div class="text-red-500 font-bold">{{ Number(item.reward_amount * 0.1).toFixed(2) }}</div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('assistance.expiryTime') }}:</div>
                            <div class="">{{ FilterTime(item.updated_at) }}</div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>得到時間:</div>
                            <div class="">得到時間</div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>到期時間:</div>
                            <div class="">到期時間</div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>達標用戶1:</div>
                            <div class="">到期時間</div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>達標用戶2:</div>
                            <div class="">到期時間</div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>规则介绍:</div>
                            <div class="">達到一定條件後即可獲得高額的RT獎勵</div>
                        </div>
                        <!-- <div class="flex justify-between items-center mb-3">
                        <div>转账:</div>
                        <div class="text-red-500 font-bold">22.00</div>
                    </div> -->
                    </div>

                    <div class="flex justify-center items-center pt-1.5 pb-1 border-t border-gray-800 mt-2"
                        @click="$emit('toggleShowMore')">
                        <div class="icon iconfont icon-down1 transform ease-in-out duration-300"
                            :class="item.showMore ? 'rotate-180' : ' '">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="cardList.length == 0" class="text-white font-bold mt-20 text-center">
            暫無數據
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { staticRecords } from '@/request/api'
import { FilterTime } from '@/utils/format'

const { proxy } = getCurrentInstance()
let cardList = ref([])

onMounted(() => {
    getStaticRecords()
})

function getStaticRecords() {
    proxy.$loading.show()
    let params = { prize_type_id: 3, perPage: 100000 }
    staticRecords(params)
        .then(res => {
            console.log(res)
            proxy.$loading.hide()
            cardList.value = res.records
            cardList.value.map(item => {
                item.showMore = false
            })
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()

        })
}
</script>

<style></style>