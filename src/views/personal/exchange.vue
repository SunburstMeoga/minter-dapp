<template>
    <div class="flex flex-col justify-start items-center bg-black pb-20 pt-12">
        <div class="w-11/12 mb-4 mt-4">
            <module-title :titleWord="$t('exchange.title') + ' RT'" />
        </div>
        <div class="w-11/12 rounded-lg bg-top-content px-2 py-4">
            <div class="text-center font-bold text-white mb-6">
                {{ $t('exchange.title') }}
            </div>
            <div class="text-white text-base flex justify-between items-center mb-6">
                <div>USDT {{ $t('order.balance') }}: </div>
                <div>0.0000 USDT </div>
                <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT可兑换2RT)</div> -->
            </div>
            <div class="text-white text-base flex justify-between items-center mb-6">
                <div>RT {{ $t('order.balance') }}: </div>
                <div>0.0000 RT </div>
                <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT可兑换2RT)</div> -->
            </div>
            <div class="text-white text-xs flex justify-start items-baseline mb-2">
                <div class="text-base">{{ $t('exchange.exchangeQuantity') }} </div>
                <div class="text-primary-color text-xs pl-1"> (1USDT = 1RT)</div>
            </div>
            <div class="w-full flex justify-between items-center mb-10">
                <div class="rounded mr-2  flex-1 py-1">
                    <input type="text" :placeholder="$t('exchange.exchangeQuantity')"
                        class="w-full py-2 bg-transparent pl-1 text-gray-200">
                </div>
                <div class="underline text-sm text-gray-200">{{ $t('wallet.all') }}</div>
            </div>
            <!--  -->
            <div class="operating-button rounded-full text-white font-bold text-center text-sm py-2">
                {{ $t('modalConfirm.confirm') }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";

import ModuleTitle from "../../components/ModuleTitle.vue";
import coherents_list from '@/datas/coherents_list'
import { showToast } from 'vant';

const router = useRouter()

</script>

<style>
.van-overlay {
    backdrop-filter: blur(5px);
}
</style>