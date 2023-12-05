<template>
    <div class="text-primary-color h-full w-full text-center flex flex-col justify-start items-center pt-10">
        <div class="w-8/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInDown' : ''">
            <img src="../../assets/images/minter-logo-ver.png" alt="">
        </div>
        <div class="text-5xl font-extrabold mb-4 italic text-white animate__animated w-11/12"
            :class="hasChange ? 'animate__fadeInDown' : ''">
            <div>
                {{ $t('home.title') }}
            </div>
            <div class="">
                Minter
            </div>
        </div>
        <div class="text-sm text-white mb-12 w-9/12 animate__animated" :class="hasChange ? 'animate__fadeInLeft' : ''">
            {{ $t('home.contentOne') }}
            {{ $t('home.contentTwo') }}

        </div>
        <!-- <div class="text-sm mb-12 text-white">
            </div> -->
        <div class="border border-primary-color text-white px-8 py-3 rounded-md font-bold mb-10 animate__animated"
            :class="hasChange ? 'animate__fadeInRight' : ''">
            {{ $t('home.documentation') }}
        </div>
        <div class="">
            <div class="icon iconfont icon-down-circle-fill animate-bounce" style="font-size: 30px;"></div>
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