<template>
    <div class="text-gray-400 pt-20">
        <div
            class="w-11/12 ml-auto mr-auto rounded-lg bg-card-content flex flex-col justify-start items-center py-2 mb-4">
            <div class="w-11/12">
                <div class="mb-1">
                    {{ $t('invitePage.inviteAddress') }}
                </div>
                <div class=" rounded p-1 mb-2 break-words border border-gray-500 text-gray-200">
                    {{ inviterAddress }}
                </div>
            </div>
        </div>
        <div
            class="w-11/12 ml-auto mr-auto rounded-lg bg-card-content flex flex-col justify-start items-center py-2 mb-4">

            <div class="w-11/12">
                <div class="mb-1">
                    {{ $t('invitePage.preAddress') }}
                </div>
                <div class=" rounded p-1 mb-2 break-words border border-gray-500 text-gray-200">
                    {{ preAddress }}
                </div>
            </div>
        </div>
        <div
            class="w-11/12 ml-auto mr-auto rounded-lg bg-card-content flex flex-col justify-start items-center py-2 mb-4">

            <div class="w-11/12">
                <div class="mb-1">
                    {{ $t('invitePage.selfAddress') }}
                </div>
                <div class=" rounded p-1 mb-2 break-words border border-gray-500 text-gray-200">
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
                <div class="flex w-24 p-2 justify-center bg-black rounded shadow-xl">
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
                            {{ FormatAmount(coherentInfo.limit * 2).pointPre }}.<span class="text-xs">{{
                                FormatAmount(coherentInfo.limit * 2).pointOffside }}</span>
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
                                placement="bottom-end">
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.totalReleased') }}{{ Number(coherentInfo.type - 5) * (6 / 10) }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    <!-- 购买成功之后即时释放{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT -->
                                    {{ $t('coherents.buyAfterReleased') }}{{ Number(coherentInfo.type - 5) * (6 / 10) *
                                        (1 /
                                            3)
                                    }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.24Released') }}{{ Number(coherentInfo.type - 5) * (6 / 10) * (1 /
                                        3)
                                    }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.48Released') }}{{ Number(coherentInfo.type - 5) * (6 / 10) * (1 /
                                        3)
                                    }}PMT
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
        <div class="text-gray-200 text-center text-sm mt-10 operating-button w-11/12 ml-auto mr-auto py-3 rounded"
            @click="togglePackagePopup">
            {{ $t('invitePage.showMore') }}
        </div>

        <div class="w-full fixed bottom-5">
            <div class="flex justify-between items-center">
                <!-- <div @click="togglePackagePopup"
                    class="w-3/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">{{
                        $t('invitePage.chooseCoherent') }}</div> -->
                <div @click="handleConfirmBuyForUSDT"
                    class="w-5/12 mr-auto ml-auto border-primary-color active-white-color border-2 text-white py-2 text-center rounded-full">
                    USD3{{
                        $t('invitePage.pay') }}</div>
                <div @click="handleConfirmBuyForRT"
                    class="w-5/12 mr-auto ml-auto border-2 active-white-color border-primary-color text-white py-2 text-center rounded-full">
                    RT{{
                        $t('invitePage.pay') }}</div>
            </div>

        </div>
        <van-popup v-model:show="showPackagePopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-4 font-bold">{{ $t('invitePage.chooseCoherentTip') }}</div>
                <div v-for="(item, index) in packageList" :key="index" @click="handlePackage(item, index)"
                    class="border border-primary-color py-3 px-1 w-11/12 flex justify-between items-center mb-2 rounded mr-auto ml-auto"
                    :class="coherentInfo.id - 1 == index ? 'operating-button' : ''">
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
import { FormatAmount, FilterAddress } from '@/utils/format'
import Web3 from "web3";
import { generateNonce } from '@/utils/getNonce'
import usdtContractApi from '@/request/usdt'
import { buyCoherent, joinTheThree, updataRTBalance, playersInfo, checkPackageCount, login, rtBalance } from '@/request/api'
import { userStore } from "@/stores/user";
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n';
import pmtContractApi from '@/request/pmt'
import { config } from '@/const/config'
import { useRouter } from 'vue-router'
const router = useRouter()
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
let hasPackage = ref(false)
let timer = ref(null)
onMounted(() => {
    //console.log(route.query)
    inviterAddress.value = route.query.inviter
    preAddress.value = route.query.pre
    point.value = route.query.point

    selfAddress.value = window.ethereum.selectedAddress
    let targetCoherents = coherents_list.filter(item => {
        return item.type == '205'
    })
    coherentInfo.value = targetCoherents[0]
    //console.log(coherentInfo.value)
    // getPlayersInfo(window.ethereum.selectedAddress)
    if (!localStorage.getItem('token')) {
        addressSign()
    }
})
//判断rt余额是否充足
async function isSufficientRT(amount) {
    let balance = await rtBalance({ address: localStorage.getItem('address') })
    balance = parseInt(balance.player.rt)
    return Number(amount).toFixed(0) <= balance
}

