<!-- home -->
<template>
  <div>
    <div>{{name}}</div>
    <DeleteNative @submit="handleSubmit" @click="handleNativeEvent"></DeleteNative>
    <div class="border-container scale-1px">1px细化处理1</div>
    <div class="grid-container">
      <div class="grid-item red item-1">1</div>
      <div class="grid-item green">2</div>
      <div class="grid-item blue">3</div>
      <div class="grid-item pink">4</div>
      <div class="grid-item black">5</div>
      <div class="grid-item grey">6</div>
      <div class="grid-item yellow">7</div>
      <div class="grid-item orange">8</div>
      <div class="grid-item yellowgreen">9</div>
    </div>
    <div class="grid-container-2">
      <div class="gird-item-2">x</div>
    </div>
    <div class="flex-container">
      <div class="flex-item">1</div>
      <div class="flex-item flex-2">2</div>
      <div class="flex-item">3</div>
    </div>
    <div class="wrap clearfix">
      <div class="aside">xxxxxxxxxxxxxxxxxxxxxxx</div>
      <div class="main">yyyyyyyyyyyyyyy</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import DeleteNative from './components/DeleteNative.vue'
const state = reactive({
  name: '小明',
  age: 11
})
const handleNativeEvent = (event) => {
  console.log(event)
  console.log('handleNativeEvent')
}
const handleSubmit = (value) => {
  console.log(value)
}
const listMap = [{ name: '北京' }, { name: '厦门' }]
const map = new Map(listMap)
console.log(map)
const { name } = toRefs(state)
</script>
<style lang='scss' scoped>
.border-container {
  margin-top: 5px;
  padding: 5px;
  border: 1px solid red;
}
.scale-1px {
    position: relative;
    border:none;
}
.scale-1px::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid red;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
}
.red {
  background: red;
}
.green {
  background: green;
}
.blue {
  background: blue;
}
.pink {
  background: pink;
}
.black {
  background: black;
}
.grey {
  background: grey;
}
.yellow {
  background: yellow;
}
.orange {
  background: orange;
}
.yellowgreen {
  background: yellowgreen;
}
.grid-container {
  display: grid;
  // grid-template-rows: 1fr 2fr 3fr;
  // grid-template-columns: 1fr 2fr 3fr;

  // grid-template-rows: repeat(3, 40px);
  // grid-template-columns: repeat(3, 40px);
  // grid-gap: 10px 20px;
  grid-template-areas: "a b c" "d e f" "g h i";
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}
.grid-item {
  // grid-row-start: 2;
}
.item-1 {
  // grid-row-start: 2;
  // grid-row-end: 3;
  // grid-column-start: 2;
  // grid-column-end: 3;
  grid-area: e;
}
.grid-container-2 {
  width: 600px;
  height: 600px;
  background: pink;
  display: grid;
  // justify-items: center;
  // align-items: center;
  justify-content: center;
  align-content: center;
}
.gird-item-2 {
  width: 100px;
  height: 100px;
  background: yellowgreen;
  // justify-self: center;
  // align-self: center;
}
.flex-container {
  display: flex;
  gap: 5px;
}
.flex-item {
  background: yellow;
  flex: 1;
}
.flex-2 {
  order: 4;
}

.wrap {
  // display: flex;
  height: 200px;
  .aside {
    width: 200px;
    height: 200px;
    background: pink;
    float: left;
  }
  .main {
    // flex: 1;
    height: 200px;
    background: #000000ff;
    overflow: auto;
    transition: visibility 3s;
    &:hover {
      visibility: hidden;
      // display: none;
    }
  }
  .clearfix {
    zoom: 1;
  }
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
  }
}
</style>
