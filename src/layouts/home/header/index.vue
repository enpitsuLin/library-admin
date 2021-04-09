<template>
  <a-layout-header class="home-header">
    <a-row
      type="flex"
      justify="space-between"
      align="middle"
      class="header-mian"
    >
      <a-col class="header-left-acion">
        <img src="@/assets/logo.png" class="logo" />
        <router-link to="/">
          <div class="header-title">宁财院图书馆</div>
        </router-link>
      </a-col>
      <a-col class="header-right-action">
        <!-- <div class="header-setting">设置</div> -->
        <user-dropdown v-if="isLogin" :current-user="currentUser" />
        <router-link v-else to="/login" v-slot="{ isActive }" custom>
          <a-button
            type="primary"
            class="header-setting-button"
            v-if="!isActive"
            @click="toLogin"
          >
            登陆
          </a-button>
        </router-link>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import UserDropdown from "@/components/Header/UserDropdown";
import { mapGetters } from "vuex";

export default {
  name: "HomeHeader",
  components: {
    UserDropdown,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isLogin", "CurrentUser"]),
    currentUser() {
      return this.CurrentUser;
    },
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.home-header {
  background-color: #a89b9b;
  height: 48px;
  line-height: 48px;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
  .header-mian {
    width: 100%;
    margin: 0 auto;
    .header-left-acion {
      display: flex;
      align-items: center;
      padding-left: 100px;
      @media screen and (max-width: 768px) {
        padding-left: 0;
      }
      img {
        width: 20px;
      }
      .header-title {
        font-family: cursive;
        margin: 0 0 0 10px;
        font-size: 20px;
        font-weight: 700;
        color: #3f3f3f;
        cursor: pointer;
      }
    }
    .header-right-action {
      display: flex;
      align-items: center;
      .header-setting {
        font-size: 13px;
        cursor: pointer;
      }
      .header-setting-button {
        margin-left: 20px;
        height: 30px;
        line-height: 1;
        font-size: 13px;
      }
    }
  }
}
</style>