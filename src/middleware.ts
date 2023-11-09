import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({request}, next) => {

  const url = new URL(request.url);
  console.log(url)
  if (url.pathname === '/admin') {
    url.pathname = '/'
    return Response.redirect(url)
  }
  return next();
});