//判斷usdt餘額是否充足
async function isSufficientUSD3(amount) {
    let balance = await usdtContractApi.balanceOf(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    balance = WEB3.utils.fromWei(balance.toString(), 'ether')
    balance = parseInt(balance)
    //console.log(amount, balance)
    return Number(amount).toFixed(0) <= balance
}

//加入樹狀圖
function joinTree() {
    let data = {
        address: inviterAddress.value,
        leg_address: preAddress.value,
        legSide: point.value
    }
    joinTheThree(data)
        .then(res => {
            //测试没问题之后，这里可以跳回首页
            proxy.$loading.hide()
        })
        .catch(err => {
            proxy.$loading.hide()
        })
}

//獲取玩家信息
function getPackageCount() {
    proxy.$loading.show()

    checkPackageCount()
        .then(res => {
            if (res.message == '你已經購買配套。') {
                clearInterval(timer.value)
                showToast(t('modalConfirm.buySuccess'))
                proxy.$confirm.hide()
                proxy.$loading.show()
                joinTree()

            }
        })
        .catch(err => {
            //console.log('err', err)
            proxy.$loading.hide()
        })
}
//點解配套列表配套
function handlePackage(packageInfo) {
    if (!packageInfo.isSale) {
        showToast(t('toast.notYetOpen'))
        return
    }
    let targetCoherents = coherents_list.filter(item => {
        return item.type == packageInfo.type
    })
    coherentInfo.value = targetCoherents[0]
    //console.log(coherentInfo.value)
    togglePackagePopup()
}
function togglePackagePopup() {
    showPackagePopup.value = !showPackagePopup.value
}

//使用rt購買package 
async function handleConfirmBuyForRT() {
    proxy.$loading.show()

    try {
        if (!await isSufficientRT(coherentInfo.value.type)) {
            proxy.$loading.hide()
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: t('modalConfirm.notBalance'),
                // content: `當前配套價格為 ${coherentInfo.value.type} RT，您的 RT 餘額不足。`,
                content: `${t('modalConfirm.notEnoughBalance', { amount: coherentInfo.value.type, currency: 'RT' })}`,
                showCancelButton: false,
                confirmText: t('modalConfirm.confirm'),
                onConfirm: () => {
                    proxy.$confirm.hide()
                },
            });
            return
        }

    } catch (err) {
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.error'),
            content: t('modalConfirm.getBalanceFail'),
            showCancelButton: false,
            confirmText: t('modalConfirm.confirm'),
            onConfirm: () => {
                proxy.$confirm.hide()
            },
        });
        return
    }

    let data = { package_id: coherentInfo.value.id, referrer_address: inviterAddress.value, leg_address: preAddress.value, legSide: point.value }
    buyCoherent(data)
        .then(res => {
            proxy.$loading.hide()
            //console.log('購買成功', res)
            // if (res.message == 'RT餘額不足') {
            //     showToast('RT餘額不足')
            // }
            if (res.error) {
                proxy.$confirm.hide()
                proxy.$confirm.show({
                    title: t('toast.error'),
                    content: `${res.error}`,
                    showCancelButton: false,
                    confirmText: t('modalConfirm.confirm'),
                    onConfirm: () => {
                        proxy.$confirm.hide()

                    },
                });
                return
            }
            showToast(res.message)
            updataRTBalance(localStorage.getItem('address'))
                .then(res => {
                    //console.log('更新rt餘額', res)

                })
                .catch(err => {
                    //console.log('更新rt餘額失敗', err)
                })
        })
        .catch(err => {
            proxy.$loading.hide()
            //console.log('購買失敗', err)
            showToast(t('modalConfirm.error'))
            toggleConfirmPayPopup()

        })
}

