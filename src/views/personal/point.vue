<template>
    <div class="text-white bg-black">
        <div class=" w-full h-full flex flex-col items-center justify-start mt-10">
            <!-- <div class="w-11/12 mr-auto ml-auto mt-4 mb-4">
                <module-title titleWord="点位图" />
            </div> -->
            <div class="w-16 p-1 h-16 operating-button rounded-full overflow-hidden mb-2"
                @click="clickPoint(directReferrals.address, directReferrals.pv, directReferrals.pv_remain, null, null, true)">
                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                    <img src="../../assets/images/avtor.gif" alt="">
                </div>
            </div>
            <div class="text-center text-xs">
                {{ $t('wallet.address') }}:{{ FilterAddress(directReferrals.address) }}
            </div>
            <div class="text-center text-xs">
                {{ $t('wallet.all') }} PV: {{ directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv ||
                    0 }}
                - {{ directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv || 0 }}
            </div>
            <div class="text-center text-xs mb-1">
                {{ $t('assistance.remain') }} PV: {{
                    directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv_remain || 0 }} - {{
        directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv_remain || 0 }}
            </div>
            <div class="w-1 h-10 border-l border-primary-color" />
            <div class="w-6/12 h-10 border-t border-l border-r border-primary-color" />
            <div class="flex w-full justify-between items-start">
                <div class="w-6/12 flex justify-start flex-col items-center">
                    <div @click="clickPoint(directReferrals && directReferrals.left_leg && directReferrals.left_leg.address, directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv, directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv_remain, directReferrals.address, 'left')"
                        class="w-14 p-1 h-14 operating-button rounded-full overflow-hidden mb-2">
                        <div v-if="directReferrals && directReferrals.left_leg && directReferrals.left_leg.address"
                            class="bg-black w-full h-full rounded-full overflow-hidden">
                            <img src="../../assets/images/avtor.gif" alt="">
                        </div>
                        <div v-else
                            class="bg-black w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                            <!-- <img src="../../assets/images/avtor.gif" alt=""> -->
                            <div class="icon iconfont icon-a-Addpeople text-primary-color font-bold"
                                style="font-size: 24px">

                            </div>
                        </div>
                    </div>

                    <div v-if="directReferrals && directReferrals.left_leg && directReferrals.left_leg.address">
                        <div class="text-center text-xs">
                            {{ $t('wallet.address') }}:{{
                                FilterAddress(directReferrals && directReferrals.left_leg && directReferrals.left_leg.address)
                            }}
                        </div>
                        <div class="text-center text-xs">
                            {{ $t('wallet.all') }} PV:{{ directReferrals && directReferrals.left_leg &&
                                directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.pv || 0
                            }} - {{ directReferrals && directReferrals.left_leg &&
    directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.pv || 0
}}
                        </div>
                        <div class="text-center text-xs mb-1">
                            {{ $t('assistance.remain') }} PV:{{ (directReferrals && directReferrals.left_leg &&
                                directReferrals.left_leg.left_pv) - ((directReferrals && directReferrals.pv) - (directReferrals
                                    && directReferrals.pv_remain)) }}
                            -
                            {{ (directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_pv) -
                                ((directReferrals && directReferrals.pv) - (directReferrals && directReferrals.pv_remain)) }}
                        </div>
                    </div>
                    <div class="w-1 h-8 border-l border-primary-color" />
                    <div class="w-6/12 h-6 border-t border-l border-r border-primary-color" />
                    <div class="flex w-full  items-start">
                        <div class="w-6/12 flex justify-start flex-col items-center">
                            <div @click="clickPoint(directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.address, directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.pv, directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.pv_remain, directReferrals && directReferrals.left_leg && directReferrals.left_leg.address, 'left')"
                                class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div v-if="directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.address"
                                    class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                                <div v-else
                                    class="bg-black w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                                    <!-- <img src="../../assets/images/avtor.gif" alt=""> -->
                                    <div class="icon iconfont icon-a-Addpeople text-primary-color font-bold"
                                        style="font-size: 24px">

                                    </div>
                                </div>
                            </div>
                            <van-popover
                                @open="openDetails(directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.address, directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.left_leg && directReferrals.left_leg.left_leg.left_leg.pv || 0, directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.right_leg && directReferrals.left_leg.left_leg.right_leg.pv || 0, (directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.left_pv) - ((directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv) - (directReferrals && directReferrals.left_leg && directReferrals && directReferrals.left_leg.pv)), (directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.right_pv) - ((directReferrals && directReferrals.left_leg && directReferrals && directReferrals.left_leg.pv) - (directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv)))"
                                v-model:show="showPopoverOne" theme="dark" :actions="actions" placement="bottom-start">
                                <template #reference>
                                    <div v-if="directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.address"
                                        class="operating-button text-center text-white rounded text-xs px-3">{{
                                            $t('assistance.view') }}</div>
                                </template>
                            </van-popover>
                        </div>
                        <div class="w-6/12 flex justify-start flex-col items-center">
                            <div @click="clickPoint(directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.address, directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.pv, directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.pv_remain, directReferrals && directReferrals.left_leg && directReferrals.left_leg.address, 'right')"
                                class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div v-if="directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.address"
                                    class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                                <div v-else
                                    class="bg-black w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                                    <!-- <img src="../../assets/images/avtor.gif" alt=""> -->
                                    <div class="icon iconfont icon-a-Addpeople text-primary-color font-bold"
                                        style="font-size: 24px">

                                    </div>
                                </div>
                            </div>
                            <van-popover
                                @open="openDetails(directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.right_leg.address, directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.right_leg.left_leg && directReferrals.left_leg.right_leg.left_leg.pv || 0, directReferrals && directReferrals.left_leg && directReferrals.left_leg.left_leg && directReferrals.left_leg.left_leg.right_leg && directReferrals.left_leg.left_leg.right_leg.pv || 0, (directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.left_pv) - ((directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv) - (directReferrals && directReferrals.left_leg && directReferrals && directReferrals.left_leg.pv)), (directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.right_pv) - ((directReferrals && directReferrals.left_leg && directReferrals && directReferrals.left_leg.pv) - (directReferrals && directReferrals.left_leg && directReferrals.left_leg.pv)))"
                                v-model:show="showPopoverTwo" theme="dark" :actions="actions" placement="bottom">
                                <template #reference>
                                    <div v-if="directReferrals && directReferrals.left_leg && directReferrals.left_leg.right_leg && directReferrals.left_leg.right_leg.address"
                                        class="operating-button text-center text-white rounded text-xs px-3">{{
                                            $t('assistance.view') }}</div>
                                </template>
                            </van-popover>

                        </div>
                    </div>
                </div>
                <div class="w-6/12 flex flex-col justify-start items-center">
                    <div @click="clickPoint(directReferrals && directReferrals.right_leg && directReferrals.right_leg.address, directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv, directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv_remain, directReferrals.address, 'right')"
                        class="w-14 p-1 h-14 operating-button rounded-full overflow-hidden mb-2">
                        <div v-if="directReferrals && directReferrals.right_leg && directReferrals.right_leg.address"
                            class="bg-black w-full h-full rounded-full overflow-hidden">
                            <img src="../../assets/images/avtor.gif" alt="">
                        </div>
                        <div v-else
                            class="bg-black w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                            <!-- <img src="../../assets/images/avtor.gif" alt=""> -->
                            <div class="icon iconfont icon-a-Addpeople text-primary-color font-bold"
                                style="font-size: 24px">

                            </div>
                        </div>
                    </div>
                    <div v-if="directReferrals && directReferrals.right_leg && directReferrals.right_leg.address">
                        <div class="text-center text-xs">
                            {{ $t('wallet.address') }}:{{
                                FilterAddress(directReferrals && directReferrals.right_leg && directReferrals.right_leg.address)
                            }}
                        </div>
                        <div class="text-center text-xs">
                            {{ $t('wallet.all') }} PV:{{
                                directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg &&
                                directReferrals.right_leg.left_leg.pv || 0 }} -
                            {{
                                directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg &&
                                directReferrals.right_leg.right_leg.pv || 0 }}
                        </div>
                        <div class="text-center text-xs mb-1">
                            {{ $t('assistance.remain') }} PV:{{ (directReferrals && directReferrals.right_leg &&
                                directReferrals.right_leg.left_pv) - ((directReferrals && directReferrals.pv) - (directReferrals
                                    && directReferrals.pv_remain)) }}
                            -
                            {{ (directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_pv) -
                                ((directReferrals && directReferrals.pv) - (directReferrals && directReferrals.pv_remain)) }}
                        </div>
                    </div>

                    <div class="w-1 h-8 border-l border-primary-color" />
                    <div class="w-6/12 h-6 border-t border-l border-r border-primary-color" />
                    <div class="flex w-full justify-start items-start">
                        <div class="w-6/12 flex flex-col items-center">
                            <div @click="clickPoint(directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.address, directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.pv, directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.pv_remain, directReferrals && directReferrals.right_leg && directReferrals.right_leg.address, 'left')"
                                class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div v-if="directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.address"
                                    class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                                <div v-else
                                    class="bg-black w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                                    <!-- <img src="../../assets/images/avtor.gif" alt=""> -->
                                    <div class="icon iconfont icon-a-Addpeople text-primary-color font-bold"
                                        style="font-size: 24px">

                                    </div>
                                </div>
                            </div>
                            <van-popover
                                @open="openDetails(directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.address, directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.left_leg && directReferrals.right_leg.left_leg.left_leg.pv || 0, directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.right_leg && directReferrals.right_leg.left_leg.right_leg.pv || 0, (directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.left_pv) - ((directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv) - (directReferrals && directReferrals.right_leg && directReferrals && directReferrals.right_leg.pv)), (directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.right_pv) - ((directReferrals && directReferrals.right_leg && directReferrals && directReferrals.right_leg.pv) - (directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv)))"
                                v-model:show="showPopoverThree" theme="dark" :actions="actions" placement="bottom">
                                <template #reference>
                                    <div v-if="directReferrals && directReferrals.right_leg && directReferrals.right_leg.left_leg && directReferrals.right_leg.left_leg.address"
                                        class="operating-button text-center text-white rounded text-xs px-3">{{
                                            $t('assistance.view') }}</div>
                                </template>
                            </van-popover>
                        </div>
                        <div class="w-6/12 flex flex-col justify-start items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2"
                                @click="clickPoint(directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.address, directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.pv, directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.pv_remain, directReferrals && directReferrals.right_leg && directReferrals.right_leg.address, 'right')">
                                <div v-if="directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.address"
                                    class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                                <div v-else
                                    class="bg-black w-full h-full rounded-full overflow-hidden flex justify-center items-center">
                                    <!-- <img src="../../assets/images/avtor.gif" alt=""> -->
                                    <div class="icon iconfont icon-a-Addpeople text-primary-color font-bold"
                                        style="font-size: 24px">

                                    </div>
                                </div>
                            </div>
                            <van-popover
                                @open="openDetails(directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.address, directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.right_leg && directReferrals.right_leg.right_leg.right_leg.pv || 0, directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.right_leg && directReferrals.right_leg.right_leg.left_leg.pv || 0, (directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.left_pv) - ((directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv) - (directReferrals && directReferrals.right_leg && directReferrals && directReferrals.right_leg.pv)), (directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.right_pv) - ((directReferrals && directReferrals.right_leg && directReferrals && directReferrals.right_leg.pv) - (directReferrals && directReferrals.right_leg && directReferrals.right_leg.pv)))"
                                v-model:show="showPopoverFour" theme="dark" :actions="actions" placement="bottom-end">
                                <template #reference>
                                    <div v-if="directReferrals && directReferrals.right_leg && directReferrals.right_leg.right_leg && directReferrals.right_leg.right_leg.address"
                                        class="operating-button text-center text-white rounded text-xs px-3">{{
                                            $t('assistance.view') }}</div>
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
import { defineEmits } from 'vue'
import { FilterAddress } from '@/utils/format'
import { ref } from 'vue'
defineProps({
    directReferrals: {
        type: Object,
        default: () => { }
    }
})

import { addressLeg } from '@/request/api'
const emit = defineEmits(['clickPoint'])

let actions = ref([
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
//查看某地址下的點位圖
function openDetails(address, left_pv, right_leg, left_pv_remain, right_pv_remain) {
    actions.value = [
        {
            text: FilterAddress(address, 4, 5)
        },
        {
            text: '全部pv:' + left_pv + ' - ' + right_leg
        },
        {
            text: '剩餘pv:' + left_pv_remain + ' - ' + right_pv_remain
        }
    ]
}

//點解點位
function clickPoint(address, allPV, remainPV, preAddress, point, isSelf) {
    console.log('address', address)
    let pointInfo
    // pointInfo = {
    //     address: address,
    //     allPV: allPV,
    //     remainPV: remainPV,
    //     leftPV: 'leftPV',
    //     right: 'rightPV',
    //     preAddress: preAddress
    // }

    if (address) {
        pointInfo = {
            address: address,
            allPV: allPV,
            remainPV: remainPV,
            leftPV: 'leftPV',
            right: 'rightPV',
            isSelf: isSelf
        }
    } else {
        pointInfo = {
            address: address,
            preAddress: preAddress,
            point: point
        }
    }

    //传递给父组件
    emit('clickPoint', pointInfo)
}

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