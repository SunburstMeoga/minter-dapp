<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-12">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title :titleWord="$t('menu.vision')" />
        </div>

        <div class="w-11/12 relative h-52 mb-4">
            <div class="w-11/12 h-48 absolute left-0 top-0 module-content rounded-xl animate__animated"
                :class="hasChange ? 'animate__backInDown' : ''"></div>
            <div class="w-11/12 flex justify-center items-start pl-10 flex-col rounded-xl h-48 absolute right-0 bottom-0 operating-button text-white animate__animated"
                :class="hasChange ? 'animate__backInRight' : ''">
                <div class="font-bold text-4xl">
                    NFT <span class="italic">MINTER</span>
                </div>
                <div class="flex justify-center items-center">
                    <div class="mr-2">
                        -
                    </div>
                    <div class="font-xs">
                        {{ $t('vision.contentOne') }}
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <div class="mr-2">
                        -
                    </div>
                    <div class="font-xs">
                        {{ $t('vision.contentTwo') }}
                    </div>
                </div>

            </div>

        </div>

        <div class="module-content rounded-xl p-4 text-white text-2xl font-bold italic w-11/12 mb-2 animate__animated"
            :class="hasChange ? 'animate__fadeInRight' : ''">
            <div>
                {{ $t('vision.weBelieveTitle') }}
            </div>
            <!-- <div class="underline italic font-2xl">
                新定义
            </div> -->
        </div>
        <div class="text-white w-11/12 mb-4 animate__animated text-xs" :class="hasChange ? 'animate__bounceInUp' : ''">
            {{ $t('vision.weBelieveWord') }}

        </div>
        <div class="module-content rounded-xl p-4 text-white text-2xl font-bold italic w-11/12 mb-2 animate__animated"
            :class="hasChange ? 'animate__fadeInLeft' : ''">
            <div class="mb-2">
                {{ $t('vision.inMinterEyesTitleTop') }}
            </div>
            <div>
                {{ $t('vision.inMinterEyesTitleBottom') }}
            </div>
        </div>
        <div class="text-white w-11/12 mb-3 animate__animated text-xs" :class="hasChange ? 'animate__bounceInUp' : ''">
            {{ $t('vision.inMinterEyesWord') }}
        </div>
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