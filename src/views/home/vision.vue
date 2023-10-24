<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-2">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title titleWord="願景" />
        </div>
        <div class="module-content rounded-xl p-4 text-white text-xl font-bold italic w-11/12 mb-4 animate__animated"
            :class="hasChange ? 'animate__fadeInRight' : ''">
            <div class="mb-2">
                為NFT賦予真正的價值與意義，
            </div>
            <div>
                引領Web3.0賽道上的NFT革命。
            </div>
        </div>
        <div class="text-white w-11/12 leading-8 mb-3 animate__animated" :class="hasChange ? 'animate__bounceInUp' : ''">
            在Minter眼中，未來的NFT不僅是收藏品，
            更是數字資產的重要代表，每一個NFT都應當
            有其獨特的價值與權益，能夠為其持有者帶來
            實際的權益和價值。
        </div>
        <!-- <div class="w-4/12">
            <img src="../../assets/images/vision-bg.png" alt="">
        </div> -->
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