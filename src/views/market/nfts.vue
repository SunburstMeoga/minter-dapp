<template>
    <div class="text-primary-color pt-12">
        <div class="pt-2">
            <div class="w-11/12 mr-auto ml-auto mt-4">
                <module-title titleWord="NFTs" />
            </div>
            <div class="w-11/12 mr-auto ml-auto flex justify-end">
                <van-popover v-model:show="showFilterPopover" theme="dark" placement="bottom-end" :actions="actions"
                    @select="onSelect">
                    <template #reference>
                        <div
                            class="flex justify-center items-center text-gray-500 border text-xs border-gray-500  rounded px-3 py-1">
                            <div class="icon iconfont icon-screen mr-1" style="font-size: 12px;"></div>
                            <div class="">
                                {{ actions[currentFilter].text }}
                            </div>
                        </div>
                    </template>
                </van-popover>
            </div>

            <!-- <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                    <nft-card :nftTokenType="item.token_type" :nftImg="nftOne" :tokenID="item.token_id" :price="item.price" :showCheckbox="false"
                        showBuyButton @handleBuyButton="handleBuyButton(item)" />
                </div>
            </div> -->
            <div class="border-b border-gray-700">
                <van-tabs class="pt-2" v-model:active="active" animated swipeable color="#e149ed"
                    title-inactive-color="#fff" title-active-color="#e149ed" background="transparent">
                    <van-tab title="N">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in packageN" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
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
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
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
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
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
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
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
                                <nft-card :nftTokenType="item.token_type" :nftImg="item.nftImg" :showCheckbox="false"
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
let showFilterPopover = ref(false)
let currentFilter = ref(0)
let tokenID = ref(null)
let timer = ref(null)
let active = ref(0)
let actions = ref([
    { text: '价格由高到低', value: true, index: 0 },
    { text: '价格由低到高', value: false, index: 1 }
])
const userInfo = userStore()


onMounted(() => {
    let params = { perPage: 100000, status: 1 }
    getMarketplace(params)
    getMaxPackage()
})

