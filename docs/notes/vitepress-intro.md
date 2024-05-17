# VitePress Introduction



## VitePress创建个人网站本地文件



### 初始化项目

> 项目结构 

```
my-vitepress-blog
├── docs
│   ├── .vitepress
│   │   └── config.js
│   ├── index.md
│   └── posts
│       └── first-post.md
├── package.json
└── README.md


      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/' },
      { text: 'Researches', link: '/' },
      { text: 'Publications', link: '/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'About Me', link: '/' },
```

> 初始化流程：

```
mkdir my-vitepress-blog
cd my-vitepress-blog
## 配置环境
npm add -D vitepress
## 安装向导
npx vitepress init

```

安装向导选项--初学者建议将创建docs

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./dcos
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.
```

启动项目

```

npm run docs:dev
```



> 根目录“/”是.vitepress所在的目录







`index.md`

内容介绍：

文件路由的对应关系：

```
index.md                  -->  /index.html (可以通过 / 访问)
prologue.md               -->  /prologue.html
guide/index.md            -->  /guide/index.html (可以通过 /guide/ 访问)
guide/getting-started.md  -->  /guide/getting-started.html
```



```markdown
hero:
  name: "Jian's Academic and Code Blog"
  text: "Academic and Code Blog"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples
```

创建导航栏

>认为docs 就是根目录