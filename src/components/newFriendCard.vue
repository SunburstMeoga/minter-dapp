<template>
    <div class="bg-card-content text-secondary-icon rounded px-4 py-2">
       <div class="card-item">
        <div>朋友地址</div>
        <div>0x1234...7890</div>
       </div>
       <div class="card-item">
        <div>签名时间</div>
        <div>2023-09-30 18:01:15</div>
       </div>
       <div class="operating-button rounded-full p-1.5 text-center text-sm">绑定</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .card-item {
        @apply flex justify-between items-center text-sm mb-2;
    }
   
</style>