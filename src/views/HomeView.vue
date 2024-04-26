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
        <div
          class="perview"
          ref="perviewRef">
          <PreviewView ref="previewViewRef"/>
          <div class="flod" v-if="isFlod"></div>
        </div>
        <div
          class="console"
          ref="consoleRef"
          @mousedown="consoleMouseDown">
          <ConsoleView ref="consoleViewRef"/>
        </div>
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
const perviewRef = ref()
const consoleRef = ref()
let mousePosition = null
let codeWidth = null
const movePosition = ref()
const isMove = ref()
const isFlod = ref(false)

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
  const codeWidth = codeViewRef.value.clientWidth
  const currentX = $el.clientX
  if (isMove.value) {
    document.onmousemove = (event) => {
      isFlod.value = true
      code.style.cursor = 'move'
      movePosition.value = event.clientX
      const moveX = event.clientX - currentX
      code.style.width = codeWidth + moveX + 'px'
    }
  }
}

const consoleMouseDown = ($el: any) => {
  const cons = document.querySelector('.console')
  const perview = document.querySelector('.perview')
  const consoleHeight = consoleRef.value.clientHeight
  const perviewHeight = perviewRef.value.clientHeight
  const currentY = $el.clientY
  if (isMove.value) {
    document.onmousemove = (event) => {
      isFlod.value = true
      cons.style.cursor = 'move'
      movePosition.value = event.clientX
      const moveY = event.clientY - currentY
      cons.style.height = consoleHeight - moveY + 'px'
      perview.style.height = perviewHeight + moveY + 'px'
      console.log(cons.style.height, 'move')
    }
  }
}

// 鼠标弹起
const handMouseup = () => {
  isFlod.value = false
  document.onmousemove = null
  const code = document.querySelector('.code')
  // code.style.width = movePosition.value + 'px'
  code.style.cursor = 'default'
}

const codeRef = ref()
const previewViewRef = ref()
const consoleViewRef = ref()

const runClick = () => {
  const codeValue = codeRef.value.getValue()
  previewViewRef.value.setValue({
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
      min-width: 20%;
      height: 100%;
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
        .flod {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #000;
        }
      }
      .console {
        flex: 1;
        background-color: #928c8c;
      }
    }
  }
}
</style>
