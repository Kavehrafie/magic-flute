import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      watch: {
        ignored: "**/.idea/**",
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [],
  },
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
