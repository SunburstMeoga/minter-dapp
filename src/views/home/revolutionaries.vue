<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-12">
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
</template>

<script setup>
import { ref, computed } from 'vue'
import ModuleTitle from '@/components/ModuleTitle.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
let questionList = computed(() => {
    return [
        { title: t('NFTRevolution.marketTooHotTitle'), icon: 'icon-shujuzzhang', content: t('NFTRevolution.marketTooHotContent') },
        { title: t('NFTRevolution.highThresholdTitle'), icon: 'icon-logo', content: t('NFTRevolution.highThresholdContent') },
        { title: t('NFTRevolution.homogenizationTitle'), icon: 'icon-chuanRanBingShangBaoSolid', content: t('NFTRevolution.homogenizationContent') }
    ]
})
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