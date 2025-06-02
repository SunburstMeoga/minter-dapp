<template>
    <div class="text-gray-200 text-center text-lg font-bold">{{ $t('wallet.dynamicIncome') }}</div>
    <div id="dynamicEarnings" class="flex justify-center items-center" style="height: 380px; width:100vw;"></div>
    <div class="text-gray-500 text-center text-base -mt-20">{{ point }}</div>
</template>
<script setup>
import { ref, onMounted, nextTick } from "vue";
import * as echarts from 'echarts'
import { playersInfo } from '@/request/api'
import { useI18n } from "vue-i18n";
const { t } = useI18n()

let point = ref("")
let chartInstance = ref(null)
let retryCount = ref(0)
const maxRetries = 5

// 检查容器是否可见且有尺寸
function checkContainerReady() {
    const container = document.getElementById("dynamicEarnings")
    if (!container) return false

    const rect = container.getBoundingClientRect()
    const isVisible = container.offsetParent !== null
    const hasSize = rect.width > 0 && rect.height > 0

    return isVisible && hasSize
}

// 初始化图表
function initChart(data) {
    try {
        const { totalBTReward, max, residual } = data

        // 销毁已存在的图表实例
        if (chartInstance.value) {
            chartInstance.value.dispose()
            chartInstance.value = null
        }

        const container = document.getElementById("dynamicEarnings")
        if (!container) {
            console.error('动态仪表盘容器未找到')
            return
        }

        // 再次检查容器尺寸
        if (!checkContainerReady()) {
            console.warn('动态仪表盘容器尺寸为0，延迟重试')
            retryInitChart(data)
            return
        }

        chartInstance.value = echarts.init(container)
        chartInstance.value.setOption({
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
        })

        // 窗口大小改变时重新调整图表
        window.onresize = function () {
            if (chartInstance.value) {
                chartInstance.value.resize()
            }
        }

        console.log('动态仪表盘初始化成功')

    } catch (error) {
        console.error('动态仪表盘初始化失败:', error)
        // 如果初始化失败，尝试重试
        if (retryCount.value < maxRetries) {
            retryInitChart(data)
        }
    }
}

// 延迟重试初始化图表
function retryInitChart(data) {
    if (retryCount.value >= maxRetries) {
        console.warn('动态仪表盘初始化失败：超过最大重试次数')
        return
    }

    retryCount.value++
    setTimeout(() => {
        if (checkContainerReady()) {
            initChart(data)
        } else {
            retryInitChart(data)
        }
    }, 200 * retryCount.value) // 递增延迟
}
async function getInfor() {
    try {
        let playInfo = await playersInfo(localStorage.getItem('address'))
        // console.log(localStorage.getItem('address'))

        // 安全检查：确保必要的数据存在
        if (!playInfo || !playInfo.player) {
            console.error('玩家信息获取失败：返回数据为空')
            return
        }

        if (!playInfo.player.dynamic_earning_percentage_limit) {
            console.error('动态收益信息获取失败：dynamic_earning_percentage_limit为空')
            return
        }

        const { total_bt_withdraw, total_package_value, total_bt_reward, dynamic_earning_percentage_limit, last_out_total_package_value } = playInfo.player.dynamic_earning_percentage_limit
        // let incomeLimit = playInfo.player.dynamic_earning_percentage_limit.dynamic_earning_percentage_limit
        let residual = Number(total_package_value * 2 - total_bt_reward).toFixed(4)
        let totalBTReward = Number(total_bt_reward - last_out_total_package_value).toFixed(4)
        let totalPackageValue = Number(total_package_value).toFixed(4)
        let min = Number(total_bt_reward - total_bt_withdraw).toFixed(4)
        let max = Number(total_package_value * 2 - last_out_total_package_value).toFixed()
        point.value = Number(dynamic_earning_percentage_limit).toFixed(4) + '%'
        // 准备图表数据
        const chartData = {
            totalBTReward,
            max,
            residual
        }

        // 检查容器是否准备好，如果没有则重试
        if (checkContainerReady()) {
            initChart(chartData)
        } else {
            console.log('动态仪表盘容器未准备好，开始重试...')
            retryInitChart(chartData)
        }
    } catch (err) {
        console.error('Dynamic gauge error:', err)
        // 可以在这里添加错误处理，比如显示默认图表或错误信息
    }
}
onMounted(() => {
    // 延迟执行，确保父组件状态已更新
    nextTick(() => {
        setTimeout(() => {
            getInfor()
        }, 100)
    })
})
</script>
