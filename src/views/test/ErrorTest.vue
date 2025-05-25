<template>
    <div class="p-4 text-white">
        <h1 class="text-xl font-bold mb-4">错误处理测试页面</h1>
        
        <div class="space-y-4">
            <button 
                @click="testStaticGaugeError" 
                class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                测试静态仪表盘错误
            </button>
            
            <button 
                @click="testNFTPurchaseError" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                测试NFT购买错误
            </button>
            
            <button 
                @click="testWalletError" 
                class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                测试钱包错误
            </button>
            
            <button 
                @click="testContractError" 
                class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded">
                测试合约错误
            </button>
            
            <button 
                @click="testGenericError" 
                class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
                测试通用错误
            </button>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { 
    handleStaticGaugeError, 
    handleNFTPurchaseError, 
    handleWalletError, 
    handleContractError,
    showErrorReport 
} from '@/utils/errorHandler'

const { proxy } = getCurrentInstance()

// 测试静态仪表盘错误
function testStaticGaugeError() {
    const mockError = new Error('静态仪表盘数据加载失败：网络连接超时')
    mockError.code = 'NETWORK_TIMEOUT'
    mockError.stack = `Error: 静态仪表盘数据加载失败：网络连接超时
    at getStaticIncomeInfo (staticEarningsGauge.vue:48:15)
    at onMounted (staticEarningsGauge.vue:18:5)`
    
    handleStaticGaugeError(proxy, mockError)
}

// 测试NFT购买错误
function testNFTPurchaseError() {
    const mockError = {
        code: 4001,
        message: 'User rejected the transaction',
        data: {
            originalError: {
                code: 4001,
                message: 'User rejected the transaction'
            }
        }
    }
    
    handleNFTPurchaseError(proxy, mockError, () => {
        console.log('重试NFT购买')
    })
}

// 测试钱包错误
function testWalletError() {
    const mockError = new Error('钱包连接失败：请检查MetaMask是否已安装并解锁')
    mockError.code = 'WALLET_CONNECTION_FAILED'
    
    handleWalletError(proxy, mockError)
}

// 测试合约错误
function testContractError() {
    const mockError = {
        code: -32603,
        message: 'Internal JSON-RPC error.',
        data: {
            code: -32000,
            message: 'insufficient funds for gas * price + value'
        }
    }
    
    handleContractError(proxy, mockError, 'PMT合约')
}

// 测试通用错误
function testGenericError() {
    const mockError = {
        name: 'NetworkError',
        message: 'Failed to fetch',
        stack: 'NetworkError: Failed to fetch\n    at fetch (native)\n    at async request (api.js:25:18)',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    }
    
    showErrorReport(proxy, mockError, {
        title: '网络请求失败',
        description: '网络请求失败，请检查网络连接后重试，或复制错误信息反馈给开发人员',
        showRetryButton: true,
        onRetry: () => {
            proxy.$errorReport.hide()
            console.log('重试网络请求')
        }
    })
}
</script>

<style scoped>
button {
    transition: background-color 0.2s;
}
</style>
