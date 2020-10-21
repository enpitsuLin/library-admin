<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px"
            message="账户或密码错误"
          />

          <a-form-item>
            <a-input
              type="text"
              size="large"
              placeholder="账户名或邮箱"
              v-decorator="[
                'username',
                {
                  rules: [
                    { required: true, message: '请输入帐户名或邮箱地址' },
                    { validator: handleUsernameOrEmail },
                  ],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              ></a-icon>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              size="large"
              placeholder="密码"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: 'blur',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              ></a-icon>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-decorator="[
                'mobile',
                {
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '请输入正确的手机号',
                    },
                  ],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="[
                    'captcha',
                    {
                      rules: [{ required: true, message: '请输入验证码' }],
                      validateTrigger: 'blur',
                    },
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    :style="{ color: 'rgba(0,0,0,.25)' }"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="
                  (!state.smsSendBtn && '获取验证码') || state.time + ' s'
                "
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]"
          >自动登录</a-checkbox
        >
        <label class="forge-password">
          <a href="#">忘记密码</a>
        </label>
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >确定</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";

export default {
  data() {
    return {
      timeFix: timeFix(),
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
      },
    };
  },
  methods: {
    ...mapActions(["Login", "Logout"]),
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login,
      } = this;

      state.loginBtn = true;

      const validateFieldsKey =
        customActiveKey === "tab1"
          ? ["username", "password"]
          : ["mobile", "captcha"];

      validateFields(
        validateFieldsKey,
        {
          force: true,
        },
        (err, values) => {
          if (!err) {
            //console.log("login form", values);
            const loginParams = {
              ...values,
            };
            delete loginParams.username;
            loginParams[!state.loginType ? "email" : "username"] =
              values.username;
            loginParams.password = values.password; //md5(values.password);
            Login(loginParams)
              .then((res) => this.loginSuccess(res))
              .catch((err) => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false;
              });
          } else {
            setTimeout(() => {
              state.loginBtn = false;
            }, 600);
          }
        }
      );
    },
    // eslint-disable-next-line no-unused-vars
    loginSuccess(res) {
      this.$router.push({
        path: "/",
      });
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: "欢迎",
          description: `${timeFix()}，欢迎回来`,
        });
      }, 1000);
      this.isLoginError = false;
    },
    requestFailed(err) {
      this.isLoginError = true;
      this.$notification["error"]({
        message: "错误",
        description:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试",
        duration: 4,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .ant-checkbox-wrapper {
    float: left;
  }

  .forge-password {
    font-size: 14px;
    float: right;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
