<template>
    <div>
        <div class="bg-page-content rounded-lg text-white p-2 border border-gray-600">
            <!-- <div v-if="isMUSDT">
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
                <div class="flex justify-between items-center text-menu-word">
                    <div class=" text-sm">{{ $t('wallet.address') }}:0x839062...e67d1B</div>
                    <div class="icon iconfont icon-copy" @click="handleCopy"></div>
                </div>
            </div> -->
            <div>
                <div class="flex justify-between items-center mb-2">
                    <div class="flex justify-start items-center">
                        <div class="icon iconfont icon-yingyongshichang text-primary-color" style="font-size: 24px;"></div>
                        <div class="font-bold text-lg pl-4">0.00 {{ currency }}</div>
                    </div>
                    <div class="flex justify-end text-sm items-center text-test-two active-color">
                        <div v-if="isRecharge" class="underline" @click="$emit('recharge')">{{ $t('wallet.recharge') }}
                        </div>
                        <div v-if="isWithdraw" class="pl-4 underline" @click="$emit('withdraw')">{{ $t('wallet.withdraw') }}
                        </div>
                        <div v-if="isTrasfer" class="pl-4 underline" @click="$emit('transfer')">{{ $t('wallet.transfer') }}
                        </div>
                        <div v-if="isExchange" class="pl-4 underline" @click="$emit('exchange')">兌換
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="">{{ $t('wallet.balance') }}</div>
                    <div class="flex justify-end items-center"><span class="text-white pr-1">{{ Number(balance).toFixed(4)
                    }} {{ currency }}</span> </div>
                </div>
                <!-- <div class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="">可用</div>
                    <div class="flex justify-end items-center"><span class="text-white pr-1">0 </span> (≈ $ 0.00)</div>
                </div> -->
                <div class="flex justify-between items-center text-menu-word text-sm" v-show="contranct">
                    <div class="">{{ $t('wallet.contract') }}</div>
                    <div class="flex justify-end items-center"> {{ FilterAddress(contranct) }} <span
                            @click="handleCopy(contranct)" class="icon iconfont icon-copy ml-2 active-white-color">
                        </span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CopyText } from '@/utils/copyText'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n';
import { FilterAddress } from '@/utils/format'
const { t } = useI18n()

defineProps({
    balance: {
        type: String,
        default: ''
    },
    contranct: {
        type: String,
        default: ''
    },
    isRecharge: {
        type: Boolean,
        default: false
    },
    isWithdraw: {
        type: Boolean,
        default: false
    },
    isTrasfer: {
        type: Boolean,
        default: false
    },
    isExchange: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String,
        default: ''
    }
})
async function handleCopy(contranct) {
    await CopyText(contranct)
    showToast(t('toast.copySuccess'))
}
</script>

<style></style>