<script setup>
    defineProps({
        staticName: {
            type: String,
            default: '配套'
        }
    })
</script>
<template>
    <div class="bg-card-content text-secondary-icon rounded px-4 py-2 overflow-hidden">
        <div class="mb-2">
        </div>
        <div>
            <div class="mb-1 font-bold text-xl">
                {{ staticName }}
            </div>
            <div class="mb-1">
                配套等级奖励率：10%
            </div>
            <div class="mb-1">
                对碰奖金上限值：200
            </div>
            <div class="mb-1">
                产生代数奖金的用户级数: 一级、三级
            </div>

            <div class="text-lg mb-2">
                <div class="text-white font-bold">200 USDT</div>
                <!-- <div class="text-xs">≈ 20 MUSDT</div> -->
            </div>

            <div class="operating-button rounded-full py-1 text-center mb-4">购买</div>

            <div class="text-xs text-red-700">
                *
                若用户W购买了配套1（即200USDT的配套）则用户每日可获取的对碰奖金上限为200USDT；若用户W购买了配套1+配套2（即200USDT和600USDT）则用户每日可获取的对碰奖金上限为200+600USDT=800；以此类推
            </div>
        </div>
    </div>
</template>
<style scoped></style>