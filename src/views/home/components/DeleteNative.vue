<!-- 移除v-on.native修饰符 -->
<template>
  <div>
    <button @click="submit">按钮</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['submit'])
const submit = (e) => {
  emit('submit', e)
}
</script>
<style lang='scss' scoped>
</style>
