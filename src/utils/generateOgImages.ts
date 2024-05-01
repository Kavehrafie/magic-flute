import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";

import { HomePageEn, HomePageFa } from "./og-templates/HomePage";

import type { Languages } from "@/lib/i18n";
import { getImage } from "astro:assets";
import { PostPageEn } from "./og-templates/PostPage";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/montserrat-alternates@latest/latin-600-normal.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  const fontFileFarsi = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/vazirmatn@latest/arabic-400-normal.ttf"
  );

  const fontFarsi: ArrayBuffer = await fontFileFarsi.arrayBuffer();

  const fontFileFarsiBold = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/vazirmatn@latest/arabic-600-normal.ttf"
  );

  const fontFarsiBold: ArrayBuffer = await fontFileFarsiBold.arrayBuffer();

  return { fontRegular, fontBold, fontFarsi, fontFarsiBold };
};

const { fontRegular, fontBold, fontFarsi, fontFarsiBold } = await fetchFonts();

const SatoriOptions: SatoriOptions = {
  width: 640,
  height: 480,
  fonts: [
    {
      name: "Montserrat",
      data: fontRegular,
      style: "normal",
      weight: 400,
    },
    {
      name: "Montserrat",
      data: fontBold,
      style: "normal",
      weight: 600,
    },
    {
      name: "Vazirmatn",
      data: fontFarsi,
      style: "normal",
      weight: 400,
    },
    {
      name: "Vazirmatn",
      data: fontFarsiBold,
      style: "normal",
      weight: 800,
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export const generateOgImageHomepage = async (
  locale: Languages = "en",
  title: string = "Rumination",
  subtitle: string | undefined = undefined
): Promise<Buffer> => {
  // import background from "./src/assets/hero.png";

  const image = await getImage({ src: "./hero.png", width: 640, height: 480 });

  const svg = await satori(
    locale === "fa"
      ? HomePageFa({ background: image.src, title, subtitle })
      : HomePageEn({
          background: import.meta.env.SITE + "/" + image.src,
          title,
          subtitle,
        }),
    SatoriOptions
  );

  //   const sharpBuffer = await sharp(Buffer.from(svg)).toBuffer();

  return svgBufferToPngBuffer(svg);
};

export const generateOgImageDynamic = async ({
  title,
  background,
}: {
  title: string;
  background: string;
}) => {
  console.log(title, "|", background);
  const svg = await satori(PostPageEn({ title, background }), SatoriOptions);

  return svgBufferToPngBuffer(svg);
};
