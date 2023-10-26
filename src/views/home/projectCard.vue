<template>
    <div class="w-full h-full relative text-white rounded-xl overflow-hidden border border-test-one">
        <div>
            <img class="w-full h-full absolute left-0 top-0" src="../../assets/images/vision-bg.png" alt="">
        </div>
        <div
            class="w-full h-full absolute bg-opacity-50 backdrop-filter !backdrop-blur-sm bg-black flex flex-col justify-center items-center">
            <div class="w-11/12 flex justify-start items-center text-white mb-4 animate__animated"
                :class="hasChange ? 'animate__lightSpeedInLeft' : ''">
                <div class="flex flex-col items-end justify-start w-4/12">
                    <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                    <div class="border-b border-white h-1 w-full mb-1"></div>
                    <div class="border-b border-white h-1 w-3/12 mb-1"></div>
                </div>
                <div class="font-bold text-xl italic ml-2">{{ title }}</div>
            </div>
            <span class="text-sm font-light mb-4 w-11/12">
                {{ contentOne }}
            </span>
            <span class="text-sm font-light mb-4 w-11/12">
                {{ contentTwo }}
            </span>
            <span class="text-sm font-light mb-4 w-11/12">
                {{ contentThree }}
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    contentOne: {
        type: String,
        default: ''
    },
    contentTwo: {
        type: String,
        default: ''
    },
    contentThree: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>