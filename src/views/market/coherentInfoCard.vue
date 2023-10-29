<template>
    <div class="bg-gray-800 rounded-lg overflow-hidden p-2">
        <div class="relative flex justify-center items-center py-10 border-b border-gray-600 mb-2">
            <div class="absolute top-0 h-full left-0 flex justify-center items-center ">
                <div class="w-8/12 animate-spin">
                    <img src="../../assets/images/s_result_light.png" alt="">
                </div>
            </div>
            <div class="w-6/12 relative z-10">
                <img :src="levelImg" alt="">
            </div>
        </div>
        <div class="w-full text-gray-400 text-sm mb-2">
            <div class="flex justify-between items-center mb-1">
                <div>售价</div>
                <div class="font-bold text-red-500">$ {{ type }}</div>
            </div>
            <div class="flex justify-between items-center ">
                <div>收益上限</div>
                <div>$ {{ limit }}</div>
            </div>
        </div>
        <div class="operating-button text-center py-1 text-sm text-white rounded-full" @click="$emit('handleBuy')">购买</div>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        default: ''
    },
    levelImg: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    limit: {
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

.content {
    background: url('../../assets/images/s_result_light.png');
    background-repeat: no-repeat;
}
</style>