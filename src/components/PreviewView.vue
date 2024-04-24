<template>
  <div class="preview">
    <iframe frameborder="0" ref="iframeRef"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const iframeRef = ref('iframeRef')
const previewCode = ref()

const createLink = (value:string) => {
  return '<link rel="stylesheet"' + 'href=' + value + '>'
}

const createScript = (value: string) => {
  return '<script src=' + value + '>' + '<' + '/script>'
}

const loadSrcipr = (values: string) => {
  return '<script>' + values + '<' + '/script>'
}

const createIframe = () => {
  iframeRef.value.contentDocument.write(`
  <html>
    <body>
        ${createLink('https://cdn.jsdelivr.net/npm/vxe-table/lib/style.css')}
        ${createScript('https://cdn.jsdelivr.net/npm/vue')}
        ${createScript('https://cdn.jsdelivr.net/npm/xe-utils')}
        ${createScript('https://cdn.jsdelivr.net/npm/vxe-table')}
        ${loadSrcipr(previewCode.value)}
        123
    </body>
  </html>`)
}

const setValue = (code: any) => {
  console.log(code, '-----')
  previewCode.value = code.jsCode
  createIframe()
}

defineExpose({
  setValue
})
</script>

<style scoped>
iframe {
  height: 100%;
  width: 100%;;
}
</style>
