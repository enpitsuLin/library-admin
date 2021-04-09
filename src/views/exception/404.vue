<template>
  <a-result
    status="404"
    title="404"
    sub-title="抱歉，你访问的页面不存在或仍在开发中"
  >
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "Exception404",
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
