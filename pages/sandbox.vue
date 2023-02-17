<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const query: QueryBuilderParams = { path: "/meetings/", sort: { start: -1 } };
</script>
<template>
  <main>
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="meeting in list" :key="meeting._path">
        <nuxt-link :to="meeting.path">
          <h3>{{ meeting.title }} / {{ meeting.start }}</h3></nuxt-link
        >
        <div>
          {{ meeting }}
        </div>
      </div>
    </ContentList>
  </main>
</template>
