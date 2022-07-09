module.exports = {
    dest: ".site",
    title: '代码狗',
    description: '别问，问就是不知道',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    base: '/',
    markdown: {
        lineNumbers: false
    },
    themeConfig: {
        nav: [
            {text: '部署', link: '/deploy/'},
            {text: 'docker', link: '/docker/'},
            {text: 'springboot-async', link: '/springboot-async/'},
            {text: 'Github', link: 'https://github.com/Eriri-i'}
        ],
        sidebar: 'auto'
    }
};