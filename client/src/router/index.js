import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Transaction from '../views/Transaction.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/transactions',
    name: 'Transaction',
    component: Transaction
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  if (to.name !== 'Login' && !store.state.isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && store.state.isAuthenticated) next({ name: 'Transaction'} )
  else if (to.name === 'Login' && from.name === 'Login' && store.state.isAuthenticated) next({ name: 'Transaction'} )
  else next()
})

export default router
