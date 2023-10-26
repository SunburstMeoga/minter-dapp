<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-2">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title titleWord="項目介紹" />
        </div>

        <div class="animate__animated " :class="hasChange ? 'animate__zoomIn' : ''">
            <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper">
                <swiper-slide v-for="(item, index) in projectList" :key="index">
                    <project-card :title="item.title" :contentOne="item.contentOne" :contentTwo="item.contentTwo"
                        :contentThree="item.contentThree" />

                </swiper-slide>
            </swiper>
        </div>
        <!-- <div>
            <img src="../../assets/images/minter.png" alt="">
        </div> -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { EffectCards } from 'swiper/modules'
import projectCard from './projectCard.vue'
import ModuleTitle from '@/components/ModuleTitle.vue'

defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
const modules = ref([EffectCards])
let projectList = computed(() => {
    return [
        { title: '诺亚社区', contentOne: '诺亚（NOAH）社区，由全球范围内的区块链爱好者、技术专家和先驱者于2019年共同成立。', contentTwo: '诺亚社区起初只是一个小型的讨论与分享平台，但由于其高质量的内容分享与深度的行业洞察，迅速吸引了大量的行业内外关注者。', contentThree: '社区目标是创建一个开放、共享、持续创新的全球化生态，致力于推动Web 3.0时代的到来。' },
        { title: '罗浮宫', contentOne: '卢浮宫基金会，总部设于美国，由一群热衷于推动全球文化、艺术和技术融合的企业家、学者和艺术家共同成立。', contentTwo: '基金会的核心理念是，通过投资与支持跨界项目，推动全球文化和技术的创新融合。基金会过去五年的成功投资案例包括了AI艺术创作、虚拟现实博物馆和数字艺术交易平台等。', contentThree: '与Minter的合作是基金会对于NFT行业的重要布局，卢浮宫基金会提供了资金支持、市场资源和战略指导，全力帮助Minter成为全球NFT行业的领军者。' },
        { title: '社区发展', contentOne: '1.目标：诺亚社区致力于建立一个为全球用户提供最新技术信息、行业动态、交流与合作的平台。社区鼓励创新、实验和共享，使其成为区块链行业的风向标。', contentTwo: '2.价值观：开放、共享、创新、责任。诺亚社区相信，只有通过持续的创新与合作，才能推进行业的发展，为全球用户带来真正的价值。', contentThree: '3.全球影响力：诺亚社区已经与全球多个知名技术公司、高等教育机构和研究组织建立了深度合作关系。社区不仅仅是一个讨论与分享的平台，更是全球区块链行业的合作与创新的桥梁。' }]
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

.swiper {
    width: 320px;
    height: 68vh;
    border: none;
    border-radius: 18px;
}
</style>