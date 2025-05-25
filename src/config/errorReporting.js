/**
 * 错误报告配置
 * 可以通过修改这些配置来控制错误报告的行为
 */

export const errorReportingConfig = {
  // 是否启用静态仪表盘错误报告
  enableStaticGaugeErrorReporting: false,
  
  // 是否启用NFT购买错误报告
  enableNFTPurchaseErrorReporting: true,
  
  // 是否在控制台输出详细错误信息（用于调试）
  enableConsoleLogging: true,
  
  // 是否自动显示错误报告弹窗（false表示只在用户主动选择时显示）
  autoShowErrorReport: false,
  
  // 错误报告的默认语言
  defaultLanguage: 'zh-CN'
}

/**
 * 检查是否应该显示错误报告
 * @param {string} errorType - 错误类型 ('staticGauge' | 'nftPurchase')
 * @returns {boolean}
 */
export function shouldShowErrorReport(errorType) {
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
 * 记录错误到控制台（如果启用）
 * @param {string} context - 错误上下文
 * @param {Error} error - 错误对象
 */
export function logError(context, error) {
  if (errorReportingConfig.enableConsoleLogging) {
    console.error(`[${context}] Error:`, error)
  }
}
