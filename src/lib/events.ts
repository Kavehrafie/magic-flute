import { getCollection } from "astro:content";
import { DEFAULT_LOCALE } from "@lib/i18n.ts";

export const getLastEvent = async (locale: string = DEFAULT_LOCALE) => {
  const events = await getCollection("events", entry => entry.data.locale === locale);

  if (events.length > 0) {
    return getEventsSorted(events)[0];
  }

  return null
}

export const getEventsSorted = (events) => {

  return events.sort((a, b) => new Date(b.data.eventDate) - new Date(a.data.eventDate))
}