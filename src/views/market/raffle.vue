<template>
    <div class="text-primary-color bg-transparent pt-14 overflow-hidden">
        <div class="w-11/12 mb-4 mt-4 ml-auto mr-auto">
            <module-title :titleWord="$t('turntable.title')" />
        </div>
        <div class="bg-transparent border border-black flex flex-col items-center w-full py-4 px-2 text-white">
            <!-- <div class="mb-4">
                <LuckyWheel ref="myLucky" width="340px" height="340px" :prizes="prizes" :blocks="blocks"
                    :textFontSize="textFontSize" :buttons="buttons" @start="startCallback" @end="endCallback" />
            </div> -->
            <div class="mb-4 relative">
                <div class="absolute z-20 top-4 left-4 w-20 ">
                    <img src="../../assets/images/raffle_arrow.png" class="rotate-180 transform" alt="">
                </div>
                <div class="transform  -rotate-45 ">
                    <Roulette class="" ref="wheel" :items="items" :centered-indicator="wheelSettings.centeredIndicator"
                        :indicator-position="wheelSettings.indicatorPosition" :size="wheelSettings.size"
                        :display-shadow="wheelSettings.displayShadow" :display-border="wheelSettings.displayBorder"
                        :display-indicator="wheelSettings.displayIndicator" :duration="wheelSettings.duration"
                        :result-variation="wheelSettings.resultVariation" :easing="wheelSettings.easing"
                        :counter-clockwise="wheelSettings.counterClockwise"
                        :horizontal-content="wheelSettings.horizontalContent" :base-display="wheelSettings.baseDisplay"
                        :base-size="wheelSettings.baseSize" :base-display-indicator="wheelSettings.baseDisplayIndicator"
                        :base-display-shadow="wheelSettings.baseDisplayShadow"
                        :base-background="wheelSettings.baseBackground" :wheel-result-index="wheelSettings.wheelResultIndex"
                        @click="launchWheel" @wheel-end="wheelEndedCallback" @wheel-start="wheelStartedCallback">
                        <template #baseContent>
                            <div class="arrow-roullete" v-html="wheelSettings.baseHtmlContent" />
                        </template>
                    </Roulette>
                </div>

            </div>
        </div>
        <!-- 奖品说明 -->
        <div class="w-11/12 mr-auto ml-auto">
            <div class="rounded border border-gray-400 mb-2 p-2 text-sm text-gray-200"
                v-for="(item, index) in prizeDescription" :key="index">
                <div class="font-bold text-center text-gray-400 mb-2">{{ item.title }}</div>
                <div class="text-center leading-4"> {{ item.content }} <span v-show="item.tips" class="text-red-500">{{
                    item.tips
                }}</span></div>
            </div>
        </div>
        <van-overlay :show="isPrized">
            <div class="w-full h-full flex flex-wrap justify-center items-center">
                <div class="relative">
                    <div>
                        <img src="../../assets/images/prize.png" alt="">
                    </div>
                    <div class="flex justify-center items-center absolute top-60 w-full">
                        <div class="w-5/12 text-yellow-400 pt-4 px-2">
                            <div class="font-bold text-lg mb-2 w-full text-center text-shadow-3xl">
                                {{ prizeContent }}
                            </div>
                            <!-- <div class="text-xs w-full text-center text-shadow-3xl">
                                {{ prizeDetails }}
                            </div> -->
                        </div>
                    </div>
                </div>
                <div
                    class="rounded-full border border-gray-400 text-gray-400 text-center p-6 flex justify-center items-center w-0 h-0 text-lg">
                    <div class="icon iconfont icon-close" style="font-size: 30px;" @click="$router.go(-1)"></div>
                </div>
            </div>

        </van-overlay>
        <!-- <van-popup v-model:show="isPrized" :close-on-click-overlay="false">
            <div class="bg-transparent text-white" style="border: 1px solid red;">
            <div class="w-full relative">
                <div>
                    <img src="../../assets/images/prize.png" alt="" style="border: 1px solid blue;">
                </div>
                <div class="absolute">

                </div>
            </div>
            <div class="pl-2 py-2  pr-44 rounded-t-md bg-primary-color">
                    <div class="font-bold text-lg">{{ t('turntable.congratulations') }}</div>
                    <div class="text-sm">{{ t('turntable.rewardsTips') }}</div>

                </div>
                <div class="pl-2 py-6 rounded-b-md text-white bg-gray-800 mb-4">
                    <div class="font-bold text-3xl mb-3">
                        {{ prizeContent }}
                    </div>
                    <div class="text-sm pr-2 text-gray-500">
                        {{ prizeDetails }}
                    </div>
                </div>
                <div
                    class="rounded-full border border-gray-400 text-gray-400 text-center p-3 flex justify-center items-center w-0 h-0 text-sm mr-auto ml-auto">
                    <div class="icon iconfont icon-close" @click="$router.go(-1)"></div>
                </div>
            </div>
        </van-popup> -->
    </div>
