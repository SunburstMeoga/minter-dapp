<template>
    <div class="pt-16">
        <div class="w-11/12 mr-auto ml-auto ">
            <module-title :titleWord="$t('menu.promiseCard')" />
        </div>
        <van-tabs class="pt-2 bg-black " v-model:active="active" sticky shrink animated swipeable color="#e149ed"
            title-inactive-color="#fff" title-active-color="#e149ed" background="#000" @click-tab="handleTabs">
            <van-tab v-for="(item, index) in tabsList" :key="index" :title="item.title">

            </van-tab>
        </van-tabs>
        <div class="flex flex-col justify-start items-center mt-6">
            <div class="w-11/12 mb-2" v-for="(item, index) in cardList" :key="index">
                <div class="rounded overflow-hidden p-2 bg-card-content text-card-word text-sm" :key="index">
                    <div class="flex justify-between items-center mb-3">
                        <div class="text-white font-bold text-lg">{{ item.roulette.name }}</div>
                    </div>

                    <!-- <div class="flex justify-between items-center mb-3">
                        <div>tokenID</div>
                        <div class="text-red-500 font-bold"># {{ item.nft_token_id }}</div>
                    </div> -->
                    <div class="flex justify-between items-center mb-3">
                        <div>{{ $t('promiseCard.awardAmount') }}:</div>
                        <div class="text-red-500 font-bold">{{ Number(item.reward_amount).toFixed(4) }}</div>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                        <div>{{ $t('opertingLog.distributionOfPrizes') }}:</div>
                        <div class="">{{ item.is_rewarded ? $t('opertingLog.awarded') : $t('opertingLog.noAward') }}
                        </div>
                    </div>
                    <div v-show="item.showMore">
                        <!-- <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('assistance.packageAmount') }}:</div>
                            <div class="text-red-500 font-bold">{{ Number(item.reward_amount).toFixed(2) }}</div>
                        </div>-->
                        <!-- <div class="flex justify-between items-center mb-3 mt-3">
                            <div>NFT價格:</div>
                            <div class="text-red-500 font-bold">{{ Number(item.nft_price).toFixed(4) }}</div>
                        </div> -->

                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('promiseCard.packagePrice') }}:</div>
                            <div class="text-red-500 font-bold">{{ Number(item.max_package.price).toFixed(4) }}</div>
                        </div>
                        <!-- <div class="flex justify-between items-center mb-3">
                            <div>發放時間:</div>
                            <div class="">{{ FilterTime(item.created_at) }}</div>
                        </div> -->
                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('promiseCard.getTime') }}:</div>
                            <div class="">{{ FilterTime(item.promise_card_receive_date) }}</div>
                        </div>

                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('promiseCard.expiryTime') }}:</div>
                            <div class="">{{ item.promise_card_valid_date }}</div>
                        </div>

                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('promiseCard.distributionTime') }}:</div>
                            <div class="">{{ item.reward_date ? FilterTime(item.reward_date) : $t('opertingLog.noAward')
                                }}
                            </div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('promiseCard.rules') }}:</div>
                            <div class="">{{ $t('promiseCard.rulesContent', { package: Number(item.max_package.price) })
                                }}
                            </div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>{{ $t('promiseCard.numberOfInvited') }}:</div>
                            <div class="">{{ item.number_of_invite }}</div>
                        </div>
                        <div class="flex justify-between items-center mb-1">
                            <div>{{ $t('promiseCard.invitedAddr') }}:</div>
                        </div>
                        <div class="mb-2">
                            <div v-for="(_item, _index) in item.packages" :key="_index"
                                class="p-2 w-full rounded bg-gray-600 mb-1">
                                <div class="flex justify-between items-center mb-1">
                                    <div>{{ $t('promiseCard.address') }}:</div>
                                    <div class="">{{ FilterAddress(_item.address) }}</div>
                                </div>
                                <div class="flex justify-between items-center mb-1">
                                    <div>{{ $t('promiseCard.packagePrice') }}:</div>
                                    <div class="">{{ _item.amount }}</div>
                                </div>
                                <div class="flex justify-between items-center mb-1">
                                    <div>{{ $t('promiseCard.getTime') }}:</div>
                                    <div class="">{{ FilterTime(_item.created_at) }}</div>
                                </div>
                                <div class="flex justify-between items-center mb-1">
                                    <div>{{ $t('promiseCard.isRelease') }}:</div>
                                    <div class="">{{ _item.is_minted ? $t('promiseCard.released') :
                $t('promiseCard.unpublished') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pt-1.5 pb-1 border-t border-gray-800 mt-2"
                        @click="item.showMore = !item.showMore">
                        <div class="icon iconfont icon-down1 transform ease-in-out duration-300"
                            :class="item.showMore ? 'rotate-180' : ' '">
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="cardList.length == 0" class="text-white font-bold mt-20 text-center">
            {{ $t('modalConfirm.notData') }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import { staticRecords } from '@/request/api'
import { FilterTime, FilterAddress } from '@/utils/format'
import ModuleTitle from "@/components/ModuleTitle.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const { proxy } = getCurrentInstance()
let cardList = ref([])
let unusedList = ref([])
let utilized = ref([])
let expired = ref([])
let active = ref(0)
let tabsList = computed(() => {
    return [
        { title: t('promiseCard.unused'), value: 0 },
        { title: t('promiseCard.utilized'), value: 1 },
        { title: t('promiseCard.expired'), value: 2 },
    ]
})
onMounted(() => {
    getStaticRecords()
})
function handleTabs(tabs) {
    //console.log(tabs)
    if (tabs.name == 0) {
        cardList.value = unusedList.value
    } else if(tabs.name == 1) {
        cardList.value = utilized.value
    } else if(tabs.name == 2) {
        cardList.value = expired.value
    }
}
function getStaticRecords() {
    proxy.$loading.show()
    let params = { prize_type_id: 3, perPage: 100000 }
    staticRecords(params)
        .then(res => {
            console.log(res)
            proxy.$loading.hide()
            // cardList.value = res.records
            const currentDate = new Date();
            // 获取 Unix 时间戳（毫秒）
            const currentTimestampMilliseconds = currentDate.getTime();
            // 转换为 Unix 时间戳（秒）
            const currentTimestampSeconds = Math.floor(currentTimestampMilliseconds / 1000);
            console.log(currentTimestampSeconds);
            res.records.map(item => {

                const date = new Date(item.promise_card_valid_date)
                const timestampMilliseconds = date.getTime();
                const timestampSeconds = Math.floor(timestampMilliseconds / 1000);
                console.log(!item.is_rewarded && timestampSeconds < currentTimestampSeconds)
                if (!item.is_rewarded && timestampSeconds > currentTimestampSeconds) {
                    unusedList.value.push(item)
                }
                if (item.is_rewarded && timestampSeconds > currentTimestampSeconds) {
                    utilized.value.push(item)
                }
                if (!item.is_rewarded && timestampSeconds < currentTimestampSeconds) {
                    expired.value.push(item)
                }
                console.log(expired.value)
            })
            cardList.value = unusedList.value
            // cardList.value.map(item => {
            //     item.showMore = false
            // })

        })
        .catch(err => {
            //console.log(err)
            proxy.$loading.hide()

        })
}
</script>

<style></style>