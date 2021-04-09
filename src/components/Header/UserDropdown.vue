<template>
  <a-dropdown
    v-if="currentUser && currentUser.name"
    placement="bottomLeft"
    overlayClassName="short-item"
  >
    <div class="header-drop-down-name">
      <a-avatar
        size="small"
        :src="currentUser.avatar"
        class="antd-pro-global-header-index-avatar"
        v-if="!hideAvatar"
      />
      <span>{{ currentUser.name }}</span>
    </div>
    <template v-slot:overlay>
      <a-menu class="header-drop-down menu" :selected-keys="[]">
        <a-menu-item v-for="item in menuList" :key="item.label">
          <router-link :to="item.route" custom>
            <a-icon :type="item.icon" />{{ item.label }}
          </router-link>
        </a-menu-item>

        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from "ant-design-vue";

export default {
  name: "UserDropdown",
  props: {
    currentUser: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
    hideAvatar: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      default: () => {
        return [
          {
            label: "进入系统",
            route: "/dashboard",
            icon: "desktop",
          },
          {
            label: "个人设置",
            route: "/account/settings",
            icon: "setting",
          },
        ];
      },
    },
  },

  methods: {
    // eslint-disable-next-line
    handleLogout(e) {
      Modal.confirm({
        title: "提示",
        content: "确定要登出吗?",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          return this.$store.dispatch("Logout").then(() => {
            this.$router.push("/home");
          });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/theme";
.header-drop-down-name {
  font-size: 13px;
  cursor: pointer;
  span {
    margin-left: 8px;
  }
}
.short-item {
  width: 120px;
  .ant-dropdown-menu-item {
    min-width: 120px !important;
  }
}
.header-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
    .anticon {
      margin-right: 8px;
    }
  }
}
</style>
