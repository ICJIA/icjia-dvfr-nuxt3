/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const jsonfile = require("jsonfile");
const _ = require("lodash");

const yaml = require("yaml");

const contentDir = path.join(__dirname, "../content");

const SITE_URL = process.env.NUXT_PUBLIC_BASE_URL;
const API = process.env.NUXT_PUBLIC_API_BASE_URL;

const query = `query {
    faqs (sort: "ranking:asc,createdAt") {
      data {
        id
        attributes {
          name
          identifier
          summary
          details
          ranking
          section
          createdAt
          publishedAt
          updatedAt
          
        }
      }
    }
  }`;

function formatMarkdown(content) {
  const { body } = content;
  delete content.body;
  return `---\n${yaml.stringify(content)}---\n\n${body}\n`;
}

axios
  .create({ baseURL: API })
  .post("/graphql", {
    query,
    validateStatus: (status) => status === 200,
    headers: {
      "Accept-Encoding": "application/json",
    },
  })
  .then((res) => {
    const faqs = res.data.data.faqs.data;

    const site = faqs.map((item) => {
      const obj = { ...item };
      obj.attributes.category = "faq";
      let rawText;

      rawText = obj.attributes?.details
        ?.replace(/<[^>]*>?/gm, "")
        .replace(/[^a-z0-9]/gi, " ");
      rawText = rawText.replace(/\s\s+/g, " ");
      obj.attributes.rawText = rawText.toLowerCase();
      obj.attributes.draft = false;
      obj.attributes.path = `/faq`;
      obj.attributes.url = `${SITE_URL}${obj.attributes.path}`;

      console.log("Markdown content created: ", obj.attributes.path);
      return obj;
    });
    site.forEach((item) => {
      console.log(item.attributes.identifier);
    });
  });
