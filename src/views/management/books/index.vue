<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <!-- item -->
            <a-col :md="16" :sm="24">
              <a-form-item>
                <a-input-group compact>
                  <a-select
                    style="width: 35%"
                    v-model="queryParam.type"
                    placeholder="搜索方式"
                    default-value="0"
                  >
                    <a-select-option value="0">责任者</a-select-option>
                    <a-select-option value="1">书名</a-select-option>
                    <a-select-option value="2">出版社</a-select-option>
                    <a-select-option value="3">ISBN</a-select-option>
                    <a-select-option value="4">索书号</a-select-option>
                  </a-select>
                  <a-input
                    style="width: 65%"
                    v-model="queryParam.key"
                    placeholder=""
                  ></a-input>
                </a-input-group>
              </a-form-item>
            </a-col>

            <!-- button -->
            <a-col :md="{ span: 4 }" :sm="{ span: 24 }">
              <span class="table-page-search-submitButtons">
                <a-button-group>
                  <a-button @click="fetch" type="primary">查询</a-button>
                  <a-button>重置</a-button>
                </a-button-group>

                <a @click="advanced = !advanced" style="margin-left: 8px">
                  {{ advanced ? "收起" : "展开" }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>

            <!-- advance item -->
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="学科">
                  <a-select placeholder="选择学科" v-model="queryParam.class">
                    <a-select-option value="0">自然科学</a-select-option>
                    <a-select-option value="1">数学</a-select-option>
                    <a-select-option value="2">文学</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="出版日期范围">
                  <a-range-picker
                    v-model="queryParam.fromDate"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="语言">
                  <a-select placeholder="语言" v-model="queryParam.class">
                    <a-select-option value="0">汉语</a-select-option>
                    <a-select-option value="1">英语</a-select-option>
                    <a-select-option value="2">日语</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
          </a-row>
        </a-form>
      </div>

      <a-table
        :columns="columns"
        :data-source="data"
        :row-key="(record) => record.no"
        :loading="loading"
        :pagination="pagination"
        size="small"
        :scroll="{ x: 1000 }"
      >
        <span slot="creator" slot-scope="creators">
          {{ process(creators) }}
        </span>
        <span slot="isbn" slot-scope="isbn">
          {{ isbn.substr(0, 3) }}-{{ isbn.substr(3, 1) }}-{{
            isbn.substr(4, 4)
          }}-{{ isbn.substr(8, 4) }}-{{ isbn.substr(12, 1) }}
        </span>
        <span slot="action" slot-scope="record">
          <a @click="view(record)">查看</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              更多<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <a @click="edit(record)">修改</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="1">
                <a @click="del(record)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </a-card>
    <view-modal ref="viewModal" @refresh="refresh" />
  </page-header-wrapper>
</template>
<script>
import ViewModal from "./ViewModal";
const columns = [
  {
    title: "编号",
    dataIndex: "no",
    sorter: (a, b) => a.no - b.no,
    width: 70,
  },
  { title: "书名", dataIndex: "title", width: 120 },
  {
    title: "责任者",
    dataIndex: "creator",
    scopedSlots: { customRender: "creator" },
    ellipsis: true,
    width: 240,
  },
  {
    title: "ISBN",
    dataIndex: "isbn",
    scopedSlots: { customRender: "isbn" },
    width: 160,
  },
  { title: "分类号", dataIndex: "class", width: 60 },
  { title: "出版社", dataIndex: "pub", width: 180, ellipsis: true },
  { title: "索书号", dataIndex: "call", width: 90 },
  {
    title: "操作",
    key: "action",
    width: 110,
    scopedSlots: { customRender: "action", fixed: "right" },
  },
];
export default {
  name: "BookSearch",
  data() {
    return {
      data: [],
      loading: false,
      pagination: {
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
        showQuickJumper: true,
      },
      queryParam: {},
      columns,
      advanced: false,
    };
  },
  components: { ViewModal },
  mounted() {
    this.fetch();
  },
  computed: {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    fetch(param = {}) {
      this.loading = true;
      let queryString = "";

      if (Object.keys(param) == 0) {
        queryString = "/books/queryall";
      } else {
        queryString = "/books/query?";
        let type = Number(this.queryParam.type);

        queryString += ["creator", "title", "pub", "isbn", "call"][type];
        let keyString =
          type == "3"
            ? this.queryParam.key.replaceAll("-", "")
            : this.queryParam.key;
        queryString += "=" + keyString;
      }
      console.log(queryString);
      this.$http.get(queryString).then((res) => {
        const pagination = { ...this.pagination };
        pagination.total = res.length;
        this.loading = false;
        for (let i of res) {
          i.creator = JSON.parse(i.creator);
        }
        this.data = res;
        this.pagination = pagination;
      });
    },
    process(creators) {
      let result = "";
      for (const i in creators.main) {
        if (i > 0) result += ";";
        result += creators.main[i];
        result += " " + creators.method;
      }
      if (creators.addition) {
        for (const i in creators.addition) {
          result += ";";
          result += creators.addition[i].title;
          if (i == creators.addition.length - 1)
            result += " " + creators.addition[i].method;
        }
      }
      return result;
    },
    /**
     * edit
     */
    edit(item) {
      this.$refs.viewModal.edit(item);
    },
    view(item) {
      this.$refs.viewModal.show(item);
    },
    del(item) {
      console.log(item.no);
      this.$http.post("/books/delete", { no: item.no }).then((res) => {
        if (res.msg == "BOOK DELETE SUCCESS") {
          this.$notification.open({
            message: "书籍删除成功",
            description: `书籍${item.title}书籍删除成功成功！`,
            icon: <a-icon type="check" style="color: #10ee99" />,
          });
        } else {
          this.$notification.warning({
            message: "书籍书籍删除成功失败",
            description: `书籍${item.title}书籍删除成功失败,请检查网络连接！`,
            icon: <a-icon type="exclamation" style="color: #ee1111" />,
          });
        }
      });
      this.refresh();
    },
    refresh() {
      this.fetch();
    },
  },
};
</script>

<style>
</style>