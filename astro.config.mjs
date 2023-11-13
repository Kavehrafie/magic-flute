import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import rehypeFigure from 'rehype-figure'
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.SITE || "https://654e8f5c7e812600073af535--tranquil-swan-a1d3cc.netlify.app/",
  vite: {
    server: {
      watch: {
        ignored: "**/.idea/**",
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeFigure],
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
