<template>
    <div class="bg-black rounded-lg overflow-hidden border border-gray-700">
        <div class="relative flex justify-center items-center mb-2 p-2">
            <div class="absolute top-0 h-full left-0 flex justify-center items-center pt-4">
                <div class="w-8/12 animate-spin ">
                    <img src="../../assets/images/s_result_light.png" alt="">
                </div>
            </div>
            <div class="w-8/12 z-10 pt-4">
                <img :src="levelImg" alt="">
            </div>
        </div>
        <div class="w-full text-gray-400 text-sm mb-2 p-2">
            <div class="flex justify-between items-center mb-1">
                <div>{{ $t('coherents.price') }}</div>
                <div class="font-bold text-red-500">{{ Number(type) + 5 }} USD3 / RT</div>
            </div>
            <div class="flex justify-between items-center ">
                <div>{{ $t('coherents.coherentCap') }}</div>
                <div>{{ Number(limit) * 2 }} </div>
            </div>
        </div>
        <div class="p-2">
            <div class="text-center py-1 text-sm rounded-full"
                :class="isSale ? 'operating-button text-white' : 'bg-gray-500 text-black'" @click="$emit('handleBuy')">{{
                    isSale
                    ? $t('coherents.buy') : $t('toast.notYetOpen') }}</div>
        </div>
        <div class="p-2">
            <div class="text-center py-1 text-sm rounded-full" @click="$emit('handleBuy')">{{
                $t('coherents.buy') }}</div>
        </div>
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
    },
    isSale: {
        type: Boolean,
        default: false
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