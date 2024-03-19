<template>
    <div class="text-primary-color pt-12">
        <div class="pt-2">
            <div class="w-11/12 mr-auto ml-auto mt-4 flex justify-between items-center">
                <div>
                    <module-title titleWord="NFTs" />
                </div>
            </div>
            <div class="w-11/12 mr-auto ml-auto flex justify-end">
                <div>
                    <div class="text-gray-500 mr-5 rounded flex justify-center items-center h-8 w-8 border active-primary-color border-gray-500"
                        @click="refreshData">
                        <div class="icon iconfont icon-shuaxin icon-refresh" :class="loading ? 'animate-spin' : ''">
                        </div>
                    </div>
                </div>
                <div>
                    <van-popover v-model:show="showFilterPopover" theme="dark" placement="bottom-end" :actions="actions"
                        @select="onSelect">
                        <template #reference>
                            <div
                                class="flex justify-center items-center text-gray-500 border text-xs border-gray-500 active-primary-color  rounded px-3 h-8">
                                <div class="icon iconfont icon-screen mr-1" style="font-size: 12px;"></div>
                                <div class="">
                                    {{ actions[currentFilter].text }}
                                </div>
                            </div>
                        </template>
                    </van-popover>
                </div>
            </div>

            <!-- <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                    <nft-card :nftTokenType="item.token_type" :nftImg="nftOne" :tokenID="item.token_id" :price="item.price" :showCheckbox="false"
                        showBuyButton @handleBuyButton="handleBuyButton(item)" />
                </div>
            </div> -->
            <div class="border-b border-gray-700">
                <van-tabs class="pt-2" v-model:active="active" animated swipeable color="#e149ed"
                    title-inactive-color="#fff" title-active-color="#e149ed" background="transparent"
                    @click-tab="clickTab">
                    <van-tab title="N">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageN" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
                                    :showBuyButton="(userInfo.address !== item.address) && !item.showOperting && !item.showToRaffle"
                                    :showCancelButton="(userInfo.address == item.address) && !item.showOperting"
                                    :showOperting="item.showOperting" :showToRaffle="item.showToRaffle"
                                    @handleBuyButton="handleBuyButton(item, packageID == 1)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID == 1"
                                    @handleToRaffle="handleToRaffle(item, index)" />
                            </div>
                            <div v-show="packageN.length == 0"
                                class="text-white font-bold text-xl text-center mt-10 w-full">
                                {{ $t('modalConfirm.notData') }}
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="R">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
                                    :showBuyButton="(userInfo.address !== item.address) && !item.showOperting && !item.showToRaffle"
                                    :showCancelButton="(userInfo.address == item.address) && !item.showOperting"
                                    :showOperting="item.showOperting" :showToRaffle="item.showToRaffle"
                                    @handleBuyButton="handleBuyButton(item, packageID == 2)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID == 2"
                                    @handleToRaffle="handleToRaffle(item, index)" />
                            </div>
                            <div v-show="packageR.length == 0"
                                class="text-white font-bold text-xl text-center mt-10 w-full">
                                {{ $t('modalConfirm.notData') }}
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageSR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
                                    :showBuyButton="(userInfo.address !== item.address) && !item.showOperting && !item.showToRaffle"
                                    :showCancelButton="(userInfo.address == item.address) && !item.showOperting"
                                    :showOperting="item.showOperting" :showToRaffle="item.showToRaffle"
                                    @handleBuyButton="handleBuyButton(item, packageID == 3)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID == 3"
                                    @handleToRaffle="handleToRaffle(item, index)" />
                            </div>
                        </div>
                        <div v-show="packageSR.length == 0"
                            class="text-white font-bold text-xl text-center mt-10 w-full">
                            {{ $t('modalConfirm.notData') }}
                        </div>
                    </van-tab>
                    <van-tab title="SSR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageSSR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
                                    :showBuyButton="(userInfo.address !== item.address) && !item.showOperting && !item.showToRaffle"
                                    :showCancelButton="(userInfo.address == item.address) && !item.showOperting"
                                    :showOperting="item.showOperting" :showToRaffle="item.showToRaffle"
                                    @handleBuyButton="handleBuyButton(item, packageID == 4)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID == 4"
                                    @handleToRaffle="handleToRaffle(item, index)" />
                            </div>
                        </div>
                        <div v-show="packageSSR.length == 0"
                            class="text-white font-bold text-xl text-center mt-10 w-full">
                            {{ $t('modalConfirm.notData') }}
                        </div>
                    </van-tab>
                    <van-tab title="UR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageUR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
                                    :showBuyButton="(userInfo.address !== item.address) && !item.showOperting && !item.showToRaffle"
                                    :showCancelButton="(userInfo.address == item.address) && !item.showOperting"
                                    :showOperting="item.showOperting" :showToRaffle="item.showToRaffle"
                                    @handleBuyButton="handleBuyButton(item, packageID == 5)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID == 5"
                                    @handleToRaffle="handleToRaffle(item, index)" />
                            </div>
                        </div>
                        <div v-show="packageUR.length == 0"
                            class="text-white font-bold text-xl text-center mt-10 w-full">
                            {{ $t('modalConfirm.notData') }}
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import NftCard from '@/components/NftCard.vue';
import ModuleTitle from "@/components/ModuleTitle.vue";
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import { marketplace, getLuckyDraw, playersInfo } from '@/request/api'
import nftContractApi from '@/request/nft'
import minterContractApi from '@/request/minter'
import { showToast } from 'vant';
import { config } from '@/const/config'
import nftOne from '@/assets/images/200.png'
import nftTwo from '@/assets/images/600.png'
import nftThree from '@/assets/images/2000.png'
import nftFour from '@/assets/images/6000.png'
import nftFive from '@/assets/images/20000.png'
import Web3 from "web3";
import { userStore } from "@/stores/user";
import pmtContractApi from '@/request/pmt'
import mtContractApi from '@/request/mt'

