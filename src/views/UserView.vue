<template>
    <van-tabs sticky animated swipeable>
        <van-tab title="账户资金">
            <van-pull-refresh v-model="loading" @refresh="load">
                <!-- <van-empty description="账户资金" /> -->
                <van-cell-group inset>
                    <van-cell title="HAH" value="100.00" label="平台燃料币"/>
                    <van-cell title="PMT" value="1000.00" label="当用户购买配套后释放"/>
                    <van-cell title="MT" value="2000.00" label="项目中可交易的NFT"/>
                    <van-cell title="RT" value="12.12" label="初始资金凭证"/>
                    <van-cell title="MUSDT" value="1534.67" label="平台稳定币"/>
                    <van-cell title="BT" value="0.00" label="项目中动态业绩的结算货币"/>
                </van-cell-group>
            </van-pull-refresh>
        </van-tab>
        <van-tab title="购买流水">
            <van-pull-refresh v-model="loading" @refresh="load">
                <!-- <van-empty description="静态收益流水" /> -->
                <van-cell-group inset v-for="k in 2">
                    <van-cell title="奖励金额" value="100.00" label="MUSDT"/>
                    <van-cell title="发放时间" value="2023-09-30 16:01:12" />
                    <van-cell title="发放来源" value="200配套" />
                    <van-cell title="卡片类型" value="加速业绩卡" />
                </van-cell-group>
            </van-pull-refresh>
        </van-tab>

        <van-tab title="收益流水">
            <van-pull-refresh v-model="loading" @refresh="load">
                <!-- <van-empty description="动态收益流水" /> -->
                <van-cell-group inset>
                    <van-cell title="奖励金额" value="100.00" label="MUSDT"/>
                    <van-cell title="发放时间" value="2023-09-30 16:01:12" />
                    <van-cell title="发放来源" value="200配套" />
                    <van-cell title="发放类型" value="对碰奖励" />
                </van-cell-group>
                <van-cell-group inset>
                    <van-cell title="奖励金额" value="100.00" label="MUSDT"/>
                    <van-cell title="发放时间" value="2023-09-30 16:01:12" />
                    <van-cell title="发放来源" value="200配套" />
                    <van-cell title="发放类型" value="代数奖励" />
                </van-cell-group>
                <van-cell-group inset>
                    <van-cell title="奖励金额" value="100.00" label="MUSDT"/>
                    <van-cell title="发放时间" value="2023-09-30 16:01:12" />
                    <van-cell title="发放来源" value="200配套" />
                    <van-cell title="发放类型" value="直推奖励" />
                </van-cell-group>
            </van-pull-refresh>
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