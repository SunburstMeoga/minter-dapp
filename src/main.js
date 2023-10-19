import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/tailwind.css'
import './assets/css/iconfont.css'
import './assets/css/components.css'
import i18n from './language/index.js'
import loading from '@/components/loading'
import confirm from '@/components/confirm'

import App from './App.vue'
import router from './router'

import {
  Button,
  Image,
  Tag,
  Cell,
  CellGroup,
  Switch,
  Tab,
  Tabs,
  PullRefresh,
  Empty,
  BackTop,
  TreeSelect,
  Divider,
  Icon,
  Badge,
  NoticeBar,
  Card,
  NavBar,
  Popup,
  Popover,
  Checkbox,
  Swipe,
  SwipeItem
} from 'vant'

import 'vant/lib/index.css'
import piniaPluginPersist from 'pinia-plugin-persist'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)

app.use(pinia)
app.use(router)

app.use(Button)
app.use(Image)
app.use(Tag)
app.use(Cell)
app.use(CellGroup)
app.use(Switch)
app.use(Tab)
app.use(Tabs)
app.use(PullRefresh)
app.use(Empty)
app.use(BackTop)
app.use(TreeSelect)
app.use(Divider)
app.use(Icon)
app.use(Badge)
app.use(NoticeBar)
app.use(Card)
app.use(NavBar)
app.use(Popup)
app.use(Popover)
app.use(Checkbox)
app.use(Swipe)
app.use(SwipeItem)
app.use(loading)
app.use(confirm)
app.use(i18n)

app.mount('#app')
