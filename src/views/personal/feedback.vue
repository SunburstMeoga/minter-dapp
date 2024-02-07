<template>
    <div class="pt-20">
        <div class="w-11/12 mr-auto ml-auto mb-2">
            <module-title titleWord="反馈" />
        </div>
        <div class="item-title">
            选择反馈类型
        </div>
        <div class="w-11/12 mr-auto ml-auto flex justify-start mb-4">
            <van-popover v-model:show="showFilterPopover" theme="dark" placement="bottom-start" :actions="actions"
                @select="onSelect">
                <template #reference>
                    <div
                        class="flex justify-center items-center text-gray-500 border text-xs border-gray-500 rounded px-3 py-1">
                        <div class="icon iconfont icon-screen mr-1" style="font-size: 12px;"></div>
                        <div class="">
                            {{ actions[currentFilter].text }}
                        </div>
                    </div>
                </template>
            </van-popover>
        </div>
        <div class="item-title">
            問題描述
        </div>
        <div class="w-11/12 mr-auto ml-auto border border-gray-400 rounded overflow-hidden mb-4">
            <textarea name="" id="" cols="20" rows="10" class="w-full h-full bg-transparent text-gray-400"
                placeholder="請輸入您的問題"></textarea>
        </div>
        <div class="item-title">
            錢包地址
        </div>
        <div class="w-11/12 mr-auto ml-auto h-10 overflow-hidden mb-4">
            <input type="text" class="w-full h-full bg-transparent text-gray-400">
        </div>
        <div class="item-title">
            Email地址
        </div>
        <div class="w-11/12 mr-auto ml-auto h-10 overflow-hidden mb-4">
            <input type="text" class="w-full h-full bg-transparent text-gray-400">
        </div>
        <div class="item-title">
            選擇回復的語言類型
        </div>
        <div class="w-11/12 mr-auto ml-auto flex justify-start mb-4">
            <van-popover v-model:show="showLanguagePopover" theme="dark" placement="bottom-start" :actions="actionsLanguage"
                @select="onSelectLanguage">
                <template #reference>
                    <div
                        class="flex justify-center items-center text-gray-500 border text-xs border-gray-500 rounded px-3 py-1">
                        <div class="icon iconfont icon-screen mr-1" style="font-size: 12px;"></div>
                        <div class="">
                            {{ actionsLanguage[currentLanguage].text }}
                        </div>
                    </div>
                </template>
            </van-popover>
        </div>

        <div class="operating-button py-2 text-white w-11/12 ml-auto mr-auto rounded-full text-center mt-8">
            提交
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import ModuleTitle from "@/components/ModuleTitle.vue";
let showFilterPopover = ref(false)
let actions = ref([
    { text: '遊戲bug', value: true, index: 0 },
    { text: '網頁bug', value: false, index: 1 },
    { text: '反饋', value: true, index: 0 },
    { text: '其它', value: false, index: 1 }
])
let currentFilter = ref(0)
function onSelect(select) {
    //console.log(select.index)
    currentFilter.value = select.index
}
let showLanguagePopover = ref(false)
let actionsLanguage = ref([
    { text: 'English', value: true, index: 0 },
    { text: '繁體中文', value: false, index: 1 }
])
let currentLanguage = ref(0)
function onSelectLanguage(select) {
    //console.log(select.index)
    currentLanguage.value = select.index
}
</script>
<style scoped>
.item-title {
    @apply text-gray-300 text-sm w-11/12 mr-auto ml-auto mb-2;
}
</style>