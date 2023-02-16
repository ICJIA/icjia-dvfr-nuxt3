<template>
  <div>
    <HomeSplash></HomeSplash>
    <div
      v-if="data && isMounted"
      style="margin-bottom: -45px !important"
      class="px-10 py-5"
    >
      <ContentDoc :key="data?.title" :value="data" class="markdown-body">
        <template #empty>Document not found</template>
        <template #not-found>Document not found</template>
      </ContentDoc>
    </div>
    <!-- <div class="text-center" style="margin-top: 100px">
      <v-btn
        style="color: #000 !important"
        color="grey-lighten-3"
        @click="downloadReport()"
        >Download Full Report (PDF)&nbsp;&nbsp;<v-icon right
          >mdi-download</v-icon
        ></v-btn
      >
    </div> -->
  </div>
</template>

<script setup>
// const { path } = useRoute();
// const router = useRouter();
const isMounted = ref(false);

const downloadReport = () => {
  // window.open(
  //   "https://i2i.icjia-api.cloud/uploads/2021-ICJIA-Annual-Report.pdf",
  //   "_blank"
  // );
  alert("TODO: Download Report on click");
};

// const error = useError();
const { data } = await useAsyncData(`content-home`, async () => {
  const post = await queryContent().where({ _path: "/" }).findOne();
  return post;
});
// const redirect = () => {
//   router.push("/404");
// };

onMounted(() => {
  isMounted.value = true;
});
</script>

<style>
.white-heading {
  color: #fff !important;
}
.dark-rule {
  border-bottom: 1px solid #000 !important;
}
</style>
