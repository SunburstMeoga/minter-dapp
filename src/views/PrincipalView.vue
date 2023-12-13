<template>
    <van-nav-bar title="Minter详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
        <van-cell title="Minter类型" value="100.00" label="USD3" />
        <van-cell title="PMT发放" value="66.67" label="PMT" />
        <van-cell title="中奖类型" value="收益加速器" />
        <van-cell title="中奖时间" value="2023-09-30 16:01:12" />
        <van-cell title="收益率" value="12%" label="PMT" />
        <van-cell title="当前收益" value="10" label="USD3" />
    </van-cell-group>
</template>
<script setup>
function onClickLeft() {
    history.back()
}
</script>