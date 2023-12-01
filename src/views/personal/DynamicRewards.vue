<template>
    <div>
        <div class="flex justify-start items-start overflow-hidden">
            <div class="mt-4 relative flex justify-end items-start w-full max-h-full overflow-hidden">
                <div class="absolute top-0 left-0 w-3/12 h-screen overflow-hidden">
                    <div v-for="(item, index) in typeList" class="text-center w-full py-4 text-white bg-black" :key="index"
                        :class="currentType == index ? 'bg-page-content text-primary-color font-bold' : ''"
                        @click="handleType(item, index)">
                        {{ item.title }}
                    </div>
                </div>
                <div class="bg-page-content w-9/12 h-screen overflow-scroll pt-2">
                    <!-- <div v-show="dataList.length == 0">
                        <van-empty description="暫無數據" />
                    </div> -->
                    <div class="w-11/12 ml-auto mr-auto mb-3 rounded overflow-hidden p-2 bg-black text-card-word text-sm"
                        v-for="(item, index) in 20" :key="index">
                        <div class="flex justify-between items-center mb-2">
                            <div>奖励金额</div>
                            <div class="text-green-500">+ 100.00</div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div>发放时间</div>
                            <div>2023-09-30 16:01:12</div>
                        </div>
                    </div>
                    <div v-if="isLoaing">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'

import { incomeList } from '@/request/api'

const { proxy } = getCurrentInstance()
const typeList = ref([{ title: '直推奖励' }, { title: '对碰奖励' }, { title: '代数奖励' }])
let currentType = ref(0)
let dataList = ref([])

onMounted(() => {
    getIncomeList(window.ethereum.selectedAddress, 1)
})

//查詢指定類型的收益流水數據
function getIncomeList(walletAddress, type) {
    proxy.$loading.show()
    incomeList(walletAddress, type)
        .then(res => {
            console.log('收益流水', res)
            dataList.value = res.data
            proxy.$loading.hide()

        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()

        })
}



function handleType(item, index) {
    currentType.value = index
    getIncomeList(window.ethereum.selectedAddress, index + 1)
}
</script>

<style></style>