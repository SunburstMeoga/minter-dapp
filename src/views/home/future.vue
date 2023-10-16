<template>
    <div class="w-full h-full flex flex-col items-center justify-center text-primary-color">
        <div class="w-11/12 mb-8">
            <module-title :titleWord="$t('game.title')" />
        </div>
        <div class="font-black text-2xl w-11/12 mb-8 title text-white">
            {{ $t('game.title') }}
        </div>

    </div>
</template>

<script setup>
import ModuleTitle from '@/components/ModuleTitle.vue'
</script>

<style  scoped>
.title {
    text-shadow: 1px -1px #fff, -1px 1px #999, -10 10px 5px #808080;
}
</style>