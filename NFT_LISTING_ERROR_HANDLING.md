# NFT挂单错误处理功能实现

## 概述

已成功为NFT挂单功能添加了与静态仪表盘和NFT购买相同的可开关错误报告功能。用户在NFT挂单或取消挂单失败时，可以选择复制详细错误信息并反馈给开发人员。

## 实现的功能

### 1. NFT挂单错误处理
- **位置**: `src/views/personal/nfts.vue` - NFT挂单失败
- **位置**: `src/views/market/nfts.vue` - NFT取消挂单失败

### 2. 错误处理函数
- **新增函数**: `handleNFTListingError()` 在 `src/utils/errorHandler.js`
- **功能**: 专门处理NFT挂单相关的错误

### 3. 开关控制
- **统一控制**: 使用 `enableErrorReporting` 主开关控制
- **配置文件**: `src/config/errorReporting.js`

## 修改的文件

### 1. src/utils/errorHandler.js
```javascript
/**
 * 处理NFT挂单错误
 * @param {Object} proxy - Vue组件实例的proxy
 * @param {Error} error - 错误对象
 * @param {Function} retryCallback - 重试回调函数
 */
export function handleNFTListingError(proxy, error, retryCallback = null) {
  logError('NFT listing error', error)
  
  // NFT挂单错误使用主开关控制（与购买和静态仪表盘一样）
  if (!isErrorReportingEnabled()) {
    return
  }
  
  showErrorReport(proxy, error, {
    title: 'NFT挂单失败',
    description: 'NFT挂单失败，请复制以下错误信息并反馈给开发人员以便快速定位问题',
    showRetryButton: !!retryCallback,
    onRetry: () => {
      proxy.$errorReport.hide()
      if (retryCallback && typeof retryCallback === 'function') {
        retryCallback()
      }
    }
  })
}
```

### 2. src/views/personal/nfts.vue
**挂单失败错误处理**:
```javascript
} catch (err) {
    console.log(err)
    proxy.$confirm.hide()
    proxy.$confirm.hide()
    item.showOperting = false
    item.is_listed = false
    // 根据错误报告功能状态决定是否显示复制选项
    const showErrorReportOption = isErrorReportingEnabled()
    proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        content: `${t('modalConfirm.saleNFTFail', { tokenID: item.token_id })}`,
        showCancelButton: showErrorReportOption,
        confirmText: t('modalConfirm.confirm'),
        cancelText: showErrorReportOption ? '复制错误信息' : '',
        onConfirm: () => {
            proxy.$confirm.hide()
        },
        onCancel: showErrorReportOption ? () => {
            // 只有用户主动选择时才显示详细错误信息
            handleNFTListingError(proxy, err, () => {
                handleListed(item, index)
            })
        } : undefined
    });
}
```

**取消挂单失败错误处理**:
```javascript
} catch (err) {
    console.log(err)
    proxy.$loading.hide()
    proxy.$confirm.hide()
    item.showOperting = false
    item.is_listed = true
    // 根据错误报告功能状态决定是否显示复制选项
    const showErrorReportOption = isErrorReportingEnabled()
    proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        content: t('modalConfirm.cancelFail'),
        showCancelButton: showErrorReportOption,
        confirmText: t('modalConfirm.confirm'),
        cancelText: showErrorReportOption ? '复制错误信息' : '',
        onConfirm: () => {
            proxy.$confirm.hide()
        },
        onCancel: showErrorReportOption ? () => {
            // 只有用户主动选择时才显示详细错误信息
            handleNFTListingError(proxy, err, () => {
                handleCancelList(item)
            })
        } : undefined
    });
}
```

### 3. src/views/market/nfts.vue
**取消挂单失败错误处理**:
```javascript
} catch (err) {
    proxy.$loading.hide()
    item.showOperting = false
    item.is_listed = false
    //console.log(err)
    
    // 根据错误报告功能状态决定是否显示复制选项
    const showErrorReportOption = isErrorReportingEnabled()
    proxy.$confirm.show({
        title: t('modalConfirm.tips'),
        content: t('modalConfirm.cancelFail'),
        showCancelButton: showErrorReportOption,
        confirmText: t('modalConfirm.confirm'),
        cancelText: showErrorReportOption ? '复制错误信息' : '',
        onConfirm: () => {
            proxy.$confirm.hide()
        },
        onCancel: showErrorReportOption ? () => {
            // 只有用户主动选择时才显示详细错误信息
            handleNFTListingError(proxy, err, () => {
                handleCancelList(item)
            })
        } : undefined
    })
}
```

## 控制方式

### 统一开关控制
所有错误报告功能（静态仪表盘、NFT购买、NFT挂单）都使用同一个主开关：

```javascript
// src/config/errorReporting.js
export const errorReportingConfig = {
  enableErrorReporting: false,  // 设为 true 启用所有错误报告功能
  // ... 其他配置
}
```

### 用户界面变化

**enableErrorReporting: false 时**:
- NFT挂单失败：只显示"確認"按钮
- NFT取消挂单失败：只显示"確認"按钮
- 用户看不到"复制错误信息"按钮

**enableErrorReporting: true 时**:
- NFT挂单失败：显示"確認"和"复制错误信息"两个按钮
- NFT取消挂单失败：显示"確認"和"复制错误信息"两个按钮
- 用户可以选择复制详细错误信息

## 错误报告内容

当用户点击"复制错误信息"时，会复制包含以下信息的详细报告：
- 时间戳
- 当前页面URL
- 用户钱包地址
- 浏览器信息
- 详细错误堆栈信息
- 操作类型（NFT挂单失败）

## 使用场景

### 场景1：NFT挂单失败
1. 用户尝试挂单NFT失败
2. 如果错误报告功能启用，用户看到"复制错误信息"按钮
3. 用户点击复制按钮，获取详细错误信息
4. 用户将错误信息发送给开发人员

### 场景2：取消挂单失败
1. 用户尝试取消NFT挂单失败
2. 如果错误报告功能启用，用户看到"复制错误信息"按钮
3. 用户点击复制按钮，获取详细错误信息
4. 用户将错误信息发送给开发人员

## 启用方式

### 1. 配置文件方式
```javascript
// 修改 src/config/errorReporting.js
enableErrorReporting: true  // 启用所有错误报告功能
```

### 2. 临时启用方式
```javascript
// URL参数
https://your-domain.com?debug=true

// 控制台命令
enableErrorReporting()
```

## 安全保障

1. **默认关闭**: 确保正常用户不受影响
2. **统一控制**: 所有错误报告功能使用同一个开关
3. **向后兼容**: 不影响任何原有功能
4. **降级处理**: 即使错误报告组件出错，也不影响原有功能

## 测试验证

- ✅ **构建成功**: `npm run build` 通过
- ✅ **功能完整**: NFT挂单和取消挂单的错误处理都已实现
- ✅ **开关控制**: 通过 `enableErrorReporting` 可以控制功能显示/隐藏
- ✅ **用户体验**: 保持原有的错误提示，只是增加了可选的详细错误报告

## 总结

现在项目中的三个主要功能都有了统一的错误报告机制：
1. **静态收益仪表盘** - 数据加载失败时的错误报告
2. **NFT购买** - 购买失败时的错误报告
3. **NFT挂单** - 挂单/取消挂单失败时的错误报告

所有功能都使用同一个 `enableErrorReporting` 开关控制，确保了一致的用户体验和管理便利性。
