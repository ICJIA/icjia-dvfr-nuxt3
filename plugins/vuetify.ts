import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      iconfont: ["mdiSvg", "fa"], // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    components: {
      ...labs,
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
