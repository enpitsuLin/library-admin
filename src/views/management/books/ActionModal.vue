<template>
  <a-modal
    :title="title"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="loading"
    :width="800"
    @cancel="handleCancel"
  >
    <book-form></book-form>
    <template v-slot:footer>
      <a-button @click="handleCancel">
        <span>取消</span>
      </a-button>
      <a-button type="primary" :loading="loading" @click="handleOk">
        <span>{{ confirm }}</span>
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import BookForm from "./BookForm";

export default {
  data() {
    return {
      data: {},
      type: "view",
      visible: false,
      loading: false,
    };
  },
  components: { BookForm },
  computed: {
    title() {
      let result = "查看";
      if (this.type == "add") result = "新增图书";
      else if (this.type == "edit") result = "修改";
      return result;
    },
    confirm() {
      let result = "确定";
      if ((this.type == "add") | "edit") result = "提交";
      return result;
    },
  },
  methods: {
    view(data) {
      this.type = "view";
      this.visible = true;
      this.data = data;
    },
    edit(data) {
      this.type = "edit";
      this.visible = true;
      this.data = data;
    },
    add() {
      this.type = "add";
      this.visible = true;
    },
    close() {
      this.id = null;
      this.visible = false;
    },
    handleCancel() {
      this.close();
    },
    // eslint-disable-next-line no-unused-vars
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
