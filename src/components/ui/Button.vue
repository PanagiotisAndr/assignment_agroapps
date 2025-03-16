<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: { type: String, required: true }, // Button text
  active: { type: Boolean, default: false }, // Active button
  dayIndex: { type: String, default: '' },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    @click="emit('click', dayIndex)"
    class="p-2 border rounded btn"
    :class="{
      active: active,
    }"
  >
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
.btn {
  background-color: #f5f5f5;
  border-color: #dbdbdb;
  cursor: pointer;
  &.active {
    border-color: #e7f4de;
    background-color: #f5f5f5;
    color: #a0d077;
  }
}
</style>
