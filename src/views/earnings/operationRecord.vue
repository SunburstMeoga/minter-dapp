<template>
    <div class="pt-12">
        <div class="w-11/12 mr-auto ml-auto mb-2">
            <module-title :titleWord="$t('menu.operationRecord')" />
        </div>
        <van-tabs class="pt-2 bg-black " v-model:active="active" sticky shrink animated swipeable color="#e149ed"
            title-inactive-color="#fff" title-active-color="#e149ed" background="#000" @click-tab="handleTabs">
            <van-tab v-for="(item, index) in tabsList" :key="index" :title="item.title">

            </van-tab>
        </van-tabs>
        <div>
            <div class="flex justify-start items-start overflow-hidden">
                <div class="mt-4 relative flex justify-end items-start w-full max-h-full overflow-hidden">
                    <div class="absolute top-0 left-0 w-3/12 h-screen overflow-hidden">
                        <div v-for="(item, index) in typeList" class="text-center w-full py-4 text-white bg-black"
                            :key="index" :class="currentType == index ? 'bg-page-content text-primary-color font-bold' : ''"
                            @click="handleType(item, index)">
                            {{ item.title }}
                        </div>
                    </div>
                    <div class="bg-page-content w-9/12 h-screen overflow-scroll pt-2">
                        <div class="w-11/12 mr-auto ml-auto flex justify-end" v-show="currentTab == 3">
                            <van-popover v-model:show="showFilterPopover" theme="dark" placement="bottom-end"
                                :actions="actions" @select="onSelect">
                                <template #reference>
                                    <div
                                        class="flex justify-center items-center text-gray-500 border text-xs border-gray-500 rounded px-3 py-1">
                                        <div class="icon iconfont icon-coins mr-1 font-bold" style="font-size: 12px;">
                                        </div>
                                        <div class="">
                                            {{ actions[currentFilter].text }}
                                        </div>
                                    </div>
                                </template>
                            </van-popover>
                        </div>
                        <div class="w-full  mb-3 rounded overflow-hidden p-2  text-card-word text-sm">
                            <div class="w-11/12 mr-auto ml-auto">
                                <div v-for="(item, index) in dataList" class="mb-2" :key="index">
                                    <earnings-card :time="item.updated_at || item.created_at"
                                        :remark="item.remark ? item.remark : `${actions[currentFilter].text}兌換${item.token && item.token.symbol}`"
                                        :address="item.address" :isEarning="currentTab == 0 || currentTab == 1"
                                        :isNFT="currentTab == 2" :isToken="currentTab == 3"
                                        :price="item.amount || item.reward_amount || item.price"
                                        :symbol="item.token && item.token.symbol"
                                        :transfer="currentTab == 3 && currentType == 1"
                                        :transferType="item.dynamic_earning_type && item.dynamic_earning_type.name"
                                        :tokenID="item.token_id" />
                                </div>
                            </div>
                        </div>
                        <div v-if="dataList.length == 0" class="text-white font-bold mt-16 text-center">
                            暫無數據
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { FilterTime } from '@/utils/format'
import { dynamicEarningTypes, dynamicRecords, staticRecords, nftMarketplace, nftTransaction, usdtExchangeRecord, btExchangeRecord, mtExchangeRecord, btTransations, mtTransations, rtTransations, nftSale } from '@/request/api'
import ModuleTitle from "@/components/ModuleTitle.vue";
import EarningsCard from "./earningsCard.vue";


const { t } = useI18n()
const { proxy } = getCurrentInstance()
const typeList = ref([{ title: '直推奖励' }, { title: '对碰奖励' }, { title: '代数奖励' }])
let actions = ref([
    { text: 'USD3', value: true, index: 0 },
    { text: 'BT', value: false, index: 1 },
    { text: 'MT', value: false, index: 2 },
    { text: 'RT', value: false, index: 3 },
    { text: '綁定RT', value: false, index: 4 },
    { text: 'PMT', value: false, index: 5 }
])
// let typeList = ref([{ title: t('assistance.directMarketingAward') }, { title: t('assistance.matchReward') }, { title: t('assistance.generationIncentive') }])
let currentType = ref(0)
let currentTab = ref(0)
let dataList = ref([])
let currentFilter = ref(0)

