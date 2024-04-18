//import { defineClientConfig } from '@vuepress/client'
import { viteBundler } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'

// export default defineClientConfig({
//   enhance({ app, router, siteData }) {},
//   setup() {},
//   rootComponents: [],
// })

export default {
    plugins: [
      searchPlugin({
        locales: {
          '/': {
            placeholder: '搜索文档',
          },
          '/zh/': {
            placeholder: '搜索文档',
          },
        },
      }),
    ],
    head:[
      [
        'link', {rel:'icon', href : '/logo-title.jpg'}
      ]
    ],
    bundler: viteBundler({
      vuePluginOptions: {
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === 'center',
          },
        },
      },
    }),
    theme: defaultTheme({
        logo: '/logo-title.jpg',
        title: 'hahah',
        // locales: {
        //   title :'sssss',
        //   description:"2222"
        // },
        navbar: [
          { text: '香港卡', link: '/card/' },
          { text: '微信解封', link: '/wechat/' },
          // // {  text: '文档', link: '/api/FIRSTOFALL.md' },
          // //{ text: 'External', link: 'https://www.baidu.com' },
          {
            text: '快速搭建商城',
            children: [
              {
                text: '首页(马上开放)',
                link: '',
                // 该元素将一直处于激活状态
               // activeMatch: '/',
              },
              {
                text: '前台h5演示(马上开放)',
                link: '',
                // 该元素将一直处于激活状态
               // activeMatch: '/',
              },
              {
                text: '商户后台演示(马上开放)',
                link: '',
                // 该元素将一直处于激活状态
               // activeMatch: '/',
              },
            ],
          },
          //{ text: 'demo', link: 'https://v2.vuepress.vuejs.org/zh/' },
        ],
        sidebarDepth: 2, // 设置一级时，可以看到 一级、二级目录；设置为2时可以看到 三级目录
    
        // sidebar: [
        //    // SidebarItem
        //    {
        //     text: '首页',
        //     link: '/',
        //     children: [
        //     // SidebarItem
        //     {
        //         text: 'github',
        //         link: 'https://github.com',
        //         children: [],
        //         collapsible: false,
        //     },
        //     // 字符串 - 页面文件路径
        //     //'/foo/bar.md',
        //     ],
        //     },
        //     {
        //         text: 'GO文档',
        //         link: '/go/',
        //         children: [
        //         // SidebarItem
        //         // {
        //         //     text: 'github',
        //         //     link: 'https://github.com',
        //         //     children: [],
        //         // },
        //         // 字符串 - 页面文件路径
        //         //'/foo/bar.md',
        //         ],
        //     }      
        // ]
         // 可折叠的侧边栏
       sidebar:'auto',
       //sidebar: {
            // '/': [
            //     {
            //         text: '',
            //         collapsible: false,
            //         children: ['/'],
            //     },
            //     // {
            //     //     text: 'GO文档',
            //     //     collapsible: true,
            //     //     children: ['/go/README.md', '/go/code.md'],
            //     // },
            //     // {
            //     //     text: '支付',
            //     //     collapsible: true,
            //     //     children: ['/note/alipay.md','/note/wechatpay.md','/note/applepay.md'],
            //     // },
            //     // {
            //     //     text: '杂',
            //     //     collapsible: true,
            //     //     children: ['/note/es.md','/note/docker.md','/note/js.md','/note/laravel.md','/note/lnmp.md','/note/redis.md','/note/queue.md','/note/other.md'],
            //     // },
            // ],
            // '/go/': [
            // {
            //     text: 'GO文档',
            //     collapsible: true,
            //     children: ['/go/README.md'],
            // },
            // ],
      //},
      }),
  }