<template>
    <div class="text-primary-color">
        <div class="pb-20 pt-12">
            <div class="flex justify-center items-center mb-10" v-show="hasPackage">
                <div class="w-full">
                    <static-earnings />
                </div>
            </div>
            <div class="flex justify-center items-center mb-10" v-show="hasPackage">
                <div class="w-full">
                    <dynamic-earnings />
                </div>
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <module-title :titleWord="$t('wallet.title')"></module-title>
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="HAH" :tokenImg="hahImg" :balance="hahBalance" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card isUSD3 :tokenImg="usdImg" currency="USD3" :balance="usdtBalance"
                    :contranct="config.USDToken_addr" @recharge="handleWalletCardRecharge"
                    @withdraw="handleWalletCardWithdraw" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="PMT" :tokenImg="pmtImg" :balance="pmtBalance" :contranct="config.pmt_addr" isBuy
                    isReleases @buy="handleWalletCardBuy" @releases="handleWalletCardReleases" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="MT" :tokenImg="mtImg" :balance="mtBalance" :contranct="config.mt_addr" isExchange
                    isBuy @buy="handleWalletCardBuy" @exchange="handleWalletCardExchange" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="BT" :tokenImg="btImg" isExchange @exchange="handleWalletCardExchangeBT"
                    :balance="palayBanalce.bt" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card :currency="'RT' + '(' + $t('order.bind') + ')'" :tokenImg="rtImg"
                    :balance="palayBanalce.rtLocked" isRegister @register="handleRegister" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="RT" :balance="palayBanalce.rt" :tokenImg="rtImg" @transfer="handleWalletCardTransfer"
                    @exchange="handleExchangeRT" isExchange isTrasfer isRegister @register="handleRegister" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card :currency="$t('menu.contributionValue')" :balance="mstBalance" />
            </div>

            <div class="border-b border-gray-800 w-11/12 mr-auto ml-auto mb-3"></div>
            <div class="flex justify-between items-center w-11/12 mr-auto ml-auto mb-2">
                <div class="w-full">
                    <div class="w-full flex justify-between items-center px-2 py-2 bg-gray-800 rounded mb-4 active-primary-color"
                        @click="viewCoherents">
                        <div class="flex justify-start items-center">
                            <div class="pr-1 font-bold text-lg">{{ packageCount }}</div>
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
                            <div class="pr-1 font-bold text-lg">{{ nftsCount }}</div>
                            <div class="text-white">NFTs</div>
                        </div>
                        <div class="flex justify-end items-center text-white active-white-color">
                            <div class="pr-1 text-sm">{{ $t('wallet.details') }}</div>
                            <div class="icon iconfont icon-right"></div>
                        </div>
                    </div>
                    <div class="w-full flex justify-between items-center px-2 py-2 bg-gray-800 rounded active-primary-color"
                        @click="viewPromiseCard">
                        <div class="flex justify-start items-center">
                            <div class="pr-1 font-bold text-lg">{{ promiseCardCount }}</div>
                            <div class="text-white">{{ $t('menu.promiseCard') }}</div>
                        </div>
                        <div class="flex justify-end items-center text-white active-white-color">
                            <div class="pr-1 text-sm">{{ $t('wallet.details') }}</div>
                            <div class="icon iconfont icon-right"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <van-popup v-model:show="showExchangePopupBT" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="w-11/12 mr-auto ml-auto">
                    <div class="text-center font-bold text-white mb-6">
                        {{ $t('exchange.title') }}
                    </div>
                    <div class="flex justify-start items-center mb-10">
                        <div class="border-b-4 border-transparent px-2 py-1.5 ml-4" v-for="(item, index) in exhangeTypesBT"
                            :key="index"
                            :class="currentExchangeTypeBT == index ? 'border-primary-color text-white font-bold' : 'text-gray-700'"
                            @click="currentExchangeTypeBT = index">
                            {{ item.title }}
                        </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base"> {{ $t('toast.enterExchangeAmount') }} </div>
                        <div class="text-primary-color text-xs pl-1"> {{ $t('toast.handlingFee', {
                            handlingFee:
                                currentExchangeTypeBT == 0 ? ' 10% ' : ' 0% '
                        }) }}</div>
                    </div>
                    <div class="w-full flex justify-between items-center mb-10">
                        <div class="rounded  flex-1 ">
                            <input type="text" :placeholder="$t('toast.exchangeAmount')"
                                class="w-full py-2 bg-transparent rounded pl-1" v-model="exchangeAmountBT">
                        </div>
                    </div>
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-3"
                        @click="handleExchangeBT">
                        {{ $t('modalConfirm.confirm') }}
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model:show="showTransferPopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="w-11/12 mr-auto ml-auto">
                    <div class="text-center font-bold text-white mb-6">
                        {{ $t('wallet.transfer') }}
                    </div>

                    <div class="text-white text-base flex justify-between items-center mb-3">
                        <div>RT {{ $t('wallet.balance') }}: </div>
                        <div class="text-red-500 font-bold">{{ Number(palayBanalce.rt).toFixed(4) || '0.0000' }} RT </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3可兑换2RT)</div> -->
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.transferAddress') }}</div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3 = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-4 flex justify-between items-center">
                        <div class="rounded flex-1">
                            <input type="text" :placeholder="$t('wallet.transferAddress')" v-model="transferRTAddress"
                                class="w-full py-3 bg-transparent rounded">
                        </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.transferAmount') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3 = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-8 flex justify-between items-center">
                        <div class="rounded  flex-1">
                            <input type="text" :placeholder="$t('wallet.transferAmount')" v-model="transferRTAmount"
                                class="w-full py-3 bg-transparent rounded">
                        </div>
                        <!-- <div class="underline text-sm text-gray-200">{{ $t('wallet.all') }}</div> -->
                    </div>
                    <!--  -->
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-3"
                        @click="handleTransferRT">
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
                        <div class="text-red-500 font-bold">{{ Number(usdtBalance).toFixed(4) }} USD3 </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3可兑换2RT)</div> -->
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.rechargeAmount') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3 = 1RT)</div> -->
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
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-3">
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
                        <div class="text-red-500 font-bold">{{ Number(usdtBalance).toFixed(4) }} USD3 </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3可兑换2RT)</div> -->
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.withdrawAddress') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3 = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-4 flex justify-between items-center">
                        <div class="rounded  flex-1 ">
                            <input type="text" :placeholder="$t('wallet.withdrawAddress')"
                                class="w-full py-2 bg-transparent rounded pl-1">
                        </div>
                    </div>
                    <div class="text-white text-xs flex justify-start items-baseline mb-1">
                        <div class="text-base">{{ $t('wallet.withdrawAmount') }} </div>
                        <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3 = 1RT)</div> -->
                    </div>
                    <div class="w-full mb-8 flex justify-between items-center">
                        <div class="rounded mr-2 flex-1 ">
                            <input type="text" :placeholder="$t('wallet.withdrawAmount')"
                                class="w-full h-full bg-transparent rounded py-2">
                        </div>
                        <div class="underline text-sm text-gray-200">{{ $t('wallet.all') }}</div>
                    </div>
                    <!--  -->
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-3">
                        {{ $t('modalConfirm.confirm') }}
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model:show="showExchangePopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="w-11/12 mr-auto ml-auto">
                    <div class="text-center font-bold text-white mb-6">
                        {{ $t('toast.exchangeTitle') }}
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
                        <div class="text-base"> {{ $t('toast.enterExchangeAmount') }} </div>
                        <div class="text-primary-color text-xs pl-1"> {{ $t('toast.handlingFee', {
                            handlingFee:
                                currentExchangeType == 0 ? ' 10% ' : ' 5% '
                        }) }} </div>
                    </div>
                    <div class="w-full flex justify-between items-center mb-10">
                        <div class="rounded  flex-1 ">
                            <input type="text" :placeholder="$t('toast.exchangeAmount')"
                                class="w-full py-2 bg-transparent rounded pl-1" v-model="exchangeAmount">
                        </div>
                    </div>
                    <div class="operating-button rounded-full text-white font-bold text-center text-sm py-3"
                        @click="handleExchange">
                        {{ $t('modalConfirm.confirm') }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted } from 'vue'
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
import pmtContractApi from '@/request/pmt'
import mtContractApi from '@/request/mt'
import mstContractApi from '@/request/mst'
import { playersInfo, userNFT, staticRecords, btToUsdt, btToRt, rtBalance, transfersRT } from '@/request/api'
import { config } from '@/const/config'
import { showToast } from 'vant';
import { number } from 'echarts';
import { ZeroAddress, isAddress } from 'ethers'
import rtImg from '@/assets/images/RT.png'
import pmtImg from '@/assets/images/PT.png'
import mtImg from '@/assets/images/MT.png'
import btImg from '@/assets/images/BT.png'
import hahImg from '@/assets/images/HashAhead Logo.png'
import usdImg from '@/assets/images/3AT_logo.svg'

