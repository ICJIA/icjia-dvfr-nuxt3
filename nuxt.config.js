// nuxt.config.ts
//
// https://v3.nuxtjs.org/api/configuration/nuxt.config\

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import appRoutes from "./public/appRoutes.json";

export default defineNuxtConfig({
  app: {
    // baseURL: "/dvfr/",
    // pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Illinois Domestic Violence Fatality Review",
      titleTemplate: "Illinois DVFR | %s ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Illinois Domestic Violence Fatality Review (DVFR)",
        },
        {
          hid: "og-title",
          property: "og:title",
          content: "Illinois Domestic Violence Fatality Review (DVFR)",
        },
        {
          hid: "og-desc",
          property: "og:description",
          content: "Illinois Domestic Violence Fatality Review (DVFR)",
        },
        {
          hid: "og-image",
          property: "og:image",
          content: "https://dvfr.icjia.dev/dvfr-splash-text-01.jpg",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          src: "https://code.jquery.com/jquery-3.6.1.slim.min.js",
          type: "text/javascript",
        },
        {
          src: "https://assets.adobedtm.com/c318d2739692/96e37aff7009/launch-4ef36d3c8aed.min.js",
          type: "text/javascript",
          async: true,
        },
        {
          src: "https://plausible.icjia.cloud/js/script.js",
          "data-domain": "dvfr.illinois.gov",
          defer: true,
        },
        // {
        //   src: "https://analytics.icjia-api.cloud/js/plausible.js",
        //   "data-domain": "dvfr.illinois.gov",
        //   defer: true,
        // },
        // {
        //   src: "https://www.googletagmanager.com/gtag/js?id=G-xxxxxxx",
        //   async: true,
        // },
        // {
        //   src: "ga.js",
        // },
      ],
    },
  },

  // plugins: [{ src: "~/plugins/aos", mode: "client" }],

  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/variables.scss",
    "~/assets/css/app.css",
    "~/assets/css/github-markdown.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    optimizeDeps: {
      include: [
        "axios",
        "moment",
        "dompurify",
        "fuse.js",
        "lodash",
        "markdown-it",
        "markdown-it-attrs",
        "thumbor-url-builder-ts",
        "uuid",
        "mitt",
      ],
    },
    vue: {
      plugins: [vue(), vuetify(), nodePolyfills()],

      template: {
        transformAssetUrls,
      },
    },
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    // apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    private: {
      thumborKey:
        process.env.NUXT_THUMBOR_KEY || "ERROR: thumbor key not specified",
    },
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE_URL ||
        "ERROR: no api base url specified",
      siteBase:
        process.env.NUXT_PUBLIC_BASE_URL || "ERROR: no site base url specified",
    },
  },

  modules: [
    "@nuxtjs/google-fonts",
    // "@nuxtjs/apollo",
    // "@pinia/nuxt",
    // "@nuxt/image-edge",
    "@vueuse/nuxt",
    "@nuxt/content",

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (options, nuxt) => {
      await nuxt.hooks.hook("vite:extendConfig", (config) => {
        // console.log(config);
        config?.plugins?.push(vuetify());
      });
    },
  ],

  content: {
    documentDriven: false,
    markdown: {
      mdc: true,
      anchorLinks: {
        depth: 0,
        exclude: [1, 2, 3, 4, 5, 6],
      },
    },
    // experimental: {
    //   clientDb: true,
    // },
  },

  googleFonts: {
    inject: true,
    download: true,
    display: "swap",
    prefetch: true,
    families: {
      Roboto: {
        wght: [100, 400, 700, 900],
        ital: [100],
      },
      Lato: {
        wght: [100, 300, 400, 700, 900],
        ital: [100],
      },
      Raleway: {
        wght: [100, 400, 900],
        ital: [100],
      },
      Oswald: {
        wght: [100, 400, 900],
      },
    },
  },

  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },

  //   apollo: {
  //     clients: {
  //       default: {
  //         httpEndpoint: `${process.env.NUXT_PUBLIC_API_BASE_URL}/graphql`,
  //       },
  //     },
  //   },
  generate: {
    routes: appRoutes,
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-07-22",
});
