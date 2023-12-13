<template>
    <div class="bg-black pt-20">
        <div class="mb-4">
            <module-title titleWord="我的收益" />
        </div>
        <div>
            <div class="bonuses-item" @click="toReward">
                <div class="">静态奖金</div>
                <div class="flex justify-end items-center">
                    <div class="flex flex-col items-end justify-center text-sm">
                        <div class="text-red-500">400</div>
                        <div>USD3</div>
                    </div>
                    <div class="icon iconfont icon-right ml-2" style="font-size: 20px;">

                    </div>
                </div>
            </div>
            <div class="bonuses-item" @click="toReward">
                <div class="">直推奖金</div>
                <div class="flex justify-end items-center">
                    <div class="flex flex-col items-end justify-center text-sm">
                        <div class="text-red-500">100</div>
                        <div>USD3</div>
                    </div>
                    <div class="icon iconfont icon-right ml-2" style="font-size: 20px;">

                    </div>
                </div>
            </div>
            <div class="bonuses-item" @click="toReward">
                <div class="">对碰奖金</div>
                <div class="flex justify-end items-center">
                    <div class="flex flex-col items-end justify-center text-sm">
                        <div class="text-red-500">200</div>
                        <div>USD3</div>
                    </div>
                    <div class="icon iconfont icon-right ml-2" style="font-size: 20px;">

                    </div>
                </div>
            </div>
            <div class="bonuses-item" @click="toReward">
                <div class="">代数奖金</div>
                <div class="flex justify-end items-center">
                    <div class="flex flex-col items-end justify-center text-sm">
                        <div class="text-red-500">300</div>
                        <div>USD3</div>
                    </div>
                    <div class="icon iconfont icon-right ml-2" style="font-size: 20px;">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <van-tabs sticky animated swipeable>
        <van-tab title="我的收益">
            <van-pull-refresh v-model="loading" @refresh="load">
                <van-cell-group inset>
                    <van-cell title="静态奖金" value="400" is-link to="reward" label="USD3" />
                    <van-cell title="直推奖金" value="100" is-link to="reward" label="USD3" />
                    <van-cell title="对碰奖金" value="200" is-link to="reward" label="USD3" />
                    <van-cell title="代数奖金" value="300" is-link to="reward" label="USD3" />
                </van-cell-group>
            </van-pull-refresh>
        </van-tab>
 
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
        </van-tab> 

    </van-tabs>-->
</template>
<script setup>
import { useRouter } from "vue-router";
import ModuleTitle from '@/components/ModuleTitle.vue';
const router = useRouter()
function toReward() {
    router.push({
        path: '/earnings/list'
    })
}
</script>
<style scoped>
.bonuses-item {
    @apply flex justify-between items-center w-11/12 mr-auto ml-auto rounded p-2 mb-3 bg-card-content text-card-word;
}
</style>