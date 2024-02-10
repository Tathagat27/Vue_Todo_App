import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../views/Todos.vue'
import CompletedTasks from '../views/CompletedTasks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: Todos
    },
    {
      path: '/completed',
      name: 'completed',
      component: CompletedTasks
    }
  ]
})

export default router
