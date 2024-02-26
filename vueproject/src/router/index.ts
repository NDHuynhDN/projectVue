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
        path: '/',
        name: 'home',
        component: () => import('../views/HomeAdmin.vue')
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
          },
          {
            path: '/room/:id',
            name: 'detailRoom',
            component: () => import('../views/room/DetailRoom.vue')
          }
        ]
      },
      {
        path: '/user/addUser',
        name: 'addUser',
        component: () => import('../components/FormAddUser.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/user/Profile.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/User.vue'),
        children: [
          {
            path: '/user/:id',
            name: 'detailUser',
            component: () => import('../views/user/DetailUser.vue')
          }
        ]
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