function onSelect(select) {
    console.log(select)
    currentFilter.value = select.index
    let params = { perPage: 100000, status: 1, sortBy: 'price', sortDesc: select.value }
    getMarketplace(params)
}
//獲取當前最高配套
async function getMaxPackage() {
    let result = await playersInfo(localStorage.getItem('address'))
    console.log(result.player.max_package_id)
    active.value = result.player.package_transactions[0].package_id - 1
    console.log(active.value)
}
//取消掛單
async function handleCancelList(item) {
    let isApprovedAll
    try { //检查pmt对pmt_purchase的授权状态
        isApprovedAll = await nftContractApi.isApprovedAll(localStorage.getItem('address'), config.nfts_marketplace_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast('檢查NFT授權錯誤，請重試')
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
                        showToast('您取消了NFT授权')
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
        showToast('撤銷掛單失敗，請重試')
        console.log(err)
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
            packageID.value = res.last_package.package_id
            if (res.message == '玩家沒有購買配套。') {
                proxy.$loading.hide()
                proxy.$confirm.hide()
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
                console.log(Number(item.token_type))
                if (item.token_type == 1) {
                    item.nftImg = nftOne
                }
                if (item.token_type == 2) {
                    item.nftImg = nftTwo
                }
                if (item.token_type == 3) {
                    item.nftImg = nftThree
                }
                // if (item.token_type == 4) {
                //     item.nftImg = nftFour
                // }
                // if (item.token_type == 5) {
                //     item.nftImg = nftFour
                // }
                if (item.token_type == 1) {
                    packageN.value.push(item)
                }
                if (item.token_type == 2) {
                    packageR.value.push(item)
                }
                if (item.token_type == 3) {
                    packageSR.value.push(item)
                }
                // if (Number(item.price) >= 0 && Number(item.price) <= 100) {
                //     packageN.value.push(item)
                //     packageN.value.map(item => {
                //         item.nftImg = nftOne
                //         // item.token_type = 1
                //         // if (item.token_type == 1) {
                //         //     item.nftImg = nftOne
                //         // } else if (item.token_type == 2) {
                //         //     item.nftImg = nftTwo
                //         // } else if (item.token_type == 3) {
                //         //     item.nftImg = nftThree
                //         // } else if (item.token_type == 4) {
                //         //     item.nftImg = nftFour
                //         // } else if (item.token_type == 5) {
                //         //     item.nftImg = nftFour
                //         // }
                //     })
                // }
                // if (Number(item.price) >= 75 && Number(item.price) <= 300) {
                //     packageR.value.push(item)
                //     if (packageR.value.length !== 0) {
                //         packageR.value.map(item => {
                //             item.nftImg = nftTwo
                //             // if (item.token_type == 1) {
                //             //     item.nftImg = nftOne
                //             // } else if (item.token_type == 2) {
                //             //     item.nftImg = nftTwo
                //             // } else if (item.token_type == 3) {
                //             //     item.nftImg = nftThree
                //             // } else if (item.token_type == 4) {
                //             //     item.nftImg = nftFour
                //             // } else if (item.token_type == 5) {
                //             //     item.nftImg = nftFour
                //             // }
                //         })
                //     }
                // }

                // if (Number(item.price) >= 250 && Number(item.price) <= 1000) {
                //     packageSR.value.push(item)

                //     if (packageSR.value.length !== 0) {
                //         packageSR.value.map(item => {
                //             // item.token_type = 3
                //             item.nftImg = nftThree
                //             // if (item.token_type == 1) {
                //             //     item.nftImg = nftOne
                //             // } else if (item.token_type == 2) {
                //             //     item.nftImg = nftTwo
                //             // } else if (item.token_type == 3) {
                //             //     item.nftImg = nftThree
                //             // } else if (item.token_type == 4) {
                //             //     item.nftImg = nftFour
                //             // } else if (item.token_type == 5) {
                //             //     item.nftImg = nftFour
                //             // }
                //         })
                //     }
                // }
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
        showToast('檢查PMT授權錯誤，請重試')
        console.log(err)
    }
    proxy.$loading.hide()
    console.log('allowance', allowance)
    if (Number(allowance) == 0) { //當前賬號未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
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
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast('授權成功')

                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        console.log('err', err)
                        proxy.$confirm.show({
                            title: '提示',
                            content: 'PMT授權失敗，請重新授權',
                            showCancelButton: false,
                            confirmText: '確定',
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
        showToast('檢查MT授權狀態失敗，請重試')
        console.log(err)
    }
    proxy.$loading.hide()
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
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast('授權成功')

                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$loading.hide()
                        proxy.$confirm.hide()
                        console.log('err', err)
                        proxy.$confirm.show({
                            title: '提示',
                            content: 'MT授權失敗，請重新授權',
                            showCancelButton: false,
                            confirmText: '確定',
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
        title: '提示',
        content: `是否確認購買Token ID為${item.token_id}的NFT`,
        showCancelButton: true,
        confirmText: '確定',
        onConfirm: async () => {
            try { //购买nft
                // proxy.$loading.show()
                console.log('item', item)
                tokenID.value = item.token_id
                // return
                let purchaseNFTInfo
                let luckyResult
                try {
                    purchaseNFTInfo = await nftContractApi.purchaseNFT(item.token_id)
                    timer.value = setInterval(() => {
                        getLuckyRes()
                    }, 5000);


                } catch (err) {
                    proxy.$confirm.hide()
                    proxy.$confirm.show({
                        title: '提示',
                        content: '購買失敗，請重新購買。',
                        showCancelButton: false,
                        confirmText: '確定',
                        onConfirm: () => {
                            proxy.$confirm.hide()
                            // toggleConfirmPayPopup()
                        },
                    });
                }
            } catch (err) {
                proxy.$loading.hide()
                proxy.$confirm.hide()

                proxy.$confirm.show({
                    title: '提示',
                    content: '購買失敗，請重新購買。',
                    showCancelButton: false,
                    confirmText: '確定',
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



    function getLuckyRes() {
        getLuckyDraw({ nft_token_id: tokenID.value })
            .then(res => {
                if (res.message == "已成功抽獎") {
                    // console.log(res)
                    proxy.$confirm.hide()
                    clearInterval(timer.value)
                    if (!res.is_shown) {
                        router.push({
                            path: '/market/raffle',
                            query: {
                                // prizeID: luckyResult.roulette_record.prize_type_id,
                                // prizeName: luckyResult.roulette_record.prize_type.name,
                                // rewardPercentage: luckyResult.roulette_record.reward_percentage,
                                prizeIndex: res.roulette_record.roulette_id
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
                showToast('購買失敗，請重試')
                console.log(err)
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