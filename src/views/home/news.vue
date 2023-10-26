<template>
    <div class="w-full h-full pt-2">
        <div class="h-full">
            <div class="w-full h-full flex flex-col items-center justify-start">
                <div class="w-11/12 mb-2 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
                    <module-title :titleWord="$t('menu.news')" />
                </div>
                <div class="w-11/12 mb-2 rounded overflow-hidden animate__animated "
                    :class="hasChange ? 'animate__bounceIn' : ''">
                    <van-swipe :loop="false" class="my-swipe" :width="300" indicator-color="#e149ed">
                        <van-swipe-item>
                            <div class="w-full h-full bg-red-300">
                                <img src="../../assets/images/swiper-one.png" alt="">
                            </div>
                        </van-swipe-item>
                        <van-swipe-item>
                            <div class="w-full h-full bg-green-300">
                                <img src="../../assets/images/swiper-two.png" alt="">
                            </div>
                        </van-swipe-item>
                        <van-swipe-item>
                            <div class="w-full h-full bg-blue-300">
                                <img src="../../assets/images/swiper-three.png" alt="">
                            </div>
                        </van-swipe-item>
                        <van-swipe-item>
                            <div class="w-full h-full bg-gray-300">
                                <img src="../../assets/images/swiper-four.png" alt="">
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <div class="w-11/12 h-32 mb-2 rounded overflow-hidden animate__animated "
                    :class="hasChange ? 'animate__fadeInLeft' : ''">
                    <img src="../../assets/images/touch.png" alt="">
                </div>
                <div class="flex flex-col justify-center items-center font-bold text-2xl text-white mb-1 italic animate__animated"
                    :class="hasChange ? 'animate__fadeInBottomLeft' : ''">
                    <div class="italic">HashAhead</div>
                    <div class="text-center">{{ $t('news.title') }}</div>
                    <div class="text-center">{{ $t('news.secondTitle') }}</div>
                </div>
                <div class="text-xs w-10/12 mr-auto ml-auto text-gray-300 text-center mb-8 animate__animated"
                    :class="hasChange ? 'animate__fadeInBottomRight' : ''">
                    {{ $t('news.content') }}
                </div>
                <div class="flex justify-center items-center w-full">
                    <div :class="hasChange ? 'animate__flipInY' : ''"
                        class="animate__animated w-11/12 py-3 text-center operating-button text-white rounded">{{
                            $t('news.exploratory') }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import ModuleTitle from '@/components/ModuleTitle.vue'
defineProps({
    hasChange: {
        type: Boolean,
        default: false
    }
})
</script>

<style  scoped>
img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>
<style>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 170px;
    text-align: center;
}
</style>