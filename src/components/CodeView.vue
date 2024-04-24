<template>
  <div>
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
import { javascript } from '@codemirror/lang-javascript'
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
let cssCode = null
let jsCode = null

nextTick(() => {
  htmlCode = new EditorView({
    doc: '',
    cmOptions: {
      mode: 'text/html',
      theme: 'base16-dark',
      lineNumbers: true,
      line: true
    },
    extensions: [basicSetup, javascript()],
    parent: htmlEditRef.value
  })

  cssCode = new EditorView({
    doc: "console.log('CSS')\n",
    extensions: [basicSetup, javascript()],
    parent: cssEditRef.value
  })

  jsCode = new EditorView({
    doc: "console.log('JS')\n",
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
    cssCode: cssCode.state.doc.toString(),
    jsCode: jsCode.state.doc.toString()
  }
}

defineExpose({
  getValue
})
</script>

<style scoped lang="scss">
.code-view {
  height: 100%;
  width: 100%;
}

.tabs {
  height: 40px;
  margin-bottom: 8px;
  .tab-pane {
    width: 80px;
    text-align: center;
    line-height: 40px;
    display: inline-block;
    cursor: pointer;
  }

  .active {
    box-shadow: 0px 1px 0px rgba($color: #000000, $alpha: .2);
  }
}
</style>
