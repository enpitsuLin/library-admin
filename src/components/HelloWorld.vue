<template>
  <div class="hello">
    <a-menu
      @click="navClick"
      style="width: 256px"
      v-model="currentSelectChild"
      @openChange="onOpenChange"
      :openKeys="currentParent"
      theme="dark"
      mode="inline"
    >
      <!--横向：horizontal-->
      <!--有openKeys时 :defaultOpenKeys="[200]"无效 -->
      <!--有v-model时 :ddefaultSelectedKeys="[202]"无效 -->
      <a-sub-menu v-for="itParent in NavData" :key="itParent.NavID">
        <span slot="title">
          <a-icon :type="itParent.Icons" />
          <span>{{ itParent.Title }}</span>
        </span>
        <a-menu-item v-for="itChild in itParent.Child" :key="itChild.NavID">
          <router-link :to="itChild.Path"
            ><!--根据路径去跳转页面-->
            {{ itChild.Title }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      NavData: [
        {
          NavID: 100,
          Icons: "dashboard",
          Title: "操作",
          Path: "",
          Child: [
            {
              NavID: 101,
              Icons: "",
              Title: "用户",
              Path: "/UserInfo",
            },
            {
              NavID: 102,
              Icons: "",
              Title: "公司",
              Path: "/CompanyInfo",
            },
            {
              NavID: 103,
              Icons: "",
              Title: "部门",
              Path: "/TeamInfo",
            },
          ],
        },
        {
          NavID: 300,
          Icons: "audit",
          Title: "报表",
          Path: "",
          Child: [
            {
              NavID: 301,
              Icons: "",
              Title: "打卡",
              Path: "/Card",
            },
          ],
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
