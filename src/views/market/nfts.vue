<template>
    <div class="text-primary-color bg-black pt-12">
        <div class="pt-2 bg-black">
            <div class="w-11/12 mr-auto ml-auto mt-4">
                <module-title titleWord="NFTs" />
            </div>
            <!-- <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                    <nft-card :nftImg="nftOne" :tokenID="item.token_id" :price="item.price" :showCheckbox="false"
                        showBuyButton @handleBuyButton="handleBuyButton(item)" />
                </div>
            </div> -->
            <div class="border-b border-gray-700">
                <van-tabs class="pt-2 bg-black" v-model:active="active" animated swipeable color="#e149ed"
                    title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
                    <van-tab title="N">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageN" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftOne" :showCheckbox="false"
                                    :showBuyButton="userInfo.address !== item.address"
                                    :showCancelButton="userInfo.address == item.address"
                                    @handleBuyButton="handleBuyButton(item, packageID >= 1)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID >= 1" />
                            </div>
                            <div v-show="packageN.length == 0"
                                class="text-white font-bold text-xl text-center mt-10 w-full">
                                暫無數據
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="R">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftTwo" :showCheckbox="false"
                                    :showBuyButton="userInfo.address !== item.address"
                                    :showCancelButton="userInfo.address == item.address"
                                    @handleBuyButton="handleBuyButton(item, packageID >= 2)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID >= 2" />
                            </div>
                            <div v-show="packageR.length == 0"
                                class="text-white font-bold text-xl text-center mt-10 w-full">
                                暫無數據
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageSR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftThree" :showCheckbox="false"
                                    :showBuyButton="userInfo.address !== item.address"
                                    :showCancelButton="userInfo.address == item.address"
                                    @handleBuyButton="handleBuyButton(item, packageID >= 3)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID >= 3" />
                            </div>
                        </div>
                        <div v-show="packageSR.length == 0" class="text-white font-bold text-xl text-center mt-10 w-full">
                            暫無數據
                        </div>
                    </van-tab>
                    <van-tab title="SSR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageSSR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftFour" :showCheckbox="false"
                                    :showBuyButton="userInfo.address !== item.address"
                                    :showCancelButton="userInfo.address == item.address"
                                    @handleBuyButton="handleBuyButton(item, packageID >= 4)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID >= 4" />
                            </div>
                        </div>
                        <div v-show="packageSSR.length == 0" class="text-white font-bold text-xl text-center mt-10 w-full">
                            暫無數據
                        </div>
                    </van-tab>
                    <van-tab title="UR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageUR" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftFive" :showCheckbox="false"
                                    :showBuyButton="userInfo.address !== item.address"
                                    :showCancelButton="userInfo.address == item.address"
                                    @handleBuyButton="handleBuyButton(item, packageID >= 5)" :tokenID="item.token_id"
                                    @handleCancel="handleCancelList(item)" :price="item.price" :canBuy="packageID >= 5" />
                            </div>
                        </div>
                        <div v-show="packageUR.length == 0" class="text-white font-bold text-xl text-center mt-10 w-full">
                            暫無數據
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
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import { marketplace, getLuckyDraw } from '@/request/api'
import nftContractApi from '@/request/nft'
import minterContractApi from '@/request/minter'
import { showToast } from 'vant';
import { config } from '@/const/config'
import nftOne from '@/assets/images/nftOne.png'
import nftTwo from '@/assets/images/nftTwo.png'
import nftThree from '@/assets/images/nftThree.png'
import nftFour from '@/assets/images/nftFour.png'
import nftFive from '@/assets/images/nftFive.png'
import { userStore } from "@/stores/user";

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
const userInfo = userStore()


onMounted(() => {
    getMarketplace()


})

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
        // showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
}

//獲取可購買的nft列表
function getMarketplace() {
    proxy.$loading.show()
    marketplace({ perPage: 100000, status: 1 })
        .then(res => {
            packageID.value = res.last_package.package_id
            if (res.message == '玩家沒有購買配套。') {
                proxy.$loading.hide()
                proxy.$confirm.show({
                    title: '提示',
                    content: '您當前沒有購買配套。',
                    showCancelButton: false,
                    confirmText: '確定',
                    onConfirm: () => {
                        // proxy.$loading.show()
                        window.history.go(-1);
                    },
                });
            }
            console.log('nft列表', res)
            nftsDatas.value = res.market_places
            res.market_places.map(item => {
                // console.log(Number(item.price))
                if (Number(item.price) >= 0 && Number(item.price) <= 100) {
                    packageN.value.push(item)
                }
                if (Number(item.price) >= 75 && Number(item.price) <= 300) {
                    packageR.value.push(item)
                }

                if (Number(item.price) >= 250 && Number(item.price) <= 1000) {
                    packageSR.value.push(item)
                }
            })
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()
        })
}



async function handleBuyButton(item, canBuy) {
    console.log(item, canBuy)
    if (!canBuy) {
        showToast('您购买的配套等级不可购买该卡池NFT')
        return
    }
    // return
    // nftInfo.value = item
    proxy.$loading.show()
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
            content: '需要進行PMT授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                // proxy.$loading.show()
                // pmt对nft授權
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

    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await minterContractApi.allowance(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }

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



    try { //购买nft
        proxy.$loading.show()
        console.log('item', item)
        // return
        let purchaseNFTInfo
        let luckyResult
        try {
            await nftContractApi.purchaseNFT(item.token_id)
            console.log(purchaseNFTInfo)
            luckyResult = await getLuckyDraw({ nft_token_id: item.token_id })
            console.log('luckyResult', luckyResult)
        } catch (err) {
            showToast('購買失敗，請重試')
            return
        }
        proxy.$loading.hide()
        router.push({
            path: '/market/raffle',
            query: {
                // prizeID: luckyResult.roulette_record.prize_type_id,
                // prizeName: luckyResult.roulette_record.prize_type.name,
                // rewardPercentage: luckyResult.roulette_record.reward_percentage,
                prizeIndex: luckyResult.roulette_record.roulette_id
            }
        })
        // proxy.$loading.hide()
        // proxy.$confirm.show({ //nft购买成功进入抽奖
        //     title: t('modalConfirm.buySuccess'),
        //     content: t('modalConfirm.luckyDraw'),
        //     showCancelButton: false,
        //     confirmText: t('modalConfirm.confirm'),
        //     onConfirm: () => {
        //         proxy.$confirm.hide()
        //         router.push({
        //             path: '/market/raffle',
        //             query: {
        //                 address: item.address,
        //                 nft_price: item.price,
        //                 nft_token_id: item.token_id
        //             }
        //         })
        //     },
        // });
        // showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }




}

onMounted(() => {
    // console.log(route.query.target)
    // active.value = route.query.target
})
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
    background: #000;
    padding-bottom: 20px;
    margin-top: 0.5px;
}
</style>