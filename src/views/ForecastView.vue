<script setup>
import WeatherChart from '../components/weather/Chart.vue'
import WeatherDayPicker from '../components/weather/WeatherDayPicker.vue'
import ForecastInformation from '../components/weather/ForecastInformation.vue'
import Divider from '../components/ui/Divider.vue'
</script>

<template>
  <div class="main-container bg-gray-200 p-10">
    <div class="container bg-white rounded-lg shadow-md mx-auto">
      <WeatherDayPicker />
      <Divider :height="6" />
      <ForecastInformation />
      <Divider :height="68" />
      <WeatherChart />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  background-color: #fcfcfc;
}
</style>