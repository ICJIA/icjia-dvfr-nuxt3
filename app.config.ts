export default defineAppConfig({
  title: "Illinois Domestic Violence Fatality Review",
  description: "Illinois Domestic Violence Fatality Review",
  api: "https://dvfr.icjia-api.cloud",
  root: "https://dvfr.icjia.dev",
  isTranslationEnabled: true,
  footerMenu: [
    {
      main: "Home",
      link: "/",
    },
    {
      main: "About",
      link: "/about",
    },
    {
      main: "Contact",
      link: "/contact",
    },
    {
      main: "Meetings",
      link: "/meetings",
    },
    {
      main: "News",
      link: "/news",
    },
    {
      main: "Privacy",
      link: "/privacy",
    },
    {
      main: "Publications",
      link: "/publications",
    },
    {
      main: "Resources",
      link: "/resources",
    },

    {
      main: "Search",
      link: "/search",
    },
  ],

  navMenu: [
    // {
    //   main: "Home",
    //   link: "/",
    //   nudgeLeft: "78px",
    // },
    {
      main: "About",
      link: "/about",
    },
    {
      main: "Publications",
      link: "/publications",
    },

    {
      main: "Resources",
      link: "/resources",
    },
    {
      main: "Meetings",
      link: "/meetings",
    },
    {
      main: "News",
      link: "/news",
    },
  ],
});
