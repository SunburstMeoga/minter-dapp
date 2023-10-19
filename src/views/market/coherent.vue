<template>
    <div class="flex flex-col justify-start items-center pt-16">
        <div class="w-11/12 mb-4">
            <module-title titleWord="配套信息" />
        </div>
        <div class="w-11/12">
            <div class="flex justify-between items-center flex-wrap">
                <div style="width: 48%;" class="mb-4" v-for="(item, index) in coherentsList" :key="index">
                    <coherent-info-card :levelImg="item.levelImg" :price="item.price" :limit="item.limit" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import ModuleTitle from "../../components/ModuleTitle.vue";
import coherentInfoCard from "./coherentInfoCard.vue";
import levelN from '@/assets/images/coherent-n.png';
import levelR from '@/assets/images/coherent-R.png';
import levelSR from '@/assets/images/coherent-sr.png';
import levelSSR from '@/assets/images/coherent-ssr.png';
import levelUR from '@/assets/images/coherent-ur.png';

const levelNimg = ref(levelN)
const levelRimg = ref(levelR)
const levelSRimg = ref(levelSR)
const levelSSRimg = ref(levelSSR)
const levelURimg = ref(levelUR)

const coherentsList = ref([{ name: 'N', levelImg: levelNimg, price: '200', limit: '200' }, { name: 'R', levelImg: levelRimg, price: '200', limit: '200' }, { name: 'SR', levelImg: levelSRimg, price: '200', limit: '200' }, { name: 'SSR', levelImg: levelSSRimg, price: '200', limit: '200' }, { name: 'UR', levelImg: levelURimg, price: '200', limit: '200' }])

</script>

<style></style>