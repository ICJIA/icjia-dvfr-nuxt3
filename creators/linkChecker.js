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
