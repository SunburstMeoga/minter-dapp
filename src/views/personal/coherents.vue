<template>
    <div class="flex flex-col justify-start items-center w-ful pt-16 pb-20">
        <div class="w-11/12 mb-2">
            <module-title :titleWord="$t('coherents.title')" />
        </div>
        <!-- <div class="w-11/12 text-xs text-red-700 mb-5">
            {{ $t('coherents.tips') }}
        </div> -->
        <div class="w-11/12">
            <div class="rounded border-card-content border p-2 mb-2 text-white">
                <div class="pt-1 flex justify-between items-center">
                    <div>
                        {{ $t('coherents.released') }}
                    </div>
                    <div>
                        {{ Number(beenReleased).toFixed(4) >= 0.000 ? Number(beenReleased).toFixed(4) : 0.000 }} PMT
                    </div>
                </div>
                <div class="pt-1 flex justify-between items-center">
                    <div>
                        {{ $t('coherents.remainingRelease') }}
                    </div>
                    <div>
                        {{ Number(remainingPMT).toFixed(4) }} PMT
                    </div>
                </div>
                <div class="pt-1 flex justify-between items-center mb-4">
                    <div>
                        {{ $t('coherents.releaseCountdown') }}
                    </div>
                    <div>
                        {{ canReleasedTime }}
                    </div>
                </div>
                <div class="rounded-full py-1.5 text-center text-white mb-2"
                    :class="Number(remainingPMT) == 0 || isNotYet ? 'disable-button' : 'operating-button'"
                    @click="handleReleased">
                    {{ $t('coherents.releaseButton') }}
                </div>
            </div>
            <div>
                <div class="rounded border-card-content border p-2 mb-2 text-white">
                    <div class="pt-1 flex justify-between items-center">
                        <div>
                            {{ $t('coherents.dynamicWithdrawedTotal') }}
                        </div>
                        <div>
                            {{ Number(totalBTWithdraw).toFixed(4) }} BT
                        </div>
                    </div>
                    <div class="pt-1 flex justify-between items-center">
                        <div>
                            {{ $t('coherents.dynamicWithdrawTotal') }}
                        </div>
                        <div>
                            {{ Number(totalBTReward).toFixed(4) }} BT
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-2" v-for="(item, index) in playerPackages" :key="index">
                <coherent-card :showReVote="showReVote" :coherentInfo="item" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import ModuleTitle from "../../components/ModuleTitle.vue";
import CoherentCard from "../../components/CoherentCard.vue";
import pmtContractApi from '@/request/pmt'
import coherents_list from '@/datas/coherents_list'
import { useI18n } from 'vue-i18n'
import { playersInfo } from '@/request/api'
import { Web3 } from 'web3'
import { showToast } from 'vant';
import { useRoute, useRouter } from "vue-router"
const router = useRouter()
const route = useRoute()
const { proxy } = getCurrentInstance()
const { t } = useI18n()

const coherentsList = ref(coherents_list)
let playerPackages = ref([])
let remainingPMT = ref("")
let beenReleased = ref("") //已經釋放的PMT
let canReleasedTime = ref("")
let releaseTime = ref(2)
let totalBTWithdraw = ref(null)
let totalBTReward = ref(null)
let showReVote = ref(false)

let isNotYet = ref(true)
onMounted(() => {
    // releasePMTTokens()
    if (route.query.isReVote) {
        showReVote.value = true
        //console.log(showReVote.value)
    }
    getPlayersInfo(localStorage.getItem('address'))
    getPNTRemainingLockupPeriod()
    getPMTLockedAmount()
    // countDown(1702712103000)

})

