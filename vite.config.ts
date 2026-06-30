// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = process.env.VERCEL === "1" || process.env.SERVER_PRESET === "vercel" || process.env.NITRO_PRESET === "vercel";
const isNetlify = process.env.NETLIFY === "true" || process.env.NETLIFY === "1" || process.env.SERVER_PRESET === "netlify";
const isServerless = isVercel || isNetlify;

// For Vercel: build as a static SPA (no SSR) to avoid serverless function timeouts.
// All reconciliation logic runs client-side, so SSR is not needed.
export default defineConfig({
  cloudflare: !isServerless,
  tanstackStart: isServerless ? {
    server: { preset: isVercel ? "vercel-static" : "netlify" },
  } : {
    server: { entry: "server" },
  },
});
