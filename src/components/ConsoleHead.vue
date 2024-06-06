<template>
  <div class="console-head" @click="barClick">
    <span>Console</span>
    <span @click.stop="clearClick">清空</span>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emits = defineEmits(['bar', 'clear'])

const barClick = () => {
  emits('bar')
}
const clearClick = () => {
  emits('clear')
}
</script>

<style scoped lang="scss">
.console-head {
  height: 28px;
  color: #8f8f8f;
  padding: 0 10px;
  user-select: none;
  border: 1px solid #efecec;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
