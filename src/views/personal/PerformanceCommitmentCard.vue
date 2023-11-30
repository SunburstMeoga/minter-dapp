<template>
    <div class="rounded overflow-hidden p-2 bg-card-content text-card-word text-sm" :key="index">
        <!-- <div class="flex justify-between items-center mb-3">
            <div>邀请地址:</div>
            <div class="">0x83...5796</div>
        </div> -->
        <div class="flex justify-between items-center mb-3">
            <div>tokenID</div>
            <div class="text-red-500 font-bold">NO. 2245</div>
        </div>

        <!-- <div class="flex justify-between items-center">
            <div>购买时间</div>
            <div>2023-09-30 16:01:12</div>
        </div> -->

        <div v-show="showMore">
            <div class="flex justify-between items-center mb-3">
                <div>配套金额</div>
                <div class="text-red-500 font-bold">{{ Number(coherentAmount).toFixed(2) }}</div>
            </div>
            <div class="flex justify-between items-center mb-3 mt-3">
                <div>收益:</div>
                <div class="text-red-500 font-bold">{{ Number(coherentAmount * 0.1).toFixed(2) }}</div>
            </div>
            <div class="flex justify-between items-center mb-3">
                <div>到期时间:</div>
                <div class="">2023-09-30 16:01:12</div>
            </div>
            <!-- <div class="flex justify-between items-center mb-3">
                <div>转账:</div>
                <div class="text-red-500 font-bold">22.00</div>
            </div> -->
        </div>

        <div class="flex justify-center items-center pt-1.5 pb-1 border-t border-gray-800 mt-2"
            @click="$emit('toggleShowMore')">
            <div class="icon iconfont icon-down1 transform ease-in-out duration-300" :class="showMore ? 'rotate-180' : ' '">
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
    showMore: {
        type: Boolean,
        default: false
    },

})
let coherentAmount = ref(100)

</script>

<style></style>