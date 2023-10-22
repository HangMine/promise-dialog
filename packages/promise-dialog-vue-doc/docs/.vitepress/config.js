module.exports = {
  lang: 'zh-CN',
  title: 'Promise Dialog',
  description: '函数式调用对话框',
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
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' }
        ]
      }
    ],
    sidebar: {
      '/': getSidebar()
    }
  }
}

function getSidebar() {
  return [
    {
      text: '指南',
      items: [
        { text: '什么是promise dialog?', link: '/introduction/index' },
        { text: '快速上手', link: '/getting-started/index' },
      ]
    }
  ]
}