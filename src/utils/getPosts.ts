import { DEFAULT_LOCALE } from "@lib/i18n.ts";
import type { CollectionEntry } from "astro:content";

export async function getPosts(locale = DEFAULT_LOCALE) {
  const globPosts = import.meta.glob("../content/blog/**/*.md") as Promise<
    CollectionEntry<"blog">["data"][]>
}