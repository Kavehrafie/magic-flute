import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {

  context.locals.title = "THJ"
  console.log(context)
  return next()
});