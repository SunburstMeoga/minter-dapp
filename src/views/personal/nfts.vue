<template>
    <div class="flex flex-col justify-start items-center w-full bg-black pt-16 pb-20">
        <div class="w-11/12 mb-4">
            <div class="flex justify-between items-center px-0.5 py-0.5 border border-primary-color rounded">
                <div v-for="(item, index) in nftsStatusList" class="py-1 text-center text-sm rounded flex-1"
                    :class="currentType == index ? 'bg-primary-color text-gray-200 font-bold' : 'text-primary-color'"
                    @click="handleTypeItem(item, index)">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <!-- <div class="w-11/12 text-xs text-red-700 mb-5">
            {{ $t('coherents.tips') }}
        </div> -->
        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap" v-show="currentType == 0">
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in nftsDatas" :key="index">
                <nft-card :nftImg="nftOne" :showCheckbox="false" />
            </div>
            <div v-if="nftsDatas.length !== 0" class="text-white font-bold">
                暫無數據
            </div>
        </div>

        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap" v-show="currentType == 1">
            <div class="px-2 py-0.5 text-sm flex justify-between items-center mb-2 w-full">
                <div class=" justify-start items-center text-gray-200">
                    <div class="rounded px-3 py-1.5 bg-card-content" @click="handleCancleList">取消掛單</div>
                </div>
                <div class="flex justify-end items-center">
                    <div class="pr-2 font-bold text-lg" :class="isAllListed ? 'text-primary-color' : 'text-white'">{{
                        $t('wallet.unanimous') }}</div>
                    <van-checkbox @click="checkedAllListed" v-model="isAllListed" checked-color="#e149ed"
                        icon-size="22px"></van-checkbox>
                </div>
            </div>
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in listeds" :key="index">
                <nft-card :nftImg="item.nftImg" :checkedStatus="item.checkedStatus"
                    @checkedStatusHasChange="listedsHasChange(item, index)" />
            </div>
        </div>

        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap" v-show="currentType == 2">
            <!-- <div class="px-2 py-0.5 text-sm flex justify-between items-center mb-2 w-full">
                <div class=" justify-start items-center text-gray-200">
                    <div class="rounded px-3 py-1.5 bg-card-content">掛單</div>
                </div>
                <div class="flex justify-end items-center">
                    <div class="pr-2 font-bold text-lg" :class="isAllSale ? 'text-primary-color' : 'text-white'">{{
                        $t('wallet.unanimous') }}</div>
                    <van-checkbox v-model="isAllSale" @click="checkedAllSaleables" checked-color="#e149ed"
                        icon-size="22px"></van-checkbox>
                </div>
            </div> -->
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in saleables" :key="index">
                <nft-card :nftImg="item.nftImg" :checkedStatus="false" :showCheckbox="false" showListedButton
                    @handleListed="handleListed(item)" @checkedStatusHasChange="saleablesHasChange(item, index)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import NftCard from '@/components/NftCard.vue'
import nftOne from '@/assets/images/nftOne.png'
import { userNFT } from '@/request/api'
import nftContractApi from '@/request/nft'
import { showToast } from 'vant'
const { proxy } = getCurrentInstance()
import { config } from '@/const/config'
let nftsStatusList = computed(() => {
    return [{ title: '全部' }, { title: '正在掛單' }, { title: '可出售' }]
})
let listeds = ref([{ nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }])
let saleables = ref([{ nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }])

let checkedListeds = ref([])
let checkedSaleables = ref([])

let currentType = ref(0)
let isAllListed = ref(false)
let isAllSale = ref(false)
let nftsDatas = ref([])
onMounted(() => {
    getUserNFTs()
})

function getUserNFTs() {
    proxy.$loading.show()
    userNFT()
        .then(res => {
            proxy.$loading.hide()
            nftsDatas.value = res.nft_token_ids
            console.log('res', res)
        })
        .catch(err => {
            proxy.$loading.hide()

            console.log(err)
        })
}
//掛單
async function handleListed(item) {
    let allowance
    try { //检查pmt对pmt_purchase的授权状态
        allowance = await nftContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
    console.log('allowance', allowance)
    if (Number(allowance) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '該地址未進行授權，請完成授權',
            showCancelButton: false,
            confirmText: '確定',
            onConfirm: () => {
                proxy.$loading.show()
                // pmt对nft授權
                nftContractApi.approve(config.nfts_marketplace_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$loading.hide()
                        showToast(t('toast.success'))
                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$loading.hide()
                        showToast(t('toast.error'))
                    })
            },
        });
        return
    }

    try { //listNFT
        proxy.$loading.show()
        await nftContractApi.listNFT(item.token_id)
        proxy.$loading.hide()
        showToast(t('toast.success'))
        // showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
}

//取消掛單
async function handleCancleList() {
    let allowance
    try { //检查pmt对pmt_purchase的授权状态
        allowance = await nftContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
    console.log('allowance', allowance)

    if (Number(allowance) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '該地址未進行授權，請完成授權',
            showCancelButton: false,
            confirmText: '確定',
            onConfirm: () => {
                proxy.$loading.show()
                // pmt对nft授權
                nftContractApi.approve(config.nfts_marketplace_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$loading.hide()
                        showToast(t('toast.success'))
                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$loading.hide()
                        showToast(t('toast.error'))
                    })
            },
        });
        return
    }

    try { //unlistNFT
        proxy.$loading.show()
        await nftContractApi.unlistNFT(item.token_id)
        proxy.$loading.hide()
        showToast(t('toast.success'))
        // showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
}

//全選可售卖列表
function checkedAllSaleables(isChecked) {
    saleables.value.map(item => {
        if (isChecked) {
            item.checkedStatus = true
        } else {
            item.checkedStatus = false
        }
    })
}
//全選正在掛單列表
function checkedAllListed(isChecked) {
    listeds.value.map(item => {
        if (isChecked) {
            item.checkedStatus = true
        } else {
            item.checkedStatus = false
        }
    })
}
// 點擊正在掛單卡片的選擇框
function listedsHasChange(item, index) {
    item.checkedStatus = !item.checkedStatus
    console.log('checkedStatus', index + 1, item.checkedStatus)
    checkedListeds.value = listeds.value.filter(item => {
        return item.checkedStatus == true
    })
    isAllListed.value = listeds.value.length == checkedListeds.value.length
    console.log('全選正在掛單卡片', listeds.value.length, checkedListeds.value.length)
}
// 點擊可售賣卡片的選擇框
function saleablesHasChange(item, index) {
    item.checkedStatus = !item.checkedStatus
    checkedSaleables.value = saleables.value.filter(item => {
        return item.checkedStatus == true
    })
    isAllSale.value = saleables.value.length == checkedSaleables.value.length
    console.log('全選可售賣卡片', saleables.value.length, checkedSaleables.value.length)
}
function handleTypeItem(item, index) {
    currentType.value = index
}
</script>

<style></style>