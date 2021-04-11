<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <img src="@/assets/logo.png" />
        <h1>宁财院图书馆</h1>
      </div>
    </template>
    <template v-slot:headerContentRender>
      <div class="ant-pro-global-header-trigger">
        <a-tooltip title="刷新页面">
          <a-icon
            type="reload"
            style="font-size: 18px; cursor: pointer"
            @click="windows.reload()"
          />
        </a-tooltip>
      </div>
    </template>
    <template v-slot:rightContentRender>
      <right-content :top-menu="false" :is-mobile="false" theme="light" />
    </template>
    <router-view />
  </pro-layout>
</template>
<script>
import ProLayout from '@ant-design-vue/pro-layout'
import RightContent from '@/components/Header/RightContent'
import { asyncRouterMap } from '@/router/routes/'

export default {
  name: 'BasicLayout',
  components: {
    ProLayout,
    RightContent
  },
  data() {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: 'Library admin',
      // 媒体查询
      query: {},
      // 是否手机模式
      isMobile: false
    }
  },
  created() {
    const routes = asyncRouterMap.find((item) => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit('sidebar_type', this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit('is_mobile', this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },

  methods: {
    handleMediaQuery(query) {
      this.query = query
      if (this.isMobile && !query['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && query['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
      }
    },
    handleCollapse(collapsed) {
      this.collapsed = collapsed
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
