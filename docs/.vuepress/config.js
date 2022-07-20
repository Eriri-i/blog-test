module.exports = {
    dest: ".site",
    title: 'catRunRunRun',
    description: '别问，问就是不知道',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    base: '/',
    markdown: {
        lineNumbers: false
    },
    themeConfig: {
        repo: 'Eriri-i/blog-test',
        repoLabel: '查看源码',
        docsDir: 'docs',
        nav: [
            {
                text: '代码',
                airalLabel: 'code menu',
                items: [
                    {
                        text: '分组1', items: [
                            { text: '部署', link: '/deploy/' },
                            { text: 'docker', link: '/docker/' },
                            { text: 'springboot-async', link: '/springboot-async/' },
                        ]
                    }
                ]
            },
            {
                text: '问题笔记',
                airalLabel: 'problem menu',
                items: [
                    {
                        text: '分组1', items: [
                            { text: '问题1', link: '/problem/' },
                        ]
                    }
                ]
            },
            {
                text: '其他',
                airalLabel: 'other menu',
                items: [
                    {
                        text: '分组1', items: [
                            { text: '其他1', link: '/other/' },
                        ]
                    }
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
            '/problem/': [
                ''
            ],
            '/other/': [
                '',
                'systemclt笔记'
            ],
            '/': [
                ''
            ]
        },
        lastUpdated: true,
        editLinks: true
    }
};