function countDown(time) {
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
    // //console.log(day + "天" + hour + "时" + minute + "分" + second + "秒")
    if (time <= 0) {
        isNotYet.value = false
        canReleasedTime.value = t("coherents.canRelease")
        return
    }
    canReleasedTime.value = day + ":" + hour + ":" + minute + ":" + second
    // return day + "天" + hour + "时" + minute + "分" + second + "秒"
}
//點擊復投按鈕
function toReVote(item) {
    router.push({
        path: `/checkout-counter/${item.type}`
    })
}
//點擊釋放按鈕
async function handleReleased() {
    proxy.$loading.show()
    if (Number(remainingPMT.value) == 0 || isNotYet.value) {
        showToast(remainingPMT.value == 0 ? t('toast.haveNotCanReleasePMT') : t('toast.notTimeToRelease'))
        proxy.$loading.hide()
        return
    }
    proxy.$loading.hide()
    proxy.$confirm.hide()
    proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        content: t('modalConfirm.confirmRelease'),
        showCancelButton: true,

        cancelText: t('modalConfirm.cancel'),
        confirmText: t('modalConfirm.confirm'),
        onConfirm: async () => {
            try {
                await pmtContractApi.releaseTokens(localStorage.getItem('address'))
                setTimeout(() => {
                    proxy.$confirm.hide()
                    proxy.$confirm.show({
                        title: t('modalConfirm.tips'),
                        content: t('toast.releaseSuccess'),
                        showCancelButton: false,
                        confirmText: t('modalConfirm.confirm'),
                        onConfirm: () => {
                            proxy.$confirm.hide()
                            location.reload()
                        },
                    });
                }, 5000);
            } catch (err) {
                //console.log(err)
                proxy.$confirm.hide()
                proxy.$confirm.show({
                    title: t('modalConfirm.tips'),
                    content: t('toast.releaseFail'),
                    showCancelButton: false,
                    confirmText: t('modalConfirm.confirm'),
                    onConfirm: () => {
                        proxy.$confirm.hide()
                    },
                });
            }
        },
    });
}
//獲取鎖定的代幣數量
async function getPMTLockedAmount() {
    let result = await pmtContractApi.getLockedAmount(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    let remainingPMTNum = WEB3.utils.fromWei(result.toString(), 'ether')
    remainingPMT.value = remainingPMTNum
    //console.log('獲取鎖定的代幣數量', result)
}
//獲取剩餘的鎖定期
async function getPNTRemainingLockupPeriod() {
    let result = await pmtContractApi.getRemainingLockupPeriod(localStorage.getItem('address'))
    //console.log('獲取剩餘的鎖定期', result)
    releaseTime.value = Number(result)
    // releaseTime.value = 1702729311
    if ((Number(result) + (new Date().getTime() / 1000)) > new Date().getTime() / 1000) {
        isNotYet.value = true
        let time = Number(result) + (new Date().getTime() / 1000)
        setInterval(() => {
            // countDown(Number(result) + (new Date().getTime() / 1000))
            countDown(time)
        }, 1000)
    } else if ((Number(result) + (new Date().getTime() / 1000)) == new Date().getTime() / 1000) {
        isNotYet.value = false
        canReleasedTime.value = t('coherents.canRelease')
    }
    // setInterval(() => {
    //     countDown(Number(1702712103))
    // }, 1000)

}
//釋放PMT
// async function releasePMTTokens() {
//     let result = await pmtContractApi.releaseTokens(localStorage.getItem('address'))
//     //console.log(result)
// }
//獲取玩家信息
function getPlayersInfo(address) {
    proxy.$loading.show()
    playersInfo(address)
        .then(res => {
            //console.log('res', res)

            // 安全检查：确保必要的数据存在
            if (!res || !res.player) {
                console.error('玩家信息获取失败：返回数据为空')
                proxy.$loading.hide()
                return
            }

            // 安全访问 dynamic_earning_percentage_limit
            const dynamicEarningLimit = res.player.dynamic_earning_percentage_limit || {}
            const { total_bt_withdraw = 0, total_bt_reward = 0, total_package_value = 0, last_out_total_package_value = 0 } = dynamicEarningLimit

            totalBTWithdraw.value = total_bt_withdraw
            // totalBTReward.value = total_bt_reward
            totalBTReward.value = Number(total_package_value * 2 - last_out_total_package_value).toFixed()

            // 安全访问 package_transactions
            const packageTransactions = res.player.package_transactions || []
            packageTransactions.map(item => {
                coherentsList.value.map(_item => {
                    let obj = {}
                    if (item.package_id == _item.id) {
                        _item.created_at = item.created_at
                        _item.amount = item.amount
                        _item.pmt = Number(item.amount) * 0.6
                        playerPackages.value.push(_item)
                    }
                })
            })
            let remainingPMT
            let totalPMT = playerPackages.value.reduce((sum, e) => sum + Number(e.pmt || 0), 0)
            pmtContractApi.getLockedAmount(localStorage.getItem('address'))
                .then(res => {
                    let WEB3 = new Web3(window.ethereum)
                    remainingPMT = WEB3.utils.fromWei(res.toString(), 'ether')
                    beenReleased.value = totalPMT - Number(remainingPMT) //已經釋放
                    //console.log(remainingPMT, totalPMT, beenReleased.value)
                    //console.log(playerPackages.value)
                })
                .catch(err => {
                    //console.log(err)
                })
            proxy.$loading.hide()
            // //console.log(playerPackages.value, totalPMT)
        })
        .catch(err => {
            proxy.$loading.hide()

            //console.log('err', err)
        })
}
</script>

<style></style>