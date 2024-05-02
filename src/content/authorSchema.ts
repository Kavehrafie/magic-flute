import { z } from "astro:content";


const authorSchema = ({ image }) =>
  z.object({
    avatar: image().or(z.string()).optional(),
    locale: z.string().regex(/^[a-z]{2}$/),
    fistName: z.string().min(3),
    lastName: z.string().min(3),
    tags: z.array(z.string()).default(["others"]),
  })

export default authorSchema