<template>
  <div class="login-content">
    <div class="login-content-title">
      <div class="main-title" data-v-24ee61b5="">图书馆账号登录</div>
    </div>
    <div class="login-content-main">
      <a-row type="flex" justify="space-between" :gutter="0">
        <a-col :xs="{ span: 0 }" :md="{ span: 11 }">
          <div class="qcode-wrap">
            <div class="qcode-img">
              <img src="" alt="" />
            </div>
            <div class="qcode-footer">
              <span> 请使用微信扫描二维码登录 </span>
            </div>
          </div>
        </a-col>
        <a-col :xs="{ span: 0 }" :sm="{ span: 1 }">
          <a-divider type="vertical" class="divider" />
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 11 }">
          <div class="login-form-wrap">
            <a-form-model
              ref="loginForm"
              class="login-form"
              :model="form"
              :rules="rules"
            >
              <a-form-model-item prop="username">
                <a-input v-model="form.username" />
              </a-form-model-item>
              <a-form-model-item prop="password">
                <a-input-password v-model="form.password" type="password" />
              </a-form-model-item>
              <a-form-model-item>
                <a-button
                  type="primary"
                  @click="onLoginClick()"
                  class="login-form-button"
                  :loading="loginBtnLoading"
                >
                  登录
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";
export default {
  data() {
    return {
      loginBtnLoading: false,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "输入学号/工号", trigger: "blur" },
        ],
        password: [{ required: true, message: "输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(["Login"]),
    onLoginClick() {
      this.loginBtnLoading = true;
      const { form, Login } = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          Login(form).then(() => {
            this.loginBtnLoading = false;
            this.onLoginSuccess();
          });
        } else {
          return false;
        }
      });
    },
    onLoginSuccess() {
      this.$notification.success({
        message: "欢迎",
        description: `${timeFix()}，欢迎回来，现在进入首页`,
      });

      // 延迟 1 秒进入主页
      setTimeout(() => {
        this.$router.push({
          path: "/",
        });
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.login-content {
  width: 100%;
  padding-top: 120px;

  .login-content-title {
    display: flex;
    align-items: center;
    justify-content: center;
    .main-title {
      padding: 0px 0 48px;
      font-size: 25.6px;
      color: #191919;
    }
  }
  .login-content-main {
    padding: 0 18px;
    .qcode-wrap {
      width: 50%;
      margin-left: 50%;
      @media screen and (max-width: 1024px) {
        width: 100%;
        margin: 0 auto;
      }
      .qcode-img {
        width: 200px;
        height: 200px;
        padding: 20px;
        margin: 0 auto;
        background: #f7f7f7;
        border-radius: 8px;
      }
      .qcode-footer {
        margin: 50px 0 0;
        font-size: 12px;
        color: #838383;
        text-align: center;
      }
    }
    .divider {
      height: 240px;
      background: #d9d9d9;
    }
    /deep/ .login-form-wrap {
      width: 50%;
      @media screen and (max-width: 1024px) {
        width: 100%;
        margin: 0 auto;
      }
      .login-form {
        margin: 0 auto;
        .ant-form-explain {
          text-align: left;
        }
        .ant-input {
          width: 100%;
          height: 48px;
          padding-left: 20px;
        }
        .login-form-button {
          margin: 32px 0 0;
          width: 100%;
          height: 48px;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
