<template>
    <div class="w-full h-full flex flex-col items-center justify-start text-primary-color pt-2">
        <div class="w-11/12 mb-8">
            <module-title :titleWord="$t('menu.introduction')" />
        </div>
        <div class="font-black text-2xl w-11/12 mb-2 title text">
            {{ $t('present.title') }}
        </div>
        <div class="w-11/12 text-sm mb-2 present-word text-white">
            {{ $t('present.description') }}
            <span class="underline ">{{ $t('present.tips') }}</span>
        </div>
        <!-- <div class="w-11/12">
            <img src="../../assets/nft-bg.png" alt="">
        </div> -->
        <div class="flex justify-between items-start mb-6 w-11/12">
            <div class="flex flex-col justify-center items-center animate-pulse"
                @click="handleCurrency($t('present.PMTDetails'), 'PMT')">
                <div class="circle-module text-white p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full text-white">
                        PMT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目代币，当用户购买Minter后释放
                </div> -->
            </div>
            <div class="flex flex-col justify-center items-center animate-pulse"
                @click="handleCurrency($t('present.MTDetails'), 'MT')">
                <div class="circle-module text-white p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full text-white">
                        MT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目中可交易的NFT
                </div> -->
            </div>
            <div class="flex flex-col justify-center items-center animate-pulse"
                @click="handleCurrency($t('present.RTDetails'), 'RT')">
                <div class="circle-module text-white p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full text-white">
                        RT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目代币，仅通过MT和流动性奖励token积分获取，又称为初始资金凭证
                </div> -->
            </div>
        </div>
        <div class="flex justify-around items-start w-11/12">

            <!-- <div class="flex flex-col justify-center items-center animate-pulse"
                @click="handleCurrency($t('present.PVDetails'), 'PV')">
                <div class="circle-module text-white p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full text-white">
                        PV
                    </div>
                </div>
                <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    业绩值
                </div>
            </div> -->
            <div class="flex flex-col justify-center items-center animate-pulse"
                @click="handleCurrency($t('present.USD3Details'), 'USD3')">
                <div class="circle-module text-white p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full text-white">
                        USD3
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    平台稳定币
                </div> -->
            </div>
            <div class="flex flex-col justify-center items-center animate-pulse"
                @click="handleCurrency('项目中动态业绩的结算货币，又称流动性奖励Token', 'BT')">
                <div class="circle-module text-white p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full text-white">
                        BT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目中动态业绩的结算货币，又称流动性奖励Token
                </div> -->
            </div>
        </div>
        <van-popup class="border border-primary-color rounded" v-model:show="showDetails" round
            :style="{ padding: '4px', background: '#000' }">
            <div class="w-60 text-center text-white ">
                <div class="py-4 font-bold">{{ detailsTitle }}</div>
                <div class="px-6 pb-4">{{ detailsInfo }}</div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ModuleTitle from '@/components/ModuleTitle.vue'
const showDetails = ref(false)
const detailsInfo = ref('')
const detailsTitle = ref('')
function handleCurrency(details, title) {
    showDetails.value = true
    detailsInfo.value = details
    detailsTitle.value = title
}
</script>

<style  scoped>
.title {
    text-shadow: 1px -1px #fff, -1px 1px #999, -10 10px 5px #808080;
}
</style>