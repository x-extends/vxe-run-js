<template>
  <div>
    <div ref="editRef"></div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'

const editRef = ref()

nextTick(() => {
  // eslint-disable-next-line no-unused-vars
  const a = new EditorView({
    doc: "console.log('hello')\n",
    extensions: [basicSetup, javascript()],
    parent: editRef.value
  })
})
</script>
