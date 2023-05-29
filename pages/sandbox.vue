<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div v-for="i in 15" :key="i">
            <v-expansion-panels class="mt-5">
              <v-expansion-panel
                title="Title"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
              >
              </v-expansion-panel>
            </v-expansion-panels>
          </div> </v-col></v-row
    ></v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
