<template>
    <div class="w-full h-full flex flex-col items-center justify-between pt-20 bg-gray-card">
        <div class="w-11/12">
            <div class="flex justify-center items-center mb-4">
                <module-title titleWord="投資人" />
            </div>
            <div class="flex justify-between items-center flex-wrap">
                <div style="width: 23.6%;" class="mb-2 overflow-hidden rounded" v-for="(item, index) in 36" :key="index">
                    <img src="https://assets.starsharks.com/images/home/np_partners_bnfc.png" alt="">
                </div>

            </div>
        </div>
        <div class="h-24 w-full" style="border: 1px solid red;">
            slasjdkf
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