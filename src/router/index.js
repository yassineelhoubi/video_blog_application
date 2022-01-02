import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/authentication',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn) {
        next();
      } else {
        next('/')
      }

    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
