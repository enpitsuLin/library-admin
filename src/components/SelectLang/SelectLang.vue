<template>
  <a-dropdown placement="bottomRight">
    <span :class="prefixCls">
      <a-icon type="global" :title="i18nRender('navBar.lang')" />
    </span>
    <template v-slot:overlay>
      <a-menu
        :class="['menu', 'ant-pro-header-menu']"
        :selectedKeys="[currentLang]"
        v-on:click="changeLang"
      >
        <a-menu-item v-for="locale in locales" :key="locale">
          <span role="img" :aria-label="languageLabels[locale]">{{
            languageIcons[locale]
          }}</span>
          {{ languageLabels[locale] }}
        </a-menu-item>
      </a-menu></template
    >
  </a-dropdown>
</template>

<script>
import { i18nRender } from "@/locales";
import i18nMixin from "@/store/i18n-mixin";

export default {
  name: "SelectLang",
  mixins: [i18nMixin],
  props: {
    prefixCls: {
      type: String,
      default: "ant-pro-drop-down",
    },
  },
  components: {},
  data() {
    return {
      locales: ["zh-CN", "en-US"],
      languageLabels: {
        "zh-CN": "简体中文",
        "en-US": "English",
      },
      languageIcons: {
        "zh-CN": "🇨🇳",
        "en-US": "🇺🇸",
      },
    };
  },
  methods: {
    i18nRender,
    changeLang: function ({ key }) {
      this.setLang(key);
    },
  },
};
</script>


<style lang="less">
@import "~ant-design-vue/es/style/themes/default";

@header-menu-prefix-cls: ~"@{ant-prefix}-pro-header-menu";
@header-drop-down-prefix-cls: ~"@{ant-prefix}-pro-drop-down";

.@{header-menu-prefix-cls} {
  .anticon {
    margin-right: 8px;
  }
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}

.@{header-drop-down-prefix-cls} {
  line-height: @layout-header-height;
  vertical-align: top;
  cursor: pointer;

  > i {
    font-size: 16px !important;
    transform: none !important;

    svg {
      position: relative;
      top: -1px;
    }
  }
}
</style>