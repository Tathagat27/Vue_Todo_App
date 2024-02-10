<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <div class="flex items-center justify-center h-screen bg-slate-800 text-white">
    <div class="flex flex-col rounded-lg bg-slate-800 h-4/5 w-2/3 shadow-2xl shadow-teal-300/50">
      <div class="flex rounded items-center justify-center">
        
        <RouterLink to="/" class="text-center text-xl rounded-tl-lg flex-1 p-3 bg-slate-500 hover:bg-slate-600 focus:bg-slate-800">
          Todos
        </RouterLink>      
      
      
        <RouterLink to="/completed" class="text-center text-xl rounded-tr-lg p-3 bg-slate-500 flex-1 hover:bg-slate-600 focus:bg-slate-800">
          Completed Tasks
        </RouterLink>
      </div>
      <div class="h-full m-2 overflow-y-auto scroll-smooth">
        <RouterView />
      </div>
    </div>
    
  </div>
  
</template>

<style scoped>

</style>