<template>
  <div
    style="
      background: #401b60;
      border-bottom: 1px solid #aaa;
      font-size: 11px;
      z-index: 99999;
    "
    class="text-left pr-5 pl-5 py-1 elevation-0"
  >
    <nuxt-link to="/" class="breadcrumb-link" style="color: white"
      >DVFR HOME</nuxt-link
    >
    <span style="color: #fff; font-weight: 900"
      >&nbsp;&nbsp;&raquo;&nbsp;&nbsp;</span
    >
    <span style="color: white; font-weight: 400">{{
      makeTitle(route.path.toUpperCase())
    }}</span>
  </div>
</template>

<script setup>
//TODO: properly set up to divide URLs into breadcrumbs
const route = useRoute();
// put html entity in string
const htmlEntity = (entity) => {
  return String.fromCharCode(entity);
};

const makeTitle = (slug) => {
  // remove initial slash
  slug = slug.replace(/^\/+/, "");
  const words = slug.split("-");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }
  let breadcrumbURL = words
    .join(" ")
    .replace(/\//g, " " + htmlEntity(187) + " ");
  return breadcrumbURL;
};
</script>
