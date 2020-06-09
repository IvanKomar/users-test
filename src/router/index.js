import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