const { t } = useI18n()
const router = useRouter()
const { proxy } = getCurrentInstance()
let nftsDatas = ref([])
let packageN = ref([])
let packageR = ref([])
let packageSR = ref([])
let packageSSR = ref([])
let packageUR = ref([])
let nftInfo = ref({})
let packageID = ref()
let showFilterPopover = ref(false)
let currentFilter = ref(0)
let tokenID = ref(null)
let timer = ref(null)
let active = ref(0)
let loading = ref(false)
let prizeIndex = ref(null)
let nftPrice = ref(null)
let sortDesc = ref(null)
// let actions = ref([
//     { text: '价格由高到低', value: true, index: 0 },
//     { text: '价格由低到高', value: false, index: 1 }
// ])
let actions = computed(() => {
    return [
        { text: t('wallet.highToLow'), value: true, index: 0 },
        { text: t('wallet.lowToHigh'), value: false, index: 1 }
    ]
})
const userInfo = userStore()


onMounted(() => {
    getMaxPackage()
})

//点击tab栏
function clickTab(tab) {
    // console.log(tab.name)
    let params = { perPage: 100000, status: 1, package_id: tab.name + 1 }
    getMarketplace(params)
}
//刷新
function refreshData() {
    loading.value = true
    let params = { perPage: 100000, status: 1, package_id: packageID.value }
    getMarketplace(params)
}

