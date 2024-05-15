<template>
  <div class="vxe-run-page-footer">
    <a class="link" href="http://beian.miit.gov.cn/" target="_blank">粤ICP备2022010374号-1</a>
    <span style="margin-left: 20px;">
      <span>©</span>
      <span><a class="link" :href="baseApiUrl" target="_blank">vxe-table</a> 2018-{{serveTY}}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

const serveTY = computed(() => appStore.serveTY)
const baseApiUrl = computed(() => appStore.baseApiUrl)
</script>

<style lang="scss" scoped>
.vxe-run-page-footer {
  border-top: 1px solid #e2e2e3;
  padding: 8px 0;
  font-size: 12px;
  .link {
    color: #000;
  }
}
</style>
