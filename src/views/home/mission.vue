<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-12">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title :titleWord="$t('menu.mission')" />
        </div>
        <div class="w-11/12 flex justify-start items-center text-white mb-4 animate__animated"
            :class="hasChange ? 'animate__lightSpeedInLeft' : ''">
            <div class="flex flex-col items-end justify-start w-3/12">
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                <div class="border-b border-white h-1 w-full mb-1"></div>
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
            </div>
            <div class="font-bold text-xl italic ml-2">{{ $t('mission.affirmative') }}</div>
        </div>

        <div class="w-11/12 flex justify-end items-center text-white mb-6 animate__animated"
            :class="hasChange ? 'animate__lightSpeedInRight' : ''">
            <div class="font-bold text-xl italic mr-2">{{ $t('mission.empower') }}</div>
            <div class="flex flex-col items-start justify-start w-3/12">
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                <div class="border-b border-white h-1 w-full mb-1"></div>
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
            </div>

        </div>

        <div class="text-white w-11/12 module-content rounded-xl p-4 mb-3 animate__animated"
            :class="hasChange ? 'animate__zoomInDown' : ''">
            {{ $t('mission.introduction') }}
        </div>

        <div class="text-white w-11/12  mb-8 text-sm animate__animated text-center"
            :class="hasChange ? 'animate__bounceInUp' : ''">
            <div>{{ $t('mission.presentTop') }}</div>
            <div>{{ $t('mission.presentBottom') }}</div>
        </div>

        <div class="text-white w-full relative">
            <div class="animate-spin absolute w-6/12 -right-10 top-8">
                <img src="../../assets/images/investors.png" alt="">
            </div>
            <div class="animate-spin absolute w-6/12 -left-16 top-20">
                <img src="../../assets/images/investors.png" alt="">
            </div>
        </div>

        <!-- <div class="module-content rounded-xl p-4 text-white text-xl font-bold italic w-11/12 mb-4 animate__animated"
            :class="hasChange ? 'animate__zoomInUp' : ''">
            Mission
        </div> -->
        <!-- <div class="w-4/12">
            <img src="../../assets/images/vision-bg.png" alt="">
        </div> -->
    </div>
</template>

<script setup>
import ModuleTitle from '@/components/ModuleTitle.vue'
defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
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