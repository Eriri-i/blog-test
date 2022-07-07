module.exports = {
    dest: ".site",
    title: '代码狗',
    description: '别问，问就是不知道',
    head: [
        ['link', {rel: 'icon', href: '/logo.jpg'}]
    ],
    base: '/',
    markdown: {
        lineNumbers: false
    },
    themeConfig: {
        nav: [
            {text: '故事', link: '/notes/'},
            {text: '编程', link: '/algorithm/'},
            {text: 'Github', link: 'https://www.baidu.com/'}
        ]
    },
    sidebar: 'auto',
    sidebarDepth: 2,
};