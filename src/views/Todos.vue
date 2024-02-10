<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { PlusSquare, CheckSquare, Pencil, Trash2 } from 'lucide-vue-next';
import router from '../router/index'


let isEmpty = reactive({ value:false})

let editItem = ref(null);

let inputTodo = reactive('')
let todos = ref([]);
let isFocus = ref(null);;

onMounted(() => {
  axios.get("http://localhost:3000/todos").then((response) => {
    console.log(response);
    todos.value = response.data;
  });
});

 let newTodo = reactive({
    todo: "",
    completed: false,
    createdAt: new Date().toLocaleString('en-IN')
  });


  const addNewTodo = () => {
    console.log(newTodo);
    console.log(todos.value);
    newTodo.todo = inputTodo;
    if(newTodo.todo.trim() === ""){
      isEmpty.value = true;
      console.log(isEmpty);
    }
    else if(editItem.value === null){      
      console.log(1);
      axios.post("http://localhost:3000/todos", newTodo).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log("Error", err);
      });

      console.log(newTodo, " & ", todos);

      todos.value.push(newTodo);
      
    }
    else if(editItem.value !== null){
      console.log(2);
      editItem.value.todo = newTodo.todo;
      
      axios.put(`http://localhost:3000/todos/${editItem.value.id}`, editItem.value).then((res) => {
        console.log("Task completed", res.data);
        
      })
      .catch((err) => {
        console.log("Error", err);
      });
      const index = todos.value.findIndex(todo => todo.id === editItem.value.id);
        if (index !== -1) {
          todos.value[index] = { ...todos.value[index], ...editItem.value };
        }
      editItem.value=null;
    }

    inputTodo = ''
    
  };

  const handleComplete = (item) => {
    item.completed = !item.completed;
      axios.put(`http://localhost:3000/todos/${item.id}`,item).then((res) => {
        console.log("Task completed", res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      })
  }

  const handleEdit = (item) => {
    isFocus.value.focus();
    inputTodo = item.todo;
    editItem.value = item;
    console.log(editItem);
  }

  const handleDelete = (item) => {
    axios.delete(`http://localhost:3000/todos/${item.id}`).then((res) => {
        console.log("Task Deleted", res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });

      todos.value = todos.value.filter(todo => todo.id !== item.id);
  }

</script>

<template>
  <div class="flex bg-slate-800 justify-center items-center h-1/6">
    <form @submit.prevent="addNewTodo" class= "w-full px-20">
      <div class="flex justify-between items-center">
        <input type="text" placeholder="Write a Todo . . ." ref="isFocus" @input="isEmpty.value=false" v-model="inputTodo" class="flex-1 h-8 text-blue-800 rounded-md px-2" />
        <button type="submit" class="p-1.5 mx-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-lg text-sm text-center"><PlusSquare class=""/></button>
      </div>
      <p v-if="isEmpty.value" class="text-red-500 text-sm ">Username is required.</p>
      
    </form>
  </div>
  <div class="flex flex-col h-5/6 border-t-2 border-t-slate-600 overflow-y-scroll">
    
      <div v-for="(item, index) in todos" :key="index" class=" ">
        <div v-if="!item.completed" class="flex ">
          <div class="shadow-inner my-2 w-5/6 flex flex-col">
            <div class="flex-1 h-5/6 text-xl px-2">
              <p>{{ item.todo }}</p> 
            </div>
            <div class="text-sm text-gray-300 italic text-right px-3">
                <time>{{ item.createdAt }}</time>
            </div>
        </div>
        <div class="flex justify-evenly flex-1 items-center">
          <CheckSquare @click="handleComplete(item)" class="cursor-pointer" />
          <Pencil @click="handleEdit(item)" class="cursor-pointer" />
          <Trash2 @click="handleDelete(item)" class="cursor-pointer" />
        </div>
      </div>
      
    </div>
    
  </div>
</template>
