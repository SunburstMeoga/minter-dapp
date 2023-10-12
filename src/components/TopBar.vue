<template>
    <div class="h-12 w-full text-primary-color">
        <div class="flex justify-between items-center px-4 h-full">
            <div>
                <!-- <div class="icon iconfont menu icon-menu-hamburger" @click="toggleMenu"></div> -->
                <div class="icon iconfont menu icon-menu-hamburger"></div>
            </div>
            <div class="px-6 py-1 bg-primary-color rounded text-white text-base operating-button">
                链接钱包
            </div>
        </div>
        <van-popup v-model:show="showLeftMenu" position="left" :style="{ width: '76%', height: '100%' }">
            <div class="w-full h-full bg-black text-white">
                <div class="flex justify-end items-center pt-2 pr-2">
                    <div class="icon iconfont icon-close1 close" @click="toggleMenu"></div>
                </div>
                <div class="pl-4">
                    <div :class="currentMenuItem == 'home' || currentMenuItem == 'homeChild' ? 'text-primary-color' : 'text-white'" class="menu-item" @click="toggleMoreHome('home')">
                        <div>明德</div>
                        <div class="pl-2">
                            <div class="icon iconfont icon-caret-right transition ease-in-out duration-300" :class="showMoreHome ? 'rotate-90' : ' '"></div>
                        </div>
                    </div>
                    <div v-show="showMoreHome" class="pl-4 text-sm">
                        <div class="py-1.5" @click="handleHomeChild('homeChild', 1)">
                            主页
                        </div>
                        <div class="py-1.5" @click="handleHomeChild('homeChild', 2)">
                            介绍
                        </div>
                        <div class="py-1.5" @click="handleHomeChild('homeChild', 3)">
                            游戏
                        </div>
                        <div class="py-1.5" @click="handleHomeChild('homeChild', 4)">
                            新闻
                        </div>
                        <div class="py-1.5" @click="handleHomeChild('homeChild', 5)">
                            合作伙伴
                        </div>
                        <div class="py-1.5" @click="handleHomeChild('homeChild', 6)">
                            投资人
                        </div>
                        <div class="py-1.5" @click="handleHomeChild('homeChild', 7)">
                            反馈
                        </div>
                    </div>
                </div>
                <div class="pl-4">
                    <div class="menu-item" @click="toggleMoreMarket">
                        <div>市场</div>
                        <div class="pl-2">
                            <div class="icon iconfont icon-caret-right transition ease-in-out duration-300" :class="showMoreMarket ? 'rotate-90' : ''"></div>
                        </div>
                    </div>
                    <div v-show="showMoreMarket" class="pl-4 text-sm">
                        <div class="py-1.5">
                            NFTS
                        </div>
                        <div class="py-1.5">
                            荣誉积分
                        </div>
                        <div class="py-1.5">
                            物品
                        </div>
                       
                    </div>
                        
                </div>
                <div class="pl-4">
                    <div class="menu-item" @click="toggleMoreMarket">
                        <div>质押</div>
                    </div>
                </div>
                <div class="pl-4">
                    <div class="menu-item" @click="toggleMoreMarket">
                        <div>合伙人</div>
                    </div>
                </div>
                <div class="pl-4">
                    <div class="menu-item" @click="toggleMoreMarket">
                        <div>排行榜</div>
                    </div>
                </div>
                <div class="pl-4">
                    <div class="menu-item" @click="toggleMoreMarket">
                        <div>铸造</div>
                    </div>
                </div>
                <div class="pl-4">
                    <div class="menu-item" @click="toggleMoreMarket">
                        <div>游戏</div>
                    </div>
                </div>
            </div>
        </van-popup>
        <!-- <div v-show="showMenu" class="p-4 pb-0 absolute z-50 h-screen w-full bg-black">
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
                    <div class="ml-2">购买Minter</div>
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
        </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from "vue-router";
const router = useRouter()
const showLeftMenu = ref(false)
const showMoreHome = ref(false)
const showMoreMarket = ref(false)
const currentMenuItem = ref('')

let $emit = defineEmits(['handleHomeChild'])

function toggleMenu() {
    showLeftMenu.value = !showLeftMenu.value
}

function toggleMoreHome(value) {
    currentMenuItem.value = value
    showMoreHome.value = !showMoreHome.value
    console.log(currentMenuItem.value)
}

function handleHomeChild(menuItem, index) {
    $emit(menuItem,index)
}

function toggleMoreMarket() {
    showMoreMarket.value = !showMoreMarket.value
}

function changeMenuItem(currentMenuItem) {
    currentMenuItem.value = value
}


function toPage(page) {
    router.push({
        path: page
    })
    showLeftMenu.value = false
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
.menu-item {
    @apply flex justify-start items-center py-2;
}

.close {
    font-size: 24px;
}

.menu {
    font-size: 30px;
}

.back {
    font-size: 20px;
}
</style>