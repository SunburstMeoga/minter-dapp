<template>
    <div class="border border-b border-gray-900">
        <div class="flex justify-center items-center py-6 relative text-gray-200">
            <div class="absolute  left-2 active-primary-color" @click="goBack">
                <div class="icon iconfont icon-left" style="font-size: 20px;"></div>
            </div>
            <!-- <div> {{ pageTitle }}</div> -->
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.push({ path: '/' })
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