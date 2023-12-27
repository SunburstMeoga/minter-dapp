<template>
    <div class="text-primary-color h-full w-full text-center flex flex-col justify-end items-center">
        <div class="flex flex-col justify-between items-center h-4/6">
            <div class="w-8/12 animate__animated " :class="hasChange ? 'animate__zoomIn' : ''">
                <img src="../../assets/images/minter-logo-ver.png" alt="">
            </div>
            <!-- <div class="text-5xl font-extrabold mb-4 italic text-white animate__animated w-11/12"
                :class="hasChange ? 'animate__fadeInDown' : ''">
                <div>
                    {{ $t('home.title') }}
                </div>
                <div class="">
                    Minter
                </div>
            </div> -->
            <div class="text-sm text-white w-9/12 animate__animated" :class="hasChange ? 'animate__fadeInLeft' : ''">
                {{ $t('home.contentOne') }}
                {{ $t('home.contentTwo') }}

            </div>
            <!-- <div class="text-sm mb-12 text-white">
                </div> -->
            <div class="flex justify-around items-center w-11/12">
                <div class="border-2 border-primary-color text-white px-4 py-2 rounded-md font-bold animate__animated"
                    :class="hasChange ? 'animate__fadeInRight' : ''">
                    查看{{ $t('home.documentation') }}
                </div>
                <div class="border-2 border-primary-color text-white px-4 py-2 rounded-md font-bold animate__animated"
                    :class="hasChange ? 'animate__fadeInRight' : ''">
                    錢包下載
                </div>
            </div>
            <div class="">
                <div class="icon iconfont icon-down-circle-fill animate-bounce" style="font-size: 20px;"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>