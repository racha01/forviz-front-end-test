import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/bookings/thisweek?roomId=A101&toDay=2019-09-29 08:00:00'
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import('@/components/Home.vue'),
    meta: { title: 'About Us - My Website' }
  },
  {
    path: '/bookings/thisweek',
    name: 'bookingThisweek',
    component: () => import('@/components/BookingThisWeek.vue'),
    meta: { title: 'About Us - My Website' }
  },
  {
    path: '/bookings/nextweek',
    name: 'bookingNextWeek',
    component: () => import('@/components/BookingNextWeek.vue'),
    meta: { title: 'About Us - My Website' }
  },
  {
    path: '/bookings/hwolemonth',
    name: 'bookingHwoleMonth',
    component: () => import('@/components/BookingHwoleMonth.vue'),
    meta: { title: 'About Us - My Website' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Default Title'
})

export default router
