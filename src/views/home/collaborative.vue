<template>
    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-card">
        <div class="w-11/12 flex justify-center items-center mb-8">
            <module-title titleWord="合作夥伴" />
        </div>
        <div class="flex justify-between items-center flex-wrap w-11/12 ">
            <div style="width: 48%;" class="mb-4 overflow-hidden rounded">
                <img src="https://assets.starsharks.com/images/home/np_partners_bnfc.png" alt="">
            </div>
            <div style="width: 48%;" class="mb-4 overflow-hidden rounded">
                <img src="https://assets.starsharks.com/images/home/np_partners_bsc.png" alt="">
            </div>
            <div style="width: 48%;" class="mb-4 overflow-hidden rounded">
                <img src="https://assets.starsharks.com/images/home/np_m_partner_coinm.png" alt="">
            </div>
            <div style="width: 48%;" class="mb-4 overflow-hidden rounded">
                <img src="https://assets.starsharks.com/images/home/np_img_partner3.png" alt="">
            </div>
        </div>
        <div class="w-11/12 mb-4">
            <img src="https://assets.starsharks.com/images/home/np_partners_ygg_m.png" alt="">
        </div>
        <div class="w-11/12">
            <img src="https://assets.starsharks.com/images/home/np_m_partner1.png" alt="">
        </div>
    </div>
</template>

<script setup>
import ModuleTitle from '@/components/ModuleTitle.vue';
</script>

<style  scoped>
.title {
    text-shadow: 1px -1px #fff, -1px 1px #999, -10 10px 5px #808080;
}

img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>