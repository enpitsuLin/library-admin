<template>
  <div :class="wrpCls">
    <avatar-dropdown
      :menu="showMenu"
      :current-user="currentUser"
      :class="prefixCls"
    />
    <select-lang :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from "./AvatarDropdown";
import SelectLang from "@/components/SelectLang/SelectLang";
import { mapState } from "vuex";

export default {
  name: "RightContent",
  components: {
    AvatarDropdown,
    SelectLang,
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
      //currentUser: {},
    };
  },
  computed: {
    ...mapState({
      avatarsrc: (state) => state.user.avatar,
    }),
    currentUser() {
      return {
        name: this.userInfo.name,
        avatar: "/uploads/avatar/" + this.avatarsrc,
      };
    },
    wrpCls() {
      return {
        "ant-pro-global-header-index-right": true,
        [`ant-pro-global-header-index-${
          this.isMobile || !this.topMenu ? "light" : this.theme
        }`]: true,
      };
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
};
</script>
