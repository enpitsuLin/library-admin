import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'


const components = {
    antLocale: antd,
    momentName: 'zh-cn',
    momentLocale: momentCN,
}

const locale = {
    'message': '-',
    'menu.home': '主页',
    'menu.dashboard': '仪表盘',
    'menu.dashboard.analysis': '分析页',
    'menu.dashboard.monitor': '监控页',
    'menu.dashboard.workplace': '工作台',
    'menu.management': '数据管理',
    'menu.management.book': '藏书管理',
    'menu.management.user': '用户管理',
    'menu.account': '个人页',
    'menu.account.profile': '个人中心',
    'menu.account.profile.base': '基础设置',


    'navBar.lang': '更改语言',

    'layouts.usermenu.dialog.title': '提示',
    'layouts.usermenu.dialog.content': '确定要登出吗?',
    'layouts.usermenu.dialog.ok': '确定',
    'layouts.usermenu.dialog.cancel': '取消',

    'app.setting.pagestyle': '页面风格',
    'app.setting.pagestyle.light': '明亮模式',
    'app.setting.pagestyle.dark': '黑暗模式',
    'app.setting.pagestyle.realdark': 'RealDark style',
    'app.setting.themecolor': '主题颜色',
    'app.setting.navigationmode': '导航模式',
    'app.setting.content-width': '内容区域宽度',
    'app.setting.fixedheader': '固定Header',
    'app.setting.fixedsidebar': '固定Sidebar',
    'app.setting.fixedsidebar.hint': '侧边栏导航时可配置',
    'app.setting.sidemenu': '侧边栏导航',
    'app.setting.topmenu': '顶部栏导航',
    'app.setting.content-width.fixed': '固定',
    'app.setting.content-width.fluid': '流动',
    'app.setting.othersettings': '其他设置',
    'app.setting.weakmode': '色弱模式',
    'app.setting.copy': '复制设置',
    'app.setting.loading': '加载主题',
    'app.setting.copyinfo': '复制完毕',
    'app.setting.production.hint': '配置栏只在开发环境用于预览，生产环境不会展现，请手动修改配置文件。修改配置文件后，需要清空本地缓存和LocalStorage'
}

export default {
    ...components,
    ...locale
}