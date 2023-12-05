<template>
    <div class="flex flex-col justify-start items-center bg-black pb-20 pt-12">
        <div class="w-11/12 mb-4 mt-4">
            <module-title titleWord="兑换RT" />
        </div>
        <div class="w-11/12 rounded bg-bottom-content px-2 py-4">
            <div class="text-center font-bold text-white mb-6">
                兑换
            </div>
            <div class="text-white text-base flex justify-between items-center mb-3">
                <div>USDT余额: </div>
                <div>0.0000 USDT </div>
                <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT可兑换2RT)</div> -->
            </div>
            <div class="text-white text-base flex justify-between items-center mb-3">
                <div>RT余额: </div>
                <div>0.0000 RT </div>
                <!-- <div class="text-primary-color text-xs pl-1"> (当前1USDT可兑换2RT)</div> -->
            </div>
            <div class="text-white text-xs flex justify-start items-baseline mb-1">
                <div class="text-base">兑换数量 </div>
                <div class="text-primary-color text-xs pl-1"> (当前1USDT = 1RT)</div>
            </div>
            <div class="w-full mb-4 flex justify-between items-center">
                <div class="rounded mr-2 border border-gray-700 flex-1 py-1">
                    <input type="text" placeholder="请输入需要兑换的RT数量" class="w-full h-full bg-transparent pl-1">
                </div>
                <div class="underline text-sm text-gray-200">全部兑换</div>
            </div>
            <!--  -->
            <div class="operating-button rounded-full text-white font-bold text-center text-sm py-2">
                确认兑换
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