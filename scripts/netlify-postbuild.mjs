#!/usr/bin/env node
/**
 * Post-build step for Netlify: generates a minimal index.html SPA shell in
 * dist/client/ so Netlify can serve the app as a static site. The TanStack
 * Start client bundle hydrates client-side without SSR data.
 *
 * Also copies _redirects so SPA routing works.
 */
import { readdirSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const ASSETS_DIR = join(CLIENT_DIR, "assets");

if (!existsSync(ASSETS_DIR)) {
  console.error(`[netlify-postbuild] ${ASSETS_DIR} not found — did 'vite build' run?`);
  process.exit(1);
}

const assets = readdirSync(ASSETS_DIR);

// Main JS entry: largest index-*.js (the React + router bundle)
const jsEntries = assets
  .filter((f) => /^index-.*\.js$/.test(f))
  .map((f) => ({ name: f, size: readdirSync(ASSETS_DIR).includes(f) ? 1 : 0 }));

// Pick the biggest index-*.js as main entry
import { statSync } from "node:fs";
const mainJs = assets
  .filter((f) => /^index-.*\.js$/.test(f))
  .map((f) => ({ f, size: statSync(join(ASSETS_DIR, f)).size }))
  .sort((a, b) => b.size - a.size)[0]?.f;

const mainCss = assets.find((f) => /^styles-.*\.css$/.test(f));

if (!mainJs) {
  console.error("[netlify-postbuild] could not find main index-*.js entry");
  process.exit(1);
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Théloire Crochet — Handwoven Stories, Crafted with Love</title>
    <meta name="description" content="Théloire Crochet — a quiet luxury atelier of handmade crochet bags, slowly woven by hand." />
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}" />` : ""}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" />
    <link rel="modulepreload" href="/assets/${mainJs}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJs}"></script>
  </body>
</html>
`;

writeFileSync(join(CLIENT_DIR, "index.html"), html);
console.log(`[netlify-postbuild] wrote ${CLIENT_DIR}/index.html (entry: ${mainJs}, css: ${mainCss})`);

// Ensure _redirects exists in dist/client for SPA routing on Netlify
const redirectsSrc = "public/_redirects";
const redirectsDest = join(CLIENT_DIR, "_redirects");
if (existsSync(redirectsSrc) && !existsSync(redirectsDest)) {
  copyFileSync(redirectsSrc, redirectsDest);
  console.log(`[netlify-postbuild] copied _redirects`);
}
