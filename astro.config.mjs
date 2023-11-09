import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      watch: {
        ignored: "**/.idea/**"
      }
    }
  },
  output: "server",
  adapter: netlify({
    edgeMiddleware: true
  })
});