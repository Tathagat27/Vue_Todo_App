<script setup>
const props = defineProps({
            todo:String,
            createdAt:String   
    })
</script>

<template>
    <div class="flex flex-col shadow-inner my-2">
        <div class="flex-1 h-5/6 text-xl px-2">
           <p>{{ todo }}</p> 
        </div>
        <div class="text-sm text-gray-300 italic text-right px-3">
            <time>{{ createdAt }}</time>
        </div>
        
    </div>
</template>