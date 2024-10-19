// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  tailwindcss: {
    cssPath: "~/assets/main.css",
  },
  googleFonts: {
    families: {
      Montserrat: "300..900",
    },
  },
  runtimeConfig: {
    public: {
      strapiURL: process.env.STRAPI_URL || "http://localhost:1337",
      graphqlURL: process.env.GRAPHQL_URL || "http://localhost:1337/graphql",
    },
  },
});
