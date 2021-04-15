<template>
  <div class="security-settings-info-view">
    <a-form-model ref="passForm" :model="passForm" :rules="rules">
      <a-form-model-item has-feedback label="密码" prop="passOld">
        <a-input v-model="passForm.passOld" type="password" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="新的密码" prop="pass">
        <a-input v-model="passForm.pass" type="password" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认新的密码" prop="checkPass">
        <a-input v-model="passForm.checkPass" type="password" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="submitForm('passForm')"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('passForm')"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('输入新的密码'))
      } else if (value.length < 6) {
        callback(new Error('密码不得少于6个字符'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码'))
      } else if (value !== this.passForm.pass) {
        callback(new Error('两次输入的不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      passForm: { passOld: '', pass: '', checkPass: '' },
      rules: {
        passOld: [
          {
            required: true,
            message: '输入当前密码',
            trigger: 'blur'
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: 'change' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post('/admin/updatePassword', this.passForm).then((response) => {
            let res = response.result
            //当前密码正确且修改成功
            if (res.status === 'done') {
              this.$message.success('修改成功')
              this.loading = false
              let secondsToGo = 5
              const modal = Modal.success({
                title: '成功',
                content: `修改密码成功,${secondsToGo}后退出登录`,
                onOk: () => {
                  return this.$store.dispatch('Logout').then(() => {
                    this.$router.push({ name: 'login' })
                  })
                }
              })
              const interval = setInterval(() => {
                secondsToGo -= 1
                modal.update({
                  content: `修改密码成功,${secondsToGo}后退出登录`
                })
              }, 1000)
              setTimeout(() => {
                clearInterval(interval)
                modal.destroy()
                this.$store.dispatch('Logout').then(() => {
                  this.$router.push({ name: 'login' })
                })
              }, secondsToGo * 1000)
            } else {
              Modal.error({
                title: '错误',
                content: '当前密码错误'
              })
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>