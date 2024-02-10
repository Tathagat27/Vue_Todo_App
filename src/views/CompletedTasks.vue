<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import Todo from '../components/Todo.vue'


let todos = ref([]);

onMounted(() => {
  axios.get("http://localhost:3000/todos").then((response) => {
    console.log(response);
    todos.value = response.data;
  });
});
</script>

<template>
  <div class="flex flex-col overflow-y-auto">
    <div v-for="item in todos" >
      <Todo v-if="item.completed" :todo="item.todo" :createdAt="item.createdAt" />
    </div>
    
  </div>
</template>
