<script setup>
import { ref, onMounted, computed } from 'vue'
import { useWeatherStore } from '../../stores/useWeatherStore'
import Calendar from '../ui/Calendar.vue'
import Button from '../ui/Button.vue'
import { getWeatherIconsDescriptions } from '../../utils/WeatherIconsDescriptions'

const weatherStore = useWeatherStore() // Loading the store
const weatherCode = computed(() => weatherStore.currentWeather?.weathercode)

const temperature = computed(() => weatherStore.currentWeather?.temperature)

const store = useWeatherStore()
const selectedDate = ref(null)
const weatherData = ref(null)
const activeButton = ref('now')

const todayValue = ref(0)

const updateDataWeather = (data) => {
  activeButton.value = data === '0' ? 'today' : 'now'
  weatherStore.getWeatherData(data)
}

const updateCalendar = (data) => {
  activeButton.value = 'calendar'
  const index = weatherStore.forecast.time.findIndex((time) => time === data)
  weatherStore.getWeatherData(index)
}

onMounted(async () => {
  await store.fetchWeather()
})
</script>

<template>
  <div class="m-auto p-10 weather-day-picker">
    <div class="flex flex-wrap gap-2">
      <Button @click="updateDataWeather" label="Now" :active="activeButton === 'now'" />
      <Button
        @click="updateDataWeather"
        label="Today"
        :active="activeButton === 'today'"
        dayIndex="0"
      />
      <Calendar @update="updateCalendar" :active="activeButton === 'calendar'" />
    </div>
    <div class="flex flex-wrap justify-between items-center gap-4 pt-5" v-if="temperature?.value">
      <div class="w-auto">
        <h2 class="text-[54px]">{{ temperature?.value + ' ' + temperature?.unit }}</h2>
        <p class="text-[16px] text-gray-400">
          {{ getWeatherIconsDescriptions(weatherCode)?.description }}
        </p>
      </div>
      <div class="w-auto">
        <span class="text-[128px]">{{ getWeatherIconsDescriptions(weatherCode)?.icon }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.weather-day-picker {
}
</style>
