/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  const isLib = process.env.LIB_BUILD === "true";

  return {
    // Some plugins will be returned based on deployment version.
    plugins: [
      vue(),
      ...(isLib
        ? [
            dts({
              insertTypesEntry: true,
              tsconfigPath: "./tsconfig.app.json",
            }),
          ]
        : []),
    ],
    build: isLib
      ? {
          lib: {
            entry: resolve(__dirname, "widget-entry.ts"),
            name: "WeatherWidget",
            fileName: "weather-widget",
            formats: ["es", "umd"],
          },
          rollupOptions: {
            // By NOT externalizing 'vue' or 'pinia', they will be bundled inside the widget.
            // This is ideal for distributing via a CDN as a truly standalone script.
            external: ["vue", "react"],
            output: {
              globals: {},
            },
          },
          outDir: "dist-lib",
        }
      : {
          // Standard SPA build
          outDir: "dist",
        },
    test: {
      environment: "jsdom",
    },
  };
});
