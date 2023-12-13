<template>
    <div class="text-primary-color bg-black pt-12">
        <div class="pt-2 bg-black">
            <div class="w-11/12 mr-auto ml-auto mt-4">
                <module-title titleWord="NFTs" />
            </div>
            <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                    <nft-card :nftImg="nftOne" :tokenID="item.token_id" :price="item.price" :showCheckbox="false"
                        showBuyButton @handleBuyButton="handleBuyButton(item)" />
                </div>
            </div>
            <!-- <div class="border-b border-gray-700">
                <van-tabs class="pt-2 bg-black" v-model:active="active" animated swipeable color="#e149ed"
                    title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
                    <van-tab title="N">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftOne" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="R">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftTwo" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftThree" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SSR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftFour" :showCheckbox="false" @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="UR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in nftsDatas" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :nftImg="nftFive" :showCheckbox="false" showBuyButton
                                    @handleBuyButton="handleBuyButton" />
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div> -->
        </div>

    </div>
</template>

<script setup>
import NftCard from '@/components/NftCard.vue';
import ModuleTitle from "@/components/ModuleTitle.vue";
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
import { marketplace } from '@/request/api'
import nftContractApi from '@/request/nft'
import { showToast } from 'vant';
import { config } from '@/const/config'
import nftOne from '@/assets/images/nftOne.png'
import nftTwo from '@/assets/images/nftTwo.png'
import nftThree from '@/assets/images/nftThree.png'
import nftFour from '@/assets/images/nftFour.png'
import nftFive from '@/assets/images/nftFive.png'

const { t } = useI18n()
const router = useRouter()
const { proxy } = getCurrentInstance()
let nftsDatas = ref([])
let nftInfo = ref({})

onMounted(() => {
    getMarketplace()
})

//獲取可購買的nft列表
function getMarketplace() {
    proxy.$loading.show()
    marketplace({ perPage: 100000 })
        .then(res => {

            if (res.message == '玩家沒有購買配套。') {
                proxy.$loading.hide()
                proxy.$confirm.show({
                    title: '提示',
                    content: '您當前沒有購買配套。',
                    showCancelButton: false,
                    confirmText: '確定',
                    onConfirm: () => {
                        proxy.$loading.show()
                        window.history.go(-1);
                    },
                });
            }
            console.log('nft列表', res)
            nftsDatas.value = res.market_places
            proxy.$loading.hide()
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()
        })
}



async function handleBuyButton(item) {
    console.log(item)
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

    try { //购买nft
        proxy.$loading.show()
        // console.log('item', item)
        // return
        await nftContractApi.purchaseNFT(item.token_id)
        proxy.$loading.hide()
        proxy.$confirm.show({ //nft购买成功进入抽奖
            title: t('modalConfirm.buySuccess'),
            content: t('modalConfirm.luckyDraw'),
            showCancelButton: false,
            confirmText: t('modalConfirm.confirm'),
            onConfirm: () => {
                proxy.$confirm.hide()
                router.push({
                    path: '/market/raffle',
                    query: {
                        address: item.address,
                        nft_price: item.price,
                        nft_token_id: item.token_id
                    }
                })
            },
        });
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