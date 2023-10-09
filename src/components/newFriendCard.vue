<template>
    <div class="bg-card-content text-secondary-icon rounded px-4 py-2">
        <div class="flex justify-start items-center rounded-full text-center text-sm mb-2">
            <span class="relative flex h-3 w-3">
                <span class="absolute inline-flex h-full w-full rounded-full opacity-75" :class="isPurchased ? 'bg-green-600 animate-ping' : 'bg-red-600'"></span>
                <span class="relative inline-flex rounded-full h-3 w-3"  :class="isPurchased ? 'bg-green-600' : 'bg-red-600'"></span>
            </span>
            <div class="ml-2" :class="isPurchased ? 'text-green-600' : 'text-red-600'">{{isPurchased?'已购买配套':'未购买配套'}}</div>
        </div>
        <div class="card-item">
            <div>朋友地址</div>
            <div>0x12347890789078907890789078907890</div>
        </div>
        <div class="card-item">
            <div>签名时间</div>
            <div>2023-09-30 18:01:15</div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        isPurchased: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            value: 2,
        }
    }
}
</script>

<style scoped>
.card-item {
    @apply text-sm mb-2;
}
</style>