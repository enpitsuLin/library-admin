import Vue from 'vue'
import Antd from 'ant-design-vue'
import '../style/theme.less'
import { VueAxios } from '@/utils/request'
import VueCropper from 'vue-cropper'

Vue.use(Antd)
Vue.use(VueAxios)
Vue.use(VueCropper)