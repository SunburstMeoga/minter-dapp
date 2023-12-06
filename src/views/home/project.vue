<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-12">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title :titleWord="$t('menu.projectIntroduction')" />
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
const modules = ref([EffectCards])
let projectList = computed(() => {
    return [
        { title: t('projectIntroduction.noahTitle'), contentOne: t('projectIntroduction.noahContentOne'), contentTwo: t('projectIntroduction.noahContentTwo'), contentThree: t('projectIntroduction.noahContentThree') },
        { title: t('projectIntroduction.leLouvre'), contentOne: t('projectIntroduction.leLouvreContentOne'), contentTwo: t('projectIntroduction.leLouvreContentTwo'), contentThree: t('projectIntroduction.leLouvreContentThree') },
        { title: t('projectIntroduction.communityDevelopmentTitle'), contentOne: t('projectIntroduction.communityDevelopmentContentOne'), contentTwo: t('projectIntroduction.communityDevelopmentContentTwo'), contentThree: t('projectIntroduction.communityDevelopmentContentThree') }]
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