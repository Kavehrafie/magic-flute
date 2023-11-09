/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type {Languages} from "lib/i18n.ts";

declare namespace App {
  interface Locals {
    locale: Languages | undefined | any;
    visitorCountry: string;
    hasEdgeMiddleware: boolean;
  }
}