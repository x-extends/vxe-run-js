<template>
  <div class="vxe-run-edit-code">
    <VxeTabs v-model="currentTab" type="border-card" @load="loadTabEvent">
      <VxeTabPane title="HTML" name="HTML">
        <div class="code-view" ref="htmlEditRef"></div>
      </VxeTabPane>
      <VxeTabPane title="CSS" name="CSS">
        <div class="code-view" ref="cssEditRef"></div>
      </VxeTabPane>
      <VxeTabPane title="JS" name="JS">
        <div class="code-view" ref="jsEditRef"></div>
      </VxeTabPane>
    </VxeTabs>
  </div>
</template>

<script setup>
import { nextTick, ref, defineExpose, onMounted } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
// import { oneDark } from '@codemirror/theme-one-dark'

const htmlEditRef = ref()
const cssEditRef = ref()
const jsEditRef = ref()

const currentTab = ref('HTML')

let htmlCode = null
let styleCode = null
let jsCode = null

const loadTabEvent = () => {
  nextTick(() => {
    switch (currentTab.value) {
      case 'HTML':
        htmlCode = new EditorView({
          doc: '',
          extensions: [basicSetup, html()],
          parent: htmlEditRef.value
        })
        break
      case 'CSS':
        styleCode = new EditorView({
          doc: '',
          extensions: [basicSetup, css()],
          parent: cssEditRef.value
        })
        break
      case 'JS':
        jsCode = new EditorView({
          doc: '',
          extensions: [basicSetup, javascript()],
          parent: jsEditRef.value
        })
        break
    }
  })
}

const getValue = () => {
  return {
    htmlCode: htmlCode ? htmlCode.state.doc.toString() : '',
    styleCode: styleCode ? styleCode.state.doc.toString() : '',
    jsCode: jsCode ? jsCode.state.doc.toString() : ''
  }
}

onMounted(() => {
  loadTabEvent()
})

defineExpose({
  getValue
})
</script>

<style scoped lang="scss">
.vxe-run-edit-code {
  width: 100%;
  height: 100%;
  border-right: 1px solid #e2e2e3;
  .code-view {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    background-color: #f3f5f6;
  }
}
</style>
