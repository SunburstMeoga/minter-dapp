<template>
    <div class="text-primary-color">
        <div class="pt-10">
            <div class="border-b border-gray-700">
                <van-tabs shrink class="pt-2" v-model:active="active" sticky animated swipeable color="#e149ed"
                    title-inactive-color="#A3A0BA" title-active-color="#e149ed" background="#000">
                    <van-tab title="NFTs" name="0">
                        <div class="w-11/12 mr-auto ml-auto pt-4">
                            nfts
                            <nft-card />
                        </div>
                    </van-tab>
                    <van-tab title="榮譽積分" name="0">
                        <div class="w-11/12 mr-auto ml-auto pt-4">
                            荣誉积分
                            <nft-card />
                        </div>
                    </van-tab>
                    <van-tab title="物品" name="0">
                        <div class="w-11/12 mr-auto ml-auto pt-4">
                            物品
                            <nft-card />
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import NftCard from '@/components/NftCard.vue';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
let active = ref('2')

onMounted(() => {
    //console.log(route.query.target)
    active.value = route.query.target
})
</script>

<style scoped>
.term {
    @apply px-3 py-0.5 border border-secondary-icon rounded text-secondary-icon;
}

.tabs-content {
    @apply pt-10 w-11/12 mr-auto ml-auto text-secondary-icon flex justify-between flex-wrap;
}

.tabs-item {
    width: 48%;
}
</style>
<style>
.van-tabs,
.van-tabs--line {
    height: 52px;
}
</style>