import { slug as slugger } from "github-slugger";
import type { CollectionEntry } from "astro:content";

export const slugifyStr = (str: string) => slugger(str);

const slugify = (entry: CollectionEntry<"blog" | "author" | "event">) => {
  const routeSegments = entry.slug.split("/");
  console.log(`>>>>${routeSegments[1]}${routeSegments[0]}`);
  return `${routeSegments[1]}${routeSegments[0]}`
}

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
