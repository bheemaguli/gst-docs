import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/gst-docs/",
  server: {
    proxy: {
      '/gst-portal': {
        target: 'https://developer.gst.gov.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gst-portal/, ''),
      }
    }
  }
});
