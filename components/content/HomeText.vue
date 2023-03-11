<template>
  <div>
    <div
      style="
        background: #f8f8f8;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      "
    >
      <v-container fluid style="min-height: 300px">
        <v-row class="py-5">
          <v-col cols="12" md="4" class="rule home-about-main px-5">
            <h2 class="no-rule text-right brand-color">About Us</h2>
            <h3 class="home-about-sub text-right">
              The Domestic Violence Fatality Review Act (Public Act 102-0520)
              was signed into law in August 2021.
            </h3>
          </v-col>
          <v-col cols="12" md="8">
            <v-container fluid class="fill-height">
              <v-row>
                <v-col class="px-5 text-center">
                  <div>
                    The Domestic Violence Fatality Review Act created a process
                    to establish domestic violence fatality review (DVFR) teams
                    across Illinois. Domestic Violence Fatality Review aims to
                    prevent future domestic violence related fatalities and near
                    fatalities and reduce the severity and frequency of domestic
                    violence. This process is accomplished by looking at both
                    strengths and vulnerabilities in various intervention that
                    may lead to adverse outcomes for survivors, victims, and
                    their families.
                  </div>
                  <div class="mt-4">
                    <nuxt-link to="/about">Read More&nbsp;&raquo;</nuxt-link>
                  </div>
                </v-col>
              </v-row>
            </v-container></v-col
          >
        </v-row></v-container
      >
    </div>
    <v-container fluid style="border-top: 1px solid #fff">
      <v-row class="py-5 text-center">
        <v-col>
          <h2
            style="font-size: 50px; font-weight: 900"
            class="no-rule brand-color"
          >
            Illinois Domestic Violence Hotline
          </h2>
          <h3
            style="
              font-size: 40px;
              font-weight: 900;
              font-family: 'Lato', sans-serif !important;
            "
            class="mb-8 brand-color"
          >
            1-877-863-6338
          </h3>
          <p class="">
            Lorem markdownum Abas. Fama unum pastorve novantur figuras voce nec
            increvit iam quoque priori ipsa pruniceum quaerere. Causa retro
            annos duo et, rura rector versi mittit prohibebant illi nymphae,
            antra repressit.
          </p>
        </v-col>
      </v-row></v-container
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.no-rule {
  border: none;
  padding: 0;
  margin: 0;
}

.rule {
  border-right: 1px solid #aaa;
  min-height: 280px;
}

.rule-left {
  border-left: 1px solid #aaa;
  min-height: 280px;
}

.home-about-main {
  font-size: 36px;
}

.home-about-sub {
  font-size: 18px;
  font-family: "Lato", sans-serif;
}
</style>
