
import {defineCollection} from "astro:content";
import blogSchema from "./blogSchema.ts";
import eventSchema from "./eventSchema.ts";
import authorSchema from "@content/authorSchema.ts";

const blog = defineCollection({
  type: "content",
  schema: blogSchema
});

const event = defineCollection({
  type: "content",
  schema: eventSchema
});

const author = defineCollection({
  type: "data",
  schema: authorSchema
})

export const collections = { blog, event, author };
