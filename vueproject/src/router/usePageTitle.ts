import { onBeforeRouteLeave, onBeforeRouteUpdate, type RouteLocationNormalized } from 'vue-router'

export default function usePageTitle() {
  onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    document.title = to.meta.title ? String(to.meta.title) : 'Mini Project'
    next()
  })

  onBeforeRouteUpdate((to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    document.title = to.meta.title ? String(to.meta.title) : 'Mini Project'
    next()
  })
}
