import { createI18n } from 'vue-i18n'
import zhHk from './zh-hk'
import enUs from './en-us'
export default createI18n({
  legacy: false, // 让 setup 函数可以通过 t 访问
  globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
  locale: 'en-us',
  fallbackLocale: 'en-us',
  messages: {
    'zh-hk': zhHk,
    'en-us': enUs
  }
})
