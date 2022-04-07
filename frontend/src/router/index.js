import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import auth from '../middleware/auth.js'
//import axios from 'axios'
import VueRouteMiddleware from 'vue-route-middleware'

const routes = [
  {
    path: '/',
    name: 'HomeVue',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignupVue',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/post',
    name: 'PostVue',
    component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue'),
    meta: {
      middleware: auth
    }
  },
  {
    path: '/profile',
    name: 'ProfileVue',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      middleware: auth
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(VueRouteMiddleware())

export default router





/*=> { 
  if (to.path == ('')){
  next("/*")}

if(localStorage.getItem('token')) {
axios
.post("http://localhost:3000/api/user/me",  {},{
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
.then ((response) => {
  if(!response.data) {next({ name: "HomeVue"});
    }else{
      next();
    }
  })
} else{
  next({ name: "HomeVue"});
}})

*/





  
  