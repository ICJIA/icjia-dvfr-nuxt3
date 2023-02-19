<script setup lang="ts">
// import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
// const query: QueryBuilderParams = { path: "/meetings/", sort: { start: -1 } };
import moment from "moment";
const { path } = useRoute();
const router = useRouter();

// const { data } = await useAsyncData(`content-${path}`, async () => {
//   const post = await queryContent().where({ _path: path }).findOne();
//   return post;
// });

const { data: query } = await useAsyncData("home", () =>
  queryContent("/meetings/").sort({ start: -1 }).find()
);

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

// write function to capitalize first letter of sentence
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getTime = (date) => {
  return moment(date).format("hh:mm A");
};

useHead({
  meta: [
    {
      hid: "og-image",
      property: "og:image",
      content:
        "https://i2i.icjia-api.cloud/uploads/thumbnail_i2i_logo_text_small_3c874143bd.png?updated_at=2022-12-06T17:57:54.755Z",
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
      content: "DVFR meeting information and attachments.",
    },
    {
      hid: "og-desc",
      property: "og:description",
      content: "DVFR meeting information and attachments.",
    },
  ],
});
</script>

<template>
  <div class="pb-12" data-aos="fade-in">
    <v-container fluid>
      <h1>Meetings</h1>
      <div v-for="meeting in query" :key="meeting._path">
        <v-card
          class="markdown-body px-5 py-0 elevation-0 mb-0"
          style="background: #fff"
        >
          <details class="pl-5">
            <summary>
              {{ formatDate(meeting.start) }} |
              <span style="color: #666">
                {{ meeting.title }}, {{ getTime(meeting.start) }} -
                {{ getTime(meeting.end) }}</span
              >
            </summary>
            <div>
              <div class="mt-3 px-5 py-0" v-if="meeting.summary.length">
                {{ meeting.summary }}
              </div>
              <div class="markdown-body mt-3">
                <div
                  v-if="meeting.attachments.data.length"
                  style="background: #fff"
                  class="px-5 py-0"
                >
                  <!-- <div style="font-size: 14px" class="mt-1 mb-1">
                    ATTACHMENTS
                  </div> -->
                  <div class="text-right">
                    <v-btn size="x-small" variant="text" :to="meeting.path"
                      ><v-icon left>mdi-link</v-icon>&nbsp;&nbsp;meeting
                      permalink</v-btn
                    >
                  </div>
                  <v-table
                    class="markdown-body dataTable mt-2"
                    density="compact"
                  >
                    <thead>
                      <tr>
                        <th class="text-left">Filename</th>
                        <th class="text-left">Last Updated</th>
                        <th class="text-left">Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(attachment, index) in meeting.attachments.data"
                        :key="attachment.url"
                      >
                        <td>
                          <a
                            :href="
                              'https://dvfr.icjia-api.cloud' +
                              meeting.attachments.data[index].attributes.url
                            "
                            target="_blank"
                          >
                            {{
                              meeting.attachments.data[
                                index
                              ].attributes.name.replace(/\.[^/.]+$/, "")
                            }}{{
                              meeting.attachments.data[index].attributes.ext
                            }}
                          </a>
                        </td>
                        <td>
                          {{
                            formatDate(
                              meeting.attachments.data[index].attributes
                                .updatedAt
                            )
                          }}
                        </td>
                        <td>
                          {{
                            niceBytes(
                              meeting.attachments.data[index].attributes.size
                            )
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </div>
                <div v-else class="pl-4">
                  <strong>Attachments forthcoming.</strong>
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
