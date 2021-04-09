<template>
  <div class="search-content">
    <div class="search-content-title">
      <div class="main-title">智能图书馆借阅系统</div>
    </div>
    <a-row class="search-content-main">
      <a-col :xs="{ span: 22, offset: 1 }" :md="{ span: 10, offset: 7 }">
        <a-input size="large" class="main-search-input">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style lang="less" scoped>
.search-content {
  margin-top: 15%;
  @media screen and (max-width: 768px) {
    margin-top: 20%;
  }
  width: 100%;
  .search-content-title {
    display: flex;
    align-items: center;
    justify-content: center;
    .main-title {
      font-family: cursive;
      font-size: 30px;
    }
  }
  .search-content-main {
    /deep/ .main-search-input {
      margin-top: 36px;
      @media screen and (max-width: 768px) {
        margin-top: 48px;
      }
      .ant-input {
        border-radius: 20px;
        height: 46px;
        padding-left: 40px;
      }
      &:hover {
        .ant-input {
          box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
          border: none;
        }
      }
    }
  }
}
</style>
