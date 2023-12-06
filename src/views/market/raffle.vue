<template>
    <div class="text-primary-color bg-black pt-14">
        <div class="w-11/12 mb-4 mt-4 ml-auto mr-auto">
            <module-title :titleWord="$t('turntable.title')" />
        </div>
        <div class="bg-black border border-black flex flex-col items-center w-full py-4 px-2 text-white">
            <div class="mb-4">
                <LuckyWheel ref="myLucky" width="340px" height="340px" :prizes="prizes" :blocks="blocks"
                    :textFontSize="textFontSize" :buttons="buttons" @start="startCallback" @end="endCallback" />
            </div>
        </div>
        <van-popup v-model:show="isPrized">
            <div class="bg-black text-white">
                <div class="pl-2 py-2  pr-44 rounded-t-md bg-primary-color">
                    <div class="font-bold text-lg">{{ $t('turntable.congratulations') }}</div>
                    <div class="text-sm">{{ $t('turntable.rewardsTips') }}</div>

                </div>
                <div class="pl-2 py-6 rounded-b-md text-white bg-gray-800 mb-4">
                    <div class="font-bold text-3xl mb-3">
                        {{ $t('turntable.rewardsContent') }}
                    </div>
                    <div class="text-sm pr-2 text-gray-500">
                        {{ $t('turntable.rewardsDetails') }}
                    </div>
                </div>
                <div class="rounded-full border border-gray-400 text-gray-400 text-center p-3 flex justify-center items-center w-0 h-0 text-sm mr-auto ml-auto"
                    @click="isPrized = false">
                    <div class="icon iconfont icon-close"></div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>

import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useRoute } from 'vue-router';
import ModuleTitle from "../../components/ModuleTitle.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const myLucky = ref()
let showPrizeDetails = ref(false)

const { proxy } = getCurrentInstance()
let isPrized = ref(false)
let currentPrize = ref(null)
const blocks = ref([{ padding: '4px', background: '#617df2' }])
const textFontSize = ref('10px')
let prizes = computed(() => {
    return [
        { fonts: [{ text: t('turntable.dailyEarnings') + ' 2%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        { fonts: [{ text: t('turntable.earningsAcceleration') + '24%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#CC6DED' },
        { fonts: [{ text: t('turntable.dailyEarnings') + ' 5%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        { fonts: [{ text: t('turntable.recommendedBenefits') + ' 12%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        { fonts: [{ text: t('turntable.dailyEarnings') + '0.5%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        { fonts: [{ text: t('turntable.recommendedBenefits') + ' 6%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        { fonts: [{ text: t('turntable.performancePledge') + '10%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#48A7FA' },
        { fonts: [{ text: t('turntable.dailyEarnings') + ' 3%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        { fonts: [{ text: t('turntable.recommendedBenefits') + ' 1%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        { fonts: [{ text: t('turntable.dailyEarnings') + ' 4%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        { fonts: [{ text: t('turntable.performancePledge') + '10%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#48A7FA' },
        { fonts: [{ text: t('turntable.dailyEarnings') + ' 6%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        { fonts: [{ text: t('turntable.recommendedBenefits') + '0.5%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        { fonts: [{ text: t('turntable.earningsAcceleration') + '36%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#CC6DED' },
        { fonts: [{ text: t('turntable.performancePledge') + '10%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#48A7FA' },
        { fonts: [{ text: t('turntable.recommendedBenefits') + ' 3%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        { fonts: [{ text: t('turntable.dailyEarnings') + ' 1%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        { fonts: [{ text: t('turntable.earningsAcceleration') + '12%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#CC6DED' },
    ]
})

let buttons = computed(() => {
    return [{
        radius: '18%',
        background: '#e149ed',
        pointer: true,
        fonts: [{ text: t('raffle.start'), top: '-10px', fontSize: '18', fontColor: '#fff' }],
    }]
})
// const buttons = ref([{
//     radius: '18%',
//     background: '#e149ed',
//     pointer: true,
//     fonts: [{ text: '', top: '-10px', fontSize: '18', fontColor: '#fff' }],
// }])

function viewPrizeDetaisl() {
    showPrizeDetails.value = true
}

function startCallback() {
    // 调用抽奖组件的play方法开始游戏
    isPrized.value = false
    myLucky.value.play()
    // 模拟调用接口异步抽奖
    const index = Math.floor(Math.random() * 4)
    setTimeout(() => {
        // 假设后端返回的中奖索引是0

        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(index)
        currentPrize.value = index
        console.log('currentPrize', currentPrize, index)

    }, 2000);

}
// 抽奖结束会触发end回调
function endCallback(prize) {
    console.log(prize)
    isPrized.value = true

}
function togglePrizePopup() {
    showPrizePopup.value = !showPrizePopup.value
}

onMounted(() => {
    // console.log(route.query.target)
    // active.value = route.query.target
})
</script>

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

.van-tab__panel {
    background: #000;
    padding-bottom: 20px;
    margin-top: 0.5px;
}
</style>