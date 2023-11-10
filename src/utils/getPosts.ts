import { DEFAULT_LOCALE } from "@lib/i18n.ts";
import type { CollectionEntry } from "astro:content";

export async function getPost(filePath: string) {
  const globPosts = import.meta.glob("../content/blog/**/*.md") as Promise<
    CollectionEntry<"blog">["data"][]>

  if (filePath in globPosts) {
    // @ts-ignore
    return globPosts[filePath]() as MarkdownInstance<"blog">
  }
  return null
}

export async function getPostBySlug(slug : string) {
  const globPosts = import.meta.glob("../content/blog/**/*.md") as Promise<
    CollectionEntry<"blog">["data"][]>

  const mapPosts = new Map();
  await Promise.all(
    Object.values(globPosts).map(globPost => {

    })
  )
}
