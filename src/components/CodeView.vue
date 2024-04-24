<template>
  <div class="code">
    <div class="tabs">
      <span
        :class="['tab-pane', currentTab === item.value ? 'active' : '']"
        v-for="(item, index) in tabList"
        :key="index"
        @click="tabClick(item)">
        {{ item.label }}
      </span>
    </div>
    <div v-show="currentTab === 'HTML'" class="code-view" ref="htmlEditRef"></div>
    <div v-show="currentTab === 'CSS'" class="code-view" ref="cssEditRef"></div>
    <div v-show="currentTab === 'JS'" class="code-view" ref="jsEditRef"></div>
  </div>
</template>

<script setup>
import { nextTick, ref, defineExpose, reactive } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
// import { oneDark } from '@codemirror/theme-one-dark'

const htmlEditRef = ref()
const cssEditRef = ref()
const jsEditRef = ref()

const currentTab = ref('HTML')
const tabList = reactive([
  { label: 'HTML', value: 'HTML' },
  { label: 'CSS', value: 'CSS' },
  { label: 'JS', value: 'JS' }
])

let htmlCode = null
let styleCode = null
let jsCode = null

nextTick(() => {
  htmlCode = new EditorView({
    doc: '',
    extensions: [basicSetup, html()],
    parent: htmlEditRef.value
  })

  styleCode = new EditorView({
    doc: '',
    extensions: [basicSetup, css()],
    parent: cssEditRef.value
  })

  jsCode = new EditorView({
    doc: '',
    extensions: [basicSetup, javascript()],
    parent: jsEditRef.value
  })
})

const tabClick = (item) => {
  currentTab.value = item.label
  console.log(currentTab.value, 'currentTab.value')
}

const getValue = () => {
  return {
    htmlCode: htmlCode.state.doc.toString(),
    styleCode: styleCode.state.doc.toString(),
    jsCode: jsCode.state.doc.toString()
  }
}

defineExpose({
  getValue
})
</script>

<style scoped lang="scss">
.code {
  .tabs {
    height: 40px;
    .tab-pane {
      width: 80px;
      text-align: center;
      line-height: 40px;
      display: inline-block;
      cursor: pointer;
    }

    .active {
      background-color: #f3f5f6;
      box-shadow: 0px -2px 0px rgba($color: #000000, $alpha: .2);
    }
  }
  .code-view {
    height: calc(100% - 48px);
    width: 100%;
    background-color: #f3f5f6;
  }
}
</style>
