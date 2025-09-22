<template>
  <div class="console-view">
    <div class="console-view-head">
      <span>Console</span>
      <span>清空</span>
    </div>
    <div class="console-view-body">
      {{ consoleMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const consoleMessage = ref('')

const setConsoleMessage = (message: string) => {
  consoleMessage.value = message
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
