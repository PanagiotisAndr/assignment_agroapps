<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  height: { type: Number, required: true },
})
</script>

<template>
  <div :style="{ paddingTop: `${props.height}px` }" class="bg-gray-300"></div>
</template>
