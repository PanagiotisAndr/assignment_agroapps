<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWeatherStore } from '../../stores/useWeatherStore'

const weatherStore = useWeatherStore() // Loading the store
const currentWeather = computed(() => weatherStore.currentWeather)

onMounted(async () => {})
</script>

<template>
  <div class="m-auto p-10 forecast-container">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      <template v-for="(item, index) in currentWeather" :key="index">
        <div class="item-weather bg-white" v-if="typeof item === 'object'">
          <h2 class="text-[46px]">
            {{ item?.value }} <span class="text-[20px]">{{ item?.unit }}</span>
          </h2>
          <p class="text-[16px] text-gray-400">
            {{ item?.text }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.forecast-container {
  .item-weather {
    border: 2px solid #e7e7e7;
    border-radius: 28px;
    padding: 46px 16px;
  }
}
</style>