let showFilterPopover = ref(false)

let tabsList = computed(() => {
    return [
        { title: '動態收益', value: 0 },
        { title: '靜態收益', value: 0 },
        { title: 'NFT交易記錄', value: 0 },
        { title: '貨幣交易記錄', value: 0 }
    ]
})
onMounted(() => {
    // getIncomeList(window.ethereum.selectedAddress, 1)
    // getDynamicEarningTypes()
    getDynamicRecords(1)
    // nftBuyList()
    // nftPendList()
})
function onSelect(select) {
    console.log(select)
    let params = { address: localStorage.getItem('address'), sortBy: 'created_at', sortDesc: true }
    currentFilter.value = select.index
    if (currentType.value == 0) {
        if (currentFilter.value == 0) {
            getUSDTExchangeRecord(params)
        } else if (currentFilter.value == 1) {
            getBTExchangeRecord(params)
        } else if (currentFilter.value == 2) {
            getMTExchangeRecord(params)
        }
    } else {
        if (currentFilter.value == 1) {
            getBTTransations(params)
        } else if (currentFilter.value == 2) {
            getMTTransations(params)
        } else if (currentFilter.value == 3) {
            getRTTransations(params)
        }

    }


}
//bt交易記錄
function getBTTransations(params) {
    proxy.$loading.show()
    dataList.value = []
    btTransations(params)
        .then(res => {
            console.log('bt交易記錄', res)
            dataList.value = res.transactions
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()
        })
}
//rt交易記錄
function getRTTransations(params) {
    proxy.$loading.show()
    dataList.value = []
    rtTransations(params)
        .then(res => {
            console.log('rt交易記錄', res)
            dataList.value = res.transactions
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()
        })
}
//mt交易记录
function getMTTransations(params) {
    proxy.$loading.show()
    dataList.value = []
    mtTransations(params)
        .then(res => {
            console.log('mt交易記錄', res)
            dataList.value = res.nft_transactions
            console.log(dataList.value.length)
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()
        })
}
//usdt兌換記錄
function getUSDTExchangeRecord(params) {
    proxy.$loading.show()
    dataList.value = []
    usdtExchangeRecord(params)
        .then(res => {
            console.log('usdt兌換記錄', res)
            dataList.value = res.transactions
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()
        })
}
//bt兌換記錄
function getBTExchangeRecord(params) {
    proxy.$loading.show()
    dataList.value = []
    btExchangeRecord(params)
        .then(res => {
            console.log('bt兌換記錄', res)
            dataList.value = res.transactions
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()
        })
}
//mt兌換記錄
function getMTExchangeRecord(params) {
    proxy.$loading.show()
    dataList.value = []
    mtExchangeRecord(params)
        .then(res => {
            console.log('mt兌換記錄', res)
            dataList.value = res.transactions
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()
        })
}
//nft購買記錄
function nftBuyList() {
    proxy.$loading.show()
    dataList.value = []
    let params = { perPage: 10000, sortBy: 'created_at', sortDesc: true }
    nftTransaction(params)
        .then(res => {
            console.log('nft購買記錄', res)
            dataList.value = res.nft_transactions
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()
        })
}

//nft挂单记录
function nftPendList() {
    proxy.$loading.show()
    dataList.value = []
    let params = { perPage: 10000, sortBy: 'created_at', sortDesc: true }
    nftMarketplace(params)
        .then(res => {
            console.log('nft掛單記錄', res)
            dataList.value = res.market_places
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()
        })
}

//nft出售记录
function nftSaleList() {
    proxy.$loading.show()
    dataList.value = []
    let params = { perPage: 10000, sortBy: 'created_at', sortDesc: true }
    nftSale(params)
        .then(res => {
            console.log('nft出售', res)
            dataList.value = res.market_places
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()
        })
}

