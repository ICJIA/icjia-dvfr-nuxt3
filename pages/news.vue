<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = { path: "/news/", sort: { postDate: -1 } };
const { path } = useRoute();
const router = useRouter();

const { data } = await useAsyncData(`content-${path}`, async () => {
  const post = await queryContent().where({ _path: path }).findOne();
  return post;
});

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
      content: "DVFR latest news.",
    },
    {
      hid: "og-desc",
      property: "og:description",
      content: "DVFR latest news.",
    },
  ],
});
</script>

<template>
  <div class="pb-12" data-aos="fade-in">
    <v-container fluid>
      <h1>News</h1>
      <h3>Note: This is not the final layout for the news display.</h3>
      <!-- <v-row
        ><v-col cols="12" md="12">
          <div v-if="data" class="mt-6">
            <h1>{{ data.title.toUpperCase() }}</h1>
            <ContentDoc :key="data?.title" :value="data" class="markdown-body">
              <template #empty>Document not found</template>
              <template #not-found>Document not found</template>
            </ContentDoc>
          </div>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="12" md="12">
          <ContentList :query="query" v-slot="{ list }">
            <div v-for="post in list" :key="post._path">
              <v-card
                class="markdown-body px-5 py-0 elevation-0 mb-0"
                style="background: #fff"
              >
                <nuxt-link :to="post.path">
                  <h3 style="font-size: 1.1em">
                    {{ post.title }} | {{ formatDate(post.postDate) }}
                  </h3></nuxt-link
                >

                <details class="pl-5">
                  <summary>Details</summary>
                  <div class="mt-3 px-5 py-0" v-if="post.summary.length">
                    {{ post.summary }}
                  </div>
                  <div class="markdown-body mt-3">
                    <div
                      v-if="post.attachments.data.length"
                      style="background: #fff"
                      class="px-5 py-0"
                    >
                      <h4>Attachments</h4>
                      <v-table
                        class="markdown-body dataTable"
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
                            v-for="(attachment, index) in post.attachments.data"
                            :key="attachment.url"
                          >
                            <td>
                              <a
                                :href="
                                  'https://dvfr.icjia-api.cloud' +
                                  post.attachments.data[index].attributes.url
                                "
                                target="_blank"
                              >
                                {{
                                  post.attachments.data[
                                    index
                                  ].attributes.name.replace(/\.[^/.]+$/, "")
                                }}{{
                                  post.attachments.data[index].attributes.ext
                                }}
                              </a>
                            </td>
                            <td>
                              {{
                                formatDate(
                                  post.attachments.data[index].attributes
                                    .updatedAt
                                )
                              }}
                            </td>
                            <td>
                              {{
                                niceBytes(
                                  post.attachments.data[index].attributes.size
                                )
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </div>
                    <div v-else class="pl-4">
                      <strong>No attachments.</strong>
                    </div>
                  </div>
                </details>
              </v-card>
            </div>
          </ContentList>
        </v-col></v-row
      ></v-container
    >
  </div>
</template>

<style scoped>
/* Summary/details */

summary {
  cursor: pointer;
  font-weight: 900;
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
  fonti-size: 0.6rem;
}
</style>
