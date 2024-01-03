<template>
  <div>
    <client-only>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1 class="brand-color" style="margin-top: -5px">
              Frequently Asked Questions (FAQs)
            </h1>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col cols="12">
            <div v-if="!pending">
              <div class="text-right mt-5 mb-0">
                <a
                  href="https://dvfr.icjia-api.cloud/uploads/DVFR_FAQ_for_Review_Teams_a3f71ae843.pdf"
                  target="_blank"
                  style="font-size: 12px"
                  >Download printer-friendly PDF&nbsp;&raquo;</a
                >
              </div>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, index) in data.data"
                  :key="item.attributes.identifier"
                  class="mt-2"
                >
                  <v-expansion-panel-title
                    expand-icon="mdi-plus"
                    collapse-icon="mdi-minus"
                    style="
                      font-weight: 700;
                      background: #6a1b9a;
                      color: white;
                      padding: 25px !important;
                    "
                  >
                    {{ item.attributes.summary }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <span
                      v-html="renderer.render(item.attributes.details)"
                    ></span>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div v-else>LOADING...</div>
          </v-col></v-row
        ></v-container
      >
    </client-only>
  </div>
</template>

<script setup>
// TODO: Create this as static content files at build
import md from "markdown-it";
import attrs from "markdown-it-attrs";
const renderer = new md({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
}).use(attrs);
const { pending, data } = await useFetch(
  "https://dvfr.icjia-api.cloud/api/faqs",
  {
    params: {
      sort: "ranking",
    },
  }
);

const _sections = data.value.data.map((item) => {
  return item.attributes.section;
});
const sections = [...new Set(_sections)];
console.log(sections);
</script>

<style scoped></style>
