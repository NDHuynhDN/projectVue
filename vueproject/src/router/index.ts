import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/homeuser',
    name: 'homeuser',
    component: () => import('../views/HomeUser.vue')
  },
  {
    path: '/home',
    name: 'homeadmin',
    component: () => import('../views/HomeAdmin.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/homepage',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/room',
        name: 'room',
        component: () => import('../views/room/Room.vue'),
        children: [
          {
            path: '/room/AddRoom',
            name: 'addRoom',
            component: () => import('../views/room/AddRoom.vue')
          }
        ]
      },
      {
        path: '/user/addUser',
        name: 'addUser',
        component: () => import('../views/user/FormAddUser.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/user/Profile.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/User.vue')
      }
    ]
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
