<template>
  <div class="page-footer">
    <vxe-link href="http://beian.miit.gov.cn/" target="_blank" :content="aqCode">
      <template #icon>
        <img :src="`${resBaseUrl}/badge.png`" style="height: 14px;padding-bottom: 0.2em;">
      </template>
    </vxe-link>
    <span style="margin-left: 20px;">
      <span>©</span>
      <span><VxeLink status="primary" :href="siteBaseUrl" target="_blank">vxe-ui</VxeLink> 2018-{{serveTY}}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const serveTY = computed(() => appStore.serveTY)
const resBaseUrl = computed(() => appStore.resBaseUrl)
const siteBaseUrl = computed(() => appStore.siteBaseUrl)

const aqCode = computed(() => {
  return ''
})
</script>

<style lang="scss">
.page-footer {
  text-align: center;
}
</style>
