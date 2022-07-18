module.exports = {
    dest: ".site",
    title: '代码狗',
    description: '别问，问就是不知道',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    base: '/',
    markdown: {
        lineNumbers: false
    },
    themeConfig: {
        nav: [
            { text: '部署', link: '/deploy/' },
            { text: 'docker', link: '/docker/' },
            { text: 'springboot-async', link: '/springboot-async/' },
            {
                text: 'code',
                airalLabel: 'code menu',
                items: [
                    {
                        text: 'Group1', items: [
                            { text: '部署', link: '/deploy/' },
                            { text: 'docker', link: '/docker/' }
                        ]
                    },
                    {
                        text: 'Group2', items: [
                            { text: '部署', link: '/deploy/' },
                            { text: 'docker', link: '/docker/' }
                        ]
                    }
                ]
            },
            {
                text: 'code',
                airalLabel: 'code menu',
                items: [
                    { text: '部署', link: '/deploy/' },
                    { text: 'docker', link: '/docker/' }
                ]
            },
            { text: 'Github', link: 'https://github.com/Eriri-i', target: '_blank', rel: '' }
        ],
        sidebar: {
            '/deploy/': [
                '',
                '部署传统web程序到linux服务器',
                'docker部署Gitlab+Jenkins+Sonarqube实现代码质量扫描',
                'SSM笔记'
            ],

            '/docker/': [
                '',
                'docker笔记'
            ],
            '/springboot-async/': [
                '',
                'springboot-async'
            ],
            '/': [
                ''
            ]
        }
    }
};