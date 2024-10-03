<template>
    <div>
        <div class=" rounded-lg text-white p-2 border border-gray-600">
            <!-- <div v-if="isMUSDT">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex justify-start items-center">
                        <div class="icon iconfont icon-yingyongshichang text-primary-color" style="font-size: 24px;"></div>
                        <div class="font-bold text-lg pl-4">0.00 {{ currency }}</div>
                    </div>

                    <div class="flex justify-end text-sm items-center text-test-two">
                        <div v-if="!isRT" class="">{{ $t('wallet.recharge') }}</div>
                        <div class="pl-4 " @click="$emit('transfer')">{{ isRT ? '转账' : $t('wallet.withdraw') }}
                        </div>
                    </div>
                </div>
                <div v-if="isRT" class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="">{{ $t('wallet.balance') }}</div>
                    <div class="flex justify-end items-center"><span class="text-white pr-1">0 </span> </div>
                </div>
                <div class="flex justify-between items-center text-menu-word">
                    <div class=" text-sm">{{ $t('wallet.address') }}:0x839062...e67d1B</div>
                    <div class="icon iconfont icon-copy" @click="handleAddToken"></div>
                </div>
            </div> -->
            <div>
                <div class="flex justify-between items-center mb-2">
                    <div class="flex justify-start items-center">
                        <div class="w-6" v-if="tokenImg">
                            <img :src="tokenImg" alt="">
                        </div>
                        <div v-else class="icon iconfont icon-yingyongshichang text-primary-color"
                            style="font-size: 24px;">
                        </div>

                        <div class="font-bold text-lg pl-2">{{ currency }}</div>
                    </div>
                    <div class="flex justify-end text-sm items-center text-yellow-300 active-color">
                        <div v-if="isRecharge" class="active-white-color" @click="$emit('recharge')">{{
                            $t('wallet.recharge') }}
                        </div>
                        <div v-if="isWithdraw" class="pl-4 active-white-color" @click="$emit('withdraw')">{{
                            $t('wallet.withdraw') }}
                        </div>
                        <div v-if="isTrasfer" class="pl-4 active-white-color" @click="$emit('transfer')">{{
                            $t('wallet.transfer') }}
                        </div>
                        <div v-if="isExchange" class="pl-4 active-white-color" @click="$emit('exchange')">
                            {{ $t('exchange.title') }}
                        </div>
                        <div v-if="isBuy" class="pl-4 active-white-color" @click="$emit('buy')">{{ $t('wallet.market')
                            }}
                        </div>
                        <div v-if="isRegister" class="pl-4 active-white-color" @click="$emit('register')">
                            {{ $t('wallet.register') }}
                        </div>
                        <div v-if="isReleases" class="pl-4 active-white-color" @click="$emit('releases')">
                            {{ $t('wallet.release') }}</div>
                    </div>
                </div>
                <div class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="flex justify-start items-center">
                        <div class="mr-2">
                            {{ $t('wallet.balance') }}
                        </div>
                        <div class="icon iconfont icon-shuaxin icon-refresh" v-if="showRefresh"
                            @click="$emit('refreshBalance')" :class="loading ? 'animate-spin' : ''">
                        </div>
                    </div>
                    <div class="flex justify-end items-center"><span class="text-lg pr-1 font-bold text-red-500">{{
                            (balance === '0.000000' || balance === '0.') ? '0.0000' : (balance < 0.0001 ? '＞0.0001' :
                                Number(balance).toFixed(5).slice(0, -1)) }} {{ currency }}</span>
                    </div>
                </div>
                <div class="flex justify-between items-center text-menu-word text-sm mb-2" v-show="showLockBalance">
                    <div class="">{{ $t('wallet.frezeBalance') }}</div>
                    <div class="flex justify-end items-center"><span class="text-lg pr-1 font-bold text-red-500">{{
                            (lockMT === '0.000000' || lockMT === '0.') ? '0.0000' : (lockMT < 0.0001 ? '＞0.0001' :
                                Number(lockMT).toFixed(5).slice(0, -1)) }} {{ currency }}</span>
                    </div>
                </div>
                <!-- <div class="flex justify-between items-center text-menu-word text-sm mb-2">
                    <div class="">可用</div>
                    <div class="flex justify-end items-center"><span class="text-white pr-1">0 </span> (≈ $ 0.00)</div>
                </div> -->
                <div class="flex justify-between items-center text-menu-word text-sm" v-show="contract">
                    <div class="">{{ $t('wallet.contract') }}</div>
                    <div class="flex justify-end items-center"> {{ FilterAddress(contract) }} <span
                            @click="handleAddToken(contract)"
                            class="icon iconfont icon-jiesuan ml-2 active-white-color">
                        </span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { CopyText } from '@/utils/copyText'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n';
import { FilterAddress } from '@/utils/format'
import Web3 from 'web3'
import { config } from '@/const/config'
const { proxy } = getCurrentInstance()
const { t } = useI18n()

const cardProps = defineProps({
    balance: {
        type: String,
        default: ''
    },
    contract: {
        type: String,
        default: ''
    },
    tokenImg: {
        type: String,
        default: ''
    },
    isRegister: {
        type: Boolean,
        default: false
    },
    isRecharge: {
        type: Boolean,
        default: false
    },
    isBuy: {
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
    isReleases: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String,
        default: ''
    },
    showLockBalance: {
        type: Boolean,
        default: false
    },
    lockMT: {
        type: String,
        default: ''
    },
    showRefresh: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})
async function handleAddToken(contract) {

    //console.log(config, cardProps)
    proxy.$loading.show()
    try {
        let addToken = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: contract,
                    symbol: cardProps.currency,
                    decimals: config.decimals,
                },
            },
        })
        proxy.$loading.hide()
        //console.log('addToken', addToken)
    } catch (err) {
        //console.log(err)
        proxy.$loading.hide()
        if (err.code == 4001) {
            showToast(`您已取消添加代幣：${cardProps.currency}`,)
        }
    }
}
</script>

<style></style>
