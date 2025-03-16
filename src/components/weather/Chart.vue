<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useWeatherStore } from '../../stores/useWeatherStore'

// Loading the store
const weatherStore = useWeatherStore()
// Reference for the canvas element
const canvasRef = ref(null)

// Temperature data for the chart (Y-axis)
const temperatureData = computed(() => weatherStore.chartData.temperatureData)
const days = computed(() => weatherStore.chartData.days)

// Function to draw the temperature line chart
const drawChart = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  const parentWidth = canvas.parentElement.clientWidth
  const aspectRatio = 5 / 3
  const width = parentWidth - 80
  const height = parentWidth / aspectRatio < 600 ? parentWidth / aspectRatio : 400
  const dpr = window.devicePixelRatio || 1

  // Add offset to lower the graph
  const yOffset = 60

  canvas.width = width * dpr + 200
  canvas.height = height * dpr + 200
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.scale(dpr, dpr)

  ctx.clearRect(0, 0, width, height)

  const graphWidth = width
  const graphHeight = height - yOffset
  const maxTemperature = Math.max(...temperatureData.value)
  const minTemperature = Math.min(...temperatureData.value)
  const temperatureRange = maxTemperature - minTemperature
  const scaleY = graphHeight / temperatureRange
  const pointSpacing = graphWidth / (temperatureData.value.length - 1)

  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  // Y-Axis
  ctx.strokeStyle = '#ddd'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(40, yOffset)
  ctx.lineTo(40, graphHeight + yOffset)
  ctx.stroke()

  // X-Axis
  ctx.beginPath()
  ctx.moveTo(40, graphHeight + yOffset)
  ctx.lineTo(width + 40, graphHeight + yOffset)
  ctx.stroke()

  // Grid lines
  ctx.strokeStyle = '#ddd'
  days.value.forEach((_, index) => {
    const x = 40 + index * pointSpacing
    ctx.beginPath()
    ctx.moveTo(x, yOffset)
    ctx.lineTo(x, graphHeight + yOffset)
    ctx.stroke()
  })

  // Temperature Line
  ctx.strokeStyle = '#badca1'
  ctx.lineWidth = 2
  ctx.beginPath()

  temperatureData.value.forEach((value, index) => {
    const x = 40 + index * pointSpacing
    const y = graphHeight - (value - minTemperature) * scaleY + yOffset // Προσθήκη offset

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()
  // Change font graph
  ctx.font = '15px Arial'
  // Temperature Values
  temperatureData.value.forEach((value, index) => {
    const x = 40 + index * pointSpacing
    const y = graphHeight - (value - minTemperature) * scaleY + yOffset

    ctx.beginPath()
    ctx.fillStyle = '#a1a1a1'
    ctx.fillText(value + '°C', x, y - 12)
  })

  // X-Axis Labels
  ctx.fillStyle = 'black'
  days.value.forEach((day, index) => {
    const x = 40 + index * pointSpacing
    ctx.fillText(day, x, graphHeight + 15 + yOffset)
  })

  // Y-Axis Labels
  ctx.fillStyle = '#a1a1a1'
  for (let t = minTemperature; t <= maxTemperature; t += 2) {
    const y = graphHeight - (t - minTemperature) * scaleY + yOffset
    ctx.fillText(t, 20, y)
  }
}

// Function to handle window resizing
const handleResize = () => {
  drawChart()
}

// Draw the chart when the component is mounted
onMounted(() => {
  drawChart()
  window.addEventListener('resize', handleResize)
})

// Remove event listener when component is destroyed
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="m-auto p-10 chart-container">
    <h3 class="text-[14px] font-bold my-10 title-chart">Weekly Variation</h3>
    <p class="text-[14px] text-chart">Temperature</p>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="scss">
.chart-container {
  canvas {
    display: block;
    height: auto;
  }
  .title-chart {
    padding-left: 8px;
  }
  .text-chart {
    border-bottom: 4px solid #e3f0d8;
    padding: 6px 8px;
    display: inline-block;
  }
}
</style>
