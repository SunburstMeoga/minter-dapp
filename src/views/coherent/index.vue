<script setup>
import { ref } from 'vue'
import StaticCard from '@/components/staticCard.vue';
</script>
<template>
    <div class="pt-20">
        <div class="border-b border-secondary-color">

            <van-tabs class="pt-2" sticky animated swipeable color="#e149ed" title-inactive-color="#A3A0BA"
                title-active-color="#e149ed" background="#000">
                <van-tab title="配套1">
                    <div class="w-11/12 mr-auto ml-auto pt-12">
                        <static-card staticName="配套1" />
                    </div>
                </van-tab>
                <van-tab title="配套2">
                    <div class="w-11/12 mr-auto ml-auto pt-12">
                        <static-card staticName="配套2" />
                    </div>
                </van-tab>
                <van-tab title="配套3">
                    <div class="w-11/12 mr-auto ml-auto pt-12">
                        <static-card staticName="配套3" />
                    </div>
                </van-tab>
                <van-tab title="配套4">
                    <div class="w-11/12 mr-auto ml-auto pt-12">
                        <static-card staticName="配套4" />
                    </div>
                </van-tab>
                <van-tab title="配套5">
                    <div class="w-11/12 mr-auto ml-auto pt-12">
                        <static-card staticName="配套5" />
                    </div>
                </van-tab>


            </van-tabs>
        </div>
        <div>
            <div class="w-11/12 flex justify-between items-center ml-auto mr-auto mt-3 text-xs">
                <div class="term">筛选</div>
                <div class="term flex justify-center items-center">
                    <div>
                        价格由低到高
                    </div>
                    <div class="ml-1">
                        <div class="icon iconfont icon-down" style="font-size: 14px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
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
</style>