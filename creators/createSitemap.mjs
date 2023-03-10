import { createRequire } from "module";
import { createWriteStream } from "fs";
import { SitemapStream } from "sitemap";

import * as dotenv from "dotenv";
dotenv.config();

const require = createRequire(import.meta.url);
const siteIndex = require("../public/siteMeta.json");

const myManualRoutes = JSON.parse(process.env.NUXT_MANUAL_ROUTES);
const sitemap = new SitemapStream({
  hostname: `${process.env.NUXT_PUBLIC_BASE_URL}`,
});
const writeStream = createWriteStream("public/sitemap.xml");

sitemap.pipe(writeStream);

siteIndex.forEach((item) => {
  if (item && !item.hideFromSitemap) {
    const url = `${process.env.NUXT_PUBLIC_BASE_URL}${item.path}`;
    sitemap.write({ url, changefreq: "weekly", priority: 0.3 });
  }
});

myManualRoutes.forEach((item) => {
  const url = `${process.env.NUXT_PUBLIC_BASE_URL}${item}`;
  sitemap.write({ url, changefreq: "weekly", priority: 0.3 });
});

sitemap.end();

console.log("Created: ../public/sitemap.xml");
