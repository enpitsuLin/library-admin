<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="8">
              <a-form-item>
                <a-select
                  v-model="queryParam.type"
                  placeholder="搜索方式"
                  default-value="0"
                >
                  <a-select-option value="0">作者</a-select-option>
                  <a-select-option value="1">书名</a-select-option>
                  <a-select-option value="2">出版社</a-select-option>
                  <a-select-option value="3">ISBN</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="16">
              <a-form-item label="关键词">
                <a-input v-model="queryParam.key" placeholder=""></a-input>
              </a-form-item>
            </a-col>
            <!-- button -->
            <a-col :md="6">
              <span>
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      
    </a-card>
  </page-header-wrapper>
</template>

<script>
const colunms = [
  { title: "book.no" },
  { title: "book.title" },
  { title: "book.author" },
  { title: "book.isbn" },
  { title: "book.publish" },
  { title: "book.class" },
];
console.log(colunms);
export default {
  data() {
    return {
      queryParam: {},
    };
  },
};
</script>

<style>
</style>