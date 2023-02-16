const request = require("request");

// const links = [
//   {
//     title:
//       "Guiding Officers to Deflect Citizens to Treatment: An Examination of Police Department Policies in Illinois",
//     publicationDate: "2023-02-10",
//     fileURL:
//       "https://researchhub.icjia-api.cloud/uploads/PDF%20policy%20paper-230210T21141657.pdf",
//   },
//   {
//     title:
//       "Criminal History Record Checks for Federally Assisted Housing: A Progress Report",
//     publicationDate: "2023-02-07",
//     fileURL:
//       "https://researchhub.icjia-api.cloud/uploads/FINAL%20REPORT%20PDF%20FOR%20POSTING-230207T16344430.pdf",
//   },
//   {
//     title:
//       "Evaluation of the Development of a Multijurisdictional Police-Based Deflection Program in Southern Illinois",
//     publicationDate: "2023-02-07",
//     fileURL:
//       "https://researchhub.icjia-api.cloud/uploads/FINAL%20PDF%20FOR%20POSTING-230207T17003598.pdf",
//   },
// ];

// const linkChecker = (url, callback) => {
//   request(url, (error, response) => {
//     if (error) {
//       callback(false);
//     } else {
//       callback(response.statusCode === 200);
//     }
//   });
// };

// links.forEach((link) => {
//   linkChecker(link.fileURL, (result) => {
//     console.log("-----------------");
//     console.log(link.title);
//     console.log(link.fileURL);
//     console.log(result);
//     console.log("-----------------");
//   });
// });

// remove spaces from files in a directory

// const fs = require("fs");
// const path = require("path");

// const directoryPath = path.join(__dirname, "test");

// fs.readdir(directoryPath, (err, files) => {
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }

//   files.forEach((file) => {
//     const newFile = file.replace(/ /g, "");
//     fs.renameSync(
//       path.join(directoryPath, file),
//       path.join(directoryPath, newFile)
//     );
//     console.log("Renaming " + file + " to " + newFile);
//   });
// });

// query
// {
// 	publications (sort: "publicationDate:desc", limit:100) {
//     title
//     publicationDate
//     fileURL
//   }
// }

/* eslint-disable no-unused-vars */
const fs = require("fs");
const axios = require("axios");
const jsonfile = require("jsonfile");
const _ = require("lodash");
// const { apiBaseURL } = require("./src/config");
const allowedHost = "https://icjia.illinois.gov/researchhub";

const init = async () => {
  const limit = 500;
  let pubArray = [];
  let start = 0;
  let count = await axios.get(
    "https://agency.icjia-api.cloud/publications/count"
  );
  count = count.data;
  let iterations = Math.ceil(count / limit);

  for (let i = 0; i < iterations; i++) {
    let response = await axios.get(
      `https://agency.icjia-api.cloud/publications?_limit=${limit}&_start=${start}`
    );
    pubArray = pubArray.concat(response.data);
    start += limit;
  }
  pubArray = _.uniqBy(pubArray, "id");
  // remove all objects that don't have a fileURL
  pubArray = pubArray.filter((p) => p.fileURL);

  let publications = pubArray.map((p) => {
    let obj = {};
    obj.title = p.title;
    obj.publicationDate = p.publicationDate;
    obj.fileURL = p.fileURL;
    return obj;
  });
  let content = [...publications];
  content = _.orderBy(content, ["publicationDate"], ["desc"]);
  const linkChecker = (url, callback) => {
    request(url, (error, response) => {
      if (error) {
        callback(false);
      } else {
        callback(response.statusCode === 200);
      }
    });
  };

  content.forEach((link) => {
    linkChecker(link.fileURL, (result) => {
      console.log("-----------------");
      console.log(link.title);
      console.log(link.fileURL);
      console.log(result);
      console.log("-----------------");
    });
  });
};

init();
