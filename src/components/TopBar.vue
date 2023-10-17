<template>
    <div class="h-14 w-full text-primary-color bg-black blur-lg">
        <div class="flex justify-between items-center px-4 h-full">

            <div class="w-32">
                <img src="../assets/minter-logo-cro.png" alt="">
            </div>
            <div>
                <div class="icon iconfont menu icon-menu-hamburger" @click="toggleMenu"></div>
            </div>
        </div>
        <van-popup v-model:show="showLeftMenu" position="right" :style="{ width: '75%', height: '100%' }">
            <div class="w-full h-full bg-page-content text-white flex flex-col relative">
                <div class="flex justify-end items-center pt-2 pr-2">
                    <div class="icon iconfont icon-close1 close" @click="toggleMenu"></div>
                </div>
                <div class="overflow-scroll pb-20">
                    <div class="pl-10">
                        <div :class="currentMenuItem == 'home' || currentMenuItem == 'homeChild' ? 'text-primary-color' : 'text-white'"
                            class="menu-item" @click="toggleMoreHome('home')">
                            <div>Minter</div>
                            <div class="pl-2">
                                <div class="icon iconfont icon-caret-right transform ease-in-out duration-300"
                                    :class="showMoreHome ? 'rotate-90' : ' '"></div>
                            </div>
                        </div>
                        <div v-show="showMoreHome" class="pl-4">
                            <div class="py-1.5 text-menu-word" @click="handleHomeChild('homeChild', item, index)"
                                v-for="(item, index) in homeChilds" :key="index">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item" :class="currentMenuItem == 'market' ? 'text-primary-color' : 'text-white'"
                            @click="toggleMoreMarket('market')">
                            <div>{{ $t('menu.market') }}</div>
                            <div class="pl-2">
                                <div class="icon iconfont icon-caret-right transform ease-in-out duration-300"
                                    :class="showMoreMarket ? 'rotate-90' : ''"></div>
                            </div>
                        </div>
                        <div v-show="showMoreMarket" class="pl-4">
                            <div class="py-1.5 text-menu-word" @click="toMarket(1)" v-for="(item, index) in marketChilds"
                                :key="index">
                                {{ item.title }}
                            </div>

                        </div>

                    </div>
                    <div class="pl-10">
                        <div class="menu-item" @click="notYetOpen">
                            <div>{{ $t('menu.pledge') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item" @click="notYetOpen">
                            <div>{{ $t('menu.partnership') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item" @click="notYetOpen">
                            <div>{{ $t('menu.rank') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item" @click="notYetOpen">
                            <div>{{ $t('menu.casting') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div class="menu-item" @click="notYetOpen">
                            <div>{{ $t('menu.game') }}</div>
                        </div>
                    </div>
                    <div class="pl-10">
                        <div :class="currentMenuItem == 'personal' ? 'text-primary-color' : 'text-white'" class="menu-item"
                            @click="toggleMorePersonal('personal')">
                            <div>{{ $t('menu.userCenter') }}</div>
                            <div class="pl-2">
                                <div class="icon iconfont icon-caret-right transform ease-in-out duration-300"
                                    :class="showMorePersonal ? 'rotate-90' : ' '"></div>
                            </div>
                        </div>
                        <div v-show="showMorePersonal" class="pl-4">
                            <div class="py-1.5 text-menu-word" @click="handleMenuItem(item)"
                                v-for="(item, index) in personalChilds" :key="index">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                    <div class="pl-10 mt-2 text-menu-word">
                        <div class="flex justify-start items-center">
                            <div class="icon iconfont icon-duoyuyan" style="font-size:14px;"></div>
                            <div class="pl-2" @click="changeLanguage">{{ $t('language') }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center absolute bottom-0 pb-6 bg-page-content w-full">
                    <div class="operating-button text-center mr-auto ml-auto w-11/12 rounded py-2" @click="handleLogin">
                        {{ $t('wallet.connectWallet') }}
                    </div>
                </div>
            </div>
        </van-popup>

        <van-popup v-model:show="showLoginPopup" round position="bottom" :style="{ height: '16%' }">
            <div class="bg-page-content w-full h-full flex flex-col justify-center items-center">
                <div class="flex justify-center items-center p-2 border border-primary-color rounded w-11/12 h-12"
                    @click="toggleLoginPopup">
                    <div class="icon iconfont icon-metamask"></div>
                    <div class="pl-2 word-clip">{{ $t('wallet.connect') }}</div>
                </div>
                <!-- <div class="flex justify-center items-center p-2 py-2.5 operating-button text-white rounded w-11/12"
                    @click="toggleLoginPopup">
                    <div class="icon iconfont icon-email "></div>
                    <div class="pl-2">使用郵箱登錄</div>
                </div> -->
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'

import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant';
import { useStore } from "@/stores/swiper";
const swiperStore = useStore();
const router = useRouter()
const { t } = useI18n()
const showLeftMenu = ref(false)
const showMoreHome = ref(false)
const showMoreMarket = ref(false)
const showMorePersonal = ref(false)
const showLoginPopup = ref(false)
const currentMenuItem = ref('')
// const personalChilds = ref([{ title: '錢包', router: '/personal/wallet' }, { title: '存錢罐' }, { title: '託管' }, { title: '大獎賽' }, { title: '邀請獎勵' }, { title: '我的背包' }, { title: '合成' }, { title: '操作記錄' }, { title: '助力' }, { title: '設置' }])
// const personalChilds = ref([{ title: t('menu.wallet'), router: '/personal/wallet' }])

// const homeChilds = ref([{ title: t('menu.home') }, { title: t('menu.introduction') }, { title: t('menu.game') }, { title: t('menu.news') }, { title: t('menu.partners') }, { title: t('menu.investor') }, { title: t('menu.feedback') }])
const marketChilds = ref([{ title: '200' }, { title: '200' }, { title: '2000' }, { title: '6000' }, { title: '20000' },])

let homeChilds = computed(() => {
    return [{ title: t('menu.home') }, { title: t('menu.introduction') }, { title: t('menu.game') }, { title: t('menu.news') }, { title: t('menu.partners') }, { title: t('menu.investor') }, { title: t('menu.feedback') }]
})

let personalChilds = computed(() => {
    return [{ title: t('menu.wallet'), router: '/personal/wallet' }]
})

// let $emit = defineEmits(['handleHomeChild'])
const { proxy } = getCurrentInstance()
function changeLanguage() {
    console.log(proxy.$i18n.locale)
    if (proxy.$i18n.locale == "zh-hk") {
        proxy.$i18n.locale = "en-us";
    } else if (proxy.$i18n.locale == "en-us") {
        proxy.$i18n.locale = "zh-hk"
    }
    console.log(proxy);
};
function toggleMenu() {
    showLeftMenu.value = !showLeftMenu.value
}

function toggleLoginPopup() {
    showLoginPopup.value = !showLoginPopup.value
}

function handleLogin() {
    toggleLoginPopup()
    toggleMenu()
}

function handleHomeChild(menuItem, item, index) {
    router.push({
        path: '/'
    })
    console.log(menuItem, item, index)
    swiperStore.changeIndex(index)
    console.log(swiperStore.index)
    // $emit(menuItem, item, index)

    showLeftMenu.value = false
}

function handleMenuItem(item) {
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
    showToast('暂未开放');
    return;
}

function toMarket(target) {
    showToast('暂未开放');
    return;
    router.push({
        path: '/market',
        query: { target: target }
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
    @apply flex justify-start items-center py-2 text-lg;
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