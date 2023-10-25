<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-2">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title titleWord="文化與精神" />
        </div>

        <div class="flex justify-around items-center w-11/12 flex-wrap text-white">
            <div class="w-5/12 flex flex-col items-center mb-4 animate__animated "
                :class="hasChange ? 'animate__zoomIn' : ''" v-for="(item, index) in culturesList" :key="index">
                <div
                    class="text-white relative w-28 h-28  p-1.5 flex justify-center items-center rounded-full overflow-hidden mb-2">
                    <div class="operating-button w-full h-full absolute animate-spin">

                    </div>
                    <div class="w-full h-full relative z-10 rounded-full flex justify-center items-center bg-black">
                        {{ item.title }}
                    </div>
                </div>
                <div class="text-xs text-center leading-relaxed w-10/12">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <div class="fixed bottom-12 right-2 w-4/12">
            <img src="../../assets/images/triangles-right.png" class="animate-pulse" alt="">
        </div>

        <div class="fixed bottom-8 left-2 w-5/12">
            <img src="../../assets/images/triangles-left.png" class="animate-pulse" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ModuleTitle from '@/components/ModuleTitle.vue'
defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
let culturesList = ref([{
    title: '共識',
    content: '我們相信NFT的未來，我們與全球NFT愛好者、創作者、用戶分享這一共識，共同打造一個更加繁榮、公平的NFT生態。'
}, {
    title: '忠誠度',
    content: '我們珍視每一個社區成員、合作夥伴和用戶，為他們提供最高品質的服務與支持，確保每一個人在Minter的世界中都能找到自己的位置'
}, {
    title: '創新',
    content: '在技術、應用、經濟模型等各個方面，Minter都追求前沿的創新。我們相信，只有不斷創新，才能保持領先，引領整個行業的發展。'
}, {
    title: '普及',
    content: '我們致力於將NFT的概念、價值和應用推廣到更廣泛的人群中，使更多的人能夠了解、理解並參與到這一革命中來。'
}])
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