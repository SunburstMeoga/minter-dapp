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
                        {{ prizeContent }}
                    </div>
                    <!-- <div class="text-sm pr-2 text-gray-500">
                        {{ $t('turntable.rewardsDetails') }}
                    </div> -->
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
import { roulettes, luckyDraw } from '@/request/api'

const { t } = useI18n()
const myLucky = ref()
let showPrizeDetails = ref(false)
const route = useRoute()
const { proxy } = getCurrentInstance()
let isPrized = ref(false)
let currentPrize = ref(null)
let nftInfo = ref({})
let prizeContent = ref('')
const blocks = ref([{ padding: '4px', background: '#617df2' }])
const textFontSize = ref('10px')
let prizes = computed(() => {
    return [
        // { fonts: [{ text: t('turntable.dailyEarnings') + ' 2%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        // { fonts: [{ text: t('turntable.earningsAcceleration') + '24%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#CC6DED' },
        // { fonts: [{ text: t('turntable.dailyEarnings') + ' 5%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        // { fonts: [{ text: t('turntable.recommendedBenefits') + ' 12%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        // { fonts: [{ text: t('turntable.dailyEarnings') + '0.5%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        // { fonts: [{ text: t('turntable.recommendedBenefits') + ' 6%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        // { fonts: [{ text: t('turntable.performancePledge') + '10%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#48A7FA' },
        // { fonts: [{ text: t('turntable.dailyEarnings') + ' 3%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        // { fonts: [{ text: t('turntable.recommendedBenefits') + ' 1%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        // { fonts: [{ text: t('turntable.dailyEarnings') + ' 4%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        // { fonts: [{ text: t('turntable.performancePledge') + '10%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#48A7FA' },
        // { fonts: [{ text: t('turntable.dailyEarnings') + ' 6%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        // { fonts: [{ text: t('turntable.recommendedBenefits') + '0.5%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        // { fonts: [{ text: t('turntable.earningsAcceleration') + '36%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#CC6DED' },
        // { fonts: [{ text: t('turntable.performancePledge') + '10%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#48A7FA' },
        // { fonts: [{ text: t('turntable.recommendedBenefits') + ' 3%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#944CE0' },
        // { fonts: [{ text: t('turntable.dailyEarnings') + ' 1%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#2C4FB0' },
        // { fonts: [{ text: t('turntable.earningsAcceleration') + '12%', top: '10%', fontSize: '12px', fontColor: '#fff' }], background: '#CC6DED' },
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

onMounted(() => {
    nftInfo.value.address = route.query.address
    nftInfo.value.nft_price = route.query.nft_price

    nftInfo.value.nft_token_id = route.query.nft_token_id

    getRoulettes()
})

function getRoulettes() {
    proxy.$loading.show()
    roulettes()
        .then(res => {
            console.log('輪盤參數', res)
            res.roulettes.map(item => {
                let obj = {}
                let objChild = {}
                let fonts = []
                objChild.text = item.name
                objChild.id = item.id
                objChild.top = '10%'
                objChild.fontSize = '12px'
                objChild.fontColor = '#fff'
                fonts.push(objChild)
                obj.fonts = fonts
                prizes.value.push(obj)
            })
            prizes.value.map((item, index) => {
                index % 2 == 0 ? item.background = '#CC6DED' : item.background = '#2C4FB0'
            })
            proxy.$loading.hide()
            console.log(prizes.value)
        })
        .catch(err => {
            console.log('err', err)
            proxy.$loading.hide()
        })
}

function viewPrizeDetaisl() {
    showPrizeDetails.value = true
}

function startCallback() {
    // 调用抽奖组件的play方法开始游戏
    isPrized.value = false
    myLucky.value.play()
    // 模拟调用接口异步抽奖
    // const index = Math.floor(Math.random() * 4)
    console.log(nftInfo.value)
    luckyDraw(nftInfo.value)
        .then(res => {
            console.log('抽獎成功', res)
            myLucky.value.stop(res.selectedRoulette.id)
            currentPrize.value = res.selectedRoulette.id
            console.log('currentPrize', currentPrize,)
            prizeContent.value = res.selectedRoulette.name
        })
        .catch(err => {
            console.log('err', err)
        })
    // setTimeout(() => {
    //     // 假设后端返回的中奖索引是0

    //     // 调用stop停止旋转并传递中奖索引
    //     myLucky.value.stop(9)
    //     currentPrize.value = 9
    //     console.log('currentPrize', currentPrize, index)

    // }, 2000);

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