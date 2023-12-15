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
    let incomeLimit = playInfo.player.dynamic_earning_percentage_limit.dynamic_earning_percentage_limit
    let btWithdraw = playInfo.player.dynamic_earning_percentage_limit.total_bt_withdraw
    let totalPackageValue = playInfo.player.dynamic_earning_percentage_limit.total_package_value
    let point = Number(incomeLimit).toFixed(4) + '%'
    // if (btWithdraw !== 0) {
    //     point = Number((btWithdraw / incomeLimit) * 100).toFixed(1) + '%'
    // } else {
    //     point = '0%'
    // }
    console.log(point, incomeLimit, btWithdraw)
    let myChart = echarts.init(document.getElementById("dynamicEarnings"));
    myChart.setOption({
        tooltip: {
            // formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                min: 0,
                max: totalPackageValue,
                progress: {
                    show: true,
                    overlap: true,
                    width: 10,
                    roundCap: false,
                    clip: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} BT',
                    fontSize: '20px',
                    color: '#fff',
                    borderColor: '#e149ed',
                },
                axisLabel: {
                    distance: 16,
                    color: '#999',
                    fontSize: 14
                },
                data: [
                    {
                        value: btWithdraw,
                        name: point
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
}
onMounted(() => {
    getInfor()

})
</script>
