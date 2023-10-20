<template>
    <div class="bg-black pb-20 pt-2">
        <div class="w-11/12 mr-auto ml-auto mb-4">
            <module-title :titleWord="$t('menu.operationRecord')" />
        </div>
        <div class="w-11/12 ml-auto mr-auto mb-3 rounded overflow-hidden p-2 bg-card-content text-card-word text-sm"
            v-for="(item, index) in 20" :key="index">
            <div class="flex justify-between items-center mb-2">
                <div>奖励金额</div>
                <div class="text-red-400">100.00 MUSDT</div>
            </div>
            <div class="flex justify-between items-center">
                <div>发放时间</div>
                <div>2023-09-30 16:01:12</div>
            </div>
        </div>
    </div>
    <!-- <van-nav-bar title="收益明细" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group inset v-for="key in 10">
        <van-cell title="奖励金额" value="100.00" label="MUSDT" />
        <van-cell title="发放时间" value="2023-09-30 16:01:12" />
    </van-cell-group>
    <van-back-top right="60vw" bottom="10vh" /> -->
</template>
<script setup>
import ModuleTitle from "@/components/ModuleTitle.vue";
</script>
