module.exports = {
  lang: 'zh-CN',
  title: 'Promise Dialog',
  description: '函数式调用对话框',
  cleanUrls: true,
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/logo.svg' }]
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
    logo: '/logo.svg',
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    // lastUpdated: 'Last Updated', // string | boolean
    // 启动页面丝滑滚动
    smoothScroll: true,
    // 导航栏配置
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: 'vue', link: '/vue/use/setup' },
      { text: 'react', link: '/react/use/setup' },
    ],
    sidebar: {
      '/': getSidebar(),
      '/vue/': getVueSidebar(),
      '/react/': getReactSidebar(),
    },
    outline: {
      level: [2, 3]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HangMine/promise-dialog' },
    ]
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

function getVueSidebar() {
  return [
    {
      text: '使用',
      items: [
        { text: '引入模态框', link: '/vue/use/setup' },
        { text: '使用场景', link: '/vue/use/use' },
      ],
    },
    {
      text: 'API',
      items: [
        { text: 'useDialog', link: '/vue/api/useDialogApi' },
        { text: 'Dialog', link: '/vue/api/DialogApi' },
      ],
    }
  ]
}

function getReactSidebar() {
  return [
    {
      text: '使用',
      items: [
        { text: '引入模态框', link: '/react/use/setup' },
        { text: '使用场景', link: '/react/use/use' },
      ],
    },
    {
      text: 'API',
      items: [
        { text: 'useDialog', link: '/react/api/useDialogApi' },
        { text: 'Dialog', link: '/react/api/DialogApi' },
      ],
    }
  ]
}