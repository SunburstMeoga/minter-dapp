<template>
    <div>
        <div class="w-11/12 mr-auto ml-auto border-l-4 font-bold pl-2 border-primary-color text-secondary-icon">
            {{ titleWord }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            titleWord: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>