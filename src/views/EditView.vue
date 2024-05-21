<template>
  <div class="vxe-run-edit-view">
    <div class="vxe-run-edit-header">
      <VxeButton status="primary" @click="runClick">运行</VxeButton>
    </div>
    <div class="vxe-run-edit-body">
      <div ref="codeElemRef" class="code">
        <CodeView style="width: 100%" ref="codeRef" />
        <MoveBar :elementView="codeElemRef" direction='x' @changeElement="changeElement" />
      </div>
      <div class="per-con">
        <div ref="previewRef" class="preview">
          <PreviewView ref="previewViewRef" @errorLog="errorLog" />
          <div class="flod" v-if="isFlod"></div>
          <MoveBar :elementView="previewViewRef" direction='y' @changeElement="changeElementY"  />
        </div>
        <div class="console">
          <ConsoleView ref="consoleViewRef"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import CodeView from '@/components/CodeView.vue'
import PreviewView from '@/components/PreviewView.vue'
import ConsoleView from '@/components/ConsoleView.vue'
import MoveBar from '@/components/MoveBar.vue'

const codeElemRef = ref<HTMLDivElement>()
const previewElemRef = ref<HTMLDivElement>()
const isFlod = ref(false)

const changeElement = (message: string) => {
  const codeEl = codeElemRef.value
  if (codeEl) {
    codeEl.style.width = message
    isFlod.value = true
  }
}

const changeElementY = (message: string) => {
  const previewEl = previewElemRef.value
  if (previewEl) {
    previewEl.style.height = message
    isFlod.value = true
  }
}

const codeRef = ref()
const previewViewRef = ref()
const consoleViewRef = ref()

const errorLog = (event: any) => {
  consoleViewRef.value.setConsoleMessage(event.message)
}

const runClick = () => {
  const codeValue = codeRef.value.getValue()
  previewViewRef.value.setValue({
    htmlCode: codeValue.htmlCode,
    styleCode: codeValue.styleCode,
    jsCode: codeValue.jsCode
  })
}
</script>

<style lang="scss" scoped>
.vxe-run-edit-view {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.vxe-run-edit-header {
  width: 100%;
  padding: 2px 8px 2px 8px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  border-bottom: 1px solid #e2e2e3;
  cursor: pointer;
}
.vxe-run-edit-body {
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  .code {
    width: 50%;
    min-width: 20%;
    height: 100%;
    position: relative;
  }
  .per-con {
    flex: 1;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .preview {
      height: 70%;
      min-height: 30%;
      max-height: 90%;
      position: relative;
      position: relative;
      .flod {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .console {
      flex: 1;
    }
  }
}
</style>
