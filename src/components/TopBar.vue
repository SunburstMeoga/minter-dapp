<template>
    <div class="py-3 w-full text-primary-color relative">
        <div class="flex justify-between items-center px-2">
            
            <div>
                <div class="icon iconfont menu" :class="showMenu ? 'icon-close1' : 'icon-menu-hamburger'"
                    @click="toggleMenu"></div>
            </div>
            <div class="px-3 py-0.5  bg-primary-color rounded text-white text-sm">
                链接钱包
            </div>
        </div>
        <div v-show="showMenu" class="p-4 pb-0 absolute z-50 h-screen w-full bg-black">
            <div class="router-item border-b" @click="toPage('/')">
                <div class="flex justify-start items-center">
                    <div class="icon iconfont icon-_shangxiaguanxi"></div>
                    <div class="ml-2">推荐关系</div>
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toPage('/coherent')">
               
                <div class="flex justify-start items-center">
                    <div class="icon iconfont icon-dapeitaocan"></div>
                    <div class="ml-2">购买配套</div>
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toPage('/coherent')">
              
                <div class="flex justify-start items-center">
                    <div class="icon iconfont icon-yingyongshichang"></div>
                    <div class="ml-2">NFT市场</div>
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toPage('/earnings')">
                <div class="flex justify-start items-center">
                    <div class="icon iconfont icon-shouyi"></div>
                    <div class="ml-2">收益</div>
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item" @click="toPage('/personal')">
                <div class="flex justify-start items-center">
                    <div class="icon iconfont icon-iconfuzhi"></div>
                    <div class="ml-2">个人中心</div>
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter()
const showMenu = ref(false)
function toggleMenu() {
    showMenu.value = !showMenu.value
}

function toPage(page) {
    router.push({
        path: page
    })
    showMenu.value = false
}

defineProps({
    pageTitle: {
        type: String,
        default: ''
    },
    showBack: {
        type: Boolean,
        default: false
    },
    showLogo: {
        type: Boolean,
        default: false
    }
})
// const { pageTitle, showBack, showLogo } = toRefs(props)
</script>

<style scoped>
.router-item {
    @apply flex justify-between items-center py-4 text-primary-color border-gray-700 text-sm;
}

.close {
    font-size: 30px;
}

.menu {
    font-size: 30px;
}

.back {
    font-size: 20px;
}
</style>