import { userStore } from "@/stores/user";
import Web3 from "web3";
const { t } = useI18n()
const userInfo = userStore()
const { proxy } = getCurrentInstance()
const router = useRouter()
let coherentList = computed(() => {
    return [{ title: t('wallet.all') }, { title: 'N' }, { title: 'R' }, { title: 'SR' }, { title: 'SSR' }, { title: 'UR' }, { title: t('wallet.promiseCard') }, { title: t('wallet.onSale') }]
})

let operatorList = computed(() => {
    return [{ title: t('wallet.sale') }, { title: t('wallet.cancleSale') }, { title: t('wallet.gift') }]
})
onMounted(() => {
    getUSDTBalance()
    getPMTBalance()
    getMTBalance()
    getMSTBalance()
    getPlayersInfo(localStorage.getItem('address'))
    getUserNFTs()
    getStaticRecords()
    getHAHBalance()

})
let currentCoherent = ref(null)
let currentOperator = ref(null)
let showOperator = ref(false)
let showExchangePopup = ref(false)
let showTransferPopup = ref(false)
let showWithdrawPopup = ref(false)
let showRechargePopup = ref(false)
let showExchangePopupBT = ref(false)
let exchangeAmount = ref('')
let exchangeAmountBT = ref('')
// let exhangeTypes = ref([{ title: 'MT 兌換 USDT', type: 0 }, { title: 'MT 兌換 RT', type: 1 }])
// let exhangeTypesBT = ref([{ title: 'BT 兌換 USDT', type: 0 }, { title: 'BT 兌換 RT', type: 1 }])
let exhangeTypes = computed(() => {
    return [{ title: `MT ${t('toast.exchangeTitle')} USDT`, type: 0 }, { title: `MT ${t('toast.exchangeTitle')} RT`, type: 1 }]
})
let currentExchangeType = ref(0)
let currentExchangeTypeBT = ref(0)
let usdtBalance = ref('')
let pmtBalance = ref('')
let mtBalance = ref('')
let mstBalance = ref('')
let hahBalance = ref('')
let packageCount = ref(0)
let nftsCount = ref(0)
let promiseCardCount = ref(0)
let palayBanalce = ref({})
let hasPackage = ref(false)
let transferRTAmount = ref(null)
let transferRTAddress = ref(null)
function handleExchangeRT() {
    router.push({
        path: '/personal/exchange'
    })
}
//秒轉化時間
function getTime(time) {
    var nowTime = +new Date();
    var inputTime = +new Date(time * 1000)

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

    return day + ":" + hour + ":" + minute + ":" + second
    // return day + "天" + hour + "时" + minute + "分" + second + "秒"
}
//獲取pmt鎖定期
async function getRemainingLockupPeriod() {


    if ((Number(result) + (new Date().getTime() / 1000)) <= new Date().getTime() / 1000) {
        return false
    }
    // let time = result

}

