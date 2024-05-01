import type { APIRoute, GetStaticPaths, GetStaticPathsItem } from "astro";
import {
  generateOgImageDynamic,
  generateOgImageHomepage,
} from "@utils/generateOgImages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import getSortedPosts from "@/utils/getSortedPosts";
import { getLocalePosts } from "@/utils/getPosts";
import { getCollection } from "astro:content";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const result: GetStaticPathsItem[] = [];

  // blog
  const posts = await getCollection("blog", ({ data }) => !data?.draft);

  posts.forEach(post =>
    result.push({
      params: {
        locale: post.data.locale,
        slug: post.slug,
        title: post.data.title,
      },
      props: {
        title: post.data.title,
        date: post.data.date,
        background: post.data.featuredImage.src,
      },
    })
  );

  return result;
};

export const GET: APIRoute = async ({ props, params }) => {
  return new Response(await generateOgImageDynamic({ ...props }), {
    headers: { "Content-Type": "image/png" },
  });
};
