<template>
    <div class="bg-black pt-12">
        <div class="w-11/12 mr-auto ml-auto mb-2">
            <module-title :titleWord="$t('menu.operationRecord')" />
        </div>
        <div class="border-b border-gray-700">
            <van-tabs class="bg-black" v-model:active="active" animated swipeable color="#e149ed"
                title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
                <van-tab title="直推收益">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in 9" class="mb-2" :key="index">
                            <earnings-card />
                        </div>
                    </div>
                </van-tab>
                <van-tab title="对碰收益">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in 9" class="mb-2" :key="index">
                            <earnings-card />
                        </div>
                    </div>
                </van-tab>
                <van-tab title="代数收益">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in 9" class="mb-2" :key="index">
                            <earnings-card />
                        </div>
                    </div>
                </van-tab>
                <van-tab title="加速器收益">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in 9" class="mb-2" :key="index">
                            <earnings-card />
                        </div>
                    </div>
                </van-tab>
                <van-tab title="业绩承诺卡收益">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in 9" class="mb-2" :key="index">
                            <earnings-card />
                        </div>
                    </div>
                </van-tab>
                <van-tab title="每日收益">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in 9" class="mb-2" :key="index">
                            <earnings-card />
                        </div>
                    </div>
                </van-tab>
                <van-tab title="推荐福利收益">
                    <div class="w-11/12 mr-auto ml-auto pt-4 ">
                        <div v-for="(item, index) in 9" class="mb-2" :key="index">
                            <earnings-card />
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
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
import EarningsCard from "./earningsCard.vue";
</script>
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
