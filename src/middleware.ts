import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({locals, request, params}, next) => {

  locals.title = "ddd"
  return next();
});