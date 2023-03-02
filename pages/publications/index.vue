<script setup lang="ts">
import moment from "moment";
import _ from "lodash";
const { path } = useRoute();
const router = useRouter();

const { data: query } = await useAsyncData("publications", () =>
  queryContent("/publications/")
    .sort([{ category: 1 }])
    .find()
);

// console.log(query);

const constructURL = (url: string) => {
  const myURL = "https://dvfr.icjia-api.cloud/uploads/" + url;
  return myURL;
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const niceBytes = (bytes, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getTime = (date) => {
  return moment(date).format("hh:mm A");
};

let _sorted;
let sorted = ref([]);

console.log("mounted");

console.log(query.value.length);
_sorted = query.value.map((item) => {
  let obj = { ...item };
  return obj;
});
sorted = _.orderBy(_sorted, ["category", "title"], ["asc", "asc"]);
// console.log(sorted[0].url);
//console.dir(sorted);

useHead({
  meta: [
    {
      hid: "og-image",
      property: "og:image",
      content: "https://dvfr.icjia.dev/dvfr-splash-text-01.jpg",
    },
    {
      hid: "og-image-width",
      property: "og:image:width",
      content: "1200",
    },
    {
      hid: "og-image-height",
      property: "og:image:height",
      content: "630",
    },
    {
      hid: "description",
      name: "description",
      content: "DVFR mpublications.",
    },
    {
      hid: "og-desc",
      property: "og:description",
      content: "DVFR publications.",
    },
  ],
});
</script>

<template>
  <div class="pb-12" data-aos="fade-in" style="margin-top: -18px">
    <v-container fluid>
      <h1>Publications</h1>

      <div v-for="item in query" :key="item._path">
        <v-card
          class="markdown-body px-5 py-0 elevation-0 mb-0"
          style="background: #fff"
        >
          <details class="pl-5">
            <summary>
              {{ item.category.toUpperCase() }} |
              <span style="color: #666"> {{ item.title }}</span>
            </summary>
            <div>
              <div class="mt-3 px-5 py-0" v-if="item.summary.length">
                {{ item.summary }} |
                <span class="text-left" style="margin-top: -0px">
                  <v-btn size="x-small" variant="text" :to="item.path"
                    >Link<v-icon right>mdi-link</v-icon></v-btn
                  >
                </span>
              </div>
              <div class="markdown-body mt-3">
                <div style="background: #fff" class="px-5 py-0">
                  <attachments
                    :attachments="item.attachments.data"
                    :links="item.link"
                    :showTableDisplay="false"
                    class="mt-2"
                  />
                </div>
              </div>
            </div>
          </details>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
/* Summary/details */

summary {
  cursor: pointer;
  font-weight: 900;
  font-size: 16px;
}

details {
  margin-top: 15px !important;
  margin-bottom: 15px;
}

summary > * {
  display: inline;
}

.markdown-body.dataTable {
  width: 100%;
  font-size: 14px;
}

.markdown-body .dataTable th {
  font-weight: 900;
  text-align: left;
  font-size: 0.8rem;
}

.markdown-body.dataTable td {
  font-weight: 400;
  text-align: left;
  font-size: 0.65rem;
}
</style>
