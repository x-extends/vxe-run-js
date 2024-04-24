<template>
  <div class="home" @mousemove="handleMouseMove" @mouseup="handMouseup">
    <header>
      <span @click="runClick">运行</span>
    </header>
    <main>
      <div
        class="code"
        ref="codeViewRef"
        @mousedown="handleMouseDown">
        <CodeView style="width: 100%" ref="codeRef" />
      </div>
      <div class="per-con">
        <PreviewView ref="previewRef" class="perview" />
        <ConsoleView ref="consoleRef" class="console" />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import CodeView from '@/components/CodeView.vue'
import PreviewView from '@/components/PreviewView.vue'
import ConsoleView from '@/components/ConsoleView.vue'

const codeViewRef = ref()
let mousePosition = null
let codeWidth = null
const movePosition = ref()
const isMove = ref()

// 鼠标经过修改样式
const handleMouseMove = ($el: any) => {
  mousePosition = $el.clientX
  codeWidth = codeViewRef.value.clientWidth
  const code = document.querySelector('.code')
  isMove.value = codeWidth - mousePosition <= 4
  if (isMove.value) {
    code.style.cursor = 'move'
  } else {
    code.style.cursor = 'defalue'
  }
}

// 鼠标点击
const handleMouseDown = ($el: any) => {
  const code = document.querySelector('.code')
  if (isMove.value) {
    document.onmousemove = (event) => {
      code.style.cursor = 'move'
      movePosition.value = event.clientX
      console.log(event, 'event')
    }
  }
}

// 鼠标弹起
const handMouseup = () => {
  document.onmousemove = null
  const code = document.querySelector('.code')
  code.style.width = movePosition.value + 'px'
  code.style.cursor = 'default'
}

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
        height: 70%;
      }
      .console {
        height: 30%;
      }
    }
  }
}
</style>
