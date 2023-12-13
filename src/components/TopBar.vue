<template>
    <div class="h-14 w-full  pt-4">
        <div class="flex p-2 border border-page-content rounded-lg w-11/12 mr-auto ml-auto">
            <div class="flex justify-between w-full items-center h-full bg-gray-800 rounded-lg p-2">
                <div class="w-32">
                    <img src="../assets/images/minter-logo-cro.png" alt="">
                </div>
                <div>
                    <div class="icon iconfont menu icon-menu-hamburger text-white" @click="toggleMenu"></div>
                </div>
            </div>
        </div>
        <van-popup v-model:show="showLeftMenu" position="right"
            :style="{ width: '75%', height: '100%', 'background': '#000' }">
            <div class="w-full h-full bg-black text-white flex flex-col relative">
                <div class="flex justify-end items-center pt-2 pr-2">
                    <div class="icon iconfont icon-close1 close" @click="toggleMenu"></div>
                </div>
                <div class="overflow-scroll pb-20">
                    <div class="pl-10">
                        <div :class="currentMenuItem == 'home' || currentMenuItem == 'homeChild' ? 'text-primary-color' : 'text-white'"
                            class="menu-item active-primary-color" @click="toggleMoreHome('home')">
                            <div>Minter</div>
                            <div class="pl-2">
                                <div class="icon iconfont icon-caret-right transform ease-in-out duration-300"
                                    :class="showMoreHome ? 'rotate-90' : ' '"></div>
                            </div>
                        </div>
                        <div v-show="showMoreHome" class="">
                            <div class="py-1.5 pl-4 mr-4 rounded text-menu-word active-primary-color"
                                @click="handleHomeChild('homeChild', item, index)" v-for="(item, index) in homeChilds"
                                :key="index">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item active-primary-color"
                            :class="currentMenuItem == 'market' ? 'text-primary-color' : 'text-white'"
                            @click="toggleMoreMarket('market')">
                            <div>{{ $t('menu.market') }}</div>
                            <div class="pl-2">
                                <div class="icon iconfont icon-caret-right transform ease-in-out duration-300"
                                    :class="showMoreMarket ? 'rotate-90' : ''"></div>
                            </div>
                        </div>
                        <div v-show="showMoreMarket" class="">
                            <div class="py-1.5 pl-4 mr-4 rounded text-menu-word active-primary-color"
                                @click="toMarket(index)" v-for="(item, index) in marketChilds" :key="index">
                                {{ item.title }}
                            </div>

                        </div>

                    </div>
                    <div class="pl-10">
                        <div class="menu-item active-primary-color" @click="notYetOpen">
                            <div>{{ $t('menu.pledge') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item active-primary-color" @click="notYetOpen">
                            <div>{{ $t('menu.partnership') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item active-primary-color" @click="notYetOpen">
                            <div>{{ $t('menu.rank') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item active-primary-color" @click="notYetOpen">
                            <div>{{ $t('menu.casting') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item active-primary-color" @click="notYetOpen">
                            <div>{{ $t('menu.game') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div :class="currentMenuItem == 'personal' ? 'text-primary-color' : 'text-white'"
                            class="menu-item active-primary-color" @click="toggleMorePersonal('personal')">
                            <div>{{ $t('menu.userCenter') }}</div>
                            <div class="pl-2">
                                <div class="icon iconfont icon-caret-right transform ease-in-out duration-300"
                                    :class="showMorePersonal ? 'rotate-90' : ' '"></div>
                            </div>
                        </div>
                        <div v-show="showMorePersonal" class="">
                            <div class="py-1.5 pl-4 mr-4 rounded text-menu-word active-primary-color"
                                @click="handleMenuItem(item)" v-for="(item, index) in personalChilds" :key="index">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                    <div class="pl-10 mt-2 text-menu-word">

                        <van-popover v-model:show="showLangePopover" theme="dark" :actions="actions"
                            placement="bottom-start" @select="changeLanguage">
                            <template #reference>
                                <div class="flex justify-start items-center rounded bg-bottom-content px-3 p-2 text-sm">
                                    <div class="icon iconfont icon-duoyuyan" style="font-size:14px;"></div>
                                    <div class="pl-2">{{ $t('language') }}</div>
                                </div>
                            </template>
                        </van-popover>
                    </div>
                </div>
                <div class="flex justify-center items-center absolute bottom-0 pb-6  w-full">
                    <div class="operating-button text-center mr-auto ml-auto w-11/12 rounded py-2" @click="handleConnect">
                        {{ !userInfo.address ? $t('wallet.connectWallet') : addressFilter(userInfo.address) }}
                    </div>
                </div>
            </div>
        </van-popup>

        <van-popup v-model:show="showLoginPopup" round position="bottom" :style="{ height: '16%' }">
            <div class="bg-black w-full h-full flex flex-col justify-center items-center">
                <div class="flex justify-center items-center p-2 border border-primary-color rounded w-11/12 h-12"
                    @click="initWallet">
                    <div class="icon iconfont icon-metamask"></div>
                    <div class="pl-2 word-clip">{{ $t('wallet.connect') }}</div>
                </div>
                <!-- <div class="flex justify-center items-center p-2 py-2.5 operating-button text-white rounded w-11/12"
                    @click="toggleLoginWay">
                    <div class="icon iconfont icon-email "></div>
                    <div class="pl-2">使用郵箱登錄</div>
                </div> -->
            </div>
        </van-popup>
        <van-popup v-model:show="showUserInfoPopup" position="right" :style="{ width: '75%', height: '100%' }">
            <div class="bg-black w-full h-full relative flex text-white flex-col justify-center items-center">
                <!-- <div class="flex justify-end items-center pt-2 pr-2">
                    <div class="icon iconfont icon-close1 close" @click="toggleUserInfoPopup"></div>
                </div> -->
                <div class=" text-2xl mb-2">
                    {{ $t('wallet.qrCode') }}
                </div>
                <div class="p-2 bg-white mb-1">
                    <qrcode-vue :value="userInfo.address" :size="size" level="H" />
                </div>
                <div class="mb-6 text-sm">
                    <span class="underline">{{ $t('wallet.view') }}</span> {{ $t('wallet.or') }}
                    <span class="underline" @click="handleCopy">{{ $t('wallet.copy') }}</span>

                </div>
                <div class="mb-6 text-sm">
                    {{ $t('wallet.account') }}: {{ addressFilter(userInfo.address) }}
                </div>
                <div class="w-10/12 py-1.5 text-white operating-button text-center rounded mb-8" @click="disconnectWallet">
                    {{ $t('wallet.disconnect') }}
                </div>
                <div class="absolute bottom-0 w-full flex justify-center items-center">
                    <div class="w-4/12 ">
                        <img src="../assets/images/minter-logo-ver.png" alt="">
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted } from 'vue'

import { CopyText } from '@/utils/copyText'
import Web3 from "web3";
// import ethereum from 'ethers'
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant';
import { useStore } from "@/stores/swiper";
import { userStore } from "@/stores/user";
import QrcodeVue from 'qrcode.vue'
import { login, playersInfo } from '@/request/api'
import { generateNonce } from '@/utils/getNonce'
const swiperStore = useStore();
const userInfo = userStore()
const router = useRouter()
const { t } = useI18n()
const showLeftMenu = ref(false)
const showMoreHome = ref(false)
const showMoreMarket = ref(false)
const showMorePersonal = ref(false)
const showLoginPopup = ref(false)
const currentMenuItem = ref('')

const value = ref('sfsdfsf')
const size = ref(240)
const actions = ref([
    { text: '繁体中文', locale: 'zh-hk' },
    { text: 'English', locale: 'en-us' }
])


let showLangePopover = ref(false)

let showUserInfoPopup = ref(false)
// let marketChilds = ref([{ title: 'NFTs' }, { title: '配套' }])
let marketChilds = computed(() => {
    if (userInfo.address) {
        return [{ title: 'NFTs' }, { title: t('wallet.coherent') }]
    } else {
        return [{ title: 'NFTs' }]
    }

})
let homeChilds = computed(() => {
    return [{ title: t('menu.home') }, { title: t('menu.news') }, { title: t('menu.vision') }, { title: t('menu.mission') }, { title: t('menu.cultureAndSpirituality') }, { title: t('menu.projectIntroduction') }, { title: t('menu.NFTRevolution') }]
})

let personalChilds = computed(() => {
    if (userInfo.address) {
        return [{ title: t('menu.wallet'), router: '/personal/wallet' }, { title: t('menu.exchange'), router: '/personal/exchange' }, { title: t('menu.coinBank') }, { title: t('menu.custodianship') }, { title: t('menu.grandPrix') }, { title: t('menu.bag') }, { title: t('menu.synthesize') }, { title: t('menu.operationRecord'), router: '/earnings/list' }, { title: t('menu.helpHand'), router: '/personal/assistance' }, { title: t('menu.setting') }]
    } else {
        return [{ title: t('menu.wallet'), router: '/personal/wallet' }]
    }
})

onMounted(() => {
    if (localStorage.getItem('language')) {
        proxy.$i18n.locale = localStorage.getItem('language')
    }
    if (localStorage.getItem('address')) {
        userInfo.changeAddress(localStorage.getItem('address'))
    }
    getPlayersInfo(localStorage.getItem('address'))
})
async function handleCopy() {
    await CopyText(userInfo.address)
    showToast(t('toast.copySuccess'))
}

function addressFilter(value) {
    if (value === undefined || value === null) return
    let arr = value.split('')
    let targetStr
    let targetArr = []
    arr.map((item, index) => {
        if (index <= 6 || index >= arr.length - 7) {
            targetArr.push(item)
        }
    })
    targetArr.splice(7, 0, '...')
    targetStr = targetArr.join('')
    return targetStr
}
//獲取玩家信息
function getPlayersInfo(address) {
    playersInfo(address)
        .tnen(res => {
            console.log('res', res)
        })
        .catch(err => {
            console.log('err', err)
        })
}
//钱包地址签名
async function addressSign() {
    proxy.$loading.show()
    const web3 = new Web3(window.ethereum)
    let params = {}
    const randomString =
        "Welcome to Minter\n\nPlease click to sign in and accept the Minter Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n" +
        window.ethereum.selectedAddress +
        "\n\nNonece:\n" +
        generateNonce();
    try {
        const signature = await web3.eth.personal.sign(randomString, window.ethereum.selectedAddress, '')
        params = { randomString: randomString, signature: signature }
    } catch (err) {
        proxy.$loading.hide()
        showToast('签名失败，请重试')
        return
    }


    login(params)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.access_token)
            localStorage.setItem('address', res.address)
            userInfo.changeAddress(res.address)
            proxy.$loading.hide()
            // showToast('已登录')
        })
        .catch(err => {
            proxy.$loading.hide()
            showToast('登录失败，请重试')
            console.log(err)
        })
    // console.log(signature)

}
//点击连接钱包按钮
async function handleConnect() {
    if (localStorage.getItem('address') && localStorage.getItem('token')) {
        toggleUserInfoPopup()
    } else {
        addressSign()
    }
}
async function initWallet() {
    // if (localStorage.getItem('address')) {
    //     userStore.changeAddress(localStorage.getItem('address'))
    // }
    const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
    })
    localStorage.setItem('address', newAccounts[0])
    userInfo.changeAddress(newAccounts[0])
    showLoginPopup.value = false
    console.log(userInfo.address)
    toggleUserInfoPopup()
    showToast('Success')
}

async function disconnectWallet() {
    await ethereum.on('disconnect', (err, payload) => {
        console.log(err, payload)
    })
    localStorage.removeItem('address')
    localStorage.removeItem('token')
    userInfo.changeAddress('')
    toggleUserInfoPopup()
    console.log('已断开连接')
}

// let $emit = defineEmits(['handleHomeChild'])
const { proxy } = getCurrentInstance()
function changeLanguage(actions) {
    console.log(actions)
    proxy.$i18n.locale = actions.locale
    console.log(proxy.$i18n.locale)
    localStorage.setItem('language', actions.locale)
    // if (proxy.$i18n.locale == "zh-hk") {
    //     proxy.$i18n.locale = "en-us";

    // } else if (proxy.$i18n.locale == "en-us") {
    //     proxy.$i18n.locale = "zh-hk"
    // }
    // localStorage.setItem('language', proxy.$i18n.locale)
};
function toggleMenu() {
    showLeftMenu.value = !showLeftMenu.value
}


function toggleUserInfoPopup() {
    showUserInfoPopup.value = !showUserInfoPopup.value
}


function handleHomeChild(menuItem, item, index) {
    router.push({
        path: '/'
    })
    console.log(menuItem, item, index)
    swiperStore.changeIndex(index)
    // $emit(menuItem, item, index)

    showLeftMenu.value = false
}

function handleMenuItem(item) {
    if (!item.router) {
        notYetOpen()
        return
    }
    router.push({
        path: item.router
    })
    showLeftMenu.value = false
}

function toggleMoreHome(value) {
    showMoreHome.value = !showMoreHome.value
    if (showMoreHome.value) {
        currentMenuItem.value = value
    } else {
        currentMenuItem.value = ''
    }
    showMoreMarket.value = false
    showMorePersonal.value = false

}

function toggleMoreMarket(value) {
    showMoreMarket.value = !showMoreMarket.value
    if (showMoreMarket.value) {
        currentMenuItem.value = value
    } else {
        currentMenuItem.value = ''
    }
    showMoreHome.value = false
    showMorePersonal.value = false
}

function toggleMorePersonal(value) {
    showMorePersonal.value = !showMorePersonal.value
    if (showMorePersonal.value) {
        currentMenuItem.value = value
    } else {
        currentMenuItem.value = ''
    }
    showMoreHome.value = false
    showMoreMarket.value = false
}

function changeMenuItem(currentMenuItem) {
    currentMenuItem.value = value
}

function notYetOpen() {
    showToast(t('toast.notYetOpen'));
    return;
}

function toMarket(index) {
    // showToast(t('toast.notYetOpen'));
    console.log(index)
    // return;
    router.push({
        path: index == 0 ? '/market/nfts' : '/market/coherent',
    })
    showLeftMenu.value = false
}

function toPage(page) {
    router.push({
        path: page
    })
    showLeftMenu.value = false
}

defineProps({
    pageTitle: {
        type: String,
        default: ''
    },
    showBack: {
        type: Boolean,
        default: false
    },
    showLogo: {
        type: Boolean,
        default: false
    }
})
// const { pageTitle, showBack, showLogo } = toRefs(props)
</script>

<style scoped>
.menu-item {
    @apply flex justify-start items-center p-2 text-lg rounded mr-8;
}

.word-clip {
    background: linear-gradient(315deg, rgba(156, 109, 237, 1) 0%, rgba(242, 83, 255, 1) 52%, rgba(211, 212, 138, 1) 100%);
    -webkit-background-clip: text;
    color: transparent;
}

.border-clip {
    border: 0.01rem solid transparent;
    border-radius: 0.11rem;
    position: relative;
    background-image: linear-gradient(#fff, #fff),
        linear-gradient(315deg, rgba(156, 109, 237, 1) 0%, rgba(242, 83, 255, 1) 52%, rgba(211, 212, 138, 1) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
}

.close {
    font-size: 24px;
}

.menu {
    font-size: 30px;
}

.back {
    font-size: 20px;
}
</style>