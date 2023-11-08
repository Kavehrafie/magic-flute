import type { RequestContext } from '@vercel/edge';

export default function ({ request, context }: { request: Request; context: RequestContext }) {
  // do something with request and context
  return {
    title: "Spider-man's blog",
  };
}