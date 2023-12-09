<template>
    <div class="text-gray-400 pt-20">
        <div class="w-11/12 ml-auto mr-auto rounded-lg bg-card-content flex flex-col justify-start items-center py-2 mb-4">
            <div class="w-11/12">
                <div class="mb-1">
                    直推地址
                </div>
                <div class=" rounded p-1 mb-2 break-words">
                    {{ refferAddress }}
                </div>
            </div>
            <div class="w-11/12">
                <div class="mb-1">
                    上級地址
                </div>
                <div class=" rounded p-1 mb-2 break-words">
                    {{ preAddress }}
                </div>
            </div>
            <div class="w-11/12">
                <div class="mb-1">
                    本人地址
                </div>
                <div class=" rounded p-1 mb-2 break-words">
                    {{ selfAddress }}
                </div>
            </div>
        </div>

        <!-- <div class="w-full my-3">
            <div @click="togglePackagePopup"
                class="w-11/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">選擇配套</div>
        </div> -->

        <div class="bg-card-content w-11/12 ml-auto mr-auto rounded-lg p-2">
            <div class="flex justify-start items-center w-full">
                <div class="flex w-30 p-2 justify-center bg-page-content rounded shadow-xl">
                    <img :src="coherentInfo.levelImg" alt="">
                </div>
                <div class="text-gray-400 flex-1 ml-2 h-full flex flex-col justify-start text-sm">
                    <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.price') }}:
                        </div>
                        <div class="text-red-500 font-bold">
                            {{ FormatAmount(coherentInfo.type).pointPre }}.<span class="text-xs">{{
                                                            FormatAmount(coherentInfo.type).pointOffside }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.coherentCap') }}:
                        </div>
                        <div class="text-red-500 font-bold">
                            {{ FormatAmount(coherentInfo.limit).pointPre }}.<span class="text-xs">{{
                                                            FormatAmount(coherentInfo.limit).pointOffside }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.contribution') }}:
                        </div>
                        <div>
                            {{ coherentInfo.shareholdings }}
                        </div>
                    </div>
                    <div class="flex justify-between text-gray-400 items-center mb-1.5">
                        <div class="">
                            {{ $t('coherents.totalReleased') }} <van-popover v-model:show="showPMTPopover" theme="dark"
                                placement="bottom-start">
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.totalReleased') }}{{ Number(coherentInfo.type) * (6 / 10) }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    <!-- 购买成功之后即时释放{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT -->
                                    {{ $t('coherents.buyAfterReleased') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3)
                                                                        }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.24Released') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT
                                </div>
                                <div class="text-xs p-2 text-left text-gray-400">
                                    {{ $t('coherents.48Released') }}{{ Number(coherentInfo.type) * (6 / 10) * (1 / 3) }}PMT
                                </div>
                                <template #reference>
                                    <span class="icon iconfont icon-wenzishuoming_wenzishuoming"></span>
                                </template>
                            </van-popover>

                        </div>
                        <div>{{ coherentInfo.releasePMT }}PMT</div>
                    </div>

                    <!-- <div class="flex justify-between items-center">
                        <div>
                            {{ $t('coherents.MatchingLevelBonusRate') }}:
                        </div>
                        <div>
                            {{ coherentInfo.incentiveRate * 100 + '%' }}
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="w-full fixed bottom-3">
            <div class="flex justify-between items-center">
                <div @click="togglePackagePopup"
                    class="w-5/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">選擇配套</div>
                <div @click="togglePackagePopup"
                    class="w-5/12 mr-auto ml-auto operating-button text-white py-2 text-center rounded-full">立即購買</div>
            </div>

        </div>
        <van-popup v-model:show="showPackagePopup" round position="bottom">
            <div class="bg-black text-white py-4 flex flex-col justify-center">
                <div class="text-center mb-4 font-bold">請選擇配套</div>
                <div v-for="(item, index) in packageList" :key="index" @click="handlePackage(item.type)"
                    class="operating-button py-2 px-1 w-11/12 flex justify-between items-center mb-2 rounded mr-auto ml-auto">
                    <div>
                        {{ item.name }}
                    </div>
                    <div>
                        {{ item.type }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import coherents_list from '@/datas/coherents_list'
import { FormatAmount, FilterAddress } from '@/utils/format'

// /market/invite-buy-package
const route = useRoute()
let refferAddress = ref()
let preAddress = ref()
let selfAddress = ref()
let showPackagePopup = ref(false)
let packageList = coherents_list
let coherentInfo = ref({})
function handlePackage(type) {
    let targetCoherents = coherents_list.filter(item => {
        return item.type == type
    })
    coherentInfo.value = targetCoherents[0]
    console.log(coherentInfo.value)
    togglePackagePopup()
}
function togglePackagePopup() {
    showPackagePopup.value = !showPackagePopup.value
}
onMounted(() => {
    console.log(route.query)
    refferAddress.value = route.query.re
    preAddress.value = route.query.pre
    selfAddress.value = window.ethereum.selectedAddress
    let targetCoherents = coherents_list.filter(item => {
        return item.type == '200'
    })
    coherentInfo.value = targetCoherents[0]
    console.log(coherentInfo.value)
})
</script>

<style></style>