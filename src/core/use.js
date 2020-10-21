import Vue from 'vue';


//base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import { VueAxios } from '@/utils/request'


Vue.use(VueAxios)
Vue.use(VueCropper)
Vue.use(Viser)
Vue.use(Antd)