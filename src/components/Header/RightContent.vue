<template>
  <div :class="wrpCls">
    <user-dropdown
      :menu="showMenu"
      :current-user="currentUser"
      :class="prefixCls"
    />
  </div>
</template>

<script>
import UserDropdown from "./UserDropdown";
import { mapGetters } from "vuex";
export default {
  name: "RightContent",
  components: {
    UserDropdown,
  },
  props: {
    prefixCls: {
      type: String,
      default: "ant-pro-global-header-index-action",
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
    topMenu: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showMenu: true,
    };
  },
  computed: {
    wrpCls() {
      return {
        "ant-pro-global-header-index-right": true,
        [`ant-pro-global-header-index-${
          this.isMobile || !this.topMenu ? "light" : this.theme
        }`]: true,
      };
    },
    ...mapGetters(["isLogin", "CurrentUser"]),
    currentUser() {
      return this.CurrentUser;
    },
  },
};
</script>