</template>

<script setup>

import { ref, onMounted, getCurrentInstance, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import ModuleTitle from "../../components/ModuleTitle.vue";
import { useI18n } from 'vue-i18n'
import { roulettes, luckyDraw } from '@/request/api'
import { Roulette } from 'vue3-roulette'
let prizeDescription = computed(() => {
    return [{
        title: t('raffle.revenueGasPedal'),
        content: t('raffle.expediteContent'),
    }, {
        title: t('raffle.earnings'),
        content: t('raffle.earningsContent'),
    }, {
        title: t('raffle.promiseCard'),
        content: t('raffle.promiseCardContent'),
    }, {
        title: t('raffle.welfare'),
        content: t('raffle.welfareContent'),
        tips: t('raffle.welfareTips'),
    }]
})
const wheel = ref(null);
let prizeDetails = ref('')
function launchWheel() {
    wheel.value.launchWheel();
}
const wheelSettings = {
    centeredIndicator: true,
    indicatorPosition: "top",
    size: 350,
    displayShadow: true,
    duration: 3,
    resultVariation: 40,
    easing: "Bounce",
    counterClockwise: true,
    horizontalContent: false,
    displayBorder: true,
    displayIndicator: false,
    // resultVariation: ,
    baseDisplay: true,
    // baseSize: 210,
    baseDisplayShadow: true,
    baseDisplayIndicator: false,
    // baseBackground: "",
    baseSize: 80,
    baseBackground: "#000000cc",
    wheelResultIndex: {
        value: 0
    },
    firstItemIndex: {
        value: 0
    },
    baseHtmlContent:
        '<div class="transform rotate-45"><strong>Go!</strong></div>',
    // '<div><img src="../../assets/images/click.png"></div>',
};

let items = [

];


const { t } = useI18n()
const myLucky = ref()
let showPrizeDetails = ref(false)
const route = useRoute()
const { proxy } = getCurrentInstance()
let isPrized = ref(false)
let currentPrize = ref(null)
let nftInfo = ref({})
let prizeContent = ref('')
const blocks = ref([{ padding: '4', background: '#d846c0' }])
const textFontSize = ref('10px')
let prizeID = ref(0)
let prizeName = ref('')
let rewardPercentage = ref("")
let prizeIndex = ref()
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
    prizeIndex.value = route.query.prizeIndex

    getRoulettes()
    initRoulette()
})


function wheelStartedCallback(evt) {
    console.log(evt)
}

function wheelEndedCallback(evt) {
    console.log(evt.typeId, prizeDescription.value)
    console.log(items)
    console.log(wheelSettings.wheelResultIndex)
    if (evt) {
        isPrized.value = true
        prizeContent.value = items[wheelSettings.wheelResultIndex.value].name
        prizeDetails.value = prizeDescription.value[evt.typeId - 1].content
    }

    // wheelSettings.value.resultVariation = 3
}

