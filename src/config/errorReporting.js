/**
 * 错误报告配置
 * 可以通过修改这些配置来控制错误报告的行为
 */

export const errorReportingConfig = {
  // 主开关：是否启用错误报告功能（设为false完全隐藏错误报告功能）
  enableErrorReporting: false,

  // 是否启用静态仪表盘错误报告
  enableStaticGaugeErrorReporting: false,

  // 是否启用NFT购买错误报告
  enableNFTPurchaseErrorReporting: false,

  // 是否在控制台输出详细错误信息（用于调试）
  enableConsoleLogging: true,

  // 是否自动显示错误报告弹窗（false表示只在用户主动选择时显示）
  autoShowErrorReport: false,

  // 错误报告的默认语言
  defaultLanguage: 'zh-CN',

  // 开发者模式：可以通过URL参数或localStorage启用错误报告
  allowDeveloperMode: true
}

/**
 * 检查是否启用了错误报告功能
 * @returns {boolean}
 */
export function isErrorReportingEnabled() {
  // 检查主开关
  if (!errorReportingConfig.enableErrorReporting) {
    // 如果允许开发者模式，检查是否通过特殊方式启用
    if (errorReportingConfig.allowDeveloperMode) {
      // 检查URL参数
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('debug') === 'true' || urlParams.get('errorReport') === 'true') {
        return true
      }

      // 检查localStorage
      if (localStorage.getItem('enableErrorReporting') === 'true') {
        return true
      }

      // 检查sessionStorage
      if (sessionStorage.getItem('enableErrorReporting') === 'true') {
        return true
      }
    }

    return false
  }

  return true
}

/**
 * 检查是否应该显示错误报告
 * @param {string} errorType - 错误类型 ('staticGauge' | 'nftPurchase')
 * @returns {boolean}
 */
export function shouldShowErrorReport(errorType) {
  // 首先检查主开关
  if (!isErrorReportingEnabled()) {
    return false
  }

  switch (errorType) {
    case 'staticGauge':
      return errorReportingConfig.enableStaticGaugeErrorReporting
    case 'nftPurchase':
      return errorReportingConfig.enableNFTPurchaseErrorReporting
    default:
      return false
  }
}

/**
 * 启用错误报告（临时）
 * @param {string} method - 启用方式 ('localStorage' | 'sessionStorage')
 */
export function enableErrorReporting(method = 'sessionStorage') {
  if (method === 'localStorage') {
    localStorage.setItem('enableErrorReporting', 'true')
  } else {
    sessionStorage.setItem('enableErrorReporting', 'true')
  }
  console.log('错误报告功能已启用')
}

/**
 * 禁用错误报告
 */
export function disableErrorReporting() {
  localStorage.removeItem('enableErrorReporting')
  sessionStorage.removeItem('enableErrorReporting')
  console.log('错误报告功能已禁用')
}

/**
 * 记录错误到控制台（如果启用）
 * @param {string} context - 错误上下文
 * @param {Error} error - 错误对象
 */
export function logError(context, error) {
  if (errorReportingConfig.enableConsoleLogging) {
    console.error(`[${context}] Error:`, error)
  }
}

/**
 * 在控制台显示错误报告功能的使用说明
 */
export function showErrorReportingHelp() {
  console.log(`
=== 错误报告功能控制 ===

启用方式：
1. URL参数: ?debug=true 或 ?errorReport=true
2. 控制台命令: enableErrorReporting() 或 enableErrorReporting('localStorage')
3. 手动设置: localStorage.setItem('enableErrorReporting', 'true')

禁用方式：
1. 控制台命令: disableErrorReporting()
2. 刷新页面（如果使用sessionStorage）

当前状态: ${isErrorReportingEnabled() ? '已启用' : '已禁用'}

注意：错误报告功能仅在需要调试时启用，正常情况下保持关闭状态。
  `)
}

// 将函数挂载到全局，方便在控制台使用
if (typeof window !== 'undefined') {
  window.enableErrorReporting = enableErrorReporting
  window.disableErrorReporting = disableErrorReporting
  window.showErrorReportingHelp = showErrorReportingHelp
  window.isErrorReportingEnabled = isErrorReportingEnabled
}
