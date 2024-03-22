import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/homeuser',
    name: 'homeuser',
    component: () => import('../views/HomeUser.vue'),
    meta: { title: 'Home User' }
  },
  {
    path: '/homepage',
    name: 'homeadmin',
    component: () => import('../views/HomeAdmin.vue'),
    // meta: {
    //   title: 'Home'
    // },
    children: [
      {
        path: '/homepage',
        redirect: '/static'
      },
      {
        path: '/static',
        name: 'static',
        component: () => import('../views/Home.vue'),
        meta: { title: 'Static' }
      },
      {
        path: '/room',
        name: 'room',
        component: () => import('../views/room/Room.vue'),
        meta: { title: 'Manage Room' },
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
        component: () => import('../views/user/FormAddUser.vue'),
        meta: { title: 'Add User' }
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/Setting.vue'),
        meta: { title: 'Setting' }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/User.vue'),
        meta: { title: 'Manage User' }
      }
    ]
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta: { title: 'Sign Up' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? String(to.meta.title) : 'Home Admin'
  next()
})

export default router
