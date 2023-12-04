<template>
    <div class="flex flex-col justify-start items-center w-full bg-black pt-16 pb-20">
        <div class="w-11/12 mb-2">
            <module-title :titleWord="$t('coherents.title')" />
        </div>
        <!-- <div class="w-11/12 text-xs text-red-700 mb-5">
            {{ $t('coherents.tips') }}
        </div> -->
        <div class="w-11/12">
            <div class="mb-2" v-for="(item, index) in coherentsList" :key="index">
                <coherent-card :staticName="item.name" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ModuleTitle from "../../components/ModuleTitle.vue";
import CoherentCard from "../../components/CoherentCard.vue";
const coherentsList = ref([{ name: 'N' }, { name: 'R' }, { name: 'SR' }, { name: 'SSR' }, { name: 'UR' }])
</script>

<style></style>