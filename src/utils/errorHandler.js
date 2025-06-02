/**
 * 错误处理工具函数
 */
import { isErrorReportingEnabled, shouldShowErrorReport, logError } from '@/config/errorReporting'

/**
 * 显示错误报告弹窗
 * @param {Object} proxy - Vue组件实例的proxy
 * @param {Error|Object|String} error - 错误对象
 * @param {Object} options - 配置选项
 */
export function showErrorReport(proxy, error, options = {}) {
  // 检查是否启用了错误报告功能
  if (!isErrorReportingEnabled()) {
    // 如果未启用，只记录错误到控制台
    logError('ErrorReport (Disabled)', error)
    return
  }

  const defaultOptions = {
    title: '操作失败',
    description: '操作失败，请复制以下错误信息并反馈给开发人员以便快速定位问题',
    showRetryButton: false,
    copyText: '复制错误信息',
    retryText: '重试',
    closeText: '关闭'
  }

  const finalOptions = Object.assign({}, defaultOptions, options, { error })

  // 安全检查：确保proxy和$errorReport存在
  try {
    if (proxy && proxy.$errorReport && typeof proxy.$errorReport.show === 'function') {
      proxy.$errorReport.show(finalOptions)
    } else {
      console.error('ErrorReport plugin not found, falling back to console log:', error)
      // 降级处理：使用原有的confirm组件
      if (proxy && proxy.$confirm && typeof proxy.$confirm.show === 'function') {
        proxy.$confirm.show({
          title: finalOptions.title,
          content: finalOptions.description,
          showCancelButton: false,
          confirmText: '确定',
          onConfirm: () => {
            proxy.$confirm.hide()
          }
        })
      } else {
        // 最后的降级：只在控制台输出
        console.error('No error reporting mechanism available:', error)
      }
    }
  } catch (e) {
    console.error('Error in showErrorReport:', e)
    console.error('Original error:', error)
  }
}

/**
 * 处理静态仪表盘错误
 * @param {Object} proxy - Vue组件实例的proxy
 * @param {Error} error - 错误对象
 */
export function handleStaticGaugeError(proxy, error) {
  logError('Static gauge error', error)

  // 检查是否应该显示错误报告
  if (!shouldShowErrorReport('staticGauge')) {
    return
  }

  showErrorReport(proxy, error, {
    title: '静态收益仪表盘加载失败',
    description: '静态收益仪表盘数据加载失败，请复制以下错误信息并反馈给开发人员',
    showRetryButton: true,
    onRetry: () => {
      proxy.$errorReport.hide()
      // 重新加载页面或重新调用获取数据的函数
      window.location.reload()
    }
  })
}

/**
 * 处理NFT购买错误
 * @param {Object} proxy - Vue组件实例的proxy
 * @param {Error} error - 错误对象
 * @param {Function} retryCallback - 重试回调函数
 */
export function handleNFTPurchaseError(proxy, error, retryCallback = null) {
  logError('NFT purchase error', error)

  // 检查是否应该显示错误报告
  if (!shouldShowErrorReport('nftPurchase')) {
    return
  }

  showErrorReport(proxy, error, {
    title: 'NFT购买失败',
    description: 'NFT购买失败，请复制以下错误信息并反馈给开发人员以便快速定位问题',
    showRetryButton: !!retryCallback,
    onRetry: () => {
      proxy.$errorReport.hide()
      if (retryCallback && typeof retryCallback === 'function') {
        retryCallback()
      }
    }
  })
}

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

/**
 * 处理钱包相关错误
 * @param {Object} proxy - Vue组件实例的proxy
 * @param {Error} error - 错误对象
 */
export function handleWalletError(proxy, error) {
  logError('Wallet error', error)

  // 钱包错误总是显示（如果错误报告功能启用）
  if (!isErrorReportingEnabled()) {
    return
  }

  showErrorReport(proxy, error, {
    title: '钱包操作失败',
    description: '钱包操作失败，请复制以下错误信息并反馈给开发人员',
    showRetryButton: false
  })
}

/**
 * 处理合约调用错误
 * @param {Object} proxy - Vue组件实例的proxy
 * @param {Error} error - 错误对象
 * @param {String} contractName - 合约名称
 */
export function handleContractError(proxy, error, contractName = '合约') {
  logError(`${contractName} contract error`, error)

  // 合约错误总是显示（如果错误报告功能启用）
  if (!isErrorReportingEnabled()) {
    return
  }

  showErrorReport(proxy, error, {
    title: `${contractName}调用失败`,
    description: `${contractName}调用失败，请复制以下错误信息并反馈给开发人员`,
    showRetryButton: false
  })
}

/**
 * 格式化错误信息用于显示
 * @param {Error|Object|String} error - 错误对象
 * @returns {String} 格式化后的错误信息
 */
export function formatError(error) {
  if (!error) return '未知错误'

  try {
    if (typeof error === 'string') {
      return error
    }

    if (error instanceof Error) {
      return `${error.name}: ${error.message}`
    }

    if (typeof error === 'object') {
      // 处理以太坊错误
      if (error.code && error.message) {
        return `错误代码: ${error.code}\n错误信息: ${error.message}`
      }

      // 处理其他对象错误
      return JSON.stringify(error, null, 2)
    }

    return String(error)
  } catch (e) {
    return '错误信息格式化失败'
  }
}
