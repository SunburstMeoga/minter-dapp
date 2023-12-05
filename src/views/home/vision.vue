<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-12">
        <div class="w-11/12 mb-8 animate__animated " :class="hasChange ? 'animate__fadeInLeft' : ''">
            <module-title titleWord="願景" />
        </div>

        <div class="w-11/12 relative h-52 mb-4">
            <div class="w-11/12 h-48 absolute left-0 top-0 module-content rounded-xl animate__animated"
                :class="hasChange ? 'animate__backInDown' : ''"></div>
            <div class="w-11/12 flex justify-center items-start pl-10 flex-col rounded-xl h-48 absolute right-0 bottom-0 operating-button text-white animate__animated"
                :class="hasChange ? 'animate__backInRight' : ''">
                <div class="font-bold text-3xl">
                    NFT <span class="italic">MINTER</span>
                </div>
                <div>
                    - 为NFT赋予真正的价值与意义
                </div>
                <div>
                    - 引领Web3.0赛道上的NFT革命

                </div>

            </div>

        </div>

        <div class="module-content rounded-xl p-4 text-white text-xl font-bold italic w-11/12 mb-2 animate__animated"
            :class="hasChange ? 'animate__fadeInRight' : ''">
            <div>
                Minter对NFT的新定义
            </div>
            <!-- <div class="underline italic font-2xl">
                新定义
            </div> -->
        </div>
        <div class="text-white w-11/12 mb-4 animate__animated text-sm" :class="hasChange ? 'animate__bounceInUp' : ''">
            我们相信，NFT不仅仅是一个数字代表的资产，它应该是价值、创新和文化的载体。
            Minter的目标是打造一个真正为创作者和用户服务的NFT平台，不仅仅关注资产的交易，更关注其背后的价值和意义。

        </div>
        <div class="module-content rounded-xl p-4 text-white text-xl font-bold italic w-11/12 mb-2 animate__animated"
            :class="hasChange ? 'animate__fadeInLeft' : ''">
            <div class="mb-2">
                為NFT賦予真正的價值與意義，
            </div>
            <div>
                引領Web3.0賽道上的NFT革命。
            </div>
        </div>
        <div class="text-white w-11/12 mb-3 animate__animated text-sm" :class="hasChange ? 'animate__bounceInUp' : ''">
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