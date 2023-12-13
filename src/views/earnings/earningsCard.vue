<template>
    <div class="mb-3 rounded overflow-hidden p-2 bg-card-content text-card-word text-sm">
        <div class="flex justify-between items-center mb-2">
            <div>{{ $t('assistance.awardAmount') }}</div>
            <div class="text-red-500">{{ Number(price).toFixed(4) }}</div>
        </div>
        <div class="flex justify-between items-center">
            <div>{{ $t('assistance.releaseTime') }}</div>
            <div>{{ FilterTime(time) }}</div>
        </div>
    </div>
</template>

<script setup>
import { FilterTime } from '@/utils/format';
defineProps({
    price: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    }
})
</script>

<style></style>