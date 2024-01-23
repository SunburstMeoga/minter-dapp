<template>
    <div class="flex flex-col justify-start items-center w-full bg-transparent pt-16 pb-20">
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
            <!-- <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="w-full">
                <div class="flex justify-between items-center flex-wrap">
                    <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in nftsDatas"
                        :key="index">
                        <nft-card :nftImg="item.nftImg" :showCheckbox="false" :price="item.price"
                            :tokenID="item.token_id" />
                    </div>
                </div>
            </van-list> -->
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in nftsDatas" :key="index">
                <nft-card :nftImg="item.nftImg" :showCheckbox="false" :price="item.price" :tokenID="item.token_id"
                    :showOperting="item.showOperting" :showCancelButton="item.is_listed && !item.showOperting"
                    :showListedButton="!item.is_listed && !item.showOperting" showToken
                    @handleListed="handleListed(item, index)" @handleCancel="handleCancelList(item, index)" />
            </div>
        </div>
        <div v-if="nftsDatas.length == 0 && currentType == 0" class="text-white font-bold mt-20 text-center">
            暫無數據
        </div>
        <!-- 正在掛單 -->
        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap"
            v-show="currentType == 1 && listeds.length !== 0">
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in listeds" :key="index">
                <nft-card :nftImg="item.nftImg" :price="item.price" :tokenID="item.token_id" showToken
                    @handleCancel="handleCancelList(item)" @handleListed="handleListed(item, index)"
                    :showCancelButton="item.is_listed && !item.showOperting" :showOperting="item.showOperting"
                    :showListedButton="!item.is_listed && !item.showOperting" />
            </div>
        </div>
        <div v-if="listeds.length == 0 && currentType == 1" class="text-white font-bold mt-20 text-center">
            暫無數據
        </div>
        <!-- 可出售 -->
        <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap"
            v-show="currentType == 2 && saleables.length !== 0">
            <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in saleables" :key="index">
                <nft-card :nftImg="item.nftImg" :price="item.price" :tokenID="item.token_id" showToken
                    @handleListed="handleListed(item, index)" @handleCancel="handleCancelList(item)"
                    :showCancelButton="item.is_listed && !item.showOperting" :showOperting="item.showOperting"
                    :showListedButton="!item.is_listed && !item.showOperting" />
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
import nftOne from '@/assets/images/200.png'
import nftTwo from '@/assets/images/600.png'
import nftThree from '@/assets/images/2000.png'
import nftFour from '@/assets/images/6000.png'
import nftFive from '@/assets/images/20000.png'
import { userNFT, marketplace, getCanSaleNFT } from '@/request/api'
import nftContractApi from '@/request/nft'
import minterContractApi from '@/request/minter'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const { proxy } = getCurrentInstance()
import { config } from '@/const/config'
let nftsStatusList = computed(() => {
    return [{ title: '全部' }, { title: '正在掛單' }, { title: '可出售' }]
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
const list = ref([]);
const loading = ref(false)
const finished = ref(false)
onMounted(() => {
    getAllNFT()
    getUserCanSaleNFT()
    getUserNFTs()

})
function onLoad() {
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 1000) {
            finished.value = true;
        }
    }, 1000);
}
//獲取用戶所有的NFT
async function getAllNFT() {
    proxy.$loading.show()
    nftsDatas.value = []
    let status = currentType.value
    let params = {}
    if (status == 0) {
        params = { address: localStorage.getItem('address'), perPage: 10000 }
    } else if (status == 1) {
        params = { address: localStorage.getItem('address'), status: 1, perPage: 10000 }
    }
    userNFT(params)
        .then(res => {
            proxy.$loading.hide()
            console.log(res)
            nftsDatas.value = res.nft_token_ids
            if (nftsDatas.value.length !== 0) {
                nftsDatas.value.map(async item => {
                    // let time = await nftContractApi.sellOffPeriod(item.token_id)
                    // console.log('出售時間時間戳', Number(time))
                    // console.log('現在時間時間戳', parseInt(new Date().getTime() / 1000))
                    item.showOperting = false
                    if (item.token_type == 1) {
                        item.nftImg = nftOne
                    }
                    if (item.token_type == 2) {
                        item.nftImg = nftTwo
                    }
                    if (item.token_type == 3) {
                        item.nftImg = nftThree
                    }
                    if (item.token_type == 4) {
                        item.nftImg = nftFour
                    }
                    if (item.token_type == 5) {
                        item.nftImg = nftFive
                    }
                    // if (Number(time) > parseInt(new Date().getTime() / 1000)) {
                    //     item.isSellOffPeriod = true
                    // } else {
                    //     item.isSellOffPeriod = false
                    // }
                })
            }
            console.log('全部', res)
        })
        .catch(err => {
            proxy.$loading.hide()
            console.log(err)
        })
}
//用戶取得自己可出售的NFT
function getUserCanSaleNFT() {
    proxy.$loading.show()
    saleables.value = []
    getCanSaleNFT()
        .then(res => {
            proxy.$loading.hide()
            saleables.value = res.nft_token_ids
            if (saleables.value.length !== 0) {
                saleables.value.map(item => {
                    item.is_listed = false
                    item.showOperting = false
                    if (item.token_type == 1) {
                        item.nftImg = nftOne
                    }
                    if (item.token_type == 2) {
                        item.nftImg = nftTwo
                    }
                    if (item.token_type == 3) {
                        item.nftImg = nftThree
                    }
                    if (item.token_type == 4) {
                        item.nftImg = nftFour
                    }
                    if (item.token_type == 5) {
                        item.nftImg = nftFive
                    }
                })
            }
            console.log('可出售列表', saleables.value)
        })
        .catch(err => {
            proxy.$loading.hide()
            console.log(err)
        })
}
//獲取用戶正在掛單的NFT
function getUserNFTs() {
    proxy.$loading.show()
    listeds.value = []
    let params = { address: localStorage.getItem('address'), status: 1, perPage: 10000 }
    marketplace(params)
        .then(res => {
            proxy.$loading.hide()
            // saleables 可出售 listeds//正在掛單
            if (res.market_places.length !== 0) {
                res.market_places.map(item => {
                    if (item.address == localStorage.getItem('address')) {
                        listeds.value.push(item)
                        if (listeds.value.length !== 0) {
                            listeds.value.map(_item => {
                                if (_item.token_type == 1) {
                                    _item.nftImg = nftOne
                                }
                                if (_item.token_type == 2) {
                                    _item.nftImg = nftTwo
                                }
                                if (_item.token_type == 3) {
                                    _item.nftImg = nftThree
                                }
                                if (_item.token_type == 4) {
                                    _item.nftImg = nftFour
                                }
                                if (_item.token_type == 5) {
                                    _item.nftImg = nftFive
                                }
                                _item.is_listed = true
                                _item.showOperting = false
                            })
                        }
                    }
                })
            }
            console.log('正在掛單', res)
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
    return day + "天" + hour + "時" + minute + "分" + second + "秒"
}
//獲取24小時內掛單的nft數量
async function getListeds24h() { //每个地址每天最多挂单4张NFT
    let timestamp = new Date().getTime()
    let listedsList = []
    listeds.value.find(item => {
        if (timestamp - new Date(item.updated_at).getTime() <= 60 * 60 * 3 * 1000) {
            listedsList.push(item)
        }
    })
    // console.log(listedsList)
    return listedsList.length
}

//掛單
async function handleListed(item, index) {
    console.log(item)
    proxy.$loading.show()
    let numListingsIn24Hours
    let totalListings
    let lastListingTime
    let timestamp
    try {
        numListingsIn24Hours = await nftContractApi.getNumListingsIn24Hours(localStorage.getItem('address')) //24小時內一共多少張NFT正在掛賣或已經賣出
        totalListings = await nftContractApi.getTotalListings(localStorage.getItem('address')) //現正掛賣NFT數量
        lastListingTime = await nftContractApi.getLastListingTime(localStorage.getItem('address')) //由此時間開始計起24小時 
        // lastListingTime = 1704271082
        timestamp = Number(lastListingTime) + Number(60 * 20)
        // timestamp = new Date(timestamp).getTime()
        console.log('20分鐘內一共多小張NFT正在掛賣或已經賣出', numListingsIn24Hours)
        console.log('現正掛賣NFT數量', totalListings)
        console.log('由此時間開始計起24小時', lastListingTime)
        console.log('timestamp', timestamp)
        if (Number(totalListings) >= 4) {
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: '提示',
                content: `你当前已经挂单${totalListings}张NFT，賣掉一張後可繼續掛單，且20分鐘內只能掛單4張NFT。`,
                showCancelButton: false,
                confirmText: t('modalConfirm.confirm'),
                onConfirm: () => {
                    proxy.$confirm.hide()
                    proxy.$loading.hide()
                },
            });
            return
        }
        proxy.$confirm.hide()
        console.log(timestamp * 1000 > new Date().getTime(), timestamp * 1000, new Date().getTime())
        if (Number(numListingsIn24Hours) >= 4 && timestamp * 1000 > new Date().getTime()) {
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: '提示',
                content: `20分鐘內一共只能買4張和同時掛單NFT，您當前已掛單或售賣${numListingsIn24Hours}張，${countDown(timestamp)}後可繼續掛單`,
                showCancelButton: false,
                confirmText: t('modalConfirm.confirm'),
                onConfirm: () => {
                    proxy.$confirm.hide()
                    proxy.$loading.hide()
                },
            });
            return
        }

    } catch (err) {
        console.log(err)
        proxy.$confirm.hide()
        proxy.$loading.hide()
        showToast('获取挂单状态失败，请重试')
        return
    }
    let time
    try { //禁售期
        time = await nftContractApi.sellOffPeriod(item.token_id)
        console.log('出售時間時間戳', Number(time))
        console.log('現在時間時間戳', parseInt(new Date().getTime() / 1000))
        if (Number(time) > parseInt(new Date().getTime() / 1000)) {
            // let timeAll = Number(time) + (new Date().getTime() / 1000)
            // showToast(countDown(Number(time)) + '後可出售')
            // proxy.$loading.hide()
            // return
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: '提示',
                content: `${countDown(Number(time))}後可出售`,
                showCancelButton: false,
                confirmText: t('modalConfirm.confirm'),
                onConfirm: () => {
                    proxy.$confirm.hide()
                    proxy.$loading.hide()
                },
            });
            return
        }
    } catch (err) {
        proxy.$loading.hide()
        console.log(err)
        showToast('獲取禁售期失敗，請重試')
        return
    }
    // return
    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await minterContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast('檢查MT授權狀態失敗，請重試')
        console.log(err)
    }
    const transactionResponse = await nftContractApi.isApprovedAll(localStorage.getItem('address'), config.nfts_marketplace_addr)
    console.log(transactionResponse)
    if (!transactionResponse) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
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
        showToast('檢查授權狀態失敗，請重試')
        console.log(err)
    }
    console.log('allowance', allowance)
    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
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
        proxy.$confirm.hide()
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
    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: '確認',
        content: `是否確認將Token ID為 ${item.token_id} 的NFT進行掛單?`,
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        onConfirm: async () => {
            try { //listNFT
                // proxy.$loading.show()
                console.log(item.token_id)
                proxy.$confirm.hide()
                item.opertingType = "正在挂单..."
                item.showOperting = true
                await nftContractApi.listNFT(item.token_id)
                // item.opertingType = "挂单成功"
                item.showOperting = false
                item.is_listed = true
                // showToast(`已成功掛單Token ID為 ${item.token_id} 的NFT`)
                // proxy.$loading.show()
                // proxy.$confirm.show({
                //     title: '成功',
                //     content: `已成功掛單Token ID為 ${item.token_id} 的NFT`,
                //     showCancelButton: false,
                //     confirmText: t('modalConfirm.confirm'),
                //     onConfirm: () => {

                //         setTimeout(() => {
                //             // proxy.$loading.hide()
                //             proxy.$confirm.hide()
                //             getUserNFTs()
                //             getUserCanSaleNFT()
                //             getAllNFT()
                //         }, 3000)
                //     }
                // })
                // setTimeout(() => {
                //     proxy.$loading.hide()
                //     showToast('掛單成功')
                //     getUserNFTs()
                //     getUserCanSaleNFT()
                //     getAllNFT()
                // }, 8000)


                // showToast(t('toast.success'))
            } catch (err) {
                proxy.$confirm.hide()
                proxy.$confirm.hide()
                item.showOperting = false
                item.is_listed = false
                proxy.$confirm.show({
                    title: '提示',
                    content: `Token ID為 ${item.token_id} 的NFT挂单失败，请重新挂单`,
                    showCancelButton: false,
                    confirmText: t('modalConfirm.confirm'),
                    onConfirm: () => {
                        proxy.$confirm.hide()
                        // toggleConfirmPayPopup()
                    },
                });
            }
        },
    });
}

