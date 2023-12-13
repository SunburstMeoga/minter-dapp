<template>
    <div class="text-primary-color">
        <div class="pb-20 pt-12 bg-black">
            <div class="flex justify-center items-center">
                <div class="w-11/12 ">
                    <static-earnings />
                </div>
                <div class="w-11/12 ">
                    <dynamic-earnings />
                </div>
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <module-title :titleWord="$t('wallet.title')"></module-title>
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card isUSD3 currency="USD3" isRecharge isWithdraw @recharge="handleWalletCardRecharge"
                    @withdraw="handleWalletCardWithdraw" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="PMT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="MT" isExchange @exchange="handleWalletCardExchange" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="BT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card :currency="'RT' + '(' + $t('order.bind') + ')'" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="RT" @transfer="handleWalletCardTransfer" isTrasfer />
            </div>
            <div class="border-b border-gray-800 w-11/12 mr-auto ml-auto mb-3"></div>
            <div class="flex justify-between items-center w-11/12 mr-auto ml-auto mb-2">
                <div class="w-full">
                    <div class="w-full flex justify-between items-center px-2 py-2 bg-gray-800 rounded mb-4 active-primary-color"
                        @click="viewCoherents">
                        <div class="flex justify-start items-center">
                            <div class="pr-1 font-bold text-lg">0</div>
                            <div class="text-white">{{ $t('wallet.coherent') }}</div>
                        </div>
                        <div class="flex justify-end items-center text-white ">
                            <div class="pr-1 text-sm">{{ $t('wallet.details') }}</div>
                            <div class="icon iconfont icon-right"></div>
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-center px-2 py-2 bg-gray-800 rounded mb-4 active-primary-color"
                        @click="viewNFTs">
                        <div class="flex justify-start items-center">
                            <div class="pr-1 font-bold text-lg">0</div>
                            <div class="text-white">NFTs</div>
                        </div>
                        <div class="flex justify-end items-center text-white active-white-color">
                            <div class="pr-1 text-sm">{{ $t('wallet.details') }}</div>
                            <div class="icon iconfont icon-right"></div>
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-center px-2 py-2 bg-gray-800 rounded active-primary-color"
                        @click="viewCoherents">
                        <div class="flex justify-start items-center">
                            <div class="pr-1 font-bold text-lg">0</div>
                            <div class="text-white">承諾卡</div>
                        </div>
                        <div class="flex justify-end items-center text-white active-white-color">
                            <div class="pr-1 text-sm">{{ $t('wallet.details') }}</div>
                            <div class="icon iconfont icon-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="w-11/12 mr-auto ml-auto">
                <div class="flex justify-between items-center pt-2">
                    <div class="px-2 py-0.5 text-sm flex justify-start items-center mb-2">
                        <van-checkbox v-model="isUnanimous" checked-color="#e149ed" icon-size="18px"></van-checkbox>
                        <div class="pl-2" :class="isUnanimous ? 'text-primary-color' : 'text-white'">{{
                            $t('wallet.unanimous') }}</div>
                    </div>
                    <div class="px-2.5 py-1 text-base rounded  mb-2 operating-button text-white"
                        v-for="(item, index) in operatorList" :key="index" @click="handleOperatorItem(item, index)">
                        {{ item.title }}
                    </div>
                </div>
                <div class="border-b border-gray-800 mb-2 ">

                </div>
            </div>
            <div class="flex justify-start items-center  mr-auto ml-auto flex-wrap mb-2">
                <div class="ml-4 px-2 py-0.5 text-xs border  rounded  mb-2"
                    :class="currentCoherent == index ? 'border-primary-color text-primary-color' : 'border-menu-word text-menu-word'"
                    v-for="(item, index) in coherentList" :key="index" @click="handleCoherentItem(item, index)">
                    {{ item.title }}
                </div>
            </div>

            <div class="w-11/12 mr-auto ml-auto flex justify-between items-center flex-wrap">
                <div class="rounded overflow-hidden mb-3" style="width: 48%;" v-for="(item, index) in 9" :key="index">
                    <nft-card :nftImg="nftOne" />
                </div>
            </div> -->
        </div>
        <van-popup v-model:show="showTransferPopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="w-11/12 mr-auto ml-auto">
                    <div class="text-center font-bold text-white mb-6">
                        {{ $t('wallet.transfer') }}
                    </div>

                    <div class="text-white text-base flex justify-between items-center mb-3">
                        <div>RT {{ $t('wallet.balance') }}: </div>
                        <div class="text-red-500 font-bold">0.0000 RT </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT可兑换2RT)</div> -->
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.transferAddress') }}</div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-4 flex justify-between items-center">
                        <div class="rounded flex-1">
                            <input type="text" :placeholder="$t('wallet.transferAddress')"
                                class="w-full py-3 bg-transparent rounded">
                        </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.transferAmount') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-8 flex justify-between items-center">
                        <div class="rounded mr-2 flex-1">
                            <input type="text" :placeholder="$t('wallet.transferAmount')"
                                class="w-full py-3 bg-transparent rounded">
                        </div>
                        <div class="underline text-sm text-gray-200">{{ $t('wallet.all') }}</div>
                    </div>
                    <!--  -->
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-2">
                        {{ $t('modalConfirm.confirm') }}
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model:show="showRechargePopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="w-11/12 mr-auto ml-auto">
                    <div class="text-center font-bold text-white mb-6">
                        {{ $t('wallet.recharge') }}
                    </div>

                    <div class="text-white text-base flex justify-between items-center mb-3">
                        <div>USD3 {{ $t('wallet.balance') }}: </div>
                        <div class="text-red-500 font-bold">0.0000 USD3 </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT可兑换2RT)</div> -->
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.rechargeAmount') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-4 flex justify-between items-center">
                        <div class="rounded flex-1 py-2">
                            <input type="text" :placeholder="$t('wallet.rechargeAmount')"
                                class="w-full h-full py-3 bg-transparent rounded pl-1">
                        </div>
                    </div>
                    <!-- <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">转账金额 </div>
                    </div>
                    <div class="w-full mb-8 flex justify-between items-center">
                        <div class="rounded mr-2 border border-gray-700 flex-1 py-2">
                            <input type="text" placeholder="请输入转账金额" class="w-full h-full bg-transparent rounded pl-1">
                        </div>
                        <div class="underline text-sm text-gray-200">全部</div>
                    </div> -->
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-2">
                        {{ $t('modalConfirm.confirm') }}
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model:show="showWithdrawPopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="w-11/12 mr-auto ml-auto">
                    <div class="text-center font-bold text-white mb-6">
                        {{ $t('wallet.withdraw') }}
                    </div>

                    <div class="text-white text-base flex justify-between items-center mb-3">
                        <div>{{ $t('wallet.withdrawableAmount') }}: </div>
                        <div class="text-red-500 font-bold">0.0000 USD3 </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT可兑换2RT)</div> -->
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.withdrawAddress') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-4 flex justify-between items-center">
                        <div class="rounded  flex-1 ">
                            <input type="text" :placeholder="$t('wallet.withdrawAddress')"
                                class="w-full py-2 bg-transparent rounded pl-1">
                        </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.withdrawAmount') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-8 flex justify-between items-center">
                        <div class="rounded mr-2 flex-1 ">
                            <input type="text" :placeholder="$t('wallet.withdrawAmount')"
                                class="w-full h-full bg-transparent rounded py-2">
                        </div>
                        <div class="underline text-sm text-gray-200">{{ $t('wallet.all') }}</div>
                    </div>
                    <!--  -->
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-2">
                        {{ $t('modalConfirm.confirm') }}
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model:show="showExchangePopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="w-11/12 mr-auto ml-auto">
                    <div class="text-center font-bold text-white mb-6">
                        兌換
                    </div>
                    <div class="flex justify-start items-center mb-10">
                        <div class="border-b-4 border-transparent px-2 py-1.5 ml-4" v-for="(item, index) in exhangeTypes"
                            :key="index"
                            :class="currentExchangeType == index ? 'border-primary-color text-white font-bold' : 'text-gray-700'"
                            @click="currentExchangeType = index">
                            {{ item.title }}
                        </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base"> 請輸入兌換金額 </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT = 1RT)</div> -->
                    </div>
                    <div class="w-full flex justify-between items-center mb-10">
                        <div class="rounded  flex-1 ">
                            <input type="text" placeholder="兌換金額" class="w-full py-2 bg-transparent rounded pl-1"
                                v-model="exchangeAmount">
                        </div>
                    </div>
                    <!-- <div class="text-white text-base flex justify-between items-center mb-3">
                        <div>{{ $t('wallet.withdrawableAmount') }}: </div>
                        <div class="text-red-500 font-bold">0.0000 USD3 </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.withdrawAddress') }} </div>
                    </div>
                    <div class="w-full mb-4 flex justify-between items-center">
                        <div class="rounded border border-gray-700 flex-1 py-2">
                            <input type="text" :placeholder="$t('wallet.withdrawAddress')"
                                class="w-full h-full bg-transparent rounded pl-1">
                        </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.withdrawAmount') }} </div>
                    </div>
                    <div class="w-full mb-8 flex justify-between items-center">
                        <div class="rounded mr-2 flex-1 ">
                            <input type="text" :placeholder="$t('wallet.withdrawAmount')"
                                class="w-full h-full bg-transparent rounded py-2">
                        </div>
                        <div class="underline text-sm text-gray-200">{{ $t('wallet.all') }}</div>
                    </div> -->
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-2"
                        @click="handleExchange">
                        {{ $t('modalConfirm.confirm') }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useRouter } from "vue-router";
