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

        chartInstance.value = echarts.init(container)
        chartInstance.value.setOption({
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
                        }
                    ],
                    radius: '90%',
                    title: {
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
        })

        // 窗口大小改变时重新调整图表
        window.onresize = function () {
            if (chartInstance.value) {
                chartInstance.value.resize()
            }
        }

        console.log('静态仪表盘初始化成功')

    } catch (error) {
        console.error('静态仪表盘初始化失败:', error)
        // 如果初始化失败，尝试重试
        if (retryCount.value < maxRetries) {
            retryInitChart(data)
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

async function getStaticIncomeInfo() {
    try {
        proxy.$loading.show()
        let WEB3 = new Web3(window.ethereum)
        //現時已提現總數
        let withdrawalAmount = await pmtContractApi.getWithdrawalAmount(localStorage.getItem('address'))
        withdrawalAmount = WEB3.utils.fromWei(withdrawalAmount.toString(), 'ether')
        withdrawalAmount = Number(withdrawalAmount).toFixed(0)
        //可提現上線
        let withdrawalAmountLimit = await pmtContractApi.getWithdrawalAmountLimit(localStorage.getItem('address'))
        withdrawalAmountLimit = WEB3.utils.fromWei(withdrawalAmountLimit.toString(), 'ether')
        withdrawalAmountLimit = Number(withdrawalAmountLimit).toFixed(0)
        //現時收益總數
        let rewardAmount = await pmtContractApi.getRewardAmount(localStorage.getItem('address'))
        rewardAmount = WEB3.utils.fromWei(rewardAmount.toString(), 'ether')
        rewardAmount = Number(rewardAmount).toFixed(2)
        //收益上限
        let rewardAmountLimit = await pmtContractApi.getRewardAmountLimit(localStorage.getItem('address'))
        rewardAmountLimit = WEB3.utils.fromWei(rewardAmountLimit.toString(), 'ether')
        rewardAmountLimit = Number(rewardAmountLimit).toFixed(2)
        //锁定期的pmt数量
        let getLockedAmount = await pmtContractApi.getLockedAmount(localStorage.getItem('address'))
        getLockedAmount = WEB3.utils.fromWei(getLockedAmount.toString(), 'ether')
        getLockedAmount = Number(getLockedAmount).toFixed(0)
        //獲取PMT的釋放次數
        let getReleaseCount = await pmtContractApi.getReleaseCount(localStorage.getItem('address'))
        // getReleaseCount = WEB3.utils.fromWei(getReleaseCount.toString(), 'ether')
        getReleaseCount = Number(getReleaseCount).toFixed(0)

        //最新配套金额
        let result = await playersInfo(localStorage.getItem('address'))
        //console.log('result', result)

        // 安全检查：确保必要的数据存在
        if (!result || !result.player) {
            throw new Error('玩家信息获取失败：返回数据为空')
        }

        if (!result.player.max_package || result.player.max_package.price == null) {
            throw new Error('玩家配套信息获取失败：max_package为空或price为空')
        }

        if (!result.player.package_transactions || result.player.package_transactions.length === 0 || !result.player.package_transactions[0]) {
            throw new Error('玩家交易记录获取失败：package_transactions为空')
        }

        let max = Number(result.player.max_package.price) * 2
        let min = Number(result.player.max_package.price) * 0.6 //最高金額的package釋放數量
        let eraningAmount = Number(result.player.package_transactions[0].amount) * 0.6 / 3 * (3 - getReleaseCount)  //pmt釋放量
        let pmtBalance = await pmtContractApi.balanceOf(localStorage.getItem('address'))

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
        console.log('現時收益總數 ', rewardAmount)
        console.log('收益上限 ', rewardAmountLimit)
        //console.log('锁定期的pmt数量 ', getLockedAmount)
        //console.log('獲取PMT的釋放次數 ', getReleaseCount)
        //console.log('package總釋放數量 ', min)
        console.log('package的釋放量', eraningAmount)

        // 准备图表数据
        const chartData = {
            rewardAmount,
            eraningAmount,
            rewardAmountLimit
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
        //console.log(err)
        proxy.$loading.hide()
        // 只有在确实发生错误时才显示错误报告，保持原有的静默处理
        // 用户可以通过刷新页面重试，如果持续失败才需要错误报告
        console.error('Static gauge error:', err)

        // 可选：显示详细错误信息供用户复制（取消注释下面这行来启用）
        // handleStaticGaugeError(proxy, err)
    }
}


</script>