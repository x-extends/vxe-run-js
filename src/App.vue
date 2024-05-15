<template>
  <VxeLayoutContainer vertical>
    <VxeLayoutBody>
      <router-view />
    </VxeLayoutBody>
    <VxeLayoutFooter align="center">
      <PageFooter />
    </VxeLayoutFooter>
  </VxeLayoutContainer>
</template>

<script lang="ts" setup>
import PageFooter from '@/components/PageFooter.vue'
</script>
