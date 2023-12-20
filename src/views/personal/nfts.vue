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
        <!-- 全部 -->
        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap" v-show="currentType == 0">
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in nftsDatas" :key="index">
                <nft-card :nftImg="nftOne" :showCheckbox="false" :price="item.price" :tokenID="item.token_id" />
            </div>
        </div>
        <div v-if="nftsDatas.length == 0 && currentType == 0" class="text-white font-bold mt-20 text-center">
            暫無數據
        </div>
        <!-- 正在掛單 -->
        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap"
            v-show="currentType == 1 && listeds.length !== 0">
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in listeds" :key="index">
                <nft-card :nftImg="nftOne" :price="item.price" :tokenID="item.token_id" showCancelButton
                    @handleCancel="handleCancelList(item)" />
            </div>
        </div>
        <div v-if="listeds.length == 0 && currentType == 1" class="text-white font-bold mt-20 text-center">
            暫無數據
        </div>
        <!-- 可出售 -->
        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap"
            v-show="currentType == 2 && saleables.length !== 0">

            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in saleables" :key="index">
                <nft-card :nftImg="nftOne" showListedButton :price="item.price" :tokenID="item.token_id"
                    @handleListed="handleListed(item)" />
            </div>
        </div>
        <div v-if="saleables.length == 0 && currentType == 2" class="text-white font-bold mt-20 text-center">
            暫無數據
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import NftCard from '@/components/NftCard.vue'
import nftOne from '@/assets/images/nftOne.png'
import { userNFT, marketplace, getCanSaleNFT } from '@/request/api'
import nftContractApi from '@/request/nft'
import minterContractApi from '@/request/minter'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const { proxy } = getCurrentInstance()
import { config } from '@/const/config'
let nftsStatusList = computed(() => {
    return [{ title: '全部' }, { title: '正在掛單' }, { title: '待出售' }]
})
// let listeds = ref([{ nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }])
// let saleables = ref([{ nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }, { nftImg: nftOne, checkedStatus: false }])
let listeds = ref([])
let saleables = ref([])

let checkedListeds = ref([])
let checkedSaleables = ref([])

let currentType = ref(0)
let isAllListed = ref(false)
let isAllSale = ref(false)
let nftsDatas = ref([])
onMounted(() => {
    getUserNFTs()
    getUserCanSaleNFT()
    getAllNFT()
})

//用戶取得自己可出售的NFT
function getUserCanSaleNFT() {
    saleables.value = []
    getCanSaleNFT()
        .then(res => {
            console.log(res)
            saleables.value = res.nft_token_ids

            // if (res.nft_token_ids.length !== 0) {
            //     res.nft_token_ids.map(item => {
            //         let obj = {}
            //         obj.token_id = item
            //         saleables.value.push(obj)
            //     })
            // }
        })
        .catch(err => {
            console.log(err)
        })
}

function getAllNFT() {
    proxy.$loading.show()
    nftsDatas.value = []
    let status = currentType.value
    let params = {}
    if (status == 0) {
        params = { address: localStorage.getItem('address'), perPage: 10000 }
    } else if (status == 1) {
        params = { address: localStorage.getItem('address'), status: 1, perPage: 10000 }
    }
    // let params = { address: localStorage.getItem('address'), status: 0, perPage: 10000 }
    userNFT(params)
        .then(res => {
            proxy.$loading.hide()
            // saleables 可出售 listeds//正在掛單
            nftsDatas.value = res.nft_token_ids
            // if (res.nft_token_ids.length !== 0) {
            //     res.nft_token_ids.map(item => {
            //         let obj = {}
            //         obj.token_id = item
            //         nftsDatas.value.push(obj)

            //     })
            // }
            console.log('我的nft', res)
        })
        .catch(err => {
            proxy.$loading.hide()

            console.log(err)
        })
}

