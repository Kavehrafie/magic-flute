import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({request, locals}, next) => {
  const url = new URL(request.url);

  locals.title = 'fgaadnankasn'
  if (url.pathname === '/admin') {
    url.pathname = '/'
    return Response.redirect(url)
  }
  return next();
});