import ModuleTitle from '../../components/ModuleTitle.vue';
import WalletCard from '@/components/WalletCard.vue';
import NftCard from '@/components/NftCard.vue'
import StaticEarnings from './staticEarningsGauge.vue';
import nftOne from '@/assets/images/nftOne.png'
import DynamicEarnings from './dynamicEarningsGauge.vue';
import { useI18n } from 'vue-i18n'
import swapContractApi from '@/request/swap'
import minterContractApi from '@/request/minter'
import usdtContractApi from '@/request/usdt'
import { config } from '@/const/config'
import { showToast } from 'vant';
import { number } from 'echarts';
import Web3 from "web3";
const { t } = useI18n()
const { proxy } = getCurrentInstance()
const router = useRouter()
let coherentList = computed(() => {
    return [{ title: t('wallet.all') }, { title: 'N' }, { title: 'R' }, { title: 'SR' }, { title: 'SSR' }, { title: 'UR' }, { title: t('wallet.promiseCard') }, { title: t('wallet.onSale') }]
})

let operatorList = computed(() => {
    return [{ title: t('wallet.sale') }, { title: t('wallet.cancleSale') }, { title: t('wallet.gift') }]
})

let currentCoherent = ref(null)
let currentOperator = ref(null)
let showOperator = ref(false)
let showExchangePopup = ref(false)
let showTransferPopup = ref(false)
let showWithdrawPopup = ref(false)
let showRechargePopup = ref(false)
let exchangeAmount = ref('')
let exhangeTypes = ref([{ title: 'MT 兌換 USDT', type: 0 }, { title: 'MT 兌換 RT', type: 1 }])
let currentExchangeType = ref(0)
// const chartData = ref([1, 2, 3, 4, 5])

