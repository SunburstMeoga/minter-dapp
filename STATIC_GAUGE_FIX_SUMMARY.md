# 静态仪表盘显示问题修复总结

## 问题描述
客户反映静态仪表盘会显示不出来，错误信息：
```
dynamicEarningsGauge.vue:45 [ECharts] Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight. They should not be 0.
```

## 问题根本原因
1. **容器隐藏状态下初始化**：静态和动态仪表盘组件通过 `v-show="hasPackage"` 控制显示
2. **时序问题**：当 `hasPackage` 为 `false` 时，容器被隐藏（`display: none`），但组件的 `onMounted` 钩子仍然执行
3. **ECharts 限制**：ECharts 无法在宽高为 0 的隐藏容器中初始化

## 修复方案

### 1. staticEarningsGauge.vue 修复 (第一轮)
- **添加容器检查函数**：`checkContainerReady()` 检查容器是否可见且有尺寸
- **图表初始化分离**：将 ECharts 初始化逻辑提取到 `initChart()` 函数
- **重试机制**：`retryInitChart()` 提供递增延迟的重试机制（最多5次）

### 2. staticEarningsGauge.vue 修复 (第二轮 - 合约调用错误) ✅
针对用户反馈的新问题进行了全面修复：

#### 问题：合约调用失败导致页面崩溃
- MetaMask RPC Error: Internal JSON-RPC error
- missing revert data (action="call", data=null, reason=null, ...)
- 用户没有购买package时合约调用失败

#### 解决方案：
1. **安全的合约调用**：
   - 添加 `safeContractCall()` 函数，为每个合约调用提供默认值
   - 使用 `Promise.allSettled()` 处理并发调用，避免单点故障

2. **安全的数值转换**：
   - 添加 `safeNumberConversion()` 函数，处理BigNumber转换异常
   - 为所有数值提供默认值和边界检查

3. **用户状态检查**：
   - 检查用户是否购买过package
   - 为未购买package的用户显示友好的默认状态（0.00%）
   - 避免对正常情况抛出错误

4. **图表增强**：
   - 改进数值安全检查，确保不出现负数或无效值
   - 添加错误状态显示（灰色主题）
   - 多层降级处理，最终显示友好的错误提示

5. **错误处理优化**：
   - 区分正常情况（未购买package）和真正的错误
   - 详细的控制台日志用于调试
   - 保持错误报告功能可选
- **延迟执行**：使用 `nextTick` 和 `setTimeout` 确保父组件状态已更新
- **实例管理**：正确管理 ECharts 实例的创建和销毁

### 2. dynamicEarningsGauge.vue 修复
- 应用相同的修复策略
- 添加容器检查和重试机制
- 改进错误处理

### 3. 关键改进点
```javascript
// 检查容器是否可见且有尺寸
function checkContainerReady() {
    const container = document.getElementById("staticEarnings")
    if (!container) return false
    
    const rect = container.getBoundingClientRect()
    const isVisible = container.offsetParent !== null
    const hasSize = rect.width > 0 && rect.height > 0
    
    return isVisible && hasSize
}

// 延迟执行，确保父组件状态已更新
onMounted(() => {
    nextTick(() => {
        setTimeout(() => {
            getStaticIncomeInfo()
        }, 100)
    })
})
```

## 修复效果
1. **解决 ECharts 初始化错误**：不再在隐藏容器中强制初始化
2. **提高成功率**：通过重试机制处理时序问题
3. **更好的错误处理**：提供详细的日志信息
4. **保持原有功能**：不影响正常显示逻辑

## 测试建议
1. 测试有配套的账户（`hasPackage = true`）
2. 测试无配套的账户（`hasPackage = false`）
3. 测试网络延迟情况下的加载
4. 检查浏览器控制台是否还有 ECharts 错误

## 兼容性
- 保持与现有代码的完全兼容
- 不影响其他组件的功能
- 向后兼容所有浏览器
