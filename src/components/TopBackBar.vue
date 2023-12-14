<template>
    <div class="border border-b border-gray-900">
        <div class="flex justify-center items-center py-4 relative text-gray-200">
            <div class="absolute  left-2 active-primary-color" @click="goBack">
                <div class="icon iconfont icon-left" style="font-size: 20px;"></div>
            </div>
            <div> {{ pageTitle }}</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            console.log(window.history.length)
            // return
            if (window.history.length <= 1) {
                this.$router.push({ path: '/' })
                // return false
            } else {
                this.$router.go(-1)
            }
        }
    },
    props: {
        pageTitle: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped></style>