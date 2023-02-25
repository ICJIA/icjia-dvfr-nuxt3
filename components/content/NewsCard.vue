<template>
  <v-card
    class="px-5 py-5 info-card"
    style="width: 100%; flex-grow: 1 !important; background: #fafafa"
    @click="navigateTo(props.item.path)"
  >
    <div style="font-size: 12px">
      <span style="font-weight: 900"
        >{{ formatDate(props.item.postDate) }} |
        <nuxt-link
          :to="`/search?q=${props.item.category.toLowerCase()}`"
          class="search-link"
          >{{ props.item.category.toUpperCase() }}</nuxt-link
        ></span
      >
    </div>
    <h2 style="border: 0">{{ props.item.title }}</h2>
    <p>{{ props.item.summary }}</p>
    <div style="font-size: 12px; font-weight: 700" class="mt-5 text-right">
      <nuxt-link
        :to="`/search?q=${props.item.category.toLowerCase()}`"
        class="search-link"
        >{{ props.item.category.toUpperCase() }}</nuxt-link
      >
      |
      <span>{{ readingTime(props.item) }}</span>
    </div>
  </v-card>
</template>

<script setup>
const navigation = ref(null);
const props = defineProps({
  item: {
    type: Object,
    default: [],
  },
});

// const sorted = _.orderBy(props.attachments, ["category"]);
// console.table(sorted);

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

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const readingTime = (item) => {
  let text;
  if (item.description.length > 0) {
    text = item.description;
  } else {
    text = item.summary;
  }

  // console.log(text);
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime + " min read";
};
</script>

<style>
.search-link {
  color: #333 !important;
}
</style>
