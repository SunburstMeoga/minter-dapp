<template>
    <div class="w-full h-full flex flex-col items-center justify-start pt-16 bg-gray-card overflow-auto">
        <div class="w-11/12">
            <div class="flex justify-center items-center mb-4">
                <module-title titleWord="投資人" />
            </div>
            <div class="flex justify-between items-center flex-wrap">
                <div style="width: 23.6%;" class="mb-2 overflow-hidden rounded" v-for="(item, index) in 24" :key="index">
                    <img src="https://assets.starsharks.com/images/home/np_partners_bnfc.png" alt="">
                </div>

            </div>
        </div>
        <div class="h-24 w-full bg-gray-bottom">
            <div class="flex justify-between w-11/12 ml-auto mr-auto h-full items-center text-white">
                <div class="font-bold ">Minter</div>
                <div class="text-sm">© 2023 MINTER. 版權所有</div>
            </div>
            <!-- <div class="flex justify-between w-11/12 h-full items-center text-white">
                <div class="font-bold ">联系我们</div>
                <div class="text-sm">反馈</div>
            </div> -->
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