function viewCoherents() {
    setTimeout(() => {
        router.push({
            path: '/personal/coherents'
        })
    }, 1000)

}
function viewNFTs() {
    setTimeout(() => {
        router.push({
            path: '/personal/nfts'
        })
    }, 1000)
}
//點擊兌換彈窗兌換按鈕
async function handleExchange() {
    if (!exchangeAmount.value) {
        showToast('請輸入兌換金額')
        return
    }
    toggleExchangePopup()
    proxy.$loading.show()
    console.log('點擊handleExchange', localStorage.getItem('address'), config.swap_addr)
    // 检查mt或者usdt对swap的授权状态
    let allowance
    try {
        allowance = currentExchangeType.value == 0 ? await usdtContractApi.allowance(localStorage.getItem('address'), config.swap_addr) : await minterContractApi.allowance(localStorage.getItem('address'), config.swap_addr)
        proxy.$loading.hide()
    } catch (err) {
        showToast('錯誤，請重試')
        proxy.$loading.hide()
        toggleExchangePopup()
    }
    console.log('allowance', allowance)
    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.show({
            title: '請授權',
            content: '該地址未進行授權，請完成授權',
            showCancelButton: false,
            confirmText: '確定',
            onConfirm: () => {
                proxy.$loading.show()
                // usdt和mt授權
                if (currentExchangeType.value == 0) {
                    usdtContractApi.approve(config.swap_addr)
                        .then(res => {
                            console.log(res)
                            proxy.$loading.hide()
                        })
                        .catch(err => {
                            console.log(err)
                            proxy.$loading.hide()
                            toggleExchangePopup()
                            showToast('錯誤，請重試')
                        })
                } else {
                    minterContractApi.approve(config.swap_addr)
                        .then(res => {
                            console.log(res)
                            proxy.$loading.hide()
                        })
                        .catch(err => {
                            console.log(err)
                            proxy.$loading.hide()
                            toggleExchangePopup()
                            showToast('錯誤，請重試')
                        })
                }

            },
        });
    } else { //當前領取方式已授權，直接兌換
        proxy.$loading.show()
        const WEB3 = new Web3(window.ethereum)
        let amount = WEB3.utils.toWei((exchangeAmount.value).toString(), 'ether')
        if (currentExchangeType.value == 0) {
            try {
                await swapContractApi.swapMTForUSDT(amount)
                proxy.$loading.hide()
                showToast('操作成功')
            } catch (err) {
                console.log(err)
                proxy.$loading.hide()
                showToast('錯誤，請重試')
            }
        } else {
            try {
                await swapContractApi.swapMTForRT(amount)
                proxy.$loading.hide()
                showToast('操作成功')
            } catch (err) {
                console.log(err)
                proxy.$loading.hide()
                showToast('錯誤，請重試')
            }
        }


    }
    return
    let exchange = await swapContractApi.swapMTForUSDT('800000000000000')
    console.log(exchange)
}
//點擊錢包卡片充值按鈕
function handleWalletCardRecharge() {
    toggleRechargePopup()
}
//點擊卡片提現按鈕
function handleWalletCardWithdraw() {
    toggleWithdrawPopup()
}
//点击钱包卡片转账按钮
function handleWalletCardTransfer() {
    toggleTransferPopup()
}
//點擊錢包卡片兌換按鈕
function handleWalletCardExchange() {
    toggleExchangePopup()
}
//顯示隱藏兌換MT彈窗
function toggleExchangePopup() {
    showExchangePopup.value = !showExchangePopup.value
}
//显示隐藏RT转账弹窗
function toggleTransferPopup() {
    showTransferPopup.value = !showTransferPopup.value
}
//显示隐藏充值彈窗
function toggleRechargePopup() {
    showRechargePopup.value = !showRechargePopup.value
}
//显示隐藏提現弹窗
function toggleWithdrawPopup() {
    showWithdrawPopup.value = !showWithdrawPopup.value
}
function toggleOperator() {
    showOperator.value = !showOperator.value
}

function handleCoherentItem(item, index) {
    currentCoherent.value = index
    if (index == 7) {
        operatorList.value = [{ title: t('wallet.cancleSale') }]
    } else if (index == 6) {
        operatorList.value = [{ title: t('wallet.gift') }]
    } else if (index !== 6 || index !== 7) {
        operatorList.value = [[{ title: t('wallet.sale') }, { title: t('wallet.cancleSale') }, { title: t('wallet.gift') }]]
    }
}

function handleOperatorItem(item, index) {
    currentOperator.value = index
}

</script>

<style scoped>
img {}
</style>