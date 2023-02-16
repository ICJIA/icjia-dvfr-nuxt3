import urlExist from "url-exist";
import jsonfile from "jsonfile";

const links = [
  {
    title:
      "Guiding Officers to Deflect Citizens to Treatment: An Examination of Police Department Policies in Illinois",
    publicationDate: "2023-02-10",
    fileURL:
      "https://researchhub.icjia-api.cloud/uploads/PDF%20policy%20paper-230210T21141657.pdf1",
  },
  {
    title:
      "Criminal History Record Checks for Federally Assisted Housing: A Progress Report",
    publicationDate: "2023-02-07",
    fileURL:
      "https://researchhub.icjia-api.cloud/uploads/FINAL%20REPORT%20PDF%20FOR%20POSTING-230207T16344430.pdf",
  },
  {
    title:
      "Evaluation of the Development of a Multijurisdictional Police-Based Deflection Program in Southern Illinois",
    publicationDate: "2023-02-07",
    fileURL:
      "https://researchhub.icjia-api.cloud/uploads/FINAL%20PDF%20FOR%20POSTING-230207T17003598.pdf",
  },
];

Promise.all(
  links.map(async (item) => {
    const result = await urlExist(item.fileURL);
    return { status: result, item };
  })
).then((res) => {
  jsonfile.writeFileSync(`./links.json`, res, function (err) {
    if (err) {
      console.error(err);
    }
    console.log("link file written/");
  });
});
