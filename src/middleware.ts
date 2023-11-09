import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {

  const url = new URL(request.url);

  if (url.pathname === '/admin') {
    url.pathname = '/'
    return Response.redirect(url)
  }
  return next();
});