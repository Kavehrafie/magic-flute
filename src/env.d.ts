/// <reference path="../.astro/types.d.ts"/>
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    locale: string;
    visitorCountry: string,
    hasEdgeMiddleware: boolean,
  }
}