async function initRoulette() {
    proxy.$loading.show()
    const res = await roulettes()
    console.log('輪盤參數', res.roulettes)
    let obj = []
    res.roulettes.map((item, index) => {
        let modifiedName = item.name.match(/.{1,3}/g).join('<br/>');
        let backgroundColor
        if (item.prize_type_id == 1) {
            backgroundColor = `linear-gradient(180deg, rgba(9,72,121,1) 0%, rgba(0,212,255,1) 100%)`
        } else if (item.prize_type_id == 2) {
            backgroundColor = `linear-gradient(180deg, rgba(139,55,145,1) 0%, rgba(102,57,189,1) 100%)`
        } else if (item.prize_type_id == 3) {
            backgroundColor = `linear-gradient(180deg, rgba(237,109,205,1) 0%, rgba(204,109,237,1) 100%)`
        } else if (item.prize_type_id == 4) {
            backgroundColor = `linear-gradient(180deg, rgba(55,145,83,1) 0%, rgba(102,215,201,1) 79%)`
        }
        obj.push({
            id: item.id,
            name: item.name,
            htmlContent: modifiedName,
            background: backgroundColor,
            typeId: item.prize_type_id,
        })

    })
    items = obj

    var len = items.length;
    //首先从最大的数开始遍历，之后递减
    for (var i = len - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));  //随机索引值randomIndex是从0-arr.length中随机抽取的，因为Math.floor()方法是向下取整的，所以这里是i+1
        //把从数组中随机抽取到的值与当前遍历的值互换位置
        var temp = items[randomIndex];
        items[randomIndex] = items[i];
        items[i] = temp;
    }
    console.log(prizeIndex.value)
    let resultIndex = items.findIndex((item) => {
        // console.log(item.id, parseInt(prizeIndex.value))
        return item.id == parseInt(prizeIndex.value)
    })
    // resultIndex = resultIndex + 2
    wheelSettings.wheelResultIndex.value = resultIndex

    console.log('prizesCanvas', items)
    proxy.$forceUpdate()
    proxy.$loading.hide()
}

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

    // prizeID

    // luckyDraw(nftInfo.value)
    //     .then(res => {
    //         console.log('抽獎成功', res)
    //         myLucky.value.stop(res.selectedRoulette.id - 1)
    //         currentPrize.value = res.selectedRoulette.id
    //         console.log('currentPrize', currentPrize,)
    //         prizeContent.value = res.selectedRoulette.name
    //     })
    //     .catch(err => {
    //         console.log('err', err)
    //     })
    setTimeout(() => {
        // 假设后端返回的中奖索引是0

        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(prizeIndex.value - 1)
        // currentPrize.value = prizeID.value
        prizeContent.value = prizes.value[prizeIndex.value - 1].fonts[0].text

    }, 3000);

}
// 抽奖结束会触发end回调
function endCallback(prize) {
    console.log(prize)
    isPrized.value = true
}
function togglePrizePopup() {
    showPrizePopup.value = !showPrizePopup.value
}

</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

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

.wheel {
    color: rgb(255, 255, 255);
    font-size: 10px;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.7);
    font-weight: normal;
    background: linear-gradient(132deg,
            rgb(9, 124, 173) 16%,
            rgba(252, 71, 162, 1) 36%,
            rgba(252, 71, 162, 1) 63%,
            rgb(174 32 136) 78%) !important;

}

.wheel .content {
    padding-top: 20px !important;
}

.wheel .horizonal-content {
    /* padding-top: 0rem !important; */
    font-size: 7px !important;

}

.wheel-border {
    border: 0px !important;
}

.wheel-container-border {
    background: hsl(0, 0%, 100%);
    padding: 12px 12px;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .01);

    &::after {
        position: fixed;
        content: "";
        top: 15px;
        left: 0;
        right: 0;
        z-index: -1;
        height: 100%;
        width: 100%;
        transform: scale(0.9) translateZ(0);
        filter: blur(15px);
        background: linear-gradient(to left,
                #ff5770,
                #e4428d,
                #c42da8,
                #9e16c3,
                #6501de,
                #9e16c3,
                #c42da8,
                #e4428d,
                #ff5770);
        background-size: 200% 200%;
        animation: animateGlow 1.25s linear infinite;
    }
}

@keyframes animateGlow {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 200% 50%;
    }
}

.wheel-item {

    border: 1px solid #ffffff61 !important;
}

.wheel-base-container .wheel-base-indicator {
    text-align: center;
}

.wheel-base-container {
    border: 5px solid #0000005c !important;

}

/* .wheel .wheel-item:nth-child(odd) {
  background: linear-gradient(90deg, rgba(173,60,226,1) 0%, rgba(252,71,162,1));
}
.wheel .wheel-item:nth-child(even) {
  background: linear-gradient(to right, rgba(252,71,162,1), rgb(174 32 136));
} */

.arrow-roullete {
    text-align: center;
    font-size: 32px;
    -webkit-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
        0 0 0.45em hsl(186 100% 69%);
    ;
    -moz-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
        0 0 0.45em hsl(186 100% 69%);
    ;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em hsl(186 100% 69%);
    ;
    animation: text-flicker 3s linear infinite;
}



@keyframes text-flicker {
    0% {
        opacity: 0.1;
    }

    2% {
        opacity: 1;
    }

    8% {
        opacity: 0.1;
    }

    9% {
        opacity: 1;
    }

    12% {
        opacity: 0.1;
    }

    20% {
        opacity: 1;
    }

    25% {
        opacity: 0.3;
    }

    30% {
        opacity: 1;
    }

    70% {
        opacity: 0.7;
    }

    72% {
        opacity: 0.2;
    }

    77% {
        opacity: 0.9;
    }

    100% {
        opacity: 0.9;
    }
}
</style>
<style>
.van-overlay {
    background: rgba(0, 0, 0, .9);
}
</style>