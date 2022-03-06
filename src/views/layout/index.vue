<!--  -->
<template>
  <div class="wrap">
    <div class="top">1</div>
    <div class="main">2</div>
  </div>
</template>

<script setup>

</script>
<style lang='scss' scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  .top {
    height: 100px;
    background: pink;
  }
  .main {
    background: yellow;
    height: calc(100% - 100px);
  }
}
</style>
