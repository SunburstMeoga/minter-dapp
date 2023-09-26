<template>
    <van-tabs sticky animated swipeable>
        <van-tab title="我的配套">
            <van-pull-refresh v-model="loading" @refresh="load">
                <van-cell-group inset>
                    <van-cell title="配套类型:" value="200USDT" is-link to="principal">
                    </van-cell>
                    <van-cell title="状态:" value="未抽奖" />
                    <van-cell>
                        <van-button icon="share-o" type="success" size="small" round @click="roulette()">轮盘抽奖</van-button>
                    </van-cell>
                </van-cell-group>

                <van-cell-group inset>
                    <van-cell title="配套类型:" value="200USDT" is-link to="principal">
                        
                    </van-cell>
                    <van-cell title="状态:" value="收益加速器" />
                    <van-cell>
                        <van-button icon="share-o" type="success" size="small" round @click="roulette()"
                            disabled>轮盘抽奖</van-button>
                    </van-cell>
                </van-cell-group>

                <van-cell-group inset>
                    <van-cell title="配套类型:" value="200USDT" is-link to="principal">
                    </van-cell>
                    <van-cell title="状态:" value="业绩承诺卡" />
                    <van-cell>
                        <van-button icon="share-o" type="success" size="small" round @click="roulette()"
                            disabled>轮盘抽奖</van-button>
                    </van-cell>
                </van-cell-group>
            </van-pull-refresh>
        </van-tab>
        
        <van-tab title="购买配套">
            <van-pull-refresh v-model="loading" @refresh="load">
                <van-cell-group inset>
                    <van-cell>
                        <van-notice-bar left-icon="volume-o"
                            text="配套正在热抢中200USDT,600USDDT,2000USDT,6000USDT,20000USDT ❤️❤️❤️ 🔥🔥🔥❤️❤️❤️... " />
                    </van-cell>
                </van-cell-group>
                <van-cell-group inset v-for="pt in items" :key="pt">
                    <van-card currency="$" num="1" :price="`${pt}${'USDT'}`" desc="静态收益+动态收益+平台收益." :title="`${pt}${'U配套'}`"
                        :thumb="`${'./'}${pt}${'.png'}`">
                        <template #tags>
                            <van-badge>
                                <van-tag plain type="primary">抢购</van-tag>
                            </van-badge>
                        </template>
                        <template #footer>
                            <van-button type="success" size="small" round @click="rob()">抢购</van-button>
                        </template>
                    </van-card>
                </van-cell-group>
            </van-pull-refresh>
        </van-tab>
       
    </van-tabs>
</template>
<script setup>
import { ref } from 'vue'
import { showSuccessToast, showLoadingToast } from 'vant'
const loading = ref(false)
function load() {
    loading.value = false
}

const items = ref([200, 600, 2000, 6000, 20000])

function rob() {
    showLoadingToast({
        message: '抢购中...',
        forbidClick: true,
        duration: 0,
    })
    setTimeout(function () {
        showSuccessToast('抢购成功')
    }, 1000)
}

function roulette() {
    showLoadingToast({
        message: '抽奖中...',
        forbidClick: true,
        duration: 0,
    })
    setTimeout(function () {
        showSuccessToast('中奖收益加速器')
    }, 2000)
}
</script>