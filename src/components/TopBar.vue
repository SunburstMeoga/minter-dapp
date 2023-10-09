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
                    @click="showMenu = !showMenu"></div>
            </div>
        </div>
        <div v-show="showMenu" class="p-4 pb-0 absolute z-50 h-screen w-full bg-black">
            <div class="router-item border-b" @click="toHome">
                <div>
                    朋友
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toStatic">
                <div>
                    配套
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item border-b" @click="toTrends">
                <div>
                    收益
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
            <div class="router-item" @click="toUser">
                <div>
                    我的
                </div>
                <div>
                    <div class="icon iconfont icon-right"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Divider } from 'vant'
export default {
    components: { [Divider.name]: Divider },
    data() {
        return {
            showMenu: false
        }
    },
    props: {
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
    },
    methods: {
        toHome() {
            this.$router.push({
                path: '/home'
            })
            this.showMenu = false
        },
        toStatic() {
            this.$router.push({
                path: '/static'
            })
            this.showMenu = false
        },
        toTrends() {
            this.$router.push({
                path: '/trends'
            })
            this.showMenu = false

        },
        toUser() {
            this.$router.push({
                path: '/user'
            })
            this.showMenu = false

        }
    }
}
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