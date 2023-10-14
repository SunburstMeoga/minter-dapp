<template>
    <div class="text-primary-color">
        <div class="py-20 bg-black">
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card isMUSDT currency="MUSDT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="PMT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="MT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="BT" />
            </div>
            <div class="w-11/12 mr-auto ml-auto mb-3">
                <wallet-card currency="RT" />
            </div>
        </div>
    </div>
</template>

<script setup>
import WalletCard from '@/components/WalletCard.vue';
</script>

<style scoped>
img {}
</style>