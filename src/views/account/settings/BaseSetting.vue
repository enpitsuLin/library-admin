<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col
        :md="24"
        :lg="{ span: '8', push: '16' }"
        :style="{ minHeight: '180px', marginBottom: '20px' }"
      >
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="currentUser.avatar" />
        </div>
      </a-col>
      <a-col :md="24" :lg="{ span: '16', pull: '8' }">
        <a-form-model ref="settingForm" layout="vertical" :model="form" :rules="rules">
          <a-form-model-item label="昵称">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="自我介绍">
            <a-textarea rows="4" v-model="form.intro" />
          </a-form-model-item>
          <a-row>
            <a-col span="8">
              <a-form-model-item label="性别">
                <a-select v-model="form.sex">
                  <a-select-option :value="-1">保密</a-select-option>
                  <a-select-option :value="0">男</a-select-option>
                  <a-select-option :value="1">女</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col span="15" offset="1">
              <a-form-model-item label="电子邮件">
                <a-input v-model="form.email" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item label="联系电话">
            <a-input v-model="form.phone" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" :loading="loading" @click="onSaveClick()">
              <span>保存</span>
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
    <avatar-modal ref="modal" @ok="setavatar" />
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { mapGetters } from 'vuex'

export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      loading: false,
      form: { name: '', sex: 0, email: '', intro: '', avatar: '', phone: '' },
      rules: {
        name: [{ required: true, message: '输入昵称', trigger: 'blur' }]
      },
      // 缓存用于修改头像
      currentUser: {}
    }
  },
  computed: {
    ...mapGetters(['CurrentUser'])
  },
  created() {},
  mounted() {
    this.currentUser = JSON.parse(JSON.stringify(this.CurrentUser))
  },
  methods: {
    onSaveClick() {
      this.loading = true
      this.$refs.settingForm.validate((valid) => {
        if (valid) {
          setTimeout(() => {
            console.log(this.form)
            this.$message.success('修改成功')
            this.loading = false
          }, 1000)
        } else {
          return false
        }
      })
    },
    setavatar(avatar) {
      if (!(avatar == '' || avatar == undefined)) {
        let avatarsrc = `/uploads/avatar/${avatar}`
        this.currentUser.avatar = avatarsrc
        this.form.avatar = avatar
      }

      // this.$store.commit("SET_AVATAR", url);
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
