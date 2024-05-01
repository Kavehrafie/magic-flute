import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import rehypeFigure from 'rehype-figure';
import react from "@astrojs/react";


export default defineConfig({
  site: import.meta.env.SITE || "https://rumination.netlify.app/",
  image: {
    domains: ["d38ruy7cl1ctq5.cloudfront.net"]
  },
  vite: {
    server: {
      watch: {
        ignored: "**/.idea/**"
      }
    }
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeFigure]
  },
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
  }),
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), sitemap()]
});
