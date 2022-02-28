<!-- 登录页面 -->
<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="120px">
      <el-form-item label="phone" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">登 录</el-button>
      </el-form-item>
    </el-form>
    <app-slot>
      <template #header="{ header }">{{header}}</template>
      <template #default="mainSlot">{{mainSlot.main}}</template>
      <!-- <template #footer="footerSlot">{{footerSlot.footer}}</template> -->
      <template #footer>fff</template>
    </app-slot>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Api from '@/api'

const form = reactive({
  phone: '',
  password: ''
})
const submit = () => {
  Api.user.login(form).then(res => {
    console.log(res)
  })
}
</script>
<style lang='scss' scoped>

</style>
