<template>
    <van-tabs sticky animated swipeable>
        <van-tab title="我的收益">
            <van-pull-refresh v-model="loading" @refresh="load">
                <!-- <van-empty description="直推奖金" /> -->
                <van-cell-group inset>
                    <van-cell title="静态奖金" value="400" is-link to="reward" label="MUSDT" />
                    <van-cell title="直推奖金" value="100" is-link to="reward" label="MUSDT" />
                    <van-cell title="对碰奖金" value="200" is-link to="reward" label="MUSDT" />
                    <van-cell title="代数奖金" value="300" is-link to="reward" label="MUSDT" />
                </van-cell-group>
            </van-pull-refresh>
        </van-tab>
<!-- 
        <van-tab title="直推">
            <van-pull-refresh v-model="loading" @refresh="load">
                <van-empty description="代数奖金" />
            </van-pull-refresh>
        </van-tab>


        <van-tab title="对碰">
            <van-pull-refresh v-model="loading" @refresh="load">
                <van-empty description="对碰奖金" />
            </van-pull-refresh>
        </van-tab>

        <van-tab title="代数">
            <van-pull-refresh v-model="loading" @refresh="load">
                <van-empty description="代数奖金" />
            </van-pull-refresh>
        </van-tab> -->

    </van-tabs>
</template>
<script setup>
import { ref } from 'vue'
const loading = ref(false)
function load() {
    loading.value = false
}
</script>