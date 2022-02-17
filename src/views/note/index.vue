<!--  -->
<template>
  <div>
    <app-pagination></app-pagination>
    <el-form ref="formRef" :model="state.form" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="state.form.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="state.form.content" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="add">提 交</el-button>
      </el-form-item>
    </el-form>
    <el-table :data='state.dataList'>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import Api from '@/api'
const state = reactive({
  form: {
    title: '',
    content: ''
  },
  dataList: []
})
const getList = async () => {
  const { success, data } = await Api.note.findAllNote()
  if (success) {
    state.dataList = data
  }
}
const add = async () => {
  const { success } = await Api.note.createNote(state.form)
  if (success) {
    getList()
  }
}
const remove = async (id) => {
  const { success } = await Api.note.removeNote({ id })
  if (success) {
    getList()
  }
}
onMounted(() => {
  getList()
})
</script>
<style lang='scss' scoped>
</style>
