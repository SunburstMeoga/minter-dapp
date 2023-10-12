<template>
    <div class="w-full h-full flex flex-col items-center justify-center text-primary-color">

        <div class="relative h-full">
            <div class="absolute top-0 left-0 w-full">
                <!-- <img src="../../assets/collaborative.png" alt=""> -->
            </div>
            <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
            <div class="relative w-full h-full flex flex-col justify-center items-center">
                <div class="w-11/12 mb-8 px-3 py-10 flex flex-col justify-between items-center z-10">
                    <div class="w-60">
                        <img src="../../assets/HAHLogo.png" alt="">
                    </div>
                    <div class="w-12 mb-4 animate-spin">
                        <img src="../../assets/investors.png" alt="">
                    </div>
                    <div class="text-xl font-bold flex justify-start items-center">
                       <div class="w-20">
                        <img src="../../assets/minter.png" alt="">
                       </div>
                       <div class="ml-1">Minter</div>
                    </div>
                </div>
                <!-- <div class="w-11/12 flex justify-center items-center mb-4">
                    <module-title titleWord="新闻" />
                </div> -->
                <div class="flex flex-col justify-center items-center font-bold text-3xl text-white mb-6 italic">
                    <div class="italic">HashAhead</div>
                    <div>最好的用户体验</div>
                    <div>最快的速度</div>
                    <div>Minter的不二选择</div>
                </div>
                <div class="text-xs w-8/12 mr-auto ml-auto text-white text-center mb-8">
                    Minter选择了全球最好的公链平台之一HashAhead作为载体，以实现最好的用户体验和最快的速度。在同类型项目中借助HashAhead平台做到了最快和最好。
                </div>
                <div class="flex justify-center items-center w-full fixed bottom-6">
                    <div class="w-11/12 py-3 text-center operating-button text-white rounded" >探索</div>
                </div>
            </div>
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