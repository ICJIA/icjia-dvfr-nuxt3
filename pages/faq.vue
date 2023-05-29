<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="brand-color" style="margin-top: -5px">
            Frequently Asked Questions (FAQs)
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <!-- <div class="text-right mt-5 pr-10 mb-5">
            <a
              href="https://dvfr.icjia-api.cloud/uploads/DVFR_FAQ_for_Review_Teams_a3f71ae843.pdf"
              >Download print-friendly PDF&nbsp;&raquo;</a
            >
          </div> -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <div v-if="!pending">
            <!-- {{ data.data }} -->
            <div
              v-for="(item, index) in data.data"
              :key="item.attributes.identifier"
            >
              <input
                type="checkbox"
                :name="item.attributes.identifier"
                :id="item.attributes.identifier"
              />
              <details open>
                <summary>
                  <label :for="item.attributes.identifier">{{
                    item.attributes.summary
                  }}</label>
                </summary>
                <div
                  class="content"
                  v-html="renderer.render(item.attributes.details)"
                ></div>
              </details>
            </div>
            <div class="text-center mt-5 pr-10 mb-0">
              <a
                href="https://dvfr.icjia-api.cloud/uploads/DVFR_FAQ_for_Review_Teams_a3f71ae843.pdf"
                >Download print-friendly PDF&nbsp;&raquo;</a
              >
            </div>
          </div>
          <div v-else>LOADING...</div>
        </v-col></v-row
      ></v-container
    >
  </div>
</template>

<script setup>
// TODO: Create this as static content files
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
  "https://dvfr.icjia-api.cloud/api/faqs"
);
let test = "## Test";
</script>

<style scoped>
/* The key is to start <details> element in the "open" state...
        ...and animate its max-height value by toggling a checkbox. */
details {
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
  background: white;
  transition: max-height 400ms ease-out;
  margin-left: 25px;
  margin-right: 25px;

  max-height: 4rem; /* Set a max-height value just enough to show the summary content */
  overflow: hidden; /* Hide the rest of the content */
}

summary {
  display: block; /* This hides the summary's ::marker pseudo-element */
}

input {
  display: none; /* Hide the checkbox element */
}

/* <label> element to check the checkbox */
label {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  background: #632c93;
  color: #fff;
  font-family: "Oswald", sans-serif;
  font-size: 18px;
  height: 4rem; /* This height value must be equal to max-height value of <details> element  */
}

label:hover {
  cursor: pointer;
}

label::before {
  content: "⏵";
  font-size: 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  transition: rotate 200ms 400ms ease-out;
}

div.content {
  /* margin-top: 15px;
  margin-bottom: 25px;
  margin-left: 15px;
  margin-right: 15px; */

  padding: 10px 20px 10px 20px;
  border: 0px solid #888;
  background: #fafafa;
}

/* Here you can choose two approaches to animate <details> element:
        1) Use adjacent sibling combinator (+)
        2) Use :has() pseudo-class, but this might not work in Firefox.
      */

input:checked + details,
details:has(input:checked) {
  max-height: 800px; /* Set a max-height value enough to show all the content */
}

input:checked + details label::before,
details:has(input:checked) label::before {
  rotate: 90deg;
  transition: rotate 200ms ease-out;
}
</style>
