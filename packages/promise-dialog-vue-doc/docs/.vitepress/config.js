module.exports = {
  lang: 'zh-CN',
  title: 'Promise Dialog',
  description: '函数式调用对话框',
  cleanUrls: true,
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: [
    '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
    '@vuepress/back-to-top',          // 返回顶部插件
    '@vuepress/medium-zoom',          // 图片预览插件
    '@vuepress/nprogress',        //页面顶部进度条
  ],
  // cleanUrls: true,

  // 主题配置
  themeConfig: {
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    // lastUpdated: 'Last Updated', // string | boolean
    // 启动页面丝滑滚动
    smoothScroll: true,
    // 导航栏配置
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: 'vue', link: '/api/setup' },
    ],
    sidebar: {
      '/': getSidebar(),
      '/api/': getApiSidebar(),
    },
    outline: {
      level: [2, 3]
    }
  }
}

function getSidebar() {
  return [
    {
      text: '开始',
      items: [
        { text: '简介', link: '/guide/introduction' },
        { text: '快速上手', link: '/guide/getting-started' },
      ]
    }
  ]
}

function getApiSidebar() {
  return [
    {
      text: 'API',
      items: [
        { text: '安装', link: '/api/setup' },
        { text: '使用', link: '/api/use' },
      ]
    }
  ]
}