function onSelect(select) {
    console.log(select)
    currentFilter.value = select.index
    sortDesc.value = select.value
    let params = { perPage: 100000, status: 1, sortBy: 'price', sortDesc: select.value, package_id: packageID.value }
    getMarketplace(params)
}
//獲取當前最高配套
async function getMaxPackage() {
    proxy.$loading.show()
    let result = await playersInfo(localStorage.getItem('address'))
    // console.log(result)
    packageID.value = result.player.max_package_id
    active.value = result.player.max_package_id - 1
    let params = { perPage: 100000, status: 1, package_id: packageID.value }
    getMarketplace(params)
    // //console.log(active.value)
}
//取消掛單
async function handleCancelList(item) {
    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await nftContractApi.isApprovedAll(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        // showToast('檢查NFT授權錯誤，請重試')
        showToast(`${t('modalConfirm.checkAuthFail', { type: "NFT" })}`)
        //console.log(err)
    }
    //console.log('isApprovedAll', isApprovedAll)

    if (Number(isApprovedAll) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()

        proxy.$confirm.show({
            title: t('modalConfirm.authorize'),
            content: t('modalConfirm.pleaseAuthorize', { type: 'NFT' }),
            showCancelButton: false,
            confirmText: t('modalConfirm.toAuthorize'),
            onConfirm: () => {
                // proxy.$loading.show()
                // pmt对nft授權
                nftContractApi.setApprovalForAll(config.nfts_marketplace_addr)
                    .then(res => {
                        //console.log(res)
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast(t('modalConfirm.successAuthorize'))

                    })
                    .catch(err => {
                        //console.log(err)
                        proxy.$confirm.hide()
                        showToast(t('modalConfirm.authorizeFail', { type: 'NFT' }))
                    })
            },
        });
        return
    }

    try { //unlistNFT
        //console.log(item.token_id)
        proxy.$confirm.hide()
        // item.opertingType = "正在挂单..."
        item.showOperting = true
        await nftContractApi.unlistNFT(item.token_id)
        // item.opertingType = "挂单成功"
        item.showOperting = false
        item.is_listed = true
        // showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('modalConfirm.cancelFail'))
        item.showOperting = false
        item.is_listed = false
        //console.log(err)
    }
}

//獲取可購買的nft列表
function getMarketplace(params) {
    proxy.$loading.show()
    marketplace(params)
        .then(res => {
            packageN.value = []
            packageR.value = []
            packageSR.value = []
            packageSSR.value = []
            packageUR.value = []
            // packageID.value = res.last_package.package_id
            if (res.message == '玩家沒有購買配套。') {
                proxy.$loading.hide()
                proxy.$confirm.hide()
                proxy.$confirm.show({
                    title: t('modalConfirm.tips'),
                    content: t('modalConfirm.notPackage'),
                    showCancelButton: false,
                    confirmText: t('modalConfirm.confirm'),
                    onConfirm: () => {
                        // proxy.$loading.show()
                        window.history.go(-1);
                    },
                });
            }
            // console.log('nft列表', res)
            // console.log(' active.value', active.value)
            nftsDatas.value = res.market_places
            res.market_places.map(item => {
                item.showOperting = false
                item.showToRaffle = false
                // //console.log(Number(item.token_type), item.token_id)
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
                if (active.value == 0) {
                    packageN.value.push(item)
                }
                if (active.value == 1) {
                    packageR.value.push(item)
                }
                if (active.value == 2) {
                    packageSR.value.push(item)
                }
                if (active.value == 3) {
                    packageSSR.value.push(item)
                }
                if (active.value == 4) {
                    packageUR.value.push(item)
                }
                loading.value = false
            })
            proxy.$loading.hide()
        })
        .catch(err => {
            //console.log(err)
            proxy.$loading.hide()
            loading.value = false

        })
}

// async function getPMTBalance() {
//     let balance = await pmtContractApi.balanceOf(localStorage.getItem('address'))
//     let WEB3 = new Web3(window.ethereum)
//     let result = WEB3.utils.fromWei(balance.toString(), 'ether')
//     //console.log('pmt', result)
//     pmtBalance.value = result
//     return balance
// }
// async function getMTBalance() {
//     let balance = await mtContractApi.balanceOf(localStorage.getItem('address'))
//     let WEB3 = new Web3(window.ethereum)
//     let result = WEB3.utils.fromWei(balance.toString(), 'ether')
//     //console.log('mt', result)
//     mtBalance.value = result
//     return balance
// }

