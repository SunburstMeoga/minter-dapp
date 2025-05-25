# 错误报告功能开关使用指南

## 概述

错误报告功能现在是一个可开关的功能，默认情况下**完全隐藏**，只有在需要调试用户问题时才启用。这确保了正常用户不会看到任何错误报告相关的界面，同时为开发人员提供了强大的调试工具。

## 当前状态

- ✅ **默认状态**: 错误报告功能**完全关闭**
- ✅ **用户体验**: 正常用户看不到任何"复制错误信息"按钮
- ✅ **开发友好**: 可以通过多种方式快速启用
- ✅ **安全性**: 不影响任何原有功能

## 启用方式

### 1. URL参数方式（推荐）
在URL后面添加参数：
```
https://your-domain.com?debug=true
或
https://your-domain.com?errorReport=true
```

### 2. 控制台命令方式
打开浏览器控制台，输入：
```javascript
// 临时启用（刷新页面后失效）
enableErrorReporting()

// 持久启用（直到手动关闭）
enableErrorReporting('localStorage')

// 查看当前状态
isErrorReportingEnabled()

// 查看帮助信息
showErrorReportingHelp()

// 禁用错误报告
disableErrorReporting()
```

### 3. 手动设置方式
在控制台中：
```javascript
// 临时启用
sessionStorage.setItem('enableErrorReporting', 'true')

// 持久启用
localStorage.setItem('enableErrorReporting', 'true')
```

## 配置文件控制

可以通过修改 `src/config/errorReporting.js` 来控制功能：

```javascript
export const errorReportingConfig = {
  // 主开关：完全控制错误报告功能
  enableErrorReporting: false,  // 设为 true 可默认启用
  
  // 子功能开关
  enableStaticGaugeErrorReporting: false,  // 静态仪表盘错误报告
  enableNFTPurchaseErrorReporting: false,  // NFT购买错误报告
  
  // 开发者模式：允许通过URL参数等方式启用
  allowDeveloperMode: true,  // 设为 false 可完全禁用开发者模式
  
  // 控制台日志
  enableConsoleLogging: true,  // 是否在控制台输出错误信息
}
```

## 使用场景

### 场景1：用户反馈问题
1. 用户遇到静态仪表盘或NFT购买问题
2. 开发人员发送带有 `?debug=true` 的链接给用户
3. 用户访问链接，重现问题
4. 用户看到"复制错误信息"按钮，点击复制
5. 用户将错误信息发送给开发人员

### 场景2：开发调试
1. 开发人员在控制台输入 `enableErrorReporting()`
2. 重现问题，查看详细错误信息
3. 调试完成后输入 `disableErrorReporting()`

### 场景3：临时启用
1. 在URL后添加 `?errorReport=true`
2. 页面自动启用错误报告功能
3. 刷新页面或移除URL参数后自动禁用

## 功能状态检查

### 检查是否启用
```javascript
// 在控制台中检查
console.log('错误报告功能状态:', isErrorReportingEnabled())
```

### 查看完整状态
```javascript
// 显示详细帮助信息
showErrorReportingHelp()
```

## 用户界面变化

### 错误报告功能关闭时
- NFT购买失败：只显示"確認"按钮
- 静态仪表盘错误：静默处理，只在控制台记录
- 用户看不到任何"复制错误信息"相关内容

### 错误报告功能启用时
- NFT购买失败：显示"確認"和"复制错误信息"两个按钮
- 静态仪表盘错误：可以显示详细错误报告弹窗
- 用户可以复制完整的错误信息

## 安全性保障

1. **默认关闭**: 确保正常用户不受影响
2. **权限控制**: 只有知道启用方法的人才能开启
3. **临时性**: 大部分启用方式都是临时的
4. **降级处理**: 即使错误报告组件出错，也不影响原有功能

## 开发建议

### 生产环境
- 保持 `enableErrorReporting: false`
- 保持 `allowDeveloperMode: true`（允许临时启用）
- 通过URL参数或控制台命令临时启用

### 开发环境
- 可以设置 `enableErrorReporting: true`（默认启用）
- 或者使用URL参数 `?debug=true`

### 调试用户问题
1. 发送带有 `?debug=true` 的链接给用户
2. 指导用户重现问题并复制错误信息
3. 根据错误信息快速定位问题

## 注意事项

1. **URL参数优先级最高**: 即使配置文件中关闭，URL参数仍可启用
2. **localStorage持久性**: 使用localStorage启用的设置会持续到手动清除
3. **sessionStorage临时性**: 使用sessionStorage的设置在关闭标签页后失效
4. **控制台可用性**: 所有控制函数都挂载到全局window对象上

## 故障排除

### 如果错误报告功能无法启用
1. 检查 `allowDeveloperMode` 是否为 `true`
2. 确认URL参数格式正确
3. 检查控制台是否有错误信息
4. 尝试刷新页面后重新启用

### 如果想完全禁用错误报告功能
1. 设置 `enableErrorReporting: false`
2. 设置 `allowDeveloperMode: false`
3. 这样即使通过URL参数也无法启用

## 总结

这个开关机制确保了：
- ✅ 正常用户完全不受影响
- ✅ 开发人员可以快速启用调试功能
- ✅ 灵活的控制方式适应不同场景
- ✅ 安全可靠，不会意外暴露调试信息

现在您可以放心部署，错误报告功能完全隐藏，只有在需要时才会出现！
