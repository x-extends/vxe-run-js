<template>
  <div class="vxe-run-edit-preview">
    <iframe frameborder="0" ref="iframeRef" class="iframe" onerror=""></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const iframeRef = ref()
const htmlCode = ref()
const styleCode = ref()
const jsCode = ref()
const consoleOutput = ref('')

const createLink = (value:string) => {
  return '<link rel="stylesheet"' + 'href=' + value + '>'
}

const createScript = (value: string) => {
  return '<script src=' + value + '>' + '<' + '/script>'
}

const loadHtml = (value: string) => {
  return value
}

const loadStyle = (value: string) => {
  return '<style>' + value + '<' + '/style>'
}

const loadSrcipt = (value: string) => {
  return '<script>' + value + '<' + '/script>'
}

const createIframe = () => {
  iframeRef.value.contentDocument.write(`
  <html>
    <head>
        ${createLink('https://cdn.jsdelivr.net/npm/vxe-pc-ui@4.2.20/lib/style.css')}
        ${createLink('https://cdn.jsdelivr.net/npm/vxe-table@4.7.87/lib/style.css')}
        ${loadStyle(styleCode.value)}
    </head>
    <body>
        ${createScript('https://cdn.jsdelivr.net/npm/vue@3.4.27')}
        ${createScript('https://cdn.jsdelivr.net/npm/xe-utils')}
        ${createScript('https://cdn.jsdelivr.net/npm/vxe-pc-ui@4.2.20')}
        ${createScript('https://cdn.jsdelivr.net/npm/vxe-table@4.7.87')}
        ${loadHtml(htmlCode.value)}
        ${loadSrcipt(jsCode.value)}
    </body>
  </html>`)
  iframeRef.value.contentWindow.onerror = errorEvent
  iframeRef.value.contentWindow.console.log = (...args: any) => {
    consoleOutput.value += args.join(' ') + '\n'
  }
}

const emit = defineEmits(['errorLog'])
const errorEvent = (message: any, source: any, lineno: any, colno: any, error: any) => {
  emit('errorLog', {
    message,
    source,
    lineno,
    colno,
    error
  })
  return true
}

const setValue = (code: any) => {
  if (iframeRef.value.contentDocument && iframeRef.value.contentDocument.body) {
    iframeRef.value.contentDocument.body.innerHTML = ''
  } else if (iframeRef.value.contentWindow) {
    iframeRef.value.onload = () => {
      iframeRef.value.contentWindow.document.body.innerHTML = ''
    }
  }
  htmlCode.value = code.htmlCode
  styleCode.value = code.styleCode
  jsCode.value = code.jsCode
  createIframe()
}

defineExpose({
  setValue
})
</script>

<style scoped>
.vxe-run-edit-preview {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e2e2e3;
}
iframe {
  height: 100%;
  width: 100%;;
}
</style>
