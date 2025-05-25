import { createApp } from 'vue'
import ErrorReportComponent from '../ErrorReportModal.vue'

const ErrorReportPlugin = {}
let $vm

const defaultsOptions = {
  title: '错误报告',
  description: '操作失败，请复制以下错误信息并反馈给开发人员',
  error: '',
  showRetryButton: false,
  copyText: '复制错误信息',
  retryText: '重试',
  closeText: '关闭'
}

const initInstance = () => {
  const app = createApp(ErrorReportComponent)
  const container = document.createElement('div')
  $vm = app.mount(container)
  document.body.appendChild(container)
}

ErrorReportPlugin.install = function (app) {
  const errorReport = {
    show(options) {
      $vm = null
      if (!$vm) initInstance()
      options = Object.assign({}, defaultsOptions, options)
      for (const i in options) {
        $vm[i] = options[i]
      }
      
      let handleClose = $vm.handleClose
      let handleRetry = $vm.handleRetry
      
      $vm.handleClose = () => {
        handleClose()
        options && options.onClose && options.onClose()
      }

      $vm.handleRetry = () => {
        handleRetry()
        options && options.onRetry && options.onRetry()
      }

      $vm.visible = true

      return $vm
    },
    hide() {
      if ($vm) $vm.visible = false
    }
  }
  app.config.globalProperties.$errorReport = errorReport
}

export default ErrorReportPlugin
