<template>
    <div class="text-primary-color h-full w-full text-center flex flex-col justify-start items-center pt-20">
        <div class="w-8/12 mb-8">
            <img src="../../assets/minter-logo-ver.png" alt="">
        </div>
        <div class="text-5xl font-extrabold mb-4 italic text-white">
            <div>
                {{ $t('home.title') }}
            </div>
            <div>
                Minter
            </div>
        </div>
        <div class="text-sm text-white mb-12 w-9/12">
            {{ $t('home.contentOne') }}
            {{ $t('home.contentTwo') }}

        </div>
        <!-- <div class="text-sm mb-12 text-white">
            </div> -->
        <div class="border border-primary-color text-white px-8 py-3 rounded-md font-bold mb-10">
            {{ $t('home.documentation') }}
        </div>
        <div class="animate-bounce">
            <div class="icon iconfont icon-down-circle-fill" style="font-size: 30px;"></div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>