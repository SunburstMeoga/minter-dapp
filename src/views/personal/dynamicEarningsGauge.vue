<template>
    <div class="text-gray-200 text-center text-lg font-bold">{{ $t('wallet.dynamicIncome') }}</div>
    <div id="dynamicEarnings" class="flex justify-center items-center" style="height: 380px; width:100vw;"></div>
    <div class="text-gray-500 text-center text-base -mt-20">{{ point }}</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import { playersInfo } from '@/request/api'
import { useI18n } from "vue-i18n";
const { t } = useI18n()

let point = ref("")
async function getInfor() {
    let playInfo = await playersInfo(localStorage.getItem('address'))
    //console.log(playInfo)

    const { total_bt_withdraw, total_package_value, total_bt_reward, dynamic_earning_percentage_limit, last_out_total_package_value } = playInfo.player.dynamic_earning_percentage_limit
    // let incomeLimit = playInfo.player.dynamic_earning_percentage_limit.dynamic_earning_percentage_limit
    let residual = Number(total_package_value * 2 - total_bt_reward).toFixed(4)
    let totalBTReward = Number(total_bt_reward - last_out_total_package_value).toFixed(4)
    let totalPackageValue = Number(total_package_value).toFixed(4)
    let min = Number(total_bt_reward - total_bt_withdraw).toFixed(4)
    let max = Number(total_package_value * 2 - last_out_total_package_value).toFixed()
    point.value = Number(dynamic_earning_percentage_limit).toFixed(4) + '%'
    // let point = Number(dynamic_earning_percentage_limit).toFixed(4)
    // if (btWithdraw !== 0) {
    //     point = Number((btWithdraw / incomeLimit) * 100).toFixed(1) + '%'
    // } else {
    //     point = '0%'
    // }
    // //console.log(point, incomeLimit, btWithdraw)
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
                    formatter: '{value} BT',
                    fontSize: '20px',
                    color: '#fff',
                    borderColor: '#e149ed',
                },
                axisLabel: {
                    distance: 16,
                    color: '#999',
                    fontSize: 12
                },
                data: [
                    {
                        value: totalBTReward,
                        name: `${t('assistance.remain')}: ${residual} BT`
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
