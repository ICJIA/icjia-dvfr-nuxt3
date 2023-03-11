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
                    The Domestic Violence Fatality Review Committee is as an Ad
                    Hoc Committee of the Illinois Criminal Justice Information
                    Authority Board. The Committee was established under the
                    Illinois Domestic Violence Fatality Review Act in August
                    2021 to serve as a statewide resource for addressing
                    domestic violence-related fatalities and near-fatalities,
                    establish regional domestic violence fatality review teams,
                    and issue annual recommendations for systems change. The
                    Statewide Fatality Review Committee began meeting in January
                    2022 and continues to meet every other month to carry out
                    its mission. All meetings are open to the public.
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
            Illinois Domestic Violence Crisis Hotline
          </h2>
          <p>
            The 24-Hour Illinois Domestic Violence Crisis Hotline can provide
            support, information, and referral for a wide range of services. You
            do not need to leave your abuser or your home to receive help. All
            services are both free and confidential.
          </p>
          <h3
            style="
              font-size: 48px;
              font-weight: 900;
              font-family: 'Lato', sans-serif !important;
            "
            class="mb-0 brand-color"
          >
            <div>1-877-TO END DV</div>
            <div style="font-size: 18px; color: #555" class="mt-4">
              1-877-863-6338 (Voice)
            </div>
            <div style="font-size: 14px" class="mt-4">
              To find a local Domestic Violence Service, please
              <a
                target="_blank"
                href="https://www.dhs.state.il.us/page.aspx?module=12&officetype=17&county="
                >click here</a
              >.
            </div>
          </h3>
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
