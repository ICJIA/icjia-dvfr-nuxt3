<template>
  <v-app id="appTop">
    <div ref="appTop" tabindex="-1"></div>
    <a class="skip-to-content-link" id="skip-link" ref="skipLink" href="#main">
      Skip to content
    </a>
    <TheNav></TheNav>

    <TheSidebar></TheSidebar>

    <NuxtLoadingIndicator color="blue" />

    <v-main class="markdown-body" style="min-height: 90vh !important" id="main">
      <TheBreadcrumbBar v-if="!isHome"></TheBreadcrumbBar>
      <NuxtPage></NuxtPage>
      <div></div>
    </v-main>
    <div style="height: 75px"></div>
    <TheFooter></TheFooter>
  </v-app>
</template>

<script setup>
const { isTranslationEnabled } = useAppConfig();
const isHome = ref(true);
const route = useRoute();
const appTop = ref();

watchEffect(() => {
  //TODO: SEO
  const seoURL = ref("https://dvfr.illinois.gov" + route.path);
  console.log("route.path: ", route.path);
  console.log("seoURL: ", seoURL.value);
  useSeoMeta({
    ogUrl: () => `${seoURL.value}`,
    ogType: "website",
    twitterTitle: "Illinois Domestic Violence Fatality Review",
    twitterDescription: "Illinois Domestic Violence Fatality Review (DVFR)",
    twitterImage: "https://dvfr.icjia.dev/dvfr-splash-text-01.jpg",
    twitterCard: "summary_large_image",
  });
  //TODO: a11y
  // console.log("skipLink refocus:", appTop.value);
  // if (appTop.value) {
  //   appTop.value.focus();
  // }
  if (route.path === "/") {
    isHome.value = true;
  } else {
    isHome.value = false;
  }
});
useHead({
  htmlAttrs: {
    lang: "en",
  },
});

const page = useCurrentPage({ slug: "slug-here" });
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

/* TODO: a11y */

.skip-to-content-link {
  left: 50%;
  position: absolute;
  transform: translateY(-100%);
}

.skip-to-content-link {
  background: #2f1804;
  color: #fff;
  height: 50px;
  left: 50%;
  padding: 5px;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 99999;
}

.skip-to-content-link:focus {
  transform: translateY(0%);
}
</style>
