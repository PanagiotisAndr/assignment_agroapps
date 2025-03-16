<script setup>
import { ref, computed, defineEmits, onMounted, onBeforeUnmount, defineProps } from 'vue'

const props = defineProps({
  active: { type: Boolean, default: false }, // Active button
})

// State for the selected date and whether the date picker will be displayed.
const selectedDate = ref(new Date().toISOString().split('T')[0])
const showPicker = ref(false)
const emit = defineEmits(['update'])

// Calculation of the minimum and maximum date
const today = new Date()
const minDate = computed(() => today.toISOString().split('T')[0]) // YYYY-MM-DD
const maxDate = computed(() => {
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + 6)
  return futureDate.toISOString().split('T')[0]
})

// When the date changes we close the picker and send the data
const updateDate = () => {
  emit('update', selectedDate.value)
  showPicker.value = false // Close picker
}

// Reference for the date picker container
const pickerRef = ref(null)

// Close picker when clicking outside
const handleClickOutside = (event) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target)) {
    showPicker.value = false
  }
}

// Add and remove event listener for clicks outside
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="relative w-64" ref="pickerRef">
    <button
      @click="showPicker = !showPicker"
      class="p-2 border rounded select-btn"
      :class="{
        active: active,
      }"
    >
      Select a Date
    </button>

    <div
      v-if="showPicker"
      class="absolute top-12 left-0 w-full bg-white p-2 border rounded-md shadow-md select-date"
    >
      <input
        type="date"
        v-model="selectedDate"
        :min="minDate"
        :max="maxDate"
        @change="updateDate"
        class="border rounded-md p-2 w-full"
      />
    </div>
  </div>
</template>





<style scoped lang="scss">
.select-btn {
  cursor: pointer;
  background-color: #f5f5f5;
  border-color: #dbdbdb;
  &.active {
    border-color: #e7f4de;
    background-color: #f5f5f5;
    color: #a0d077;
  }
}
.select-date {
  input {
    border: none;
    box-sizing: border-box;
    outline: 0;
    padding: 0.75rem;
    position: relative;
    width: 100%;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
}
</style>
