import type { Context } from 'https://edge.netlify.com';
import {getLocaleFromUrl} from "@lib/i18n.ts";

export default function ({ request, context }: { request: Request; context: Context }) {
  // Return serializable data to add to Astro.locals
  const url = new URL(request.url);

  return {
    locale: getLocaleFromUrl(url),
    visitorCountry: context.geo.country.name,
    hasEdgeMiddleware: true,
  };
}