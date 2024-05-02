import { z } from "astro:content";


const eventSchema = ({ image }) =>
  z.object({
    featuredImage: z.object({
      src: image().or(z.string()),
      alt: z.string(),
      width: z.number(),
      height: z.number()
    }).optional(),
    locale: z.string().regex(/^[a-z]{2}$/),
    eventDate: z.date(),
    title: z.string().min(3),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine(img => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
  })

export default eventSchema