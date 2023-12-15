<template>
    <div class="text-gray-200 text-center text-sm">{{ $t('wallet.dynamicIncome') }}</div>
    <div id="dynamicEarnings" class="flex justify-center items-center" style="height: 380px; width:100vw;"></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import { playersInfo } from '@/request/api'
async function getInfor() {
    let playInfo = await playersInfo(localStorage.getItem('address'))
    console.log(playInfo)
    let incomeLimit = playInfo.dynamic_earning_percentage_limit.dynamic_earning_percentage_limit
    let btWithdraw = playInfo.dynamic_earning_percentage_limit.total_bt_withdraw
}
onMounted(() => {
    getInfor()
    let myChart = echarts.init(document.getElementById("dynamicEarnings"));
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
                    height: 10
                },
                data: [
                    {
                        value: 0,
                        // name: '动态收益'
                    }
                ],
                radius: '90%',
                title: {
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: 'small'
                },
                color: '#e149ed',
            }
        ]
    });
    window.onresize = function () {
        myChart.resize();
    };
})
</script>
