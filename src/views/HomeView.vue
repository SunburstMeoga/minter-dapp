<template>
    <van-tabs class="pt-2" sticky animated swipeable color="#eaae36" title-inactive-color="#A3A0BA" title-active-color="#eaae36" background="#000">
        <van-tab title="新增朋友">
            <!-- <van-pull-refresh v-model="loading" @refresh="load">
                <template v-for="key in 2" :key="key">
                    <van-cell-group inset>
                        <van-cell title="朋友地址:" value="0x1234...7890">
                            <template #right-icon>
                                <van-icon name="label-o" style="margin-left: 5px; align-items:center; display:flex" />
                            </template>
                        </van-cell>
                        <van-cell title="签名时间:" value="2023-09-30 18:01:15" />
                        <van-cell>
                            <van-button icon="share-o" type="success" size="small" round
                                @click="popularize()">绑定</van-button>
                        </van-cell>
                    </van-cell-group>
                </template>
            </van-pull-refresh> -->
           <div class="pt-4 h-auto">
            <div class="mr-auto ml-auto mb-4 w-11/12" v-for="key in 2" :key="key">
                <new-friend-card />
            </div>
           </div>
        </van-tab>
        <van-tab title="朋友信息">
            <van-pull-refresh v-model="loading" @refresh="load">
                <!-- <van-empty description="朋友信息" /> -->
                <van-divider content-position="left" class="c_divider">对碰朋友</van-divider>
                <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items"  height="30vw"/>
                <van-divider content-position="left" class="c_divider">直推朋友</van-divider>
                <van-cell-group inset v-for="key in 2" :key="key">
                    <van-cell title="地址" value="0x1234...7890" />
                    <van-cell title="类型" value="直推" />
                    <van-cell title="绑定日期" value="2023-09-22" />
                    <van-cell />
                </van-cell-group>


            </van-pull-refresh>
        </van-tab>

    </van-tabs>
    <van-back-top right="60vw" bottom="10vh" />
</template>

<script setup>
import { ref } from 'vue'
import newFriendCard from '../components/newFriendCard.vue';
import { showSuccessToast } from 'vant'
const loading = ref(false)
function load() {
    loading.value = false
}

function popularize() {
    showSuccessToast('绑定成功')
}

const activeId = ref(0);
const activeIndex = ref(0);

const items = ref([
    {
        text: '左(0x1234...)',
        children: [
            { text: '左(0x1235...)', id: 1 },
            { text: '右(0x1236...)', id: 2 },
        ],
    },
    {
        text: '右(0x7890...)',
        children: [
            { text: '左(0x7891...)', id: 3 },
            { text: '右(0x7892...)', id: 4 },
        ],
    }
])

</script>

<style scoped>
.c_divider {
    color: var(--van-blue);
    border-color: var(--van-blue);
    padding: 0 16px;
}
</style>