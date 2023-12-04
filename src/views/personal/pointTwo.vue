<template>
    <div>
        <div class="text-white bg-black w-full">
            <div class="w-full h-full flex flex-col items-center justify-start mt-4">
                <div class="rounded bg-bottom-content text-gray-200 w-11/12 p-2 text-sm mb-2" v-for="(item, index) in 4"
                    :key="index">
                    <div class="flex justify-between items-center">
                        <div>地址:</div>
                        <div>0xd8fAD...fe259C</div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>配套:</div>
                        <div class="text-red-500">2000</div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>购买时间:</div>
                        <div>2023-11-23 00:23:23</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <van-share-sheet v-model:show="showAttendPopup" title="立即分享给好友" :options="options" @select="selectAttendWay" /> -->
</template>

<script setup>
import ModuleTitle from "../../components/ModuleTitle.vue";
import { ref } from 'vue'

const actions = ref([
    { text: '0x17a...5796' },
    { text: '500 - 100' },
    { text: '50 - 10' },
])
const attendsWay = ref([
    { title: '微信', icon: 'wechat', type: 'buy' },
    { title: '微博', icon: 'weibo', type: 'link' },
]);
let showPopoverOne = ref(false)
let showPopoverTwo = ref(false)
let showPopoverThree = ref(false)
let showPopoverFour = ref(false)
let showAttendPopup = ref(false)
let currentAttendsWay = ref(0)

function selectAttendWay(index) {
    currentAttendsWay.value = index
}

function attendUnderclass() {
}

</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;

}
</style>
<style>
.van-popover__action-text {
    font-size: 12px;
    text-align: left;
}
</style>