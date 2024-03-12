<template>
    <div class="text-gray-200 text-center text-lg font-bold">{{ $t('wallet.staticIncome') }}</div>
    <div id="staticEarnings" class="flex justify-center items-center" style="height: 380px; width:100vw;"></div>
    <div class="text-gray-500 text-center text-base -mt-20"> {{ point }}</div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import pmtContractApi from '@/request/pmt'
import * as echarts from 'echarts'
import { Web3 } from 'web3'
import { playersInfo } from '@/request/api'
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const { proxy } = getCurrentInstance()
let maxPackage = ref('')
let point = ref('')
onMounted(() => {
    getStaticIncomeInfo()
    // getPlayersInfo(localStorage.getItem('address').toLowerCase())

})
async function userGetWithdrawalAmount() { //
    let result = await pmtContractApi.getWithdrawalAmount(localStorage.getItem('address').toLowerCase())
    //console.log(result)
}
async function userGetWithdrawalAmountLimit() {
    let result = await pmtContractApi.getWithdrawalAmountLimit(localStorage.getItem('address').toLowerCase())
    //console.log(result)
}
async function userGetRewardAmount() {
    let result = await pmtContractApi.getRewardAmount(localStorage.getItem('address').toLowerCase())
    //console.log(result)
}
async function userGetRewardAmountLimit() {
    let result = await pmtContractApi.getRewardAmountLimit(localStorage.getItem('address').toLowerCase())
    //console.log(result)
}
// async function getPMTBalance() {
//     //console.log('userInfo.address', userInfo.address)
//     let balance = await pmtContractApi.balanceOf(userInfo.address)
//     let WEB3 = new Web3(window.ethereum)
//     let result = WEB3.utils.fromWei(balance.toString(), 'ether')
//     //console.log('pmt', result)
//     pmtBalance.value = result
//     return balance
// }

async function getStaticIncomeInfo() {
    try {
        proxy.$loading.show()
        let WEB3 = new Web3(window.ethereum)
        //現時已提現總數
        let withdrawalAmount = await pmtContractApi.getWithdrawalAmount(localStorage.getItem('address').toLowerCase())
        withdrawalAmount = WEB3.utils.fromWei(withdrawalAmount.toString(), 'ether')
        withdrawalAmount = Number(withdrawalAmount).toFixed(0)
        //可提現上線
        let withdrawalAmountLimit = await pmtContractApi.getWithdrawalAmountLimit(localStorage.getItem('address').toLowerCase())
        withdrawalAmountLimit = WEB3.utils.fromWei(withdrawalAmountLimit.toString(), 'ether')
        withdrawalAmountLimit = Number(withdrawalAmountLimit).toFixed(0)
        //現時收益總數
        let rewardAmount = await pmtContractApi.getRewardAmount(localStorage.getItem('address').toLowerCase())
        rewardAmount = WEB3.utils.fromWei(rewardAmount.toString(), 'ether')
        rewardAmount = Number(rewardAmount).toFixed(2)
        //收益上限
        let rewardAmountLimit = await pmtContractApi.getRewardAmountLimit(localStorage.getItem('address').toLowerCase())
        rewardAmountLimit = WEB3.utils.fromWei(rewardAmountLimit.toString(), 'ether')
        rewardAmountLimit = Number(rewardAmountLimit).toFixed(2)
        //锁定期的pmt数量
        let getLockedAmount = await pmtContractApi.getLockedAmount(localStorage.getItem('address').toLowerCase())
        getLockedAmount = WEB3.utils.fromWei(getLockedAmount.toString(), 'ether')
        getLockedAmount = Number(getLockedAmount).toFixed(0)
        //獲取PMT的釋放次數
        let getReleaseCount = await pmtContractApi.getReleaseCount(localStorage.getItem('address').toLowerCase())
        // getReleaseCount = WEB3.utils.fromWei(getReleaseCount.toString(), 'ether')
        getReleaseCount = Number(getReleaseCount).toFixed(0)

        //最新配套金额
        let result = await playersInfo(localStorage.getItem('address').toLowerCase())
        //console.log('result', result)
        let max = Number(result.player.max_package.price) * 2
        let min = Number(result.player.max_package.price) * 0.6 //最高金額的package釋放數量
        let eraningAmount = Number(result.player.package_transactions[0].amount) * 0.6 / 3 * (3 - getReleaseCount)  //pmt釋放量
        let pmtBalance = await pmtContractApi.balanceOf(localStorage.getItem('address').toLowerCase())

        pmtBalance = WEB3.utils.fromWei(pmtBalance.toString(), 'ether')
        pmtBalance = Number(pmtBalance)
        let income = pmtBalance - min
        let trueLimit = max - min
        // let point
        point.value = Number(((rewardAmount - eraningAmount) / rewardAmountLimit) * 100).toFixed(2) + '%'
        // if (income >= trueLimit) {
        //     point = '100%'
        // } else {
        //     point = Number((income / trueLimit) * 100).toFixed(1) + '%'
        // }

        //console.log('pmt', pmtBalance)

        //console.log('现时已提取總數 ', withdrawalAmount)
        //console.log('可提取上限 ', withdrawalAmountLimit)
        //console.log('現時收益總數 ', rewardAmount)
        //console.log('收益上限 ', rewardAmountLimit)
        //console.log('锁定期的pmt数量 ', getLockedAmount)
        //console.log('獲取PMT的釋放次數 ', getReleaseCount)
        //console.log('package總釋放數量 ', min)
        //console.log('package的釋放量', eraningAmount)


        let myChart = echarts.init(document.getElementById("staticEarnings"));
        myChart.setOption({
            tooltip: {
                // formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    // name: '已产出',
                    type: 'gauge',
                    // min: rewardAmount,
                    min: 0,
                    max: rewardAmountLimit,
                    progress: {
                        show: true,
                        overlap: true,
                        width: 10,
                        roundCap: false,
                        clip: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value} MT',
                        fontSize: '20px',
                        color: '#fff',
                        borderColor: '#e149ed',

                        // width: 100,
                        // height: 40

                    },
                    axisLabel: {
                        distance: 16,
                        color: '#999',
                        fontSize: 12
                    },
                    data: [
                        {
                            value: (rewardAmount - eraningAmount) >= 0 ? Number(rewardAmount - eraningAmount).toFixed(2) : 0,
                            name: `${t('assistance.remain')}: ${Number(rewardAmountLimit - rewardAmount + Number(eraningAmount)).toFixed(2)} MT`
                            // name: '剩余量:' + rewardAmountLimit - rewardAmount + ' MT',
                        }
                    ],
                    radius: '90%',
                    title: {
                        // fontSize: '2px',
                        color: '#fff',
                        fontWeight: 'small'
                    },
                    color: '#e149ed',
                    gradientColor: [
                        "e149ed",
                        "e149ed",
                        "e149ed"

                    ]
                }
            ]
        });
        window.onresize = function () {
            myChart.resize();
        };
        proxy.$loading.hide()

    } catch (err) {
        //console.log(err)
        proxy.$loading.hide()
    }
}


</script>