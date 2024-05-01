import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import { HomePageEn, HomePageFa } from "./og-templates/HomePage";
import { readFile } from "node:fs/promises";
import type { Languages } from "@/lib/i18n";
import { getImage } from "astro:assets";
import { SITE } from "@/config";

const SatoriOptions: SatoriOptions = {
  width: 640,
  height: 480,
  fonts: [
    {
      name: "Montserrat",
      data: await readFile(
        `${process.cwd()}/public/fonts/MontserratAlternates-Regular.ttf`
      ),
      style: "normal",
      weight: 400,
    },
    {
      name: "Montserrat",
      data: await readFile(
        `${process.cwd()}/public/fonts/MontserratAlternates-Italic.ttf`
      ),
      style: "italic",
      weight: 400,
    },
    {
      name: "Montserrat",
      data: await readFile(
        `${process.cwd()}/public/fonts/MontserratAlternates-Bold.ttf`
      ),
      style: "normal",
      weight: 600,
    },
    {
      name: "Vazirmatn",
      data: await readFile(
        `${process.cwd()}/public/fonts/Vazirmatn-Regular.ttf`
      ),
      style: "normal",
      weight: 400,
    },
    {
      name: "Vazirmatn",
      data: await readFile(
        `${process.cwd()}/public/fonts/Vazirmatn-ExtraBold.ttf`
      ),
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
