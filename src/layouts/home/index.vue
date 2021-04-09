<template>
  <a-layout>
    <default-header />
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <default-footer />
  </a-layout>
</template>

<script>
import DefaultHeader from "./header";
import DefaultFooter from "./footer";
export default {
  name: "HomeLayout",
  components: {
    DefaultHeader,
    DefaultFooter,
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-layout-header {
  z-index: 100;
}
/deep/ .ant-layout-content {
  margin: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  padding-top: 48px;
  width: 100%;
  height: 100%;
  z-index: 50;
}
</style>