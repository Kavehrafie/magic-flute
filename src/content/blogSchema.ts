import { reference, z } from "astro:content";
import { SITE } from "@config";

const blogSchema = ({ image }) =>
  z.object({
    featuredImage: z.object({
      src: image().or(z.string()),
      alt: z.string(),
      width: z.number(),
      height: z.number()
    }).optional(),
    authors: z.array(reference("authors")).optional(),
    locale: z.string().regex(/^[a-z]{2}$/),
    pubDatetime: z.date(),
    title: z.string(),
    subtitle: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine(img => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
      .or(z.string())
      .optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    readingTime: z.object({ text: z.string() }).optional(),
    translations: z.array(reference('blog')).optional()
  });

export default blogSchema