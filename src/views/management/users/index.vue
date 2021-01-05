<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <info
            title="注册用户数"
            :value="String(pagination.total)"
            :bordered="true"
          />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="借出书籍" value="678本" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="总借阅量" value="9789次" />
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="用户管理">
      <div slot="extra">
        <a-input-search style="margin-left: 16px; width: 272px" />
      </div>

      <a-list size="large" :loading="loading" :pagination="pagination">
        <a-list-item :key="index" v-for="(user, index) in data">
          <a-list-item-meta :description="user.depart">
            <a-avatar
              slot="avatar"
              size="large"
              shape="square"
              :src="getAvatar(user.avatar)"
            />
            <a slot="title">{{ user.name }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="edit(user)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确认删除该用户？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="del(user)"
              placement="left"
            >
              <a-icon slot="icon" type="question-circle-o" style="color: red" />
              <a href="#">删除</a>
            </a-popconfirm>
          </div>

          <div class="list-content">
            <div class="list-content-item">
              <span>学号</span>
              <p>{{ user.identityno }}</p>
            </div>
            <div class="list-content-item">
              <span>性别</span>
              <p>{{ user.sex }}</p>
            </div>
            <div class="list-content-item">
              <span>年龄</span>
              <p>{{ user.age }}</p>
            </div>
            <div class="list-content-item">
              <span>信用等级</span>
              <p>{{ user.credit }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import Info from "./components/Info";
export default {
  components: { Info },
  data() {
    return {
      loading: false,
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50"],
        total: 50,
      },
      data: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    fetch(param = {}) {
      this.loading = true;
      this.$http.get("/users/queryall").then((res) => {
        const pagination = { ...this.pagination };
        pagination.total = res.length;
        this.loading = false;
        this.data = res;
        this.pagination = pagination;
      });
    },
    getAvatar(avatar) {
      return "/uploads/avatar/" + avatar;
    },
    edit(user) {
      console.log(user);
    },
    del(user) {
      this.$http.post(`/users/delete?id=${user.id}`).then((res) => {
        if (res.msg == "USER DELETE SUCCESS") {
          this.$message.success("用户删除成功");
        }
        this.fetch();
      });
    },
  },
};
</script>


<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
