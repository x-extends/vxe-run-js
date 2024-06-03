<template>
  <div
    ref="moveBarRef"
    class='move-bar'
    @mousedown="handleMouseDown"
    @mouseup="handMouseup">
    <div
      v-if="direction === 'x'"
      :class="['direction-x', barActive ? 'bar-active' : '']"
      @mousemove="handleMouseMove('.direction-x')"
      @mouseleave="handleMouseLeave('.direction-x')">
    </div>
    <div
      v-if="direction === 'y'"
      :class="['direction-y', barActive ? 'bar-active' : '']"
      @mousemove="handleMouseMove('.direction-y')"
      @mouseleave="handleMouseLeave('.direction-y')">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  elementView: null,
  direction: null
})

const emit = defineEmits(['changeElement'])

const barActive = ref(false)

const handleMouseMove = (className: string) => {
  const moveBar = document.querySelector(className)
  moveBar.style.cursor = props.direction === 'y' ? 'n-resize' : 'e-resize'
  barActive.value = true
}

const handleMouseLeave = (className: string) => {
  const moveBar = document.querySelector(className)
  moveBar.style.cursor = 'default'
  barActive.value = false
}

const handleMouseDown = ($el: any) => {
  // 获取需要改变的元素信息
  const elementWidth = props.elementView.clientWidth
  const elementHeight = props.elementView.clientHeight
  const currentX = $el.clientX
  const currentY = $el.clientY
  console.log(elementWidth, 'elementWidth')
  console.log(elementHeight, 'elementHeight')
  document.onmousemove = (event) => {
    let changeResult = null
    if (props.direction === 'x') {
      const moveX = event.clientX - currentX
      changeResult = elementWidth + moveX + 'px'
    } else if (props.direction === 'y') {
      const moveY = event.clientY - currentY
      changeResult = elementHeight + moveY + 'px'
    }
    emit('changeElement', changeResult)
  }
}

// 鼠标弹起
const handMouseup = () => {
  document.onmousemove = null
}
</script>

<style scoped lang="scss">

.direction-x {
  height: 100%;
  width: 8px;
  position: absolute;
  top: 0%;
  right: 0%;
}

.direction-y {
  height: 8px;
  width: 100%;
  position: absolute;
  bottom: 0%;
  right: 0%;
}

.bar-active {
  background-color: rgba(0, 0, 0, .1);
}
</style>
