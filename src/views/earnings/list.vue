<template>
    <div class="bg-black pt-12">
        <div class="w-11/12 mr-auto ml-auto mb-2">
            <module-title :titleWord="$t('menu.operationRecord')" />
        </div>
        <div class="border-b border-gray-700">
            <van-tabs class="bg-black" @click-tab="onChange" v-model:active="active" animated swipeable color="#e149ed"
                title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
                <van-tab :title="$t('assistance.directMarketingAward')">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                            <earnings-card :time="item.updated_at" :price="item.amount"
                                :symbol="item.token && item.token.symbol" />
                        </div>
                    </div>
                    <div v-if="dataList.length == 0" class="font-bold text-white mt-10 text-center">暫無數據</div>
                </van-tab>
                <van-tab :title="$t('assistance.matchReward')">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                            <earnings-card :time="item.updated_at" :price="item.amount"
                                :symbol="item.token && item.token.symbol" />
                        </div>
                    </div>
                    <div v-if="dataList.length == 0" class="font-bold text-white mt-10 text-center">暫無數據</div>
                </van-tab>
                <van-tab :title="$t('assistance.generationIncentive')">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                            <earnings-card :time="item.updated_at" :price="item.amount"
                                :symbol="item.token && item.token.symbol" />
                        </div>
                    </div>
                    <div v-if="dataList.length == 0" class="font-bold text-white mt-10 text-center">暫無數據</div>
                </van-tab>
                <van-tab :title="$t('assistance.acceleratorAward')">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                            <earnings-card :time="item.updated_at" :price="item.amount"
                                :symbol="item.token && item.token.symbol" />
                        </div>
                    </div>
                    <div v-if="dataList.length == 0" class="font-bold text-white mt-10 text-center">暫無數據</div>
                </van-tab>
                <van-tab :title="$t('assistance.commitmentCard')">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                            <earnings-card :time="item.updated_at" :price="item.amount"
                                :symbol="item.token && item.token.symbol" />
                        </div>
                    </div>
                    <div v-if="dataList.length == 0" class="font-bold text-white mt-10 text-center">暫無數據</div>
                </van-tab>
                <van-tab :title="$t('assistance.dailyEarnings')">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                            <earnings-card :time="item.updated_at" :price="item.amount"
                                :symbol="item.token && item.token.symbol" />
                        </div>
                    </div>
                    <div v-if="dataList.length == 0" class="font-bold text-white mt-10 text-center">暫無數據</div>
                </van-tab>
                <van-tab :title="$t('assistance.recommendedBenefits')">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                            <earnings-card :time="item.updated_at" :price="item.amount" />
                        </div>
                    </div>
                    <div v-if="dataList.length == 0" class="font-bold text-white mt-10 text-center">暫無數據</div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
    <!-- <van-nav-bar title="收益明细" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group inset v-for="key in 10">
        <van-cell title="奖励金额" value="100.00" label="MUSDT" />
        <van-cell title="发放时间" value="2023-09-30 16:01:12" />
    </van-cell-group>
    <van-back-top right="60vw" bottom="10vh" /> -->
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import ModuleTitle from "@/components/ModuleTitle.vue";
import EarningsCard from "./earningsCard.vue";
import { dynamicRecords, staticRecords } from '@/request/api'

const { proxy } = getCurrentInstance()
let dataList = ref([])

onMounted(() => {
    getDynamicRecords(1)
    // getStaticRecords()
})

function onChange(item) {
    console.log(item)
    dataList.value = []
    if (item.name <= 2) {
        getDynamicRecords(item.name + 1)
    } else {
        let type
        if (item.name == 3) {
            type = 1
        }
        if (item.name == 4) {
            type = 3
        }
        if (item.name == 5) {
            type = 2
        }
        if (item.name == 6) {
            type = 4
        }
        getStaticRecords(type)
    }
}

function getStaticRecords(typeID) {
    proxy.$loading.show()
    let params = { prize_type_id: typeID, perPage: 100000 }
    staticRecords(params)
        .then(res => {
            console.log(res)
            // promiseCardCount.value = res.records.length
            dataList.value = res.records
            proxy.$loading.hide()
            console.log('dataList', dataList.value)
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()
        })
}

function getDynamicRecords(typeID) {
    proxy.$loading.show()
    // dynamic_earning_type_id=1&sortBy=created_at&sortDesc=true&perPage=10&page=1
    let params = { dynamic_earning_type_id: typeID, perPage: 100000 }
    console.log(params)
    dynamicRecords(params)
        .then(res => {
            console.log('獲取動態收益記錄', res)
            dataList.value = res.records
            console.log('dataList', dataList.value)
            proxy.$loading.hide()

        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()

        })
}
</script>
<style>
.van-tabs,
.van-tabs--line {
    height: 52px;
}

.van-tab__panel {
    background: #000;
    padding-bottom: 20px;
    margin-top: 0.5px;
}</style>
