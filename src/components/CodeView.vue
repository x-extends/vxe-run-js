<template>
  <div class="vxe-run-edit-code">
    <VxeTabs class="vxe-run-edit-code-tabs" v-model="currentTab" type="border-card" @tab-load="loadTabEvent">
      <VxeTabPane title="HTML" name="HTML">
        <div class="code-view" ref="htmlEditRef"></div>
      </VxeTabPane>
      <VxeTabPane title="JS" name="JS">
        <div class="code-view" ref="jsEditRef"></div>
      </VxeTabPane>
      <VxeTabPane title="CSS" name="CSS">
        <div class="code-view" ref="cssEditRef"></div>
      </VxeTabPane>
    </VxeTabs>
  </div>
</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { basicSetup, EditorView } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { parseV4OptionCode } from '@/commom/parse'
// import { oneDark } from '@codemirror/theme-one-dark'

const route = useRoute()

const htmlEditRef = ref()
const cssEditRef = ref()
const jsEditRef = ref()

const currentTab = ref('HTML')

let htmlCode = null
let styleCode = null
let jsCode = null

const defHtml = `
<div id="app">
  <vxe-table
    :data="tableData">
    <vxe-column type="seq" width="70"></vxe-column>
    <vxe-column field="name" title="Name"></vxe-column>
    <vxe-column field="sex" title="Sex"></vxe-column>
    <vxe-column field="age" title="Age"></vxe-column>
  </vxe-table>
</div>
`

const defJs = `
var App = {
  data () {
    const tableData = [
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
    ]
    return {
      tableData
    }
  }
}
Vue.createApp(App).use(VxeUI).use(VXETable).mount('#app')
`

const loadTabEvent = () => {
  nextTick(() => {
    switch (currentTab.value) {
      case 'HTML':
        htmlCode = new EditorView({
          doc: defHtml,
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
          doc: defJs,
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
  const optionId = route.query.optionId
  const rest = parseV4OptionCode(optionId)
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
    overflow: auto;
    height: 100%;
    width: 100%;
  }
}
.vxe-run-edit-code-tabs,
.vxe-run-edit-code-tabs ::v-deep(.cm-editor) {
  height: 100%;
}
</style>
