<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16"
      ><a-col
        :md="24"
        :lg="{ span: '8', push: '16' }"
        :style="{ minHeight: '180px', marginBottom: '20px' }"
      >
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="avatarsrc" />
        </div>
      </a-col>
      <a-col :md="24" :lg="{ span: '16', pull: '8' }">
        <a-form
          :model="user"
          layout="vertical"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item label="昵称">
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: false, message: '不能为空' }] },
              ]"
            />
          </a-form-item>

          <a-form-item label="自我介绍">
            <a-textarea rows="4" v-decorator="['introduction']" />
          </a-form-item>
          <a-row>
            <a-col span="8">
              <a-form-item label="性别">
                <a-select v-decorator="['sex']">
                  <a-select-option :value="0">保密</a-select-option>
                  <a-select-option :value="1">男</a-select-option>
                  <a-select-option :value="2">女</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="15" offset="1">
              <a-form-item label="电子邮件">
                <a-input v-decorator="['email']"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <a-button htmlType="submit" type="primary" :loading="loading">
              <span>保存</span>
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <avatar-modal ref="modal" @ok="setavatar" />
  </div>
</template>

<script>
import AvatarModal from "./AvatarModal";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    AvatarModal,
  },
  data() {
    return {
      user: { name: "", sex: 0, introduction: "" },
      avatarsrc: "",
      option: {
        img: "/avatar2.jpg",
      },
      form: this.$form.createForm(this),
      loading: false,
    };
  },
  methods: {
    ...mapActions(["GetInfo"]),
    setavatar(url) {
      this.avatarsrc = "/uploads/avatar/" + url;
      this.$store.commit("SET_AVATAR", url);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields((error, values) => {
        console.log(values);
        if (!error) {
          const data = values;
          this.$http.post("/admin/updateinfo", data).then((response) => {
            let res = response.result;
            if (res.status === "done") {
              this.GetInfo();
              this.$message.success("修改成功");
              this.loading = false;
            }
          });
        }
      });
    },
  },
  created() {
    let { name, sex, email, introduction } = { ...this.info };
    this.user = { name, sex, email, introduction: introduction || "" };
    this.setavatar(this.info.avatar);
  },
  mounted: function () {
    this.form.setFieldsValue(this.user);
  },
  computed: {
    ...mapState({
      avatar: (state) => state.user.avatar,
      info: (state) => state.user.info,
    }),
  },
};
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
  max-width: 180px;
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
