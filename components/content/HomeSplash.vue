<template>
  <v-img
    width="100%"
    max-height="600"
    cover
    src="/dvfr-splash-text-02_xl.jpg"
    lazy-src="/dvfr-splash-text-01_thumb.jpg"
    style="margin-top: 0px"
    alt="DVFR Splash Image"
  >
    <template #placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="blue darken-3"
          aria-label="Progress bar: Loading"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
  <!-- <v-img
    width="100%"
    max-height="780"
    cover
    src="/dvfr-splash-text-01_xl.jpg"
    lazy-src="/dvfr-splash-text-01_thumb.jpg"
    style="margin-top: 0px"
    class="hidden-md-and-down"
  >
    <template #placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="blue darken-3"
          aria-label="Progress bar: Loading"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img> -->
</template>

<script setup lang="ts">
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<style>
.splash-caption {
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 25px;
  color: #333;
}
.banner {
  width: 100%;
  background: rgba(79, 80, 79, 0.7);
  padding: 30px;
  margin-top: 100px;
}

.bg {
  background-color: none;
}
.bg img {
  background: none;
}

@media only screen and (max-width: 600px) {
  .banner {
    height: 100%;
    margin-top: 100px;
    background: rgba(79, 80, 79, 0.5);
  }
}
</style>