function getUserNFTs() {
    proxy.$loading.show()
    listeds.value = []
    // let status = currentType.value
    // let params = {}
    // if (status == 0) {
    //     params = { address: localStorage.getItem('address'), perPage: 10000 }
    // } else if (status == 1) {
    //     params = { address: localStorage.getItem('address'), status: 1, perPage: 10000 }
    // }
    // let params = { address: localStorage.getItem('address'), status: 0, perPage: 10000 }
    let params = { address: localStorage.getItem('address'), status: 1, perPage: 10000 }
    marketplace(params)
        .then(res => {
            proxy.$loading.hide()
            // saleables 可出售 listeds//正在掛單
            if (res.market_places.length !== 0) {
                res.market_places.map(item => {
                    if (item.address == localStorage.getItem('address')) {
                        listeds.value.push(item)
                    }
                })
            }
            console.log('正在掛單', res)
            console.log('正在掛單列表', listeds.value)
        })
        .catch(err => {
            proxy.$loading.hide()

            console.log(err)
        })
}
function countDown(time) {
    var nowTime = new Date();
    var inputTime = new Date(time * 1000)
    // var inputTime = 1703080568
    var time = (inputTime - nowTime) / 1000
    var day = Math.floor(time / 60 / 60 / 24);
    day = day < 10 ? "0" + day : day;
    var hour = Math.floor(time / 60 / 60 % 24)
    hour = hour < 10 ? "0" + hour : hour
    var minute = Math.floor(time / 60 % 60)
    minute = minute < 10 ? "0" + minute : minute
    var second = Math.floor(time % 60);
    second = second < 10 ? "0" + second : second
    // console.log(day + "天" + hour + "时" + minute + "分" + second + "秒")

    return day + "天" + hour + "時" + minute + "分" + second + "秒"
}
//掛單
async function handleListed(item) {
    console.log(item)
    // return
    proxy.$loading.show()
    let time
    try {
        time = await nftContractApi.sellOffPeriod(item.token_id)
        console.log('出售時間時間戳',Number(time))
        console.log('現在時間時間戳',parseInt(new Date().getTime() / 1000))
        if (Number(time) > parseInt(new Date().getTime() / 1000)) {
            // let timeAll = Number(time) + (new Date().getTime() / 1000)
            showToast(countDown(Number(time)) + '後可出售')
            proxy.$loading.hide()
            return
        }

    } catch (err) {
        proxy.$loading.hide()
        console.log(err)
        showToast(t('toast.error'))
        return
    }
    // return
    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await minterContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }

    const transactionResponse = await nftContractApi.isApprovedAll(localStorage.getItem('address'), config.nfts_marketplace_addr)
    console.log(transactionResponse)
    if (!transactionResponse) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '需要進行NFT授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                // proxy.$loading.show()
                // usdt对pmt授權
                nftContractApi.setApprovalForAll(config.nfts_marketplace_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast('授權成功')

                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$confirm.hide()
                        showToast('授權失敗，請重新授權')
                    })
            },
        });
        return
    }
    // const transactionReceipt = await transactionResponse.wait();

    // Transaction is confirmed. You can now check the receipt.
    // if (transactionReceipt.status === 1) {
    //     console.log("Transaction successful:", transactionReceipt, transactionResponse);
    //     proxy.$loading.hide()
    // } else {
    //     console.log("Transaction failed:", transactionReceipt, transactionResponse);
    // }

    let allowance
    try { //检查usdt对pmt_purchase的授权状态
        allowance = await nftContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
    console.log('allowance', allowance)

    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '需要進行PMT授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                // proxy.$loading.show()
                // usdt对pmt授權
                nftContractApi.approve(config.nfts_marketplace_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast('授權成功')

                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$confirm.hide()
                        showToast('授權失敗，請重新授權')
                    })
            },
        });
        return
    }

    console.log('isApprovedAll', isApprovedAll)
    if (Number(isApprovedAll) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '需要進行MT授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                // proxy.$loading.show()
                // pmt对nft授權
                minterContractApi.approve(config.nfts_marketplace_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast('授權成功')

                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$confirm.hide()
                        showToast('授權失敗，請重新授權')
                    })
            },
        });
        return
    }

    try { //listNFT
        proxy.$loading.show()
        console.log(item.token_id)
        await nftContractApi.listNFT(item.token_id)
        proxy.$loading.hide()
        showToast(t('toast.success'))
        getUserNFTs()
        getUserCanSaleNFT()
        getAllNFT()
        // showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
}

//取消掛單
async function handleCancelList(item) {

    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await nftContractApi.isApprovedAll(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
    console.log('isApprovedAll', isApprovedAll)

    if (Number(isApprovedAll) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '需要進行NFT授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                // proxy.$loading.show()
                // pmt对nft授權
                nftContractApi.setApprovalForAll(config.nfts_marketplace_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast('授權成功')

                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$confirm.hide()
                        showToast('授權失敗，請重新授權')
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
        getUserNFTs()
        getUserCanSaleNFT()
        getAllNFT()
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
    // getUserNFTs()
}
</script>

<style></style>