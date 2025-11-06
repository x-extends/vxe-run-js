<template>
  <div class="vxe-run-edit-view">
    <div class="vxe-run-edit-header">
      <vxe-button status="primary" @click="runClick">运行</vxe-button>
    </div>
    <div class="vxe-run-edit-body">
      <vxe-splitter>
        <vxe-splitter-panel width="800" min-width="160">
          <CodeView ref="codeRef" />
        </vxe-splitter-panel>
        <vxe-splitter-panel min-width="100">
          <vxe-splitter vertical>
            <vxe-splitter-panel  min-height="100">
              <PreviewView ref="previewViewRef" @errorLog="errorLog" />
            </vxe-splitter-panel>
            <vxe-splitter-panel min-height="100">
              <ConsoleView ref="consoleViewRef"/>
            </vxe-splitter-panel>
          </vxe-splitter>
        </vxe-splitter-panel>
      </vxe-splitter>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CodeView from '@/components/CodeView.vue'
import PreviewView from '@/components/PreviewView.vue'
import ConsoleView from '@/components/ConsoleView.vue'

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
}
</style>
