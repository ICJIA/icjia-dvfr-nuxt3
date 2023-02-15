const request = require("request");

const links = ["https://icjia.illinois.gov", "https://icjia.illinois.test"];

const linkChecker = (url, callback) => {
  request(url, (error, response) => {
    if (error) {
      callback(false);
    } else {
      callback(response.statusCode === 200);
    }
  });
};

links.forEach((link) => {
  linkChecker(link, (result) => {
    console.log(link, result);
  });
});

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
