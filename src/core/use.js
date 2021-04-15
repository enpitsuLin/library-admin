import Vue from 'vue'
import Antd from 'ant-design-vue'
import '../style/theme.less'
import { VueAxios } from '@/utils/request'
import VueCropper from 'vue-cropper'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'


Vue.use(Antd)
Vue.use(VueAxios)
Vue.use(VueCropper)


Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)