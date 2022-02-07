import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../components/Products.vue'
import Checkout from '../components/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: '',
        component: Checkout
      },
      {
        path: '/products',
        component: Products
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
