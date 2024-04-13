<template>
    <div class="w-full h-full flex flex-col items-center justify-between text-primary-color pt-12 overflow-scroll">
        <div class=" flex flex-col items-center justify-start">
            <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
                <module-title :titleWord="$t('menu.NFTRevolution')" />
            </div>
            <div class="w-11/12 text-white text-xs mb-2 animate__animated"
                :class="hasChange ? 'animate__lightSpeedInRight' : ''">
                <div class="mb-2">
                    {{ $t('NFTRevolution.contentTop') }}
                </div>

                <div class="mb-2">
                    {{ $t('NFTRevolution.contentTwo') }}
                </div>
                <div class="mb-2">
                    {{ $t('NFTRevolution.contentThree') }}
                </div>
            </div>
            <div class="w-11/12 flex justify-start items-center text-white mb-4 animate__animated"
                :class="hasChange ? 'animate__lightSpeedInLeft' : ''">
                <div class="flex flex-col items-end justify-start w-3/12">
                    <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                    <div class="border-b border-white h-1 w-full mb-1"></div>
                    <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                </div>
                <div class="font-bold text-xl italic ml-2">{{ $t('NFTRevolution.challengeTitle') }}</div>
            </div>

            <div class="flex justify-between items-start w-11/12 text-white text-sm mb-4">
                <div class="w-3/12 flex flex-col items-center justify-start mb-4 animate__animated "
                    :class="hasChange ? 'animate__zoomIn' : ''" v-for="(item, index) in questionList" :key="index">
                    <div
                        class="text-white relative w-20 h-20  p-1.5 flex justify-center items-center rounded-full overflow-hidden mb-2">
                        <div class="operating-button w-full h-full absolute">

                        </div>
                        <div class="w-full h-full relative rounded-full flex justify-center items-center ">
                            <div class="icon iconfont" :class="item.icon" style="font-size: 44px;"></div>
                        </div>
                    </div>
                    <div class="text-center leading-relaxed  font-bold text-base mb-2">
                        {{ item.title }}
                    </div>
                    <div class="text-xs text-center leading-relaxed">
                        {{ item.content }}
                    </div>
                </div>
            </div>

            <div class="w-11/12 flex justify-end items-center text-white mb-6 animate__animated"
                :class="hasChange ? 'animate__lightSpeedInRight' : ''">
                <div class="font-bold text-xl italic mr-2">{{ $t('NFTRevolution.hahTitle') }}</div>
                <div class="flex flex-col items-start justify-start w-3/12">
                    <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                    <div class="border-b border-white h-1 w-full mb-1"></div>
                    <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                </div>

            </div>

            <div class="w-11/12 text-white text-xs mb-2">
                {{ $t('NFTRevolution.hahContentOne') }}
            </div>
            <div class="w-11/12 text-white text-xs">
                {{ $t('NFTRevolution.hahContentTwo') }}

            </div>
        </div>
        <div class="py-2 pb-3 w-full bg-gray-900">
            <div class="flex justify-between items-center w-11/12 ml-auto mr-auto">
                <div class="w-20">
                    <img src="../../assets/images/minter-logo-ver.png" alt="">
                </div>
                <div class="flex justify-end items-center">
                    <div class="flex justify-end items-center text-gray-400">
                        <div v-for="(item, index) in socialMedia" :key="index" @click="toSocialMedia(item)">
                            <div class="icon iconfont ml-4 active-white-color" :class="item.icon"
                                style="font-size: 20px;">
                            </div>
                        </div>
                    </div>
                    <div class="ml-2 text-gray-300">
                        <van-popover v-model:show="showLangePopover" theme="dark" :actions="actions" placement="top-end"
                            @select="changeLanguage">
                            <template #reference>
                                <div
                                    class="flex justify-start items-center border border-gray-500 rounded py-1 px-1.5 text-xs">
                                    <div class="icon iconfont icon-duoyuyan" style="font-size:10px;"></div>
                                    <div class="pl-1">{{ $t('language') }}</div>
                                </div>
                            </template>
                        </van-popover>
                    </div>
                </div>

            </div>
            <div class="flex justify-between items-center w-11/12 ml-auto mr-auto text-xs text-gray-500">
                <div class="">
                    {{ $t('footBar.copyright') }}
                </div>
                <div class="flex justify-end items-center">
                    <div class=" ml-3 underline active-white-color" @click="toContactsPage(item)"
                        v-for="(item, index) in contacts">
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useRouter } from "vue-router";

import ModuleTitle from '@/components/ModuleTitle.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { proxy } = getCurrentInstance()
let showLangePopover = ref(false)
const router = useRouter()


defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})

let contacts = computed(() => {
    return [
        {
            title: t('footBar.connectUS'),

        },
        {
            title: t('footBar.feedback'),
            router: '/personal/feedback'
        },
    ]
})
let socialMedia = ref([{
    icon: 'icon-discord',
    url: ' https://discord.gg/Dw5xUdEj'
}, {
    icon: 'icon-telegram1',
    url: 'https://web.telegram.org/k/#@MinterXdao'
}, {
    icon: 'icon-medium',
    url: ''
}, {
    icon: 'icon-tuite1',
    url: 'https://x.com/Minter_XDao'
}])
let questionList = computed(() => {
    return [
        { title: t('NFTRevolution.marketTooHotTitle'), icon: 'icon-shujuzzhang', content: t('NFTRevolution.marketTooHotContent') },
        { title: t('NFTRevolution.highThresholdTitle'), icon: 'icon-logo', content: t('NFTRevolution.highThresholdContent') },
        { title: t('NFTRevolution.homogenizationTitle'), icon: 'icon-chuanRanBingShangBaoSolid', content: t('NFTRevolution.homogenizationContent') }
    ]
})
const actions = ref([
    { text: '繁体中文', locale: 'zh-hk' },
    { text: 'English', locale: 'en-us' },
    { text: '한국어 번역', locale: 'co-so' }
])

function toSocialMedia(item) {
    if (!item.url) return
    window.open(item.url)
}

function toContactsPage(item) {
    if (!item.router) return
    router.push({
        path: item.router
    })
}

function changeLanguage(actions) {
    //console.log(actions)
    proxy.$i18n.locale = actions.locale
    //console.log(proxy.$i18n.locale)
    localStorage.setItem('language', actions.locale)
    // if (proxy.$i18n.locale == "zh-hk") {
    //     proxy.$i18n.locale = "en-us";

    // } else if (proxy.$i18n.locale == "en-us") {
    //     proxy.$i18n.locale = "zh-hk"
    // }
    // localStorage.setItem('language', proxy.$i18n.locale)
};
</script>

<style scoped>
.title {
    text-shadow: 1px -1px #fff, -1px 1px #999, -10 10px 5px #808080;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>