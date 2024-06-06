<template>
  <div class="console-view">
    {{ consoleMessage }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const consoleMessage = ref('')

const setConsoleMessage = (message: string) => {
  consoleMessage.value = message
  console.log(message, 'message')
}

defineExpose({
  setConsoleMessage
})
</script>

<style scoped>
.console-view {
  height: 100%;
  width: 100%;
}
</style>
