import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base:"/personal-website-blog/",  // uncheck if using the github repo, change it to your own repo
  head: [["link", {rel: "icon", href:"homepage-logo.svg"}]],
  title: "Jian Xu's Personal Website",
  description: "Academic and Code Blog",
  themeConfig: {
    // 设置首页logo
    logo: "homepage-logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Researches', link: '/' },
      { text: 'Publications', link: '/publications/' },
      { text: 'Notes', items: [
        { text: 'Java', link: '/' },
        { text: 'VitePress', link: '/notes/' },
        { // 带分割线的导航栏
          items: [
            { text: 'Vue', link: '/' },
            { text: 'Redis', link: '/notes/' },
          ]
        }
      ] },
      { text: 'About Me', link: '/' },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    sidebar:{
      '/notes/':[{
        text: 'Notes',
        items: [
          { text: 'Blog Design', link: '/notes/vitepress-intro' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }],
      '/projects/':[{
        text: 'Projects',
        items: [
          { text: 'Blog Design', link: '/notes/vitepress-intro' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Markdown Examples', link: '/markdown-examples' }
        ]
      }],
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/xujianzi' },
      {
        icon: {
          svg: '<svg t="1715968002546" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2609" width="200" height="200"><path d="M512 822.24L0 405.334 512 0z" fill="#4285F4" p-id="2610"></path><path d="M512 822.24l512-416.906L512 0z" fill="#356AC3" p-id="2611"></path><path d="M512 725.334m-298.666 0a298.666 298.666 0 1 0 597.332 0 298.666 298.666 0 1 0-597.332 0Z" fill="#A0C3FF" p-id="2612"></path><path d="M242.074 597.334c47.936-100.906 150.784-170.668 269.926-170.668s221.99 69.762 269.926 170.668H242.074z" fill="#76A7FA" p-id="2613"></path></svg>'
         
        }, link: 'https://github.com/xujianzi'
      }
    ],

    footer: {
      message: 'Yingjianan',
      copyright:'Copyright2024@ Jian Xu'
    }
  }
})
