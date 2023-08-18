export default defineAppConfig({
  title: "Illinois Domestic Violence Fatality Review",
  description: "Illinois Domestic Violence Fatality Review",
  api: "https://dvfr.icjia-api.cloud",
  root: "https://dvfr.illinois.gov",
  isTranslationEnabled: true,
  footerMenu: [
   
    {
      main: "About",
      link: "/about",
    },
    {
      main: "Contact",
      link: "/contact",
    },
    {
      main: "FAQs",
      link: "/faq",
    },
    {
      main: "Meetings",
      link: "/meetings",
    },

    {
      main: "Privacy",
      link: "/privacy",
    },
    
    {
      main: "Regional DVFR Teams",
      link: "/regional-dvfr-teams",
    },
  

    {
      main: "Resources",
      link: "/resources",
    },

    {
      main: "Search",
      link: "/search",
    },
    {
      main: "Translate",
      link: "/translate",
    },
  ],

  navMenu: [
    {
      main: "About",
       "children": [
        // {
        //   "section": "Illinois Statistical Analysis Center (SAC)"
        // },
        {
          "title": "About DVFR",
          "link": "/about"
        },
        {
          "title": "Frequently Asked Questions (FAQs)",
          "link": "/faq"
         },
        {
          "title": "Regional DVFR Teams",
          "link": "/regional-dvfr-teams"
        }
      ]
    },
    {
      main: "Meetings",
      link: "/meetings",
    },

    {
      main: "Resources",
      link: "/resources",
    },
    // {
    //   main: "Contact",
    //   link: "/contact",
    // },
  ],
  sidebarMenu: [
    {
      main: "About",
       "children": [
        // {
        //   "section": "Illinois Statistical Analysis Center (SAC)"
        // },
        {
          "title": "About DVFR",
          "link": "/about"
        },
        {
          "title": "FAQs",
          "link": "/faq"
         },
        {
          "title": "Regional DVFR Teams",
          "link": "/regional-dvfr-teams"
        }
      ]
    },
    {
      main: "Meetings",
      link: "/meetings",
    },

    {
      main: "Resources",
      link: "/resources",
    },
    // {
    //   main: "Contact",
    //   link: "/contact",
    // },
  ]
});
