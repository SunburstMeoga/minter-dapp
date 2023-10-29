<template>
    <div class="flex flex-col justify-start items-center bg-black pb-20">
        <div class="w-11/12 mb-4 mt-4">
            <module-title titleWord="配套信息" />
        </div>
        <div class="w-11/12">
            <div class="flex justify-between items-center flex-wrap">
                <div style="width: 48%;" class="mb-4" v-for="(item, index) in coherentsList" :key="index">
                    <coherent-info-card @handleBuy="handleBuy(item)" :levelImg="item.levelImg" :type="item.type"
                        :limit="item.limit" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";

import ModuleTitle from "../../components/ModuleTitle.vue";
import coherentInfoCard from "./coherentInfoCard.vue";
import coherents_list from '@/datas/coherents_list'

const router = useRouter()
const coherentsList = ref(coherents_list)

async function handleBuy(item) {
    console.log('click button')
    router.push({
        path: `/checkout-counter/${item.type}`
    })
}
</script>

<style>
.van-overlay {
    backdrop-filter: blur(5px);
}
</style>