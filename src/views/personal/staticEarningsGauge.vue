<template>
    <div class="text-gray-200 text-center text-sm">{{ $t('wallet.staticIncome') }}</div>
    <div id="staticEarnings" class="flex justify-center items-center" style="height: 380px; width:100vw;">
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import pmtContractApi from '@/request/pmt'
import * as echarts from 'echarts'
import { Web3 } from 'web3'
import { playersInfo } from '@/request/api'

let maxPackage = ref('')

onMounted(() => {
    getStaticIncomeInfo()
    // getPlayersInfo(localStorage.getItem('address'))

})
async function userGetWithdrawalAmount() { //
    let result = await pmtContractApi.getWithdrawalAmount(localStorage.getItem('address'))
    console.log(result)
}
async function userGetWithdrawalAmountLimit() {
    let result = await pmtContractApi.getWithdrawalAmountLimit(localStorage.getItem('address'))
    console.log(result)
}
async function userGetRewardAmount() {
    let result = await pmtContractApi.getRewardAmount(localStorage.getItem('address'))
    console.log(result)
}
async function userGetRewardAmountLimit() {
    let result = await pmtContractApi.getRewardAmountLimit(localStorage.getItem('address'))
    console.log(result)
}
// async function getPMTBalance() {
//     console.log('userInfo.address', userInfo.address)
//     let balance = await pmtContractApi.balanceOf(userInfo.address)
//     let WEB3 = new Web3(window.ethereum)
//     let result = WEB3.utils.fromWei(balance.toString(), 'ether')
//     console.log('pmt', result)
//     pmtBalance.value = result
//     return balance
// }

async function getStaticIncomeInfo() {
    let WEB3 = new Web3(window.ethereum)
    //現時已提現總數
    let withdrawalAmount = await pmtContractApi.getWithdrawalAmount(localStorage.getItem('address'))
    withdrawalAmount = WEB3.utils.fromWei(withdrawalAmount.toString(), 'ether')
    withdrawalAmount = Number(withdrawalAmount)
    //可提現上線
    let withdrawalAmountLimit = await pmtContractApi.getWithdrawalAmountLimit(localStorage.getItem('address'))
    withdrawalAmountLimit = WEB3.utils.fromWei(withdrawalAmountLimit.toString(), 'ether')
    withdrawalAmountLimit = Number(withdrawalAmountLimit)
    //現時收益總數
    let rewardAmount = await pmtContractApi.getRewardAmount(localStorage.getItem('address'))
    rewardAmount = WEB3.utils.fromWei(rewardAmount.toString(), 'ether')
    rewardAmount = Number(withdrawalAmountLimit)
    //收益上限
    let rewardAmountLimit = await pmtContractApi.getRewardAmountLimit(localStorage.getItem('address'))
    rewardAmountLimit = WEB3.utils.fromWei(rewardAmountLimit.toString(), 'ether')
    rewardAmountLimit = Number(rewardAmountLimit)
    //最高配套金額
    let result = await playersInfo(localStorage.getItem('address'))
    console.log('result', result)
    let max = Number(result.player.max_package.price) * 2
    let min = Number(result.player.max_package.price) * 0.6
    let pmtBalance = await pmtContractApi.balanceOf(localStorage.getItem('address'))

    pmtBalance = WEB3.utils.fromWei(pmtBalance.toString(), 'ether')
    pmtBalance = Number(pmtBalance)
    let income = pmtBalance - min
    let trueLimit = max - min
    let point
    point = Number((income / trueLimit) * 100).toFixed(1) + '%'
    // if (income >= trueLimit) {
    //     point = '100%'
    // } else {
    //     point = Number((income / trueLimit) * 100).toFixed(1) + '%'
    // }

    console.log('pmt', pmtBalance)

    console.log(withdrawalAmount, withdrawalAmountLimit, rewardAmount, rewardAmountLimit)

    let myChart = echarts.init(document.getElementById("staticEarnings"));
    myChart.setOption({
        tooltip: {
            // formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                min: min,
                max: max,
                progress: {
                    show: true,
                    overlap: true,
                    width: 10,
                    roundCap: false,
                    clip: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} PMT',
                    fontSize: '20px',
                    color: '#fff',
                    borderColor: '#e149ed',
                    // width: 100,
                    // height: 40

                },
                axisLabel: {
                    distance: 16,
                    color: '#999',
                    fontSize: 14
                },
                data: [
                    {
                        value: income,
                        name: point,
                        // fontSize: '12px',
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
}


</script>
