<template>
  <div class="home">
    <header>
      <span @click="runClick">运行</span>
    </header>
    <main>
      <div class="code">
        <CodeView style="width: 100%" ref="codeRef" />
        <MoveBar :elementView="codeView" direction='x' @changeElement="changeElement" />
      </div>
      <div class="per-con">
        <div class="perview">
          <PreviewView ref="previewViewRef" @errorLog="errorLog" />
          <div class="flod" v-if="isFlod"></div>
          <MoveBar :elementView="perview" direction='y' @changeElement="changeElementY"  />
        </div>
        <div class="console">
          <ConsoleView ref="consoleViewRef"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import CodeView from '@/components/CodeView.vue'
import PreviewView from '@/components/PreviewView.vue'
import ConsoleView from '@/components/ConsoleView.vue'
import MoveBar from '@/components/MoveBar.vue'

const codeView = ref()
const perview = ref()
const isFlod = ref(false)

const changeElement = (message: string) => {
  const code = document.querySelector('.code')
  code.style.width = message
  isFlod.value = true
}

const changeElementY = (message: string) => {
  const perview = document.querySelector('.perview')
  perview.style.height = message
  isFlod.value = true
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

onMounted(() => {
  codeView.value = document.querySelector('.code')
  perview.value = document.querySelector('.perview')
})
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

      .perview {
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
        background-color: #eeeeee;
      }
    }
  }
}
</style>
