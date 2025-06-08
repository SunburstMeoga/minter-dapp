<template>
    <div class="text-gray-200 text-center text-lg font-bold">{{ $t('wallet.staticIncome') }}</div>
    <div id="staticEarnings" class="flex justify-center items-center" style="height: 380px; width:100vw;"></div>
    <div class="text-gray-500 text-center text-base -mt-20"> {{ point }}</div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, nextTick } from "vue";
import pmtContractApi from '@/request/pmt'
import * as echarts from 'echarts'
import { Web3 } from 'web3'
import { playersInfo } from '@/request/api'
import { useI18n } from "vue-i18n";
import { handleStaticGaugeError } from '@/utils/errorHandler';
const { t } = useI18n()
const { proxy } = getCurrentInstance()
let maxPackage = ref('')
let point = ref('')
let chartInstance = ref(null)
let retryCount = ref(0)
const maxRetries = 5

// 检查容器是否可见且有尺寸
function checkContainerReady() {
    const container = document.getElementById("staticEarnings")
    if (!container) return false

    const rect = container.getBoundingClientRect()
    const isVisible = container.offsetParent !== null
    const hasSize = rect.width > 0 && rect.height > 0

    return isVisible && hasSize
}

// 初始化图表
function initChart(data) {
    try {
        const { rewardAmount, eraningAmount, rewardAmountLimit } = data

        // 销毁已存在的图表实例
        if (chartInstance.value) {
            chartInstance.value.dispose()
            chartInstance.value = null
        }

        const container = document.getElementById("staticEarnings")
        if (!container) {
            console.error('静态仪表盘容器未找到')
            return
        }

        // 再次检查容器尺寸
        if (!checkContainerReady()) {
            console.warn('静态仪表盘容器尺寸为0，延迟重试')
            retryInitChart(data)
            return
        }

        // 安全地转换数值，确保都是有效数字
        const safeRewardAmount = Number(rewardAmount) || 0
        const safeEraningAmount = Number(eraningAmount) || 0
        const safeRewardAmountLimit = Number(rewardAmountLimit) || 100

        // 计算当前值，确保不为负数
        const currentValue = Math.max(0, safeRewardAmount - safeEraningAmount)

        // 计算剩余值，确保不为负数
        const remainingValue = Math.max(0, safeRewardAmountLimit - safeRewardAmount + safeEraningAmount)

        chartInstance.value = echarts.init(container)
        chartInstance.value.setOption({
            tooltip: {
                formatter: function(params) {
                    return `当前收益: ${currentValue.toFixed(2)} MT<br/>剩余额度: ${remainingValue.toFixed(2)} MT`
                }
            },
            series: [
                {
                    type: 'gauge',
                    min: 0,
                    max: safeRewardAmountLimit,
                    progress: {
                        show: true,
                        overlap: true,
                        width: 10,
                        roundCap: false,
                        clip: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: function(value) {
                            // 如果是错误状态，显示特殊文本
                            if (point.value === '数据加载失败') {
                                return '加载失败'
                            }
                            return `${Number(value).toFixed(2)} MT`
                        },
                        fontSize: '20px',
                        color: '#fff',
                        borderColor: '#e149ed',
                    },
                    axisLabel: {
                        distance: 16,
                        color: '#999',
                        fontSize: 12,
                        formatter: function(value) {
                            return Number(value).toFixed(0)
                        }
                    },
                    data: [
                        {
                            value: currentValue,
                            name: `${t('assistance.remain')}: ${remainingValue.toFixed(2)} MT`
                        }
                    ],
                    radius: '90%',
                    title: {
                        color: '#fff',
                        fontWeight: 'small'
                    },
                    color: point.value === '数据加载失败' ? '#666' : '#e149ed',
                    gradientColor: [
                        point.value === '数据加载失败' ? '#666' : '#e149ed',
                        point.value === '数据加载失败' ? '#666' : '#e149ed',
                        point.value === '数据加载失败' ? '#666' : '#e149ed'
                    ]
                }
            ]
        })

        // 窗口大小改变时重新调整图表
        window.onresize = function () {
            if (chartInstance.value) {
                chartInstance.value.resize()
            }
        }

        console.log('静态仪表盘初始化成功', {
            currentValue,
            remainingValue,
            rewardAmountLimit: safeRewardAmountLimit
        })

    } catch (error) {
        console.error('静态仪表盘初始化失败:', error)
        // 如果初始化失败，尝试重试
        if (retryCount.value < maxRetries) {
            retryInitChart(data)
        } else {
            // 最后的降级处理：显示简单的错误信息
            const container = document.getElementById("staticEarnings")
            if (container) {
                container.innerHTML = `
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #999;">
                        <div style="font-size: 18px; margin-bottom: 10px;">📊</div>
                        <div style="font-size: 14px;">图表加载失败</div>
                        <div style="font-size: 12px; margin-top: 5px;">请刷新页面重试</div>
                    </div>
                `
            }
        }
    }
}

