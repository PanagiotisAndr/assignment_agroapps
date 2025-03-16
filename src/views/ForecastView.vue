<script setup>
import WeatherChart from '../components/weather/Chart.vue'
</script>

<template>
  <div class="main-container bg-gray-200 p-10">
    <div class="bg-white rounded-lg shadow-md">
      <div class="divider"></div>
      <WeatherChart />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  background-color: #fcfcfc;
  .divider {
    background-color: #eaebef;
    padding: 20px 0;
  }
}
</style>