// 動態收益
function getDynamicRecords(typeID) { //typeID：1直推 2对碰 3代数
    proxy.$loading.show()
    dataList.value = []
    // dynamic_earning_type_id=1&sortBy=created_at&sortDesc=true&perPage=10&page=1
    let params = { dynamic_earning_type_id: typeID, perPage: 100000, sortBy: 'created_at', sortDesc: true }
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

//點擊tabs菜單欄
function handleTabs(tabs) {
    dataList.value = []
    currentFilter.value = 0
    currentTab.value = tabs.name
    currentType.value = 0
    switch (tabs.name) {
        case 0: typeList.value = [{ title: t('assistance.directMarketingAward') }, { title: t('assistance.matchReward') }, { title: t('assistance.generationIncentive') }];
            getDynamicRecords(tabs.name + 1);
            break;
        case 1: typeList.value = [{ title: t('assistance.acceleratorAward') }, { title: t('assistance.dailyEarnings') }, { title: t('assistance.commitmentCard') }, { title: t('assistance.recommendedBenefits') }];
            getStaticRecords(1);
            break;
        case 2: typeList.value = [{ title: '已購買' }, { title: '正在掛單' }, { title: '已售出' }];
            nftBuyList();
            break;
        // case 3: typeList.value = [{ title: 'USD3' }, { title: 'BT' }, { title: 'MT' }, { title: 'RT' }, { title: '綁定RT' }, { title: 'PMT' }];
        case 3: typeList.value = [{ title: '貨幣兌換' }, { title: '貨幣交易' }];
            let params = { address: localStorage.getItem('address'), sortBy: 'created_at', sortDesc: true }
            getUSDTExchangeRecord(params)

            // dataList.value = [{
            //     operationType: '兌換',
            //     currentType: 'USD3 兌換成 RT',
            //     amount: '34.0000MT',
            //     exchangeTime: "2023-12-23T15:15:11.000000Z",
            //     creditCardTime: "2023-12-23T15:15:11.000000Z",
            //     launchTime: "2023-12-23T15:15:11.000000Z",
            // }, {
            //     operationType: '交易',
            //     payeeAddress: '0x234...234234',
            //     amount: '34.0000MT',
            //     creditCardTime: "2023-12-23T15:15:11.000000Z",
            //     launchTime: "2023-12-23T15:15:11.000000Z",
            // }];

            break;

    }
    // if (tabs.name <= 2) {

    // } else {
    // let type
    // if (item.name == 3) {
    //     type = 1
    // }
    // if (item.name == 4) {
    //     type = 3
    // }
    // if (item.name == 5) {
    //     type = 2
    // }
    // if (item.name == 6) {
    //     type = 4
    // }
    // getStaticRecords(type)
    // }
    console.log(tabs, typeList.value)
}

function getStaticRecords(typeID) {
    proxy.$loading.show()
    dataList.value = []
    let params = { prize_type_id: typeID, perPage: 100000, sortBy: 'created_at', sortDesc: true }
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


function handleType(item, index) {
    currentType.value = index
    console.log(currentType.value, item, index)
    dataList.value = []
    if (currentTab.value == 0) {
        getDynamicRecords(index + 1)
    } else if (currentTab.value == 1) {
        getStaticRecords((index + 1))
    } else if (currentTab.value == 2) {
        if (currentType.value == 0) {
            nftBuyList()
        } else if (currentType.value == 1) {
            nftPendList()
        } else if (currentType.value == 2) {
            nftSaleList()
        }
    } else if (currentTab.value == 3) {
        if (currentType.value == 0) {
            let params = { address: localStorage.getItem('address'), sortBy: 'created_at', sortDesc: true }
            getUSDTExchangeRecord(params)
        } else if (currentType.value == 1) {
            //去獲取usdt的交易記錄 （待完成）
            // if(currentType == )
        }

    }

    // getIncomeList(window.ethereum.selectedAddress, index + 1)
}
</script>

<style></style>