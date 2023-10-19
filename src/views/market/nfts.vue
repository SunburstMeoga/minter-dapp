<template>
    <div class="text-primary-color bg-black">
        <div class="pt-2 bg-black">
            <div class="w-11/12 mr-auto ml-auto mt-4">
                <module-title titleWord="NFTs" />
            </div>
            <div class="border-b border-gray-700">
                <van-tabs class="pt-2 bg-black" v-model:active="active" animated swipeable color="#e149ed"
                    title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
                    <van-tab title="N">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="R">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="SSR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" />
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="UR">
                        <div class="w-11/12 mr-auto ml-auto pt-4 flex justify-between items-center flex-wrap">
                            <div v-for="(item, index) in 9" class="mb-2" style="width: 48%;" :key="index">
                                <nft-card :showCheckbox="false" />
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import NftCard from '@/components/NftCard.vue';
import ModuleTitle from "@/components/ModuleTitle.vue";

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
let active = ref('2')

onMounted(() => {
    // console.log(route.query.target)
    // active.value = route.query.target
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

.van-tab__panel {
    background: #000;
    padding-bottom: 20px;
    margin-top: 0.5px;
}
</style>