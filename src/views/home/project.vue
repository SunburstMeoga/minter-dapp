<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-2">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title titleWord="項目介紹" />
        </div>

        <div>
            <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper">
                <swiper-slide v-for="(item, index) in 4" :key="index">
                    <div class="w-full h-full relative">
                        <div>
                            <img class="w-full h-full absolute left-0 top-0" src="../../assets/images/avtor.gif" alt="">
                        </div>
                        <div class="absolute left-4 bottom-4">

                            <div class="mt-2 mb-4 text-2xl text-white truncate">
                                新聞標題
                            </div>
                            <span
                                class="inline-block py-4 bg-shops-content !leading-3rem px-6 bg-opacity-20 backdrop-filter !backdrop-blur-sm rounded normal-case text-essentials-white text-xs border-none">
                                健身房記錄卡上機了咖啡機拉卡薩就拉開發
                            </span>
                        </div>
                    </div>

                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { EffectCards } from 'swiper/modules'
// import projectCard from './projectCard.vue'
import ModuleTitle from '@/components/ModuleTitle.vue'
defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
const modules = ref([EffectCards])
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
    height: 420px;
    border: none;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    background: #000;
}
</style>