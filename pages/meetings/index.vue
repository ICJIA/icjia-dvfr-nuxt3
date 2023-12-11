<script setup>
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
const { path } = useRoute();
const router = useRouter();

const { data: query } = await useAsyncData("meetings", () =>
  queryContent("/meetings/").sort({ start: -1 }).find()
);

const constructURL = (url) => {
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

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getTime = (date) => {
  return moment(date).format("hh:mm A");
};

const getYear = (date) => {
  return moment(date).format("YYYY");
};

let displayYear = ref("");
let isYearDisplayed = ref(true);

const displayYearHeading = (date) => {
  const year = moment(date).format("YYYY");
  if (year !== displayYear) {
    displayYear = year;
    isYearDisplayed = true;
    return `${year} Meetings`;
  } else {
    isYearDisplayed = false;
    return null;
  }
};

const _myQuery = toRaw(query.value);
const _years = _myQuery.map((item) => {
  return moment(item.start).format("YYYY");
});
const years = [...new Set(_years)];
// console.log(years);

let myTocLinks = years.map((year) => {
  return {
    id: `year-${year}`,
    depth: 2,
    text: `${year} Meetings`,
  };
});

let myTocObj = ref({ title: "", searchDepth: 2, depth: 2, links: myTocLinks });

//console.log("links: ", myTocLinks);

useHead({
  title: "Meetings",
  meta: [
    {
      hid: "og-image",
      property: "og:image",
      content: "https://dvfr.icjia.dev/dvfr-splash-text-01.jpg",
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
      content: "DVFR meeting information and attachments.",
    },
    {
      hid: "og-desc",
      property: "og:description",
      content: "DVFR meeting information and attachments.",
    },
    {
      hid: "og-type",
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<template>
  <div class="pb-12" data-aos="fade-in" style="margin-top: 0px">
    <v-container fluid style="margin-left: 0; padding: 0">
      <v-row>
        <v-col cols="12" md="12" class="px-12">
          <h1 class="brand-color">MEETINGS</h1>
          <p>
            The Statewide Domestic Violence Fatality Review Committee holds
            meetings on the third Tuesday of every other month and special topic
            meetings when applicable. All meetings are open to the public,
            however portions of meetings where it may be necessary to discuss
            confidential or identifying information may be closed for executive
            session.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="mt-5 px-0">
          <!-- TODO: a11y -->
          <div v-for="(meeting, index) in query" :key="meeting._path">
            <v-expansion-panels class="px-6" style="margin-bottom: 25px">
              <v-expansion-panel class="">
                <v-expansion-panel-title
                  expand-icon="mdi-plus"
                  collapse-icon="mdi-minus"
                  style="
                    font-weight: 700;
                    background: #efefef;
                    color: #000;
                    padding: 15px !important;
                  "
                  class="panel-hover"
                >
                  <div>
                    <span
                      style="font-size: 16px; color: 000; font-weight: 900"
                      >{{ formatDate(meeting.start) }}</span
                    >
                    <br /><br />
                    <span style="color: #222; font-weight: 400" class="pl-0">
                      <span
                        v-if="meeting.isCancelled"
                        style="color: red; font-weight: 900"
                        >CANCELLED:
                      </span>
                      {{ meeting.title }}, {{ getTime(meeting.start) }} -
                      {{ getTime(meeting.end) }}</span
                    >
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="markdown-body mt-3">
                    <div
                      class="mt-3 px-5 py-0"
                      v-if="
                        meeting.summary &&
                        meeting.summary.length &&
                        !meeting.isCancelled
                      "
                    >
                      {{ meeting.summary }}
                    </div>
                    <div v-else style="color: red; font-weight: 900">
                      {{ meeting.summary }}
                    </div>
                    <div
                      v-if="meeting.attachments.data.length"
                      style="background: #fff"
                      class="px-5 py-0"
                    >
                      <attachments
                        :attachments="meeting.attachments.data"
                        :showTableDisplay="true"
                        class="mt-2"
                      />
                    </div>

                    <div v-else class="pl-4">
                      <strong>Attachments forthcoming.</strong>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
summary {
  cursor: pointer;
  font-weight: 900;
  font-size: 16px;
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
  font-size: 0.65rem;
}
</style>
