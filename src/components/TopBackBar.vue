<template>
    <div>
        <div class="flex justify-center items-center py-4 relative text-card-word">
            <div class="absolute left-2" @click="$router.go(-1)">
                <div class="icon iconfont icon-left" style="font-size: 20px;"></div>
            </div>
           <div> {{ pageTitle }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pageTitle: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>