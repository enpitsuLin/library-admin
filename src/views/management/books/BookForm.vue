<template>
  <a-form>
    <a-form-item label="title"></a-form-item>
    <a-form-item label="isbn"></a-form-item>
    <a-form-item label="publish"></a-form-item>
    <a-form-item label="note"></a-form-item>
  </a-form>
</template>

<script>
export default {
  props: {
    bookData: Object,
  },
  data() {
    return {
      type: "",
    };
  },
};
</script>

<style>
</style>