// 延迟重试初始化图表
function retryInitChart(data) {
    if (retryCount.value >= maxRetries) {
        console.warn('静态仪表盘初始化失败：超过最大重试次数')
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

onMounted(() => {
    // 延迟执行，确保父组件状态已更新
    nextTick(() => {
        setTimeout(() => {
            getStaticIncomeInfo()
        }, 100)
    })
})
async function userGetWithdrawalAmount() { //
    let result = await pmtContractApi.getWithdrawalAmount(localStorage.getItem('address'))
    //console.log(result)
}
async function userGetWithdrawalAmountLimit() {
    let result = await pmtContractApi.getWithdrawalAmountLimit(localStorage.getItem('address'))
    //console.log(result)
}
async function userGetRewardAmount() {
    let result = await pmtContractApi.getRewardAmount(localStorage.getItem('address'))
    //console.log(result)
}
async function userGetRewardAmountLimit() {
    let result = await pmtContractApi.getRewardAmountLimit(localStorage.getItem('address'))
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

// 安全的合约调用函数，带有默认值和错误处理
async function safeContractCall(contractMethod, defaultValue = 0) {
    try {
        const result = await contractMethod
        return result || defaultValue
    } catch (error) {
        console.warn('合约调用失败，使用默认值:', error.message)
        return defaultValue
    }
}

// 安全的数值转换函数
function safeNumberConversion(value, decimals = 'ether', defaultValue = 0) {
    try {
        if (!value || value.toString() === '0') return defaultValue
        const WEB3 = new Web3(window.ethereum)
        const converted = WEB3.utils.fromWei(value.toString(), decimals)
        return Number(converted) || defaultValue
    } catch (error) {
        console.warn('数值转换失败，使用默认值:', error.message)
        return defaultValue
    }
}

async function getStaticIncomeInfo() {
    try {
        proxy.$loading.show()
        const userAddress = localStorage.getItem('address')

        if (!userAddress) {
            throw new Error('用户地址未找到，请重新连接钱包')
        }

        // 首先检查用户是否购买了package
        let playerInfo
        try {
            playerInfo = await playersInfo(userAddress)
        } catch (apiError) {
            console.error('API调用失败:', apiError)
            throw new Error('无法获取用户信息，请检查网络连接')
        }

        // 检查用户是否有购买记录
        if (!playerInfo || !playerInfo.player) {
            throw new Error('用户信息不存在')
        }

        // 如果用户没有购买过package，显示默认状态
        if (!playerInfo.player.max_package || !playerInfo.player.package_transactions ||
            playerInfo.player.package_transactions.length === 0) {
            console.log('用户尚未购买package，显示默认状态')

            // 显示默认的空状态图表
            const defaultChartData = {
                rewardAmount: 0,
                eraningAmount: 0,
                rewardAmountLimit: 100 // 默认上限
            }

            point.value = '0.00%'

            if (checkContainerReady()) {
                initChart(defaultChartData)
            } else {
                retryInitChart(defaultChartData)
            }

            proxy.$loading.hide()
            return
        }

        // 安全地获取合约数据，使用默认值处理失败情况
        const [
            withdrawalAmountRaw,
            withdrawalAmountLimitRaw,
            rewardAmountRaw,
            rewardAmountLimitRaw,
            getLockedAmountRaw,
            getReleaseCountRaw,
            pmtBalanceRaw
        ] = await Promise.allSettled([
            safeContractCall(pmtContractApi.getWithdrawalAmount(userAddress), 0),
            safeContractCall(pmtContractApi.getWithdrawalAmountLimit(userAddress), 0),
            safeContractCall(pmtContractApi.getRewardAmount(userAddress), 0),
            safeContractCall(pmtContractApi.getRewardAmountLimit(userAddress), 0),
            safeContractCall(pmtContractApi.getLockedAmount(userAddress), 0),
            safeContractCall(pmtContractApi.getReleaseCount(userAddress), 0),
            safeContractCall(pmtContractApi.balanceOf(userAddress), 0)
        ])

        // 处理Promise.allSettled的结果
        const withdrawalAmount = safeNumberConversion(
            withdrawalAmountRaw.status === 'fulfilled' ? withdrawalAmountRaw.value : 0
        )
        const withdrawalAmountLimit = safeNumberConversion(
            withdrawalAmountLimitRaw.status === 'fulfilled' ? withdrawalAmountLimitRaw.value : 0
        )
        const rewardAmount = safeNumberConversion(
            rewardAmountRaw.status === 'fulfilled' ? rewardAmountRaw.value : 0
        )
        const rewardAmountLimit = safeNumberConversion(
            rewardAmountLimitRaw.status === 'fulfilled' ? rewardAmountLimitRaw.value : 100
        )
        const getLockedAmount = safeNumberConversion(
            getLockedAmountRaw.status === 'fulfilled' ? getLockedAmountRaw.value : 0
        )
        const getReleaseCount = getReleaseCountRaw.status === 'fulfilled' ?
            Number(getReleaseCountRaw.value || 0) : 0
        const pmtBalance = safeNumberConversion(
            pmtBalanceRaw.status === 'fulfilled' ? pmtBalanceRaw.value : 0
        )

        // 安全地计算package相关数据
        const packagePrice = Number(playerInfo.player.max_package?.price || 0)
        const transactionAmount = Number(playerInfo.player.package_transactions[0]?.amount || packagePrice)

        const max = packagePrice * 2
        const min = packagePrice * 0.6 // 最高金額的package釋放數量
        const eraningAmount = transactionAmount * 0.6 / 3 * (3 - getReleaseCount) // pmt釋放量

        // 安全地计算百分比
        let pointValue = 0
        if (rewardAmountLimit > 0) {
            pointValue = ((rewardAmount - eraningAmount) / rewardAmountLimit) * 100
            pointValue = Math.max(0, Math.min(100, pointValue)) // 限制在0-100之间
        }
        point.value = Number(pointValue).toFixed(2) + '%'

        console.log('=== 静态收益数据 ===')
        console.log('PMT余额:', pmtBalance)
        console.log('现时收益总数:', rewardAmount)
        console.log('收益上限:', rewardAmountLimit)
        console.log('package释放量:', eraningAmount)
        console.log('进度百分比:', point.value)

        // 准备图表数据
        const chartData = {
            rewardAmount: Number(rewardAmount).toFixed(2),
            eraningAmount: Number(eraningAmount).toFixed(2),
            rewardAmountLimit: Number(rewardAmountLimit).toFixed(2)
        }

        // 检查容器是否准备好，如果没有则重试
        if (checkContainerReady()) {
            initChart(chartData)
        } else {
            console.log('静态仪表盘容器未准备好，开始重试...')
            retryInitChart(chartData)
        }
        proxy.$loading.hide()

    } catch (err) {
        console.error('Static gauge error:', err)
        proxy.$loading.hide()

        // 显示用户友好的错误状态
        const errorChartData = {
            rewardAmount: 0,
            eraningAmount: 0,
            rewardAmountLimit: 100
        }

        point.value = '数据加载失败'

        // 尝试显示错误状态的图表
        try {
            if (checkContainerReady()) {
                initChart(errorChartData)
            } else {
                retryInitChart(errorChartData)
            }
        } catch (chartError) {
            console.error('图表初始化也失败了:', chartError)
        }

        // 根据错误类型显示不同的提示
        if (err.message.includes('用户尚未购买') || err.message.includes('package_transactions为空')) {
            console.log('用户尚未购买package，这是正常情况')
        } else {
            // 可选：显示详细错误信息供用户复制（取消注释下面这行来启用）
            // handleStaticGaugeError(proxy, err)
        }
    }
}


</script>