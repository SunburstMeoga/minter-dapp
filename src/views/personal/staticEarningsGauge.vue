<template>
    <div class="text-gray-200 text-center text-sm">{{ $t('wallet.staticIncome') }}</div>
    <div id="staticEarnings" style="height: 180px;"></div>
</template>
<script setup>
import { onMounted } from "vue";
import pmtContractApi from '@/request/pmt'
import * as echarts from 'echarts'

// //已提現總數
// getWithdrawalAmount: async function () {
//       const result = await PMT.getWithdrawalAmount()
//       return result
//     },
//     //可提現上限
//     getWithdrawalAmountLimit: async function () {
//       const result = await PMT.getWithdrawalAmountLimit()
//       return result
//     },
//     //現時收益總數
//     getRewardAmount: async function () {
//       const result = await PMT.getRewardAmount()
//       return result
//     },
//     //收益上限
//     getRewardAmountLimit: async function () {
//       const result = await PMT.getRewardAmountLimit()
//       return result
//     }


async function userGetWithdrawalAmount() {
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

onMounted(() => {
    userGetWithdrawalAmount()
    userGetWithdrawalAmountLimit()
    userGetRewardAmount()
    userGetRewardAmountLimit()
    let myChart = echarts.init(document.getElementById("staticEarnings"));
    myChart.setOption({
        tooltip: {
            // formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                progress: {
                    show: true,
                    overlap: true,
                    width: 10,
                    roundCap: false,
                    clip: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    fontSize: '10px',
                    color: '#fff',
                    borderColor: '#e149ed',
                    width: 50,
                    height: 20

                },
                data: [
                    {
                        value: 0,
                        // name: '靜態收益',
                        // fontSize: '12px',
                    }
                ],
                radius: '90%',
                title: {
                    fontSize: '10px',
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
})
</script>
