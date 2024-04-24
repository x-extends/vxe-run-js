<template>
  <div class="home">
    <header>
      <span @click="runClick">运行</span>
    </header>
    <main>
      <CodeView class="code" ref="codeRef" />
      <div class="per-con">
        <PreviewView ref="previewRef" class="perview" />
        <ConsoleView ref="consoleRef" class="console" />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import CodeView from '@/components/CodeView.vue'
import PreviewView from '@/components/PreviewView.vue'
import ConsoleView from '@/components/ConsoleView.vue'

import { ref } from 'vue'

const codeRef = ref()
const previewRef = ref()
const consoleRef = ref()

const runClick = () => {
  const codeValue = codeRef.value.getValue()
  previewRef.value.setValue({
    htmlCode: codeValue.htmlCode,
    styleCode: codeValue.styleCode,
    jsCode: codeValue.jsCode
  })
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  width: 100%;
  header {
    width: 100%;
    height: 40px;
    padding: 2px 8px 2px 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  main {
    height: calc(100% - 40px);
    display: flex;
    .code {
      width: 50%;
      height: 100%;
    }
    .per-con {
      flex: 1;
      height: 100%;

      .perview {
        height: 50%;
      }
      .console {
        height: 50%;
      }
    }
  }
}
</style>
