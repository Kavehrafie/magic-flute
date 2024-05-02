import type { APIRoute, GetStaticPaths, GetStaticPathsItem } from "astro";
import {
  generateOgImageDynamic,
  generateOgImageHomepage,
} from "@utils/generateOgImages";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import getSortedPosts from "@/utils/getSortedPosts";
import { getLocalePosts } from "@/utils/getPosts";
import { getCollection } from "astro:content";
import slugify from "@utils/slugify.ts";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const result: GetStaticPathsItem[] = [];

  // blog
  const posts = await getCollection("blog", ({ data }) => !data?.draft);

  return posts.map(post => {
    const routeSegments = post.id.split("/");
    const locale = routeSegments[0];

    return {
      params: {
        slug: slugify(post),
        locale:
          post.data?.locale
            ? locale
            : DEFAULT_LOCALE,
      },
      props: {
        title: post.data.title,
        background: post.data.featuredImage.src,
      },
    };
  });

};

export const GET: APIRoute = async ({ props, params }) => {
  return new Response(await generateOgImageDynamic({ ...props }), {
    headers: { "Content-Type": "image/png" },
  });
};
