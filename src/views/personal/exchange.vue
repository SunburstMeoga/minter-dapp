<template>
    <div class="flex flex-col justify-start items-center bg-transparent pb-20 pt-12">
        <div class="w-11/12 mb-4 mt-4">
            <module-title :titleWord="$t('exchange.for') + ' RT'" />
        </div>
        <div class="w-11/12 rounded-lg border border-top-content px-2 py-4">
            <div class="text-center font-bold text-white mb-6">
                USD3 {{ $t('exchange.title') }} RT
            </div>
            <div class="text-white text-base flex justify-between items-center mb-6">
                <div>USD3 {{ $t('order.balance') }}: </div>
                <div>{{ Number(usdtBalance).toFixed(4) }} USD3 </div>
                <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3可兑换2RT)</div> -->
            </div>
            <div class="text-white text-base flex justify-between items-center mb-6">
                <div>RT {{ $t('order.balance') }}: </div>
                <div>{{ Number(rtBalanceNum).toFixed(4) }} RT </div>
                <!-- <div class="text-primary-color text-xs pl-1"> (当前1USD3可兑换2RT)</div> -->
            </div>
            <div class="text-white text-xs flex justify-start items-baseline mb-2">
                <div class="text-base">{{ $t('exchange.exchangeQuantity') }} </div>
                <div class="text-primary-color text-xs pl-1"> (1USD3 = 1RT)</div>
            </div>
            <div class="w-full flex justify-between items-center mb-10">
                <div class="rounded mr-2  flex-1 py-1">
                    <input type="text" :placeholder="$t('exchange.exchangeQuantity')" v-model="exchangeAmount"
                        class="w-full py-2 bg-transparent pl-1 text-gray-200">
                </div>
                <!-- <div class="underline text-sm text-gray-200">{{ $t('wallet.all') }}</div> -->
            </div>
            <!--  -->
            <div class="operating-button rounded-full text-white font-bold text-center text-sm py-2"
                @click="handleExchange">
                {{ $t('modalConfirm.confirm') }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { config } from '@/const/config'
import ModuleTitle from "../../components/ModuleTitle.vue";
import coherents_list from '@/datas/coherents_list'
import { showToast } from 'vant';
import usdtContractApi from '@/request/usdt'
import swapContractApi from '@/request/swap'
import { userStore } from "@/stores/user";
import { playersInfo, rtBalance } from '@/request/api'
import { useI18n } from 'vue-i18n';
import Web3 from "web3";
const userInfo = userStore()
const { proxy } = getCurrentInstance()
const { t } = useI18n()
let usdtBalance = ref('')
let rtBalanceNum = ref('')
let exchangeAmount = ref('')
let playInfo = ref({})
const router = useRouter()
onMounted(() => {
    getUSDTBalance()
    getPlayersInfo(localStorage.getItem('address'))
})

//獲取玩家信息
async function getPlayersInfo(address) {
    proxy.$loading.show()
    // try {
    //     let result = await rtBalance(address)
    //     //console.log(result)
    //     playInfo.value = result
    //     rtBalance.value = result.rt
    //     proxy.$loading.hide()
    // } catch {
    //     showToast('更新餘額失敗，請刷新頁面')
    //     proxy.$loading.hide()
    // }
    // const {} = res.player

    rtBalance({ address: localStorage.getItem('address') })
        .then(res => {
            //console.log('res', res)

            // 安全检查：确保必要的数据存在
            if (!res || !res.player) {
                console.error('RT余额获取失败：返回数据为空')
                rtBalanceNum.value = 0
                proxy.$loading.hide()
                return
            }

            playInfo.value = res
            rtBalanceNum.value = res.player.rt || 0
            proxy.$loading.hide()
        })
        .catch(err => {
            proxy.$loading.hide()
            console.error('获取RT余额失败:', err)
            rtBalanceNum.value = 0
            // showToast('更新RT餘額失敗，請刷新頁面')

        })
}
async function getUSDTBalance() {
    //console.log('userInfo.address', userInfo.address)
    let balance = await usdtContractApi.balanceOf(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    let result = WEB3.utils.fromWei(balance.toString(), 'ether')
    //console.log('usdt', result)
    usdtBalance.value = result
    return balance
}
async function handleExchange() {
    if (!exchangeAmount.value) {
        showToast(t('toast.enterExchangeAmount'))
        return
    }
    proxy.$loading.show()
    let allowance
    try { //检查usdt对pmt_purchase的授权状态
        allowance = await usdtContractApi.allowance(localStorage.getItem('address'), config.swap_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(`${t('modalConfirm.checkAuthFail', { type: "USD3" })}`)
        //console.log(err)
    }

    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.authorize'),
            content: t('modalConfirm.pleaseAuthorize', { type: 'USD3' }),
            showCancelButton: false,
            confirmText: t('modalConfirm.toAuthorize'),
            onConfirm: () => {
                // proxy.$loading.show()
                // usdt对pmt授權
                usdtContractApi.approve(config.swap_addr)
                    .then(res => {
                        //console.log(res)
                        proxy.$confirm.hide()
                        // proxy.$loading.hide()
                        showToast(t('modalConfirm.successAuthorize'))

                    })
                    .catch(err => {
                        //console.log(err)
                        proxy.$confirm.hide()
                        showToast(t('modalConfirm.authorizeFail', { type: 'USD3' }))
                    })
            },
        });
        return
    }

    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: t('modalConfirm.confirm'),
        // content: `是否確認將 ${exchangeAmount.value} USD3兌換為 ${exchangeAmount.value} RT?`,
        content: `${t('modalConfirm.confirmExchangeUSD3ToRT', { usd3: exchangeAmount.value, rt: exchangeAmount.value })}`,
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        cancelText: t('modalConfirm.cancel'),
        onConfirm: () => {
            // proxy.$confirm.hide()
            const WEB3 = new Web3(window.ethereum)
            let amount = WEB3.utils.toWei((exchangeAmount.value).toString(), 'ether')
            swapContractApi.swapUSDTForRT(amount)
                .then(res => {
                    setTimeout(() => {
                        //console.log(res)
                        proxy.$confirm.hide()
                        // showToast('兌換成功')
                        showToast(`${t('modalConfirm.successExchangeRT', { amount: exchangeAmount.value })}`)
                        getUSDTBalance()
                        getPlayersInfo(localStorage.getItem('address'))
                    }, 5000)
                    // location.reload()
                })
                .catch(err => {
                    proxy.$confirm.hide()
                    showToast(t('modalConfirm.exchangeFail'))
                    //console.log(err)
                })
        },
        // onCancel: () => {
        //     proxy.$confirm.hide()
        // },
    });
    // return

    // try {
    //     // proxy.$loading.show()
    //     const WEB3 = new Web3(window.ethereum)
    //     let amount = WEB3.utils.toWei((exchangeAmount.value).toString(), 'ether')
    //     let changeInfo = await swapContractApi.swapUSDTForRT(amount)
    //     //console.log(changeInfo)
    //     proxy.$loading.hide()
    //     showToast(t('toast.success'))
    //     getUSDTBalance()
    //     getPlayersInfo(localStorage.getItem('address'))
    //     location.reload()
    // } catch (err) {
    //     proxy.$loading.hide()
    //     showToast(t('toast.error'))
    //     //console.log(err)
    // }
}

</script>

<style>
.van-overlay {
    backdrop-filter: blur(5px);
}
</style>