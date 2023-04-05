import { createRouter, createWebHistory } from 'vue-router'
import PageOne from './components/PageOne.vue'
import PageTwo from './components/PageTwo.vue'
import PageThree from './components/PageThree.vue'

const routes = [
  { path: '/PageOne', component: PageOne },
  { path: '/PageTwo', component: PageTwo },
  { path: '/PageThree', component: PageThree },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router