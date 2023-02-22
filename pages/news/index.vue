<template>
  <div>
    <v-container fluid style="margin-top: -18px">
      <v-row>
        <v-col>
          <h1>LATEST NEWS</h1>
          <div v-for="item in query" :key="item._path">
            <v-card
              class="markdown-body px-5 py-0 elevation-0 mb-0"
              style="background: #fff"
              ><NewsCard :item="item"></NewsCard><br /><br />
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import moment from "moment";
import _ from "lodash";
const { path } = useRoute();
const router = useRouter();

const { data: query } = await useAsyncData("news", () =>
  queryContent("/news/")
    .sort([{ publishedAt: -1 }])
    .find()
);
</script>

<style lang="scss" scoped></style>
