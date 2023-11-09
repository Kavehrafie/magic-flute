import { defineMiddleware } from "astro:middleware";
import {DEFAULT_LOCALE, getLocaleFromUrl} from "./lib/i18n.ts";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(({request, locals}, next) => {
  const url = new URL(request.url);

  locals.locale = getLocaleFromUrl(url)

  if (url.pathname === '/') {
    url.pathname = `/${DEFAULT_LOCALE}/`
    return Response.redirect(url)
  }

  return next();
});