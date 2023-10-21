<template>
    <div class="pt-2 text-primary-color">
        <van-tabs class="pt-2 bg-black" v-model:active="active" shrink animated swipeable color="#e149ed"
            title-inactive-color="#fff" title-active-color="#e149ed" background="#000">
            <van-tab title="点位图">
                <point />
            </van-tab>
            <van-tab title="动态奖励">
                动态奖励
            </van-tab>
            <van-tab title="承诺卡">
                承诺卡
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
import Point from './point.vue';
import { ref } from 'vue'
let active = ref('2')

</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;

}
</style>