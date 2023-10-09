<template>
    <div class="py-2 w-full text-secondary-icon">
        <div class="flex justify-between items-center px-2">
            <div>
                <div class="icon iconfont icon-left text-lg back" v-if="showBack">

                </div>
                <div class="w-40" v-if="showLogo">
                    <img src="../assets/HAHLogo.png" alt="">
                </div>
            </div>
            <div>
                <div class="icon iconfont icon-hamburgermenu menu"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
    }
}
</script>

<style scoped>
.menu {
    font-size: 30px;
}

.back {
    font-size: 20px;
}
</style>