async function isNotEnoughBalance(amount) {
    let WEB3 = new Web3(window.ethereum)
    let mtBalance = await mtContractApi.balanceOf(localStorage.getItem('address'))
    mtBalance = WEB3.utils.fromWei(mtBalance.toString(), 'ether')
    let pmtBalance = await pmtContractApi.balanceOf(localStorage.getItem('address'))
    pmtBalance = WEB3.utils.fromWei(pmtBalance.toString(), 'ether')
    let mtLockBalance = await minterContractApi.getLockedAmount(localStorage.getItem('address'))
    mtLockBalance = WEB3.utils.fromWei(mtLockBalance.toString(), 'ether')
    let pmtLockBalance = await pmtContractApi.getLockedAmount(localStorage.getItem('address'))
    pmtLockBalance = WEB3.utils.fromWei(pmtLockBalance.toString(), 'ether')
    let balance = Number(mtBalance) - Number(mtLockBalance) + Number(pmtBalance) + Number(pmtLockBalance)
    // console.log(balance,)
    // console.log(Number(amount))
    // console.log(Number(mtBalance))
    // console.log(Number(mtLockBalance))
    // console.log(Number(pmtBalance))
    // console.log(Number(pmtLockBalance))
    // console.log(balance < Number(amount))
    // if (parseInt(mtBalance) - parseInt(mtLockBalance) == 0) {
    //     (parseInt(pmtBalance) + parseInt(pmtLockBalance)) < parseInt(amount)
    // }
    return balance < Number(amount)
}
//點擊去抽獎
function handleToRaffle(item, index) {
    //console.log('去抽奖')
    router.push({
        path: '/market/raffle',
        query: {
            prizeIndex: prizeIndex.value,
            nftPrice: nftPrice.value,
        }
    })
    // router.push({
    //     path: '/personal/exchange'
    // })
}
// 點擊購買配套按鈕
async function handleBuyButton(item, canBuy) {
    //console.log(item, canBuy)
    if (!canBuy) {
        showToast(`${t('modalConfirm.cantBuyNFTInPool')}`)
        return
    }
    proxy.$loading.show()
    try {
        if (await isNotEnoughBalance(item.price)) {
            proxy.$loading.hide()
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: t('modalConfirm.tips'),
                content: t('modalConfirm.notEnougtMTAndPMT'),
                confirmText: t('modalConfirm.confirm'),
                showCancelButton: false,
                onConfirm: () => {
                    proxy.$confirm.hide()
                }
            })
            return
        }
    } catch (err) {
        console.log(err)
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.tips'),
            content: t('modalConfirm.getBalanceFail'),
            showCancelButton: false,
            onConfirm: () => {
                proxy.$confirm.hide()
            }
        })
        return
    }
    let allowance
    try { //检查pmt对pmt_purchase的授权状态
        allowance = await nftContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(`${t('modalConfirm.checkAuthFail', { type: "PMT" })}`)
        //console.log(err)
    }
    proxy.$loading.hide()
    //console.log('allowance', allowance)
    if (Number(allowance) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.authorize'),
            content: t('modalConfirm.pleaseAuthorize', { type: 'PMT' }),
            showCancelButton: false,
            confirmText: t('modalConfirm.toAuthorize'),
            onConfirm: () => {
                // proxy.$loading.show()
                // pmt对nft授權
                nftContractApi.approve(config.nfts_marketplace_addr)
                    .then(res => {
                        //console.log(res)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast(t('modalConfirm.successAuthorize'))
                    })
                    .catch(err => {
                        //console.log(err)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        //console.log('err', err)
                        proxy.$confirm.show({
                            title: t('modalConfirm.tips'),
                            content: t('modalConfirm.authorizeFail', { type: 'PMT' }),
                            showCancelButton: false,
                            confirmText: t('modalConfirm.confirm'),
                            onConfirm: () => {
                                proxy.$confirm.hide()
                                // toggleConfirmPayPopup()
                            },
                        });
                    })
            },
        });
        return
    }

    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await minterContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(`${t('modalConfirm.checkAuthFail', { type: 'MT' })}`)
        //console.log(err)
    }
    proxy.$loading.hide()
    if (Number(isApprovedAll) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.authorize'),
            content: t('modalConfirm.pleaseAuthorize', { type: 'MT' }),
            showCancelButton: false,
            confirmText: t('modalConfirm.toAuthorize'),
            onConfirm: () => {
                // proxy.$loading.show()
                // pmt对nft授權
                minterContractApi.approve(config.nfts_marketplace_addr)
                    .then(res => {
                        //console.log(res)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast(t('modalConfirm.successAuthorize'))

                    })
                    .catch(err => {
                        //console.log(err)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        //console.log('err', err)
                        proxy.$confirm.show({
                            title: t('modalConfirm.tips'),
                            // content: 'MT授權失敗，請重新授權',
                            content: `${t('modalConfirm.authorizeFail', { type: 'MT' })}`,
                            showCancelButton: false,
                            confirmText: t('modalConfirm.confirm'),
                            onConfirm: () => {
                                proxy.$confirm.hide()
                                // toggleConfirmPayPopup()
                            },
                        });
                    })
            },
        });
        return
    }
    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        // content: `是否確認購買Token ID為${item.token_id}的NFT`,
        content: t('modalConfirm.confirmBuyNFT'),
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        cancelText: t('modalConfirm.cancel'),
        onConfirm: async () => {
            try { //购买nft
                proxy.$confirm.hide()
                //console.log('item', item)
                tokenID.value = item.token_id
                try {
                    item.showOperting = true
                    await nftContractApi.purchaseNFT(item.token_id)
                    // clearInterval(timer.value)
                    let timer = setInterval(async () => {
                        // getLuckyRes()

                        let raffleResult = await getLuckyDraw({ nft_token_id: item.token_id })
                        //console.log('抽獎結果', raffleResult)
                        if (raffleResult.message == "已成功抽獎") {
                            // //console.log(res)
                            item.showOperting = false
                            item.showToRaffle = true
                            prizeIndex.value = raffleResult.roulette_record.roulette_id
                            nftPrice.value = raffleResult.roulette_record.nft_price
                            //console.log(prizeIndex.value, nftPrice.value)
                            clearInterval(timer)
                        }
                    }, 2000);


                } catch (err) {
                    //console.log(err)
                    proxy.$confirm.hide()
                    item.showOperting = false
                    item.showToRaffle = false
                    proxy.$confirm.show({
                        title: t('modalConfirm.tips'),
                        content: '購買失敗，請重新購買。',
                        // content: `Token ID為${item.token_id}的NFT購買失敗，請重新購買。`,
                        showCancelButton: false,
                        confirmText: t('modalConfirm.confirm'),
                        onConfirm: () => {
                            proxy.$confirm.hide()
                            // toggleConfirmPayPopup()
                        },
                    });
                }
            } catch (err) {
                proxy.$loading.hide()
                proxy.$confirm.hide()
                item.showOperting = false
                item.showToRaffle = false
                proxy.$confirm.show({
                    title: t('modalConfirm.tips'),
                    content: '購買失敗，請重新購買。',
                    showCancelButton: false,
                    confirmText: t('modalConfirm.confirm'),
                    onConfirm: () => {
                        proxy.$confirm.hide()
                        // toggleConfirmPayPopup()
                    },
                });
            }

        },
        // onCacncel: async () => {
        //     proxy.$confirm.hide()
        // }
    });
    //抽奖结果
    function getLuckyRes() {
        getLuckyDraw({ nft_token_id: tokenID.value })
            .then(res => {
                if (res.message == "已成功抽獎") {
                    // //console.log(res)
                    proxy.$confirm.hide()
                    clearInterval(timer.value)
                    if (!res.is_shown) {
                        router.push({
                            path: '/market/raffle',
                            query: {
                                // prizeID: luckyResult.roulette_record.prize_type_id,
                                // prizeName: luckyResult.roulette_record.prize_type.name,
                                // rewardPercentage: luckyResult.roulette_record.reward_percentage,
                                prizeIndex: res.roulette_record.roulette_id,
                                nftPrice: res.roulette_record.nft_price,
                            }
                        })
                    } else {
                        router.push({
                            path: '/earnings/operation-record',

                        })
                    }
                }
            })
            .catch(err => {
                proxy.$loading.hide()
                // showToast('購買失敗，請重試')
                //console.log(err)
            })
    }

}


</script>

<style scoped>
.term {
    @apply px-3 py-0.5 border border-secondary-icon rounded text-secondary-icon;
}

.tabs-content {
    @apply pt-10 w-11/12 mr-auto ml-auto text-secondary-icon flex justify-between flex-wrap;
}

.tabs-item {
    width: 48%;
}
</style>

<style>
.van-tabs,
.van-tabs--line {
    height: 52px;
}

.van-tab__panel {
    background: transparent;
    padding-bottom: 20px;
    margin-top: 0.5px;
}
</style>