//使用usdt購買package
async function handleConfirmBuyForUSDT() {
    //console.log(coherentInfo.value.type)
    proxy.$loading.show()
    try {
        if (!await isSufficientUSD3(coherentInfo.value.type)) {
            proxy.$loading.hide()
            proxy.$confirm.hide()
            proxy.$confirm.show({
                title: t('modalConfirm.notBalance'),
                content: `${t('modalConfirm.notEnoughBalance', { amount: buyPackage.value.text, currency: 'USD3' })}`,
                showCancelButton: false,
                confirmText: t('modalConfirm.confirm'),
                onConfirm: () => {
                    proxy.$confirm.hide()
                },
            });
            return
        }

    } catch (err) {
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.error'),
            content: t('modalConfirm.getBalanceFail'),
            showCancelButton: false,
            confirmText: t('modalConfirm.confirm'),
            onConfirm: () => {
                proxy.$confirm.hide()
            },
        });
        return
    }
    let allowance
    try { //检查usdt对pmt_purchase的授权状态
        allowance = await usdtContractApi.allowance(localStorage.getItem('address'), config.pmt_purchase_addr)
        proxy.$loading.hide()
    } catch (err) {
        proxy.$loading.hide()
        showToast(`${t('modalConfirm.checkAuthFail')}`)
        //console.log(err)
    }
    //console.log('allowance', allowance)

    if (Number(allowance) == 0) { //當前領取方式未授權
        proxy.$loading.hide()
        proxy.$confirm.hide()
        proxy.$confirm.show({
            title: t('modalConfirm.authorize'),
            content: t('modalConfirm.pleaseAuthorize', { type: 'USD3' }),
            showCancelButton: false,
            confirmText: t('modalConfirm.toAuthorize'),
            onConfirm: () => {
                usdtContractApi.approve(config.pmt_purchase_addr)
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
        content: `${t('modalConfirm.confirmBuyPackage')}`,
        showCancelButton: true,
        confirmText: t('modalConfirm.confirm'),
        cancelText: t('modalConfirm.cancel'),
        onConfirm: async () => {
            try {
                await pmtContractApi.purchasePackage(Number(coherentInfo.value.id - 1))
                timer.value = setInterval(() => {
                    getPackageCount()
                }, 5000);
            } catch (err) {
                //console.log(err)
                proxy.$confirm.hide()
                showToast(t('toast.error'))
            }
        },
        // onCancel: () => {
        //     proxy.$confirm.hide()
        // },
    });

    // try {
    //     //console.log(coherentInfo.value.type)
    //     proxy.$loading.show()
    //     await pmtContractApi.purchasePackage(Number(coherentInfo.value.id - 1))
    //     timer.value = setInterval(() => {
    //         getPackageCount()
    //     }, 5000);
    // } catch (err) {
    //     proxy.$loading.hide()
    //     showToast(t('toast.error'))
    //     //console.log(err)
    // }
}
//签名
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
        showToast(t('modalConfirm.error'))
        return
    }


    try {
        let loginInfo = await login(params)
        localStorage.setItem('token', loginInfo.access_token)
        localStorage.setItem('address', loginInfo.address)
        userInfo.changeAddress(loginInfo.address)
        let packageInfo = await checkPackageCount()
        if (packageInfo.message == '您已經購買配套。') {
            let data = {
                address: inviterAddress.value,
                leg_address: preAddress.value,
                legSide: point.value
            }
            await joinTheThree(data)
        }
        //console.log()
    } catch (err) {
        proxy.$loading.hide()
        showToast(t('modalConfirm.error'))
        //console.log(err)
    }

    proxy.$loading.hide()

    // login(params)
    //     .then(res => {
    //         //console.log(res)
    //         localStorage.setItem('token', res.access_token)
    //         localStorage.setItem('address', res.address)
    //         userInfo.changeAddress(res.address)
    //         proxy.$loading.hide()
    //         // showToast('已登录')
    //     })
    //     .catch(err => {
    //         proxy.$loading.hide()
    //         showToast(t('toast.error'))
    //         //console.log(err)
    //     })
    // //console.log(signature)

}

</script>

<style></style>