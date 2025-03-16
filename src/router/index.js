import { createRouter, createWebHistory } from 'vue-router'
import ForecastWeather from '../views/ForecastView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'forecastWeather',
      component: ForecastWeather,
    },
  ],
})

export default router
