<template>
    <div>
        <div class="flex justify-start items-start max-h-full overflow-hidden">
            <div class="mt-4 relative flex justify-end items-start w-full max-h-full overflow-hidden">
                <div class="absolute top-0 left-0 w-3/12 h-full">
                    <div v-for="(item, index) in typeList" class="text-center w-full py-4 text-white bg-black" :key="index"
                        :class="currentType == index ? 'bg-page-content text-primary-color' : ''"
                        @click="handleType(item, index)">
                        {{ item.title }}
                    </div>
                </div>
                <div class="bg-page-content w-9/12 h-full overflow-scroll pt-2">
                    <div class="w-11/12 ml-auto mr-auto mb-3 rounded overflow-hidden p-2 bg-black text-card-word text-sm"
                        v-for="(item, index) in 20" :key="index">
                        <div class="flex justify-between items-center mb-4">
                            <div>{{ typeList[currentType].title }}奖励金额</div>
                            <div class="text-green-500">+ 100.00</div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div>发放时间</div>
                            <div>2023-09-30 16:01:12</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const typeList = ref([{ title: '直推奖励' }, { title: '对碰奖励' }, { title: '代数奖励' }])
let currentType = ref(0)

function handleType(item, index) {
    currentType.value = index
}
</script>

<style></style>