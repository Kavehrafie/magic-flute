import type { APIRoute } from "astro";
import { generateOgImageHomepage } from "@utils/generateOgImages";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export const GET: APIRoute = async ({ params }) => {
  return new Response(
    await generateOgImageHomepage({
      locale: (params.locale as Languages) || DEFAULT_LOCALE,
      subtitle: "Rumination: Upcoming Event Invitation",
    }),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};
