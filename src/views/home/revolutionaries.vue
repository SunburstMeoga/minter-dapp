<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-12">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title titleWord="NFT革命" />
        </div>
        <div class="w-11/12 text-white text-xs mb-2 animate__animated"
            :class="hasChange ? 'animate__lightSpeedInRight' : ''">
            <div class="mb-2">
                在数字资产的浪潮中，NFT已经成为一个焦点话题。
            </div>

            <div class="mb-2">
                Minter项目旨在彻底重新定义NFT的价值与意义。我们认为，一个未被认证或赋权的NFT无异于一个简单的数字“JPG”图片
            </div>
            <div class="mb-2">
                Minter的核心目标是确保每一个NFT都有其独特的价值与权益，推动NFT在Web 3.0赛道上的进一步发展，并借助AI技术，利用大模型制作NFT。
            </div>
        </div>
        <div class="w-11/12 flex justify-start items-center text-white mb-4 animate__animated"
            :class="hasChange ? 'animate__lightSpeedInLeft' : ''">
            <div class="flex flex-col items-end justify-start w-3/12">
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                <div class="border-b border-white h-1 w-full mb-1"></div>
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
            </div>
            <div class="font-bold text-xl italic ml-2">当前NFT市场的挑战和问题</div>
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
            <div class="font-bold text-xl italic mr-2">通过HashAhead我们可以</div>
            <div class="flex flex-col items-start justify-start w-3/12">
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                <div class="border-b border-white h-1 w-full mb-1"></div>
                <div class="border-b border-white h-1 w-3/12 mb-1"></div>
            </div>

        </div>

        <div class="w-11/12 text-white text-xs mb-2">
            Minter借助HashAhead公链平台，为创作者提供更多的创作工具和平台，使NFT成为技术与艺术相结合的完美产物。
        </div>
        <div class="w-11/12 text-white text-xs">
            HashAhead公链平台同时具有超快速和超稳定的特点，能够做到为每一件NFT赋予真正的确权，确保其在任何场景下都能得到公正的利用和认可。

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ModuleTitle from '@/components/ModuleTitle.vue'
defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
let questionList = computed(() => {
    return [
        { title: '市场过热', icon: 'icon-shujuzzhang', content: '大量投機者湧入，導致價格泡沫化' },
        { title: '門檻高', icon: 'icon-logo', content: '對於普通用戶，創建和交易NFT仍然存在一定的技術難度。' },
        { title: '同質化', icon: 'icon-chuanRanBingShangBaoSolid', content: '由於缺乏審核制度，很多NFT的價值難以被辨識' }
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