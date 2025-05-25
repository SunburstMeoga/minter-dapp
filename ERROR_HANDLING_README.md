# 错误处理功能说明

## 概述

为了解决用户在使用过程中遇到的问题无法有效反馈给开发人员的情况，我们新增了详细的错误处理功能。当用户在以下两个关键页面遇到问题时，系统会显示详细的错误信息弹窗，用户可以复制完整的错误信息并反馈给开发人员。

## 涉及的页面

### 1. 静态收益仪表盘 (`/personal/wallet`)
- **问题**: 部分用户的静态仪表盘显示不出来
- **解决方案**: 在 `staticEarningsGauge.vue` 组件中添加了详细错误处理
- **触发条件**: 当获取静态收益信息失败时

### 2. NFT购买页面 (`/market/nfts`)
- **问题**: 部分用户在购买NFT时失败
- **解决方案**: 在 `nfts.vue` 页面的购买流程中添加了详细错误处理
- **触发条件**: 当NFT购买过程中任何步骤失败时

## 新增组件和功能

### 1. ErrorReportModal 组件
位置: `src/components/ErrorReportModal.vue`

**功能特性:**
- 显示用户友好的错误描述
- 展示详细的技术错误信息
- 一键复制完整错误报告
- 支持重试功能
- 响应式设计，适配移动端

**错误报告包含的信息:**
- 时间戳
- 当前页面URL
- 用户钱包地址
- 浏览器信息
- 详细错误堆栈

### 2. 错误处理工具函数
位置: `src/utils/errorHandler.js`

**主要函数:**
- `showErrorReport()` - 显示通用错误报告弹窗
- `handleStaticGaugeError()` - 处理静态仪表盘错误
- `handleNFTPurchaseError()` - 处理NFT购买错误
- `handleWalletError()` - 处理钱包相关错误
- `handleContractError()` - 处理合约调用错误

### 3. 全局插件注册
位置: `src/components/errorReport/index.js`

错误报告组件已注册为全局插件，可通过 `this.$errorReport` 或 `proxy.$errorReport` 访问。

## 使用方法

### 在组件中使用

```javascript
import { handleStaticGaugeError, handleNFTPurchaseError } from '@/utils/errorHandler'

// 处理静态仪表盘错误
try {
    // 获取静态收益数据的代码
} catch (error) {
    handleStaticGaugeError(proxy, error)
}

// 处理NFT购买错误
try {
    // NFT购买的代码
} catch (error) {
    handleNFTPurchaseError(proxy, error, () => {
        // 重试回调函数
        retryPurchase()
    })
}
```

### 直接使用错误报告组件

```javascript
proxy.$errorReport.show({
    title: '操作失败',
    description: '请复制以下错误信息并反馈给开发人员',
    error: errorObject,
    showRetryButton: true,
    onRetry: () => {
        // 重试逻辑
    },
    onClose: () => {
        // 关闭回调
    }
})
```

## 用户操作流程

1. **遇到错误**: 用户在使用静态仪表盘或购买NFT时遇到问题
2. **错误弹窗**: 系统自动显示错误报告弹窗
3. **复制错误**: 用户点击"复制错误信息"按钮
4. **反馈开发**: 用户将复制的错误信息发送给开发人员
5. **问题定位**: 开发人员根据详细错误信息快速定位问题

## 错误信息格式

复制的错误信息格式如下:

```
=== 错误报告 ===
时间: 2024-01-15T10:30:45.123Z
页面: https://app.minter-x.com/personal/wallet
钱包地址: 0x1234567890abcdef...
浏览器: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...

错误详情:
Error: 静态仪表盘数据加载失败：网络连接超时
    at getStaticIncomeInfo (staticEarningsGauge.vue:48:15)
    at onMounted (staticEarningsGauge.vue:18:5)
```

## 测试页面

为了验证错误处理功能，创建了测试页面:
位置: `src/views/test/ErrorTest.vue`

该页面包含多个测试按钮，可以模拟不同类型的错误情况。

## 技术实现细节

### 1. 组件架构
- 使用Vue 3 Composition API
- 支持TypeScript类型检查
- 响应式设计，适配移动端

### 2. 错误信息收集
- 自动收集环境信息
- 格式化错误堆栈
- 保护用户隐私（不收集敏感信息）

### 3. 用户体验优化
- 友好的错误描述
- 清晰的操作指引
- 一键复制功能
- 可选的重试机制

## 注意事项

1. **隐私保护**: 错误报告不包含用户的私钥或敏感信息
2. **网络依赖**: 复制功能需要浏览器支持Clipboard API
3. **兼容性**: 支持现代浏览器，建议使用Chrome、Firefox、Safari等
4. **性能影响**: 错误处理组件按需加载，不影响正常使用性能

## 后续优化建议

1. **自动上报**: 可考虑添加自动错误上报功能（需用户同意）
2. **错误分类**: 根据错误类型提供更精准的解决建议
3. **多语言支持**: 支持多语言错误描述
4. **错误统计**: 收集错误统计数据，优化产品稳定性
