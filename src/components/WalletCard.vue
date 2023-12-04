<template>
    <div>
        <div class="bg-page-content rounded-lg text-white p-2 border border-gray-600">
            <div v-if="isMUSDT">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex justify-start items-center">
                        <div class="icon iconfont icon-yingyongshichang text-primary-color" style="font-size: 24px;"></div>
                        <div class="font-bold text-lg pl-4">0.00 {{ currency }}</div>
                    </div>

                    <div class="flex justify-end text-sm items-center text-test-two">
                        <div v-if="!isRT" class="underline">{{ $t('wallet.recharge') }}</div>
                        <div class="pl-4 underline" @click="$emit('transfer')">{{ isRT ? '转账' : $t('wallet.withdraw') }}
                        </div>
                    </div>
                </div>
                <div v-if="isRT" class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="">{{ $t('wallet.balance') }}</div>
                    <div class="flex justify-end items-center"><span class="text-white pr-1">0 </span> </div>
                </div>
                <!-- <div>
                    <div class=" pl-10 text-sm mb-3">≈ $ 3.33</div>
                </div> -->
                <div class="flex justify-between items-center text-menu-word">
                    <div class=" text-sm">{{ $t('wallet.address') }}:0x839062...e67d1B</div>
                    <div class="icon iconfont icon-copy"></div>
                </div>
            </div>
            <div v-else>
                <div class="flex justify-between items-center mb-2">
                    <div class="flex justify-start items-center">
                        <div class="icon iconfont icon-yingyongshichang text-primary-color" style="font-size: 24px;"></div>
                        <div class="font-bold text-lg pl-4">0.00 {{ currency }}</div>
                    </div>
                </div>
                <div class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="">{{ $t('wallet.balance') }}</div>
                    <div class="flex justify-end items-center"><span class="text-white pr-1">0 </span> </div>
                </div>
                <!-- <div class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="">可用</div>
                    <div class="flex justify-end items-center"><span class="text-white pr-1">0 </span> (≈ $ 0.00)</div>
                </div> -->
                <div class="flex justify-between items-center text-menu-word text-sm">
                    <div class="">{{ $t('wallet.contract') }}</div>
                    <div class="flex justify-end items-center">0x839062...e67d1B <span class="icon iconfont icon-copy ml-2">
                        </span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({

    isMUSDT: {
        type: Boolean,
        default: false
    },
    isRT: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String,
        default: ''
    }
})
</script>

<style></style>