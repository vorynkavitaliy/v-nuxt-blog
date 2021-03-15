module.exports = {
    target: 'server',
    
    head: {
        title: "nuxt-blog",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            { hid: "description", name: "description", content: "" }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },

    css: ["element-ui/lib/theme-chalk/index.css", "@/theme/index.sass"],

    plugins: ["@/plugins/globals", '~/plugins/axios'],

    components: true,

    buildModules: ['@nuxtjs/pwa'],

    pwa: {
        manifest: {
            name: 'My Nuxt Blog',
            lang: 'en',
            useWebmanifestExtension: false
        },
        workbox: {
        /* workbox options */
        },

        meta: {
            /* meta options */
        }
    },

    modules: ["@nuxtjs/axios"],

    env: {
        appName: 'SSR Blog'
    },

    axios: {
        baseURL: process.env.BASEURL || 'http://localhost:3000'
    },

    build: {
        transpile: [/^element-ui/]
    }
};