//點擊pmt卡片釋放按鈕
async function handleWalletCardReleases() {
    proxy.$loading.show()
    let result = await pmtContractApi.getRemainingLockupPeriod(localStorage.getItem('address'))
    proxy.$loading.hide()
    let time
    if ((Number(result) + (new Date().getTime() / 1000)) > new Date().getTime() / 1000) {
        time = Number(result) + (new Date().getTime() / 1000)
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.tips'),
            content: `${t('modalConfirm.postRelease', { time: getTime(time) })}`,
            showCancelButton: false,
            onConfirm: () => {
                proxy.$confirm.hide()
            }
        })
        return
    }
    proxy.$loading.show()
    let pmtNumber = await pmtContractApi.getLockedAmount(localStorage.getItem('address'))
    proxy.$loading.hide()
    if (Number(pmtNumber) == 0) {
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.tips'),
            content: t('toast.haveNotCanReleasePMT'),
            showCancelButton: false,
            onConfirm: () => {
                proxy.$confirm.hide()
            }
        })
        return
    }
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        content: t('modalConfirm.confirmRelease'),
        showCancelButton: false,
        onConfirm: async () => {
            try {
                await pmtContractApi.releaseTokens(localStorage.getItem('address'))
                proxy.$loading.hide()
                proxy.$confirm.hide()
                showToast(t('toast.success'))
                location.reload()
                // getPlayersInfo(localStorage.getItem('address'))
                // getPNTRemainingLockupPeriod()
                // getPMTLockedAmount()
            } catch (err) {
                console.log(err)
                proxy.$loading.hide()
                proxy.$confirm.hide()
                showToast(t('toast.releaseFail'))
            }
        }
    })
}
//rt轉賬
function handleTransferRT() {
    if (!transferRTAmount.value) {
        showToast(t('toast.enterTransferAmount'))
        return
    }
    if (!transferRTAddress.value) {
        showToast(t('toast.enterTransferAddress'))
        return
    }
    if (transferRTAddress.value == ZeroAddress || !isAddress(transferRTAddress.value)) {
        showToast(t('toast.enterValidaddress'))
        return
    }
    toggleTransferPopup()
    // proxy.$loading.show()
    proxy.$confirm.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: t('modalConfirm.confirm'),
        // content: `是否確認將${transferRTAmount.value}RT轉入到${transferRTAddress.value},該行為不可撤銷！`,
        content: `${t('modalConfirm.confirmTransferRT', { amount: transferRTAmount.value, address: transferRTAddress.value })}`,
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        cancelText: t('modalConfirm.cancel'),
        onConfirm: async () => {
            let data = { address: transferRTAddress.value, amount: transferRTAmount.value }
            console.log(data)
            transfersRT(data)
                .then(res => {
                    console.log(res)
                    if (res.error) {
                        proxy.$confirm.hide()
                        proxy.$confirm.show({
                            title: t('modalConfirm.confirm'),
                            content: res.error,
                            showCancelButton: false,
                            confirmText: t('modalConfirm.confirm'),
                            onConfirm: () => {
                                proxy.$confirm.hide()
                                toggleTransferPopup()
                            },
                        });
                        return
                    }
                    setTimeout(() => {
                        proxy.$confirm.hide()
                        proxy.$confirm.show({
                            title: t('modalConfirm.tips'),
                            // content: `已成功轉賬 ${transferRTAmount.value} RT`,
                            content: `${t('modalConfirm.successTransferRT', { amount: transferRTAmount.value })}`,

                            showCancelButton: false,
                            confirmText: t('modalConfirm.confirm'),
                            onConfirm: async () => {
                                try {
                                    getPlayersInfo(localStorage.getItem('address'))
                                    proxy.$confirm.hide()
                                } catch (err) {
                                    console.log(err)
                                }
                                // toggleTransferPopup()
                            },
                        });
                    }, 8000);
                    // showToast('轉賬成功')
                })
                .catch(err => {
                    console.log('err', err)
                    proxy.$confirm.hide()
                    proxy.$confirm.show({
                        title: t('modalConfirm.tips'),
                        content: t('modalConfirm.transferFail'),
                        showCancelButton: false,
                        confirmText: t('modalConfirm.confirm'),
                        onConfirm: () => {
                            proxy.$confirm.hide()
                            toggleTransferPopup()
                            // toggleTransferPopup()
                        },
                    });



                })
        },
        // onCancel: () => {
        //     proxy.$confirm.hide()
        // },
    });


}

