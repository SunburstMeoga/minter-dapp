<template>
    <van-nav-bar title="收益明细" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group inset v-for="key in 10">
        <van-cell title="奖励金额" value="100.00" label="MUSDT" />
        <van-cell title="发放时间" value="2023-09-30 16:01:12" />
    </van-cell-group>
    <van-back-top right="60vw" bottom="10vh" />
</template>
<script setup>
function onClickLeft() {
    history.back()
}
</script>
