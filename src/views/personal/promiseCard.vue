<template>
    <div>
        <div class="flex flex-col justify-start items-center mt-20">
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
                        <div>獎勵金額:</div>
                        <div class="text-red-500 font-bold">{{ Number(item.reward_amount).toFixed(4) }}</div>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                        <div>派獎情況:</div>
                        <div class="">{{ item.is_rewarded ? '已派獎' : '未派獎' }}</div>
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
                            <div>配套價格:</div>
                            <div class="text-red-500 font-bold">{{ Number(item.max_package.price).toFixed(4) }}</div>
                        </div>
                        <!-- <div class="flex justify-between items-center mb-3">
                            <div>發放時間:</div>
                            <div class="">{{ FilterTime(item.created_at) }}</div>
                        </div> -->
                        <div class="flex justify-between items-center mb-3">
                            <div>獲得時間:</div>
                            <div class="">{{ FilterTime(item.promise_card_receive_date) }}</div>
                        </div>

                        <div class="flex justify-between items-center mb-3">
                            <div>到期時間:</div>
                            <div class="">{{item.promise_card_valid_date }}</div>
                        </div>

                        <div class="flex justify-between items-center mb-3">
                            <div>派獎時間:</div>
                            <div class="">{{ item.reward_date ? FilterTime(item.reward_date) : '未派獎' }}</div>
                        </div>



                        <div class="flex justify-between items-center mb-3">
                            <div>规则介绍:</div>
                            <div class="">邀請2個購買{{ Number(item.max_package.price) }}配套或以上的新地址</div>
                        </div>
                        <div class="flex justify-between items-center mb-3">
                            <div>已邀請數量:</div>
                            <div class="">{{ item.number_of_invite }}</div>
                        </div>
                        <div class="flex justify-between items-center mb-1">
                            <div>邀請地址:</div>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <div v-for="(_item, _index) in item.packages" :key="_index"
                                class="p-2 w-full rounded bg-gray-600 mb-1">
                                <div class="flex justify-between items-center mb-1">
                                    <div>地址:</div>
                                    <div class="">{{ FilterAddress(_item.address) }}</div>
                                </div>
                                <div class="flex justify-between items-center mb-1">
                                    <div>配套金額:</div>
                                    <div class="">{{ _item.amount }}</div>
                                </div>
                                <div class="flex justify-between items-center mb-1">
                                    <div>推薦時間:</div>
                                    <div class="">{{ FilterTime(_item.created_at) }}</div>
                                </div>
                                <div class="flex justify-between items-center mb-1">
                                    <div>是否已發放:</div>
                                    <div class="">{{ _item.is_minted ? '已發放' : '未發放' }}</div>
                                </div>
                            </div>

                        </div>
                        <!-- <div class="flex justify-between items-center mb-3">
                        <div>转账:</div>
                        <div class="text-red-500 font-bold">22.00</div>
                    </div> -->
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
            暫無數據
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { staticRecords } from '@/request/api'
import { FilterTime, FilterAddress } from '@/utils/format'

const { proxy } = getCurrentInstance()
let cardList = ref([])

onMounted(() => {
    getStaticRecords()
})

function getStaticRecords() {
    proxy.$loading.show()
    let params = { prize_type_id: 3, perPage: 100000 }
    staticRecords(params)
        .then(res => {
            console.log(res)
            proxy.$loading.hide()
            cardList.value = res.records
            cardList.value.map(item => {
                item.showMore = false
            })
        })
        .catch(err => {
            console.log(err)
            proxy.$loading.hide()

        })
}
</script>

<style></style>