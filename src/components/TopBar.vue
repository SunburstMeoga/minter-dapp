<template>
    <div class="py-3 w-full text-secondary-icon relative">
        <div class="flex justify-between items-center px-2">
            <div>
                <div class="icon iconfont icon-left text-lg back" v-if="showBack">

                </div>
                <div class="w-40" v-if="showLogo">
                    <img src="../assets/HAHLogo.png" alt="">
                </div>
            </div>
            <div>
                <div class="icon iconfont menu" :class="showMenu ? 'icon-close1' : 'icon-menu-hamburger'"
                    @click="toggleMenu"></div>
            </div>
        </div>
        <div v-show="showMenu" class="p-4 pb-0 absolute z-50 h-screen w-full bg-black">
            <div class="router-item border-b" @click="toPage('/home')">
                <div>
                    推荐关系
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toPage('/static')">
                <div>
                    配套信息
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toPage('/static')">
                <div>
                    购买NFT
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toPage('/trends')">
                <div>
                    收益
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item" @click="toPage('/user')">
                <div>
                    个人中心
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
import { toRefs } from 'vue'
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