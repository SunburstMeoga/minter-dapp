<template>
    <div>
        <div class="flex justify-start items-center text-test-seven">
            <div>
                <span class="relative flex h-4 w-4">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-test-seven opacity-75" />
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-test-seven" />
                </span>
            </div>
            <div class="pl-2 text-xl">
                {{ titleWord }}
            </div>
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

<style scoped></style>