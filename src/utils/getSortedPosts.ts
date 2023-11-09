import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"blog">[], locale = 'en') =>
  posts
    .filter(({ data, id }) => !data.draft && id.startsWith(`${locale}/`))
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.pubDatetime).getTime() / 1000) -
        Math.floor(new Date(a.data.pubDatetime).getTime() / 1000)
    );

export default getSortedPosts;