//取消掛單
async function handleCancelList(item) {

    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await nftContractApi.isApprovedAll(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast('檢查授權狀態失敗，請重試')
        console.log(err)
    }
    console.log('isApprovedAll', isApprovedAll)

    if (Number(isApprovedAll) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '需要進行NFT授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: async () => {
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

    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: '確認',
        content: `是否取消掛單Token ID為 ${item.token_id} 的NFT?`,
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        onConfirm: async () => {
            try { //unlistNFT
                // proxy.$loading.show()

                console.log(item.token_id)
                proxy.$confirm.hide()
                item.opertingType = "正在挂单..."
                item.showOperting = true
                await nftContractApi.unlistNFT(item.token_id)
                // item.opertingType = "挂单成功"
                item.showOperting = false
                item.is_listed = false
                // showToast(`已成功掛單Token ID為 ${item.token_id} 的NFT`)


                // await nftContractApi.unlistNFT(item.token_id)
                // proxy.$confirm.hide()
                // proxy.$loading.show()
                // proxy.$confirm.show({
                //     title: '成功',
                //     content: `已成功取消Token ID為 ${item.token_id} 的NFT掛單`,
                //     showCancelButton: false,
                //     confirmText: t('modalConfirm.confirm'),
                //     onConfirm: () => {

                //         setTimeout(() => {
                //             proxy.$loading.hide()
                //             proxy.$confirm.hide()
                //             getUserNFTs()
                //             getUserCanSaleNFT()
                //             getAllNFT()
                //         }, 3000)
                //     }
                // })

                // proxy.$loading.show()
                // setTimeout(() => {
                //     proxy.$loading.hide()
                //     showToast('取消成功')
                //     getUserNFTs()
                //     getUserCanSaleNFT()
                //     getAllNFT()
                // }, 8000)
                // showToast(t('toast.success'))
            } catch (err) {
                proxy.$loading.hide()
                proxy.$confirm.hide()
                item.showOperting = false
                item.is_listed = true
                proxy.$confirm.show({
                    title: '提示',
                    content: '取消掛單失敗，請重試',
                    showCancelButton: false,
                    confirmText: t('modalConfirm.confirm'),
                    onConfirm: () => {
                        proxy.$confirm.hide()
                        // toggleConfirmPayPopup()
                    },
                });
            }
        },
    });


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
    if (index == 0) {
        getAllNFT()
    } else if (index == 1) {
        getUserNFTs()
    } else if (index == 2) {
        getUserCanSaleNFT()
    }
}   
</script>

<style></style>