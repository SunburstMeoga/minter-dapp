<template>
    <div class="text-gray-400 pt-20">
        <div class="w-11/12 ml-auto mr-auto rounded-lg bg-card-content flex flex-col justify-start items-center py-2 mb-4">
            <div class="w-11/12">
                <div class="mb-1">
                    {{ $t('invitePage.inviteAddress') }}
                </div>
                <div class=" rounded p-1 mb-2 break-words">
                    {{ inviterAddress }}
                </div>
            </div>
            <div class="w-11/12">
                <div class="mb-1">
                    {{ $t('invitePage.preAddress') }}
                </div>
                <div class=" rounded p-1 mb-2 break-words">
                    {{ preAddress }}
                </div>
            </div>
            <div class="w-11/12">
                <div class="mb-1">
                    {{ $t('invitePage.selfAddress') }}
                </div>
                <div class=" rounded p-1 mb-2 break-words">
                    {{ selfAddress }}
                </div>
            </div>
        </div>

        <!-- <div class="w-full my-3">
            <div @click="togglePackagePopup"
                class="w-11/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">選擇配套</div>
        </div> -->

        <div class="bg-card-content w-11/12 ml-auto mr-auto rounded-lg p-2">
            <div class="flex justify-start items-center w-full">
                <div class="flex w-30 p-2 justify-center bg-page-content rounded shadow-xl">
                    <img :src="coherentInfo.levelImg" alt="">
                </div>
                <div class="text-gray-400 flex-1 ml-2 h-full flex flex-col justify-start text-sm">
                    <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.price') }}:
                        </div>
                        <div class="text-red-500 font-bold">
                            {{ FormatAmount(coherentInfo.type).pointPre }}.<span class="text-xs">{{
                                FormatAmount(coherentInfo.type).pointOffside }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.coherentCap') }}:
                        </div>
                        <div class="text-red-500 font-bold">
                            {{ FormatAmount(coherentInfo.limit).pointPre }}.<span class="text-xs">{{
                                FormatAmount(coherentInfo.limit).pointOffside }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.contribution') }}:
                        </div>
                        <div>
                            {{ coherentInfo.shareholdings }}
                        </div>
                    </div>
                    <div class="flex justify-between text-gray-400 items-center mb-1.5">
                        <div class="">
                            {{ $t('coherents.totalReleased') }} <van-popover v-model:show="showPMTPopover" theme="dark"
                                placement="bottom-start">
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.totalReleased') }}{{ Number(coherentInfo.type) * (6 / 10) }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    <!-- 购买成功之后即时释放{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT -->
                                    {{ $t('coherents.buyAfterReleased') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3)
                                    }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.24Released') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.48Released') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT
                                </div>
                                <template #reference>
                                    <span class="icon iconfont icon-wenzishuoming_wenzishuoming"></span>
                                </template>
                            </van-popover>

                        </div>
                        <div>{{ coherentInfo.releasePMT }}PMT</div>
                    </div>

                    <!-- <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.MatchingLevelBonusRate') }}:
                        </div>
                        <div>
                            {{ coherentInfo.incentiveRate * 100 + '%' }}
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="w-full fixed bottom-3">
            <div class="flex justify-between items-center">
                <div @click="togglePackagePopup"
                    class="w-3/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">{{ $t('invitePage.chooseCoherent') }}</div>
                <div @click="handleConfirmBuyForUSDT"
                    class="w-3/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">USD3{{ $t('invitePage.pay') }}</div>
                <div @click="handleConfirmBuyForRT"
                    class="w-3/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">RT{{ $t('invitePage.pay') }}</div>
            </div>

        </div>
        <van-popup v-model:show="showPackagePopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-4 font-bold">{{ $t('invitePage.chooseCoherentTip') }}</div>
                <div v-for="(item, index) in packageList" :key="index" @click="handlePackage(item)"
                    class="operating-button py-2 px-1 w-11/12 flex justify-between items-center mb-2 rounded mr-auto ml-auto">
                    <div>
                        {{ item.name }}
                    </div>
                    <div>
                        {{ item.type }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import coherents_list from '@/datas/coherents_list'
import { login } from '@/request/api'
import { FormatAmount, FilterAddress } from '@/utils/format'
import Web3 from "web3";
import { generateNonce } from '@/utils/getNonce'
import usdtContractApi from '@/request/usdt'
import { buyCoherent, joinTheThree, updataRTBalance } from '@/request/api'
import { userStore } from "@/stores/user";
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n';
import pmtContractApi from '@/request/pmt'
import { config } from '@/const/config'
// /market/invite-buy-package
const route = useRoute()
const { t } = useI18n()

const { proxy } = getCurrentInstance()
const userInfo = userStore()
let inviterAddress = ref()
let preAddress = ref()
let point = ref('')
let selfAddress = ref()
let showPackagePopup = ref(false)
let packageList = coherents_list
let coherentInfo = ref({})
onMounted(() => {
    console.log(route.query)
    inviterAddress.value = route.query.inviter
    preAddress.value = route.query.pre
    point.value = route.query.point

    selfAddress.value = window.ethereum.selectedAddress
    let targetCoherents = coherents_list.filter(item => {
        return item.type == '200'
    })
    coherentInfo.value = targetCoherents[0]
    console.log(coherentInfo.value)
    if (!localStorage.getItem('token')) {
        addressSign()
    }
})
function handlePackage(packageInfo) {
    if (!packageInfo.isSale) {
        showToast(t('toast.notYetOpen'))
        return
    }
    let targetCoherents = coherents_list.filter(item => {
        return item.type == packageInfo.type
    })
    coherentInfo.value = targetCoherents[0]
    console.log(coherentInfo.value)
    togglePackagePopup()
}
function togglePackagePopup() {
    showPackagePopup.value = !showPackagePopup.value
}

//使用rt購買package 
function handleConfirmBuyForRT() {
    proxy.$loading.show()
    let data = { package_id: coherentInfo.value.id, referrer_address: inviterAddress.value, leg_address: preAddress.value, legSide: point.value }
    buyCoherent(data)
        .then(res => {
            proxy.$loading.hide()
            console.log('購買成功', res)
            // if (res.message == 'RT餘額不足') {
            //     showToast('RT餘額不足')
            // }
            showToast(res.message)
            updataRTBalance(localStorage.getItem('address'))
                .then(res => {
                    console.log('更新rt餘額', res)
                })
                .catch(err => {
                    console.log('更新rt餘額失敗', err)
                })
        })
        .catch(err => {
            proxy.$loading.hide()
            console.log('購買失敗', err)
            showToast('購買失敗')
            toggleConfirmPayPopup()

        })
}

//使用usdt購買package
async function handleConfirmBuyForUSDT() {
    proxy.$loading.show()
    let allowance
    try { //检查usdt对pmt_purchase的授权状态
        allowance = await usdtContractApi.allowance(localStorage.getItem('address'), config.pmt_purchase_addr)
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
            content: '需要進行USD3授權，請先完成授權。',
            showCancelButton: false,
            confirmText: '去授權',
            onConfirm: () => {
                // proxy.$loading.show()
                // usdt对pmt授權
                usdtContractApi.approve(config.pmt_purchase_addr)
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

    try {
        console.log(coherentInfo.value.type)
        proxy.$loading.show()
        await pmtContractApi.purchasePackage(Number(coherentInfo.value.id - 1))
        let data = {
            address: inviterAddress.value,
            leg_address: preAddress.value,
            legSide: point.value
        }
        await joinTheThree(data)
        proxy.$loading.hide()
        showToast(t('toast.success'))
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        console.log(err)
    }
}

async function addressSign() {
    proxy.$loading.show()
    const web3 = new Web3(window.ethereum)
    let params = {}
    const randomString =
        "Welcome to Minter\n\nPlease click to sign in and accept the Minter Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n" +
        window.ethereum.selectedAddress +
        "\n\nNonece:\n" +
        generateNonce();
    try {
        const signature = await web3.eth.personal.sign(randomString, window.ethereum.selectedAddress, '')
        params = { randomString: randomString, signature: signature }
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('toast.error'))
        return
    }


    login(params)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.access_token)
            localStorage.setItem('address', res.address)
            userInfo.changeAddress(res.address)
            proxy.$loading.hide()
            // showToast('已登录')
        })
        .catch(err => {
            proxy.$loading.hide()
            showToast(t('toast.error'))
            console.log(err)
        })
    // console.log(signature)

}

</script>

<style></style>