<template>
    <div class="text-white bg-black">
        <div class=" w-full h-full flex flex-col items-center justify-start mt-10">
            <!-- <div class="w-11/12 mr-auto ml-auto mt-4 mb-4">
                <module-title titleWord="点位图" />
            </div> -->
            <div class="w-16 p-1 h-16 operating-button rounded-full overflow-hidden mb-2">
                <div class="bg-black w-full h-full rounded-full overflow-hidden" @click="$emit('clickPoint', true)">
                    <img src="../../assets/images/avtor.gif" alt="">
                </div>
            </div>
            <div class="text-center text-xs">
                地址:0x17a...5796
            </div>
            <div class="text-center text-xs">
                全部pv: 500 - 100
            </div>
            <div class="text-center text-xs mb-1">
                剩余pv: 50 - 10
            </div>
            <div class="w-1 h-10 border-l border-primary-color" />
            <div class="w-6/12 h-10 border-t border-l border-r border-primary-color" />
            <div class="flex w-full justify-between items-start">
                <div class="w-6/12 flex justify-start flex-col items-center">
                    <div class="w-14 p-1 h-14 operating-button rounded-full overflow-hidden mb-2"
                        @click="$emit('clickPoint', true)">
                        <div class="bg-black w-full h-full rounded-full overflow-hidden">
                            <img src="../../assets/images/avtor.gif" alt="">
                        </div>
                    </div>
                    <div class="text-center text-xs">
                        地址:0x17a...5796
                    </div>
                    <div class="text-center text-xs">
                        全部pv: 500 - 100
                    </div>
                    <div class="text-center text-xs mb-1">
                        剩余pv: 50 - 10
                    </div>
                    <div class="w-1 h-8 border-l border-primary-color" />
                    <div class="w-6/12 h-6 border-t border-l border-r border-primary-color" />
                    <div class="flex w-full  items-start">
                        <div class="w-6/12 flex justify-start flex-col items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="" @click="$emit('clickPoint', true)">
                                </div>
                            </div>

                            <van-popover v-model:show="showPopoverOne" theme="dark" :actions="actions"
                                placement="bottom-start">
                                <template #reference>
                                    <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                                </template>
                            </van-popover>
                        </div>
                        <div class="w-6/12 flex justify-start flex-col items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="" @click="$emit('clickPoint', true)">
                                </div>
                            </div>
                            <van-popover v-model:show="showPopoverTwo" theme="dark" :actions="actions" placement="bottom">
                                <template #reference>
                                    <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                                </template>
                            </van-popover>

                        </div>
                    </div>
                </div>
                <div class="w-6/12 flex flex-col justify-start items-center">
                    <div class="w-14 p-1 h-14 operating-button rounded-full overflow-hidden mb-2">
                        <div class="bg-black w-full h-full rounded-full overflow-hidden" @click="$emit('clickPoint', true)">
                            <img src="../../assets/images/avtor.gif" alt="">
                        </div>
                    </div>
                    <div class="text-center text-xs">
                        地址:0x17a...5796
                    </div>
                    <div class="text-center text-xs">
                        全部pv: 500 - 100
                    </div>
                    <div class="text-center text-xs mb-1">
                        剩余pv: 50 - 10
                    </div>
                    <div class="w-1 h-8 border-l border-primary-color" />
                    <div class="w-6/12 h-6 border-t border-l border-r border-primary-color" />
                    <div class="flex w-full justify-start items-start">
                        <div class="w-6/12 flex flex-col items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div
                                    class="bg-black w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                                    <!-- <img src="../../assets/images/avtor.gif" alt=""> -->
                                    <div class="icon iconfont icon-a-Addpeople text-primary-color font-bold"
                                        style="font-size: 24px" @click="$emit('clickPoint', false)">

                                    </div>
                                </div>
                            </div>
                            <van-popover v-model:show="showPopoverThree" theme="dark" :actions="actions" placement="bottom">
                                <template #reference>
                                    <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                                </template>
                            </van-popover>
                        </div>
                        <div class="w-6/12 flex flex-col justify-start items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div class="bg-black w-full h-full rounded-full overflow-hidden"
                                    @click="$emit('clickPoint', true)">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                            </div>
                            <van-popover v-model:show="showPopoverFour" theme="dark" :actions="actions"
                                placement="bottom-end">
                                <template #reference>
                                    <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                                </template>
                            </van-popover>
                        </div>
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