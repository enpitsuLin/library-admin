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
                  <a-select-option value="0">责任者</a-select-option>
                  <a-select-option value="1">书名</a-select-option>
                  <a-select-option value="2">出版社</a-select-option>
                  <a-select-option value="3">ISBN</a-select-option>
                  <a-select-option value="4">索书号</a-select-option>
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

      <a-table
        :columns="columns"
        :data-source="data"
        :row-key="(record) => record.no"
        :loading="loading"
        :pagination="pagination"
        size="small"
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
            <a @click="$refs.modal.view(record)">查看</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                更多<a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <a @click="$refs.modal.edit(record)">修改</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="1"> 删除 </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        
      </a-table>
    </a-card>
    <action-modal ref="modal" />
  </page-header-wrapper>
</template>
<script>
import ActionModal from "./ActionModal";

const columns = [
  {
    title: "编号",
    dataIndex: "no",
    sorter: (a, b) => a.no - b.no,
  },
  { title: "书名", dataIndex: "title" },
  {
    title: "责任者",
    dataIndex: "creator",
    scopedSlots: { customRender: "creator" },
    width: 250,
  },
  {
    title: "ISBN",
    dataIndex: "isbn",
    scopedSlots: { customRender: "isbn" },
    width: 160,
  },
  { title: "分类号", dataIndex: "class", width: 60 },
  { title: "出版社", dataIndex: "pub", ellipsis: true },
  { title: "索书号", dataIndex: "call", width: 120 },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action", width: 60 },
  },
];
export default {
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
      filter: {}, //type: string
    };
  },
  components: { ActionModal },
  mounted() {
    this.fetch();
  },
  computed: {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    fetch(param = {}) {
      this.loading = true;
      this.$http.get("/books/queryall").then((res) => {
        const pagination = { ...this.pagination };
        pagination.total = res.length;
        this.loading = false;
        for(let i of res){
          i.creator = JSON.parse(i.creator)
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
        if (i == creators.main.length - 1) result += " 著";
      }
      if (creators.addition) {
        for (const i in creators.addition) {
          if (creators.addition[i].type == "group") continue;
          result += ";";
          result += creators.addition[i].title;
          if (i == creators.addition.length - 1) result += " 译";
        }
      }
      return result;
    },
  },
};
</script>

<style>
</style>