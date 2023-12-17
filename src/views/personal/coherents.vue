<template>
    <div class="flex flex-col justify-start items-center w-full bg-black pt-16 pb-20">
        <div class="w-11/12 mb-2">
            <module-title :titleWord="$t('coherents.title')" />
        </div>
        <!-- <div class="w-11/12 text-xs text-red-700 mb-5">
            {{ $t('coherents.tips') }}
        </div> -->
        <div class="w-11/12">
            <div class="rounded bg-card-content p-2 mb-2 text-white">
                <div class="pt-1 flex justify-between items-center">
                    <div>
                        已經釋放：
                    </div>
                    <div>
                        {{ Number(beenReleased).toFixed(4) }} PMT
                    </div>
                </div>
                <div class="pt-1 flex justify-between items-center">
                    <div>
                        剩餘釋放量：
                    </div>
                    <div>
                        {{ Number(remainingPMT).toFixed(4) }} PMT
                    </div>
                </div>
                <div class="pt-1 flex justify-between items-center mb-4">
                    <div>
                        釋放倒計時：
                    </div>
                    <div>
                        {{ canReleasedTime }}
                    </div>
                </div>
                <div class="rounded-full py-1.5 text-center text-white mb-2"
                    :class="Number(remainingPMT) == 0 && isNotYet ? 'disable-button' : 'operating-button'"
                    @click="handleReleased">
                    釋放
                </div>
            </div>
            <div class="mb-2" v-for="(item, index) in playerPackages" :key="index">
                <coherent-card :coherentInfo="item" />
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
const { proxy } = getCurrentInstance()
const { t } = useI18n()

const coherentsList = ref(coherents_list)
let playerPackages = ref([])
let remainingPMT = ref("")
let beenReleased = ref("") //已經釋放的PMT
let canReleasedTime = ref("00天00時00分00秒")
let releaseTime = ref(0)
let isNotYet = ref(true)
onMounted(() => {
    // releasePMTTokens()
    getPlayersInfo(localStorage.getItem('address'))
    getPNTRemainingLockupPeriod()
    getPMTLockedAmount()
    // countDown(1702712103000)

})

function countDown(EndTime) {
    var EndTime = EndTime//结束时间
    var NowTime = new Date();//当前时间
    var t = EndTime - (NowTime.getTime() / 1000).toFixed(0);
    var d = Math.floor(t / 60 / 60 / 24);//天 
    var h = Math.floor(t / 60 / 60 % 24);//时 
    var m = Math.floor(t / 60 % 60);//分 
    var s = Math.floor(t % 60);//秒 
    if (parseInt(d) < 10) {
        d = "0" + d;
    }
    if (parseInt(h) < 10) {
        h = "0" + h;
    }
    if (parseInt(m) < 10) {
        m = "0" + m;
    }
    if (parseInt(s) < 10) {
        s = "0" + s;
    }
    let tarTime = d + "天" + h + "時" + m + "分" + s + "秒"
    canReleasedTime.value = tarTime
    console.log(EndTime, tarTime)

    return tarTime
    // return day + "天" + hour + "时" + minute + "分" + second + "秒"
}
//點擊釋放按鈕
async function handleReleased() {
    proxy.$loading.show()
    if (Number(remainingPMT.value) == 0 || isNotYet.value) {
        showToast(remainingPMT.value == 0 ? '暫無可釋放PMT' : "未到釋放時間")
        proxy.$loading.hide()
        return
    }
    try {
        await pmtContractApi.releaseTokens(localStorage.getItem('address'))
        proxy.$loading.hide()
        showToast(t('toast.success'))
        getPlayersInfo(localStorage.getItem('address'))
        getPNTRemainingLockupPeriod()
        getPMTLockedAmount()
    } catch (err) {
        console.log(err)
        showToast(t('toast.error'))
    }
}
//獲取鎖定的代幣數量
async function getPMTLockedAmount() {
    let result = await pmtContractApi.getLockedAmount(localStorage.getItem('address'))
    let WEB3 = new Web3(window.ethereum)
    let remainingPMTNum = WEB3.utils.fromWei(result.toString(), 'ether')
    remainingPMT.value = remainingPMTNum
    console.log('獲取鎖定的代幣數量', result)
}
//獲取剩餘的鎖定期
async function getPNTRemainingLockupPeriod() {
    let result = await pmtContractApi.getRemainingLockupPeriod(localStorage.getItem('address'))
    console.log('獲取剩餘的鎖定期', result)
    releaseTime.value = Number(result)
    // releaseTime.value = 1702729311
    console.log((Number(result) + (new Date().getTime() / 1000)), new Date().getTime() / 1000)
    if ((Number(result) + (new Date().getTime() / 1000)) > new Date().getTime() / 1000) {
        isNotYet.value = true
        setInterval(() => {
            countDown(Number(releaseTime.value))
        }, 1000)
    } else if ((Number(result) + (new Date().getTime() / 1000)) == new Date().getTime() / 1000) {
        isNotYet.value = false
        // canReleasedTime.value = "可以釋放"
    }
    // setInterval(() => {
    //     countDown(Number(1702830365 * 1000))
    // }, 1000)

}
//釋放PMT
// async function releasePMTTokens() {
//     let result = await pmtContractApi.releaseTokens(localStorage.getItem('address'))
//     console.log(result)
// }
//獲取玩家信息
function getPlayersInfo(address) {
    proxy.$loading.show()
    playersInfo(address)
        .then(res => {
            console.log('res', res)
            res.player.package_transactions.map(item => {
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
                    beenReleased.value = totalPMT - Number(remainingPMT)
                })
                .catch(err => {
                    console.log(err)
                })
            proxy.$loading.hide()
            // console.log(playerPackages.value, totalPMT)
        })
        .catch(err => {
            proxy.$loading.hide()

            console.log('err', err)
        })
}
</script>

<style></style>