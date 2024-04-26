<template>
  <div class="preview">
    <iframe frameborder="0" ref="iframeRef"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const iframeRef = ref()
const htmlCode = ref()
const styleCode = ref()
const jsCode = ref()

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
        ${createLink('https://cdn.jsdelivr.net/npm/vxe-table/lib/style.css')}
        ${loadStyle(styleCode.value)}
    </head>
    <body>
        ${createScript('https://cdn.jsdelivr.net/npm/vue')}
        ${createScript('https://cdn.jsdelivr.net/npm/xe-utils')}
        ${createScript('https://cdn.jsdelivr.net/npm/vxe-table')}
        ${loadHtml(htmlCode.value)}
        ${loadSrcipt(jsCode.value)}
    </body>
  </html>`)
}

const errorEvent = (message: any, source: any, lineno: any, colno: any, error: any) => {
// emit('error-log', event)
  console.log(message, source, lineno, colno, error)
}

const setValue = (code: any) => {
  iframeRef.value.contentDocument.close()
  htmlCode.value = code.htmlCode
  styleCode.value = code.styleCode
  jsCode.value = code.jsCode
  createIframe()
  iframeRef.value.contentDocument.onerror = errorEvent
}

defineExpose({
  setValue,
  errorEvent
})
</script>

<style scoped>
.preview {
  width: 100%;
  height: 100%;
}
iframe {
  height: 100%;
  width: 100%;;
}
</style>
