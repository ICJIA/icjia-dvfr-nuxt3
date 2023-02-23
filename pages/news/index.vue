<template>
  <div>
    <v-container fluid style="margin-top: -18px">
      <v-row>
        <v-col>
          <h1>LATEST NEWS</h1>

          <v-container fluid>
            <v-row align="stretch">
              <v-col
                v-for="item in query"
                :key="item._path"
                class="mb-8"
                cols="12"
                md="6"
                style="display: flex; flex-direction: column"
              >
                <NewsCard :item="item"></NewsCard
              ></v-col> </v-row
          ></v-container>
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

<style lang="scss" scoped>
.v-card-text {
  flex-grow: 1 !important;
}
</style>
