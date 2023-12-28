<template>
    <div class="flex flex-col justify-start items-center bg-transparent pb-20 pt-10">
        <div class="w-11/12 mb-4 mt-4">
            <module-title :titleWord="$t('coherents.coherentTitle')" />
        </div>
        <div class="w-11/12">
            <div class="flex justify-between items-center flex-wrap">
                <div style="width: 48%;" class="mb-4" v-for="(item, index) in coherentsList" :key="index">
                    <coherent-info-card @handleBuy="handleBuy(item)" :levelImg="item.levelImg" :type="item.type"
                        :isSale="item.isSale" :limit="item.limit" />
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
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';

const router = useRouter()
const { t } = useI18n()
const coherentsList = ref(coherents_list)

async function handleBuy(item) {
    console.log('click button', item.type)
    if (!item.isSale) {
        showToast(t('toast.notYetOpen'))
        return
    }
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