//獲取玩家信息
function getPlayersInfo(address) {
    playersInfo(address)
        .then(res => {
            console.log('res', res)
            packageCount.value = res.player.package_transactions.length
            palayBanalce.value.bt = res.player.bt
            palayBanalce.value.rt = res.player.rt
            palayBanalce.value.rtLocked = res.player.rt_locked
            hasPackage.value = res.player.package_transactions.length !== 0
        })
        .catch(err => {
            console.log('err', err)
        })
}

async function getHAHBalance() {
    let WEB3 = new Web3(window.ethereum)
    let result = await WEB3.eth.getBalance(localStorage.getItem('address'))
    hahBalance.value = WEB3.utils.fromWei(result.toString(), 'ether')
    // console.log(result)
}

// const chartData = ref([1, 2, 3, 4, 5])   
async function getMSTBalance() {
    let balance = await mstContractApi.balanceOf(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    let result = WEB3.utils.fromWei(balance.toString(), 'ether')
    console.log('mst', result)
    mstBalance.value = result
    return balance
}
async function getUSDTBalance() {
    let balance = await usdtContractApi.balanceOf(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    let result = WEB3.utils.fromWei(balance.toString(), 'ether')
    console.log('usdt', result)
    usdtBalance.value = result
    return balance
}
async function getPMTBalance() {
    let balance = await pmtContractApi.balanceOf(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    let result = WEB3.utils.fromWei(balance.toString(), 'ether')
    console.log('pmt', result)
    pmtBalance.value = result
    return balance
}
async function getMTBalance() {
    let balance = await mtContractApi.balanceOf(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    let result = WEB3.utils.fromWei(balance.toString(), 'ether')
    console.log('mt', result)
    mtBalance.value = result
    return balance
}

//承諾卡數量
function getStaticRecords() {
    proxy.$loading.show()
    let params = { prize_type_id: 3, perPage: 100000 }
    staticRecords(params)
        .then(res => {
            console.log(res)
            promiseCardCount.value = res.records.length
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()

        })
}
//nft數量
function getUserNFTs() {
    proxy.$loading.show()
    let params = { status: 1 }
    userNFT(params)
        .then(res => {
            proxy.$loading.hide()
            nftsCount.value = res.nft_token_ids.length
            console.log('res', res)
        })
        .catch(err => {
            proxy.$loading.hide()
            console.log(err)
        })
}
//查看配套
function viewCoherents() {
    setTimeout(() => {
        router.push({
            path: '/personal/coherents'
        })
    }, 1000)

}
//查看NFT
function viewNFTs() {
    setTimeout(() => {
        router.push({
            path: '/personal/nfts'
        })
    }, 1000)
}
//查看承諾卡
function viewPromiseCard() {
    setTimeout(() => {
        router.push({
            path: '/personal/promise-card'
        })
    }, 1000)
}
//兌換bt
async function handleExchangeBT() {

    if (!exchangeAmountBT.value) {
        showToast(t('toast.enterExchangeAmount'))
        return
    }
    toggleExchangePopupBT()

    let contentWord
    if (currentExchangeTypeBT.value == 0) {
        // contentWord = `是否確認將 ${exchangeAmountBT.value} BT 兌換為 ${exchangeAmountBT.value * 0.9} USD3， 已扣除10% (${exchangeAmountBT.value * 0.1} BT) 手續費。 `
        contentWord = `${t('modalConfirm.confirmExchangeBTToUSD3', { amount: exchangeAmountBT.value, usd3: exchangeAmountBT.value * 0.9, handlingFee: exchangeAmountBT.value * 0.1 })}`
    } else {
        // contentWord = `是否確認將 ${exchangeAmountBT.value} BT 兌換為 ${exchangeAmountBT.value} RT。 `
        contentWord = `${t('modalConfirm.confirmExchangeBTToBT', { amount: exchangeAmountBT.value, RT: exchangeAmountBT })}`
    }
    let data = {
        amount: exchangeAmountBT.value
    }
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: t('modalConfirm.confirm'),
        content: contentWord,
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        cancelText: t('modalConfirm.cancel'),
        onConfirm: async () => {
            if (currentExchangeTypeBT.value == 0) {
                btToUsdt(data)
                    .then(res => {
                        proxy.$confirm.hide()
                        if (res.error) {
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: t('modalConfirm.tips'),
                                content: res.error,
                                showCancelButton: false,
                                confirmText: t('modalConfirm.confirm'),
                                onConfirm: () => {
                                    proxy.$confirm.hide()
                                },
                            });
                            return
                        }
                        getUSDTBalance()
                        getPlayersInfo(localStorage.getItem('address'))
                        // showToast(`已成功兌換 ${exchangeAmountBT.value * 0.9} USD3`)
                        showToast(`${t('modalConfirm.successExchangeUSD3', { amount: exchangeAmountBT.value })}`)
                        console.log(res)
                    })
                    .catch(err => {
                        proxy.$confirm.hide()
                        showToast(t('modalConfirm.exchangeFail'))
                        console.log(err)
                    })
            } else {
                btToRt(data)
                    .then(res => {
                        proxy.$confirm.hide()
                        if (res.error) {
                            proxy.$confirm.hide()
                            proxy.$confirm.show({
                                title: t('modalConfirm.tips'),
                                content: res.error,
                                showCancelButton: false,
                                confirmText: t('modalConfirm.confirm'),
                                onConfirm: () => {
                                    proxy.$confirm.hide()
                                },
                            });
                            return
                        }
                        getPlayersInfo(localStorage.getItem('address'))
                        // showToast(`已成功兌換 ${exchangeAmountBT.value} RT`)
                        showToast(`${t('modalConfirm/successExchangeRT', { amount: exchangeAmountBT.value })}`)
                        console.log(res)
                    })
                    .catch(err => {
                        proxy.$confirm.hide()
                        showToast(t('modalConfirm.exchangeFail'))
                        console.log(err)
                    })
            }
        },
        // onCancel: () => {
        //     proxy.$confirm.hide()
        // },
    });
}
//點擊兌換彈窗兌換按鈕
async function handleExchange() {
    if (!exchangeAmount.value) {
        showToast(t('toast.enterExchangeAmount'))
        return
    }
    toggleExchangePopup()
    proxy.$loading.show()
    console.log('點擊handleExchange', localStorage.getItem('address'), config.swap_addr)
    // 检查mt或者usdt对swap的授权状态
    let allowance
    try {
        allowance = await minterContractApi.allowance(localStorage.getItem('address'), config.swap_addr)
        proxy.$loading.hide()
    } catch (err) {
        showToast(t('toast.error'))
        proxy.$loading.hide()
        toggleExchangePopup()
    }
    console.log('allowance', allowance)
    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            // title: t('modalConfirm.authorize'),
            title: t('modalConfirm.authorize'),
            // content: t('modalConfirm.pleaseAuthorize', { type: 'MT' }),
            content: t('modalConfirm.pleaseAuthorize', { type: 'MT' }),
            showCancelButton: false,
            confirmText: t('modalConfirm.toAuthorize'),
            onConfirm: () => {
                // proxy.$loading.show()
                // usdt和mt授權
                minterContractApi.approve(config.swap_addr)
                    .then(res => {
                        console.log(res)
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        // showToast(t('modalConfirm.successAuthorize'))
                        showToast(t('modalConfirm.successAuthorize'))

                    })
                    .catch(err => {
                        console.log(err)
                        proxy.$confirm.hide()
                        showToast(t('modalConfirm.authorizeFail'))
                    })

            },
        });
        return
    }
    const WEB3 = new Web3(window.ethereum)
    let amount = WEB3.utils.toWei((exchangeAmount.value).toString(), 'ether')
    let contentWord
    if (currentExchangeType.value == 0) {
        // contentWord = `是否確認將 ${exchangeAmount.value} MT 兌換為 ${exchangeAmount.value * 0.9} USD3， 已扣除10% (${exchangeAmount.value * 0.1} MT) 手續費。 `
        contentWord = `${t('modalConfirm.confirmExchangeMTToUSD3', { amount: exchangeAmount.value, usd3: exchangeAmount.value * 0.9, handlingFee: exchangeAmount.value * 0.1 })}`
    } else {
        // contentWord = `是否確認將 ${exchangeAmount.value} MT 兌換為 ${exchangeAmount.value * 0.95} RT， 已扣除5% (${exchangeAmount.value * 0.05} MT) 手續費。`
        contentWord = `${t('modalConfirm.confirmExchangeMTToRT', { amount: exchangeAmount.value, rt: exchangeAmount.value * 0.95, handlingFee: exchangeAmount.value * 0.05 })}`
    }
    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: t('modalConfirm.confirm'),
        content: contentWord,
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        cancelText: t('modalConfirm.cancel'),
        onConfirm: async () => {
            if (currentExchangeType.value == 0) {
                try {
                    await swapContractApi.swapMTForUSDT(amount)
                    proxy.$confirm.hide()
                    getMTBalance()
                    getUSDTBalance()
                    // showToast(`已成功兌換 ${exchangeAmount.value * 0.9} USD3`)
                    showToast(`${t('modalConfirm.successExchangeUSD3', { amount: exchangeAmount.value * 0.9 })}`)
                } catch (err) {
                    console.log(err)
                    proxy.$loading.hide()
                    showToast(t('modalConfirm.exchangeFail'))
                }
            } else {
                try {
                    await swapContractApi.swapMTForRT(amount)
                    // await rtBalance(localStorage.getItem('address'))
                    proxy.$confirm.hide()
                    getMTBalance()
                    getPlayersInfo(localStorage.getItem('address'))
                    // showToast(`已成功兌換 ${exchangeAmount.value * 0.95} RT`)
                    showToast(`${t('modalConfirm.successExchangeRT', { amount: exchangeAmount.value * 0.95 })}`)

                } catch (err) {
                    console.log(err)
                    proxy.$confirm.hide()
                    showToast(t('modalConfirm.exchangeFail'))
                }
            }
        },
        // onCancel: () => {
        //     proxy.$confirm.hide()
        // },
    });
}
//點擊卡片註冊按鈕
function handleRegister() {
    router.push({
        path: '/personal/assistance'
    })
}
//點擊卡片購買按鈕
function handleWalletCardBuy() {
    router.push({
        path: '/market/nfts'
    })
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
    console.log(palayBanalce.value.rt)
    if (Number(palayBanalce.value.rt) <= 0) {
        showToast(`${t('modalConfirm.cantTransfer', { type: "RT" })}`)
        return
    }
    toggleTransferPopup()
}
function handleWalletCardExchangeBT() {
    if (Number(palayBanalce.value.bt) <= 0) {
        showToast(`${t('modalConfirm.cantTransfer', { type: "BT" })}`)
        return
    }
    toggleExchangePopupBT()
}
//點擊錢包卡片兌換按鈕
function handleWalletCardExchange() {
    if (Number(mtBalance.value).toFixed(4) <= 0) {
        showToast(`${t('modalConfirm.cantTransfer', { type: "MT" })}`)
        return
    }
    toggleExchangePopup()
}
//顯示隱藏兌換MT彈窗
function toggleExchangePopup() {
    showExchangePopup.value = !showExchangePopup.value
}
function toggleExchangePopupBT() {
    showExchangePopupBT.value = !showExchangePopupBT.value
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