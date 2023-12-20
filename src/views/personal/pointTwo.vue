<template>
    <div>
        <div class="text-white bg-black w-full">
            <div v-show="dataList.length == 0" class="pt-10 font-bold text-xl text-center">
                暂无数据
            </div>
            <div class="w-full h-full flex flex-col items-center justify-start mt-4">
                <div class="rounded bg-bottom-content text-gray-200 w-11/12 p-2 text-sm mb-2"
                    v-for="(item, index) in dataList" :key="index">
                    <div class="flex justify-between items-center">
                        <div>{{ $t('wallet.address') }}:</div>
                        <div class="flex justify-end items-center">
                            <div class="mr-2">{{ FilterAddress(item.address) || '0x000...0000' }}</div>
                            <div class="icon iconfont icon-copy mr-2 active-white-color" style="font-size: 14px;" @click="handleCopy(item.address)"></div>
                            <div class="icon iconfont icon-chakan active-white-color" style="font-size: 14px;" @click="checkPoint(item.address)"></div>

                           </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>綁定關係時間:</div>
                        <div>{{ item.first_package_time || null}}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- <van-share-sheet v-model:show="showAttendPopup" title="立即分享给好友" :options="options" @select="selectAttendWay" /> -->
</template>

<script setup>
import ModuleTitle from "../../components/ModuleTitle.vue";
import { ref, onMounted } from 'vue'
import { referrerMap } from '@/request/api'
import { FilterAddress, FilterTime } from '@/utils/format'
import { CopyText } from '@/utils/copyText'
import { showToast } from 'vant'
import { useI18n } from "vue-i18n";
import { defineEmits } from 'vue'
const emit = defineEmits(['checkPoint'])

const { t } = useI18n()
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
let dataList = ref([])
onMounted(() => {
    getRefferMap()
})
async function handleCopy(address) {
    await CopyText(address)
    showToast(t('toast.copySuccess'))
}
function checkPoint(address) {
    emit('checkPoint', address)
}
//获取直推关系图
function getRefferMap() {
    referrerMap(localStorage.getItem('address'))
        .then(res => {
            // console.log('直推关系图', res)
            dataList.value = res.directReferrals
        })
        .catch(err => {
            console.log('err', err)
        })
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