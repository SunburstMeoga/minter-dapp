<template>
    <van-tabs sticky animated swipeable color="#e149ed" title-inactive-color="#A3A0BA" title-active-color="#e149ed"
        background="#000" class="pt-20">
        <van-tab title="账户资金" class="pt-4">
            <div class="p-10 bg-test-one"></div>
            <div class="p-10 bg-test-two"></div>
            <div class="p-10 bg-test-three"></div>
            <div class="p-10 bg-test-four"></div>
            <div class="p-10 bg-test-five"></div>
            <div class="p-10 bg-test-seven"></div>


            <div class="px-2 w-11/12 mr-auto ml-auto bg-card-content rounded-md">
                <div class="border-b border-gray-700 py-3 text-secondary-icon">
                    <div class="flex justify-between items-center">
                        <div class="text-lg font-bold text-white">HAH</div>
                        <div class="text-red-400">100.00</div>
                    </div>
                    <div class="text-xs">
                        平台燃料币
                    </div>
                </div>
                <div class="border-b border-gray-700 py-3 text-secondary-icon">
                    <div class="flex justify-between items-center">
                        <div class="text-lg font-bold text-white">PMT</div>
                        <div class="text-red-400">100.00</div>
                    </div>
                    <div class="text-xs">
                        当用户购买Minter后释放
                    </div>
                </div>
                <div class="border-b border-gray-700 py-3 text-secondary-icon">
                    <div class="flex justify-between items-center">
                        <div class="text-lg font-bold text-white">MT</div>
                        <div class="text-red-400">100.00</div>
                    </div>
                    <div class="text-xs">
                        项目中可交易的NFT
                    </div>
                </div>
                <div class="border-b border-gray-700 py-3 text-secondary-icon">
                    <div class="flex justify-between items-center">
                        <div class="text-lg font-bold text-white">RT</div>
                        <div class="text-red-400">100.00</div>
                    </div>
                    <div class="text-xs">
                        初始资金凭证
                    </div>
                </div>
                <div class="border-b border-gray-700 py-3 text-secondary-icon">
                    <div class="flex justify-between items-center">
                        <div class="text-lg font-bold text-white">USD3</div>
                        <div class="text-red-400">100.00</div>
                    </div>
                    <div class="text-xs">
                        平台稳定币
                    </div>
                </div>
                <div class=" border-gray-700 py-3 text-secondary-icon">
                    <div class="flex justify-between items-center">
                        <div class="text-lg font-bold text-white">BT</div>
                        <div class="text-red-400">100.00</div>
                    </div>
                    <div class="text-xs">
                        项目中动态业绩的结算货币
                    </div>
                </div>
            </div>

            <!-- <van-pull-refresh v-model="loading" @refresh="load">
                <van-cell-group inset >
                    <van-cell class="bg-card-content" title="HAH" value="100.00" label="平台燃料币" />
                    <van-cell title="PMT" value="1000.00" label="当用户购买Minter后释放" />
                    <van-cell title="MT" value="2000.00" label="项目中可交易的NFT" />
                    <van-cell title="RT" value="12.12" label="初始资金凭证" />
                    <van-cell title="USD3" value="1534.67" label="平台稳定币" />
                    <van-cell title="BT" value="0.00" label="项目中动态业绩的结算货币" />
                </van-cell-group>
            </van-pull-refresh> -->
        </van-tab>
        <van-tab title="购买流水" class="pt-4">
            <div class="px-2 w-11/12 mr-auto ml-auto bg-card-content rounded-md mb-3" v-for="(item, index) in 3"
                :key="index">
                <div class="border-b py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center mb-0.5">
                        <div class="text-white">奖励金额</div>
                        <div class="text-red-400 font-bold">100.00</div>
                    </div>
                    <div class="text-xs">
                        USD3
                    </div>
                </div>
                <div class="border-b py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center">
                        <div class="text-white">发放时间</div>
                        <div class="">2023-09-30 16:01:12</div>
                    </div>
                </div>
                <div class="border-b py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center">
                        <div class="text-white">发放来源</div>
                        <div class="">200Minter</div>
                    </div>
                </div>
                <div class="py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center">
                        <div class="text-white">卡片类型</div>
                        <div class="">加速业绩卡</div>
                    </div>
                </div>
            </div>
            <!-- <van-pull-refresh v-model="loading" @refresh="load">
                <van-cell-group inset v-for="k in 2" :key="k">
                    <van-cell title="奖励金额" value="100.00" label="USD3" />
                    <van-cell title="发放时间" value="2023-09-30 16:01:12" />
                    <van-cell title="发放来源" value="200Minter" />
                    <van-cell title="卡片类型" value="加速业绩卡" />
                </van-cell-group>
            </van-pull-refresh> -->
        </van-tab>

        <van-tab title="收益流水" class="pt-4">
            <div class="px-2 w-11/12 mr-auto ml-auto bg-card-content rounded-md mb-3" v-for="(item, index) in 3"
                :key="index">
                <div class="border-b py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center mb-0.5">
                        <div class="text-white">奖励金额</div>
                        <div class="text-red-400 font-bold">100.00</div>
                    </div>
                    <div class="text-xs">
                        USD3
                    </div>
                </div>
                <div class="border-b py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center">
                        <div class="text-white">发放时间</div>
                        <div class="">2023-09-30 16:01:12</div>
                    </div>
                </div>
                <div class="border-b py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center">
                        <div class="text-white">发放来源</div>
                        <div class="">200Minter</div>
                    </div>
                </div>
                <div class="border-b py-2 border-gray-700 text-secondary-icon">
                    <div class="text-sm flex justify-between items-center">
                        <div class="text-white">卡片类型</div>
                        <div class="">加速业绩卡</div>
                    </div>
                </div>
            </div>
        </van-tab>
    </van-tabs>
</template>
<script setup>
import { ref } from 'vue'
const loading = ref(false)
function load() {
    loading.value = false
}
</script>