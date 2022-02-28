<!-- 作用域插槽的使用 -->
<template>
  <div>
    <header>
      <slot name="header" :header="templateObj.header">header</slot>
    </header>
    <main>
      <slot :main="templateObj.main">main</slot>
    </main>
    <footer>
      <slot name="footer" :footer="templateObj.footer">footer</slot>
    </footer>
  </div>
</template>

<script setup>
import { reactive, toRefs, useSlots } from 'vue'
const state = reactive({
  templateObj: {
    header: 'Header',
    main: 'Main',
    footer: 'Footer'
  }
})
const slot = useSlots()
console.log(slot.footer())
const { templateObj } = toRefs(state)
</script>
<style lang='